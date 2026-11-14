"use client";

// O vira-lata caramelo. Não há arquivo de modelo: o corpo é montado aqui, peça por peça,
// em uma hierarquia de juntas (quadril → tronco → pescoço → cabeça, pernas e rabo).
// A cada quadro as juntas caminham em direção à pose pedida e recebem os movimentos vivos:
// respiração, piscada, olhar, abanar, passada.

import { useMemo, useRef } from "react";
import { useFrame, type RootState } from "@react-three/fiber";
import * as THREE from "three";
import { cao, sinais, type NomePose } from "./estado";
import { CHAVES, POSES } from "./poses";

const PI = Math.PI;
const amortece = (a: number, b: number, l: number, dt: number) => a + (b - a) * (1 - Math.exp(-l * dt));
const limita = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const mistura = (a: number, b: number, t: number) => a + (b - a) * t;

type Juntas = Record<string, THREE.Object3D | null>;

const novoMovimento = () => ({
  p: { ...POSES.sentado },
  x: 0,
  y: 0,
  s: 1,
  giro: -0.55,
  iniciado: false,
  cenaVista: null as object | null,
  viajando: false,
  fase: 0,
  amp: 0,
  lado: -1,
  yaw: 0,
  pitch: 0,
  tomba: 0,
  wag: 0,
  pisca: 0,
  proxPisca: 2.5,
  cava: 0,
  barriga: 0,
  fareja: 0,
});
type Movimento = ReturnType<typeof novoMovimento>;

/** Um quadro de animação: leva cada junta em direção à pose pedida e soma os movimentos vivos. */
function animar(j: Juntas, st: Movimento, estado: RootState, dtBruto: number) {
  const dt = Math.min(dtBruto, 0.05);
  const t = estado.clock.elapsedTime;
  const { width: vw, height: vh } = estado.viewport;
  const c = cao.cena;
  const agora = performance.now();

  // ── Onde ele deve estar ──
  const alvoX = (c.x - 0.5) * vw;
  const alvoY = (0.5 - c.y) * vh;
  const alvoS = c.escala * vh * 0.19;
  if (!st.iniciado) {
    // Entra em cena andando, vindo de fora da tela pela direita.
    st.x = vw * 0.5 + alvoS * 2;
    st.y = alvoY;
    st.s = alvoS;
    st.giro = -1.25;
    st.viajando = true;
    st.iniciado = true;
    st.cenaVista = cao.cenaId;
  }
  if (cao.cenaId !== st.cenaVista) {
    st.cenaVista = cao.cenaId;
    if (Math.hypot(alvoX - st.x, alvoY - st.y) > vh * 0.06) st.viajando = true;
  }
  const dx = alvoX - st.x;
  const dy = alvoY - st.y;
  const dist = Math.hypot(dx, dy);
  let andou = 0;
  if (st.viajando) {
    const passo = Math.min(dist, Math.max(vw * 0.5, vh * 0.7) * dt);
    if (dist > 0.0001) {
      st.x += (dx / dist) * passo;
      st.y += (dy / dist) * passo;
    }
    andou = passo;
    if (dist < vh * 0.01) {
      st.viajando = false;
      sinais?.dispatchEvent(new Event("pousou"));
    }
  } else {
    const nx = amortece(st.x, alvoX, 22, dt);
    const ny = amortece(st.y, alvoY, 22, dt);
    // Na pose de andar, só o deslocamento horizontal conta como passada.
    if (c.pose === "andando") andou = Math.abs(nx - st.x);
    st.x = nx;
    st.y = ny;
  }
  st.s = amortece(st.s, alvoS, 6, dt);
  if (Math.abs(dx) > vh * 0.004) st.lado = dx > 0 ? 1 : -1;

  // ── Qual pose ──
  let nome: NomePose = c.pose;
  if (cao.dormindo && nome !== "andando") nome = "dormindo";
  if (st.viajando) nome = "andando";
  const alvo = POSES[nome];
  const p = st.p;
  for (const k of CHAVES) p[k] = amortece(p[k], alvo[k], k === "rola" ? 5 : 8, dt);

  const andandoAgora = andou / Math.max(dt, 0.001) > st.s * 0.25;
  st.amp = amortece(st.amp, andandoAgora ? 1 : 0, 10, dt);
  st.fase += (andou / (st.s * 1.25)) * PI * 2;
  st.cava = amortece(st.cava, nome === "cavando" ? 1 : 0, 6, dt);
  st.barriga = amortece(st.barriga, nome === "barrigaCima" ? 1 : 0, 6, dt);
  st.fareja = amortece(st.fareja, nome === "farejando" ? 1 : 0, 6, dt);

  let giroAlvo = c.giro;
  if (st.viajando && Math.abs(dx) > Math.abs(dy) * 0.4) giroAlvo = st.lado * 1.25;
  else if (c.pose === "andando" && !st.viajando) giroAlvo = st.lado * 1.2;
  st.giro = amortece(st.giro, giroAlvo, 7, dt);

  // ── Corpo ──
  const raiz = j.raiz!;
  raiz.position.set(st.x, st.y, 0);
  raiz.scale.setScalar(st.s);
  j.giro!.rotation.y = st.giro;
  const quique = Math.abs(Math.sin(st.fase)) * 0.035 * st.amp;
  const dorme = nome === "dormindo";
  const sopro = Math.sin(t * (dorme ? 1.3 : 2.7));
  j.corpo!.position.y = p.y + quique;
  j.corpo!.rotation.set(p.inclina + Math.sin(t * 15) * 0.02 * st.cava, 0, p.rola + Math.sin(t * 4) * 0.08 * st.barriga);
  j.peito!.scale.set(0.4, 0.42 * (1 + sopro * (dorme ? 0.035 : 0.018)), 0.4);
  (j.sombra as THREE.Mesh).scale.setScalar(p.sombra);

  // ── Pernas ──
  const A = 0.55 * st.amp;
  const perna = (lado: "E" | "D", frente: boolean, fase: number) => {
    const s = lado === "E" ? 1 : -1;
    const balanco = Math.sin(fase) * A;
    const dobra = Math.max(0, -Math.cos(fase)) * 0.75 * st.amp;
    let cima = (frente ? p.ombro : p.quadril) + balanco;
    let baixo = (frente ? p.cotovelo : p.joelho) + dobra;
    if (frente) {
      const d = Math.sin(t * 17 + (s > 0 ? 0 : PI));
      cima += d * 0.45 * st.cava;
      baixo += -d * 0.5 * st.cava;
    }
    const meneio = Math.sin(t * 5.2 + s + (frente ? 0 : 1.7)) * 0.22 * st.barriga;
    cima += meneio;
    const a = j[(frente ? "ombro" : "quadril") + lado]!;
    const b = j[(frente ? "cotovelo" : "joelho") + lado]!;
    const pata = j[(frente ? "pataF" : "pataT") + lado]!;
    a.rotation.set(cima, 0, s * (frente ? p.abreF : p.abreT));
    b.rotation.x = baixo;
    pata.rotation.x = -(p.inclina + cima + baixo) * p.nivela;
  };
  perna("E", true, st.fase);
  perna("D", true, st.fase + PI);
  perna("E", false, st.fase + PI);
  perna("D", false, st.fase);

  // ── Olhar ──
  const segue = cao.ponteiro.visto && !cao.movel;
  let yawAlvo = Math.sin(t * 0.45) * 0.3 * p.olha;
  let pitchAlvo = 0;
  if (segue) {
    const px = (cao.ponteiro.x - 0.5) * vw;
    const py = (0.5 - cao.ponteiro.y) * vh;
    const cabecaY = st.y + st.s * (p.y + 0.95);
    const fundo = vh * 0.5;
    yawAlvo = limita(Math.atan2(px - st.x, fundo) - st.giro, -1.15, 1.15) * p.olha;
    pitchAlvo = limita(-Math.atan2(py - cabecaY, fundo), -0.65, 0.7) * p.olha;
  }
  st.yaw = amortece(st.yaw, yawAlvo, 9, dt);
  st.pitch = amortece(st.pitch, pitchAlvo, 9, dt);
  // Inclina a cabeça quando o ponteiro está sobre algo clicável.
  st.tomba = amortece(st.tomba, cao.sobreClicavel && p.olha > 0.5 ? 0.42 * (st.yaw >= 0 ? -1 : 1) : 0, 8, dt);

  const varre = Math.sin(t * 2.3) * 0.3 * st.fareja;
  j.pescoco!.rotation.set(p.pesc + st.pitch * 0.35 + Math.sin(t * 7) * 0.03 * st.fareja, st.yaw * 0.4 + varre * 0.5, 0);
  j.cabeca!.rotation.set(p.cab + st.pitch * 0.65, st.yaw * 0.6 + varre * 0.5, p.cabZ + st.tomba);

  // ── Olhos ──
  st.proxPisca -= dt;
  if (st.proxPisca <= 0) {
    st.pisca = 0.13;
    st.proxPisca = 2 + Math.random() * 4;
  }
  st.pisca = Math.max(0, st.pisca - dt);
  const aberto = Math.max(0.07, st.pisca > 0 ? 0 : p.olho);
  const desvioX = limita((yawAlvo - st.yaw) * 0.6 + st.yaw * 0.25, -1, 1) * 0.026;
  const desvioY = limita(-st.pitch, -1, 1) * 0.03;
  for (const lado of ["E", "D"] as const) {
    j["olho" + lado]!.scale.y = aberto;
    j["pupila" + lado]!.position.set(desvioX, desvioY, 0.03);
  }

  // ── Orelhas: a esquerda fica em pé, a direita dobrada. É a cara dele. ──
  const o = p.orelha;
  const treme = Math.sin(t * 0.9) > 0.985 ? 0.25 : 0;
  const cima = Math.max(0, o);
  const baixo = Math.max(0, -o);
  j.orelhaE!.rotation.set(baixo * 0.3 + treme, 0, mistura(-0.3, -0.18, cima) - baixo * 1.6);
  j.orelhaD!.rotation.set(mistura(1.95, 0, cima) * (1 - baixo) + baixo * 0.3, 0, 0.2 + baixo * 1.7);

  // ── Boca ──
  const ofega = p.boca > 0.4 ? Math.sin(t * 9.5) * 0.045 : 0;
  j.mandibula!.rotation.x = p.boca * 0.34 + ofega;
  j.lingua!.rotation.x = p.boca * 0.85 + ofega * 2;
  j.lingua!.scale.set(1, 1, 0.25 + p.boca * 0.9);

  // ── Rabo ──
  const feliz = agora < cao.abanaAte;
  const acordado = dorme ? 0 : 1;
  const ampAlvo = feliz ? 0.95 : nome === "alerta" ? 0.04 : nome === "barrigaCima" ? 0.55 : 0.2 * acordado;
  st.wag = amortece(st.wag, ampAlvo, 7, dt);
  const f = feliz ? 19 : nome === "barrigaCima" ? 11 : 5.5;
  j.rabo1!.rotation.set(p.rabo, 0, Math.sin(t * f) * st.wag);
  j.rabo2!.rotation.set(p.curva, 0, Math.sin(t * f - 0.7) * st.wag * 0.8);
  j.rabo3!.rotation.set(p.curva, 0, Math.sin(t * f - 1.4) * st.wag * 0.8);
  // Abanar com força balança o quadril junto.
  if (feliz) j.corpo!.rotation.y = Math.sin(t * f) * 0.05;
  else j.corpo!.rotation.y = 0;
}

export default function Cao() {
  const mat = useMemo(() => {
    const m = (cor: string) =>
      new THREE.MeshLambertMaterial({ color: cor, flatShading: true });
    return {
      pelo: m("#C9782A"),
      claro: m("#E2A35A"),
      escuro: m("#A35E1D"),
      osso: m("#F0E9DC"),
      focinho: m("#18130F"),
      lingua: m("#FF4F8B"),
    };
  }, []);
  const ico = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);

  // Cada junta tem um nome; no primeiro quadro elas são recolhidas da cena por esse nome.
  const raiz = useRef<THREE.Group>(null);
  const juntas = useRef<Juntas | null>(null);
  const st = useRef<Movimento | null>(null);

  useFrame((estado, dt) => {
    if (!raiz.current) return;
    if (!juntas.current) {
      const mapa: Juntas = {};
      raiz.current.traverse((o) => {
        if (o.name) mapa[o.name] = o;
      });
      juntas.current = mapa;
    }
    st.current ??= novoMovimento();
    animar(juntas.current, st.current, estado, dt);
  });

  const perna = (lado: "E" | "D", frente: boolean) => {
    const x = (lado === "E" ? 1 : -1) * (frente ? 0.2 : 0.22);
    const a = frente ? "ombro" : "quadril";
    const b = frente ? "cotovelo" : "joelho";
    const pt = frente ? "pataF" : "pataT";
    return (
      <group name={a + lado} position={[x, frente ? -0.14 : -0.1, frente ? 1.05 : 0]}>
        <mesh material={mat.pelo} position-y={-0.21}>
          <cylinderGeometry args={frente ? [0.115, 0.085, 0.46, 6] : [0.17, 0.1, 0.46, 6]} />
        </mesh>
        <group name={b + lado} position-y={-0.42}>
          <mesh material={mat.pelo} position-y={-0.18}>
            <cylinderGeometry args={[0.085, 0.07, 0.4, 6]} />
          </mesh>
          <group name={pt + lado} position-y={-0.36}>
            <mesh material={mat.claro} geometry={ico} scale={[0.105, 0.065, 0.15]} position={[0, 0, 0.05]} />
          </group>
        </group>
      </group>
    );
  };

  const olho = (lado: "E" | "D") => (
    <group name={"olho" + lado} position={[(lado === "E" ? 1 : -1) * 0.135, 0.17, 0.27]}>
      <mesh material={mat.osso} geometry={ico} scale={0.066} />
      <mesh name={"pupila" + lado} material={mat.focinho} geometry={ico} scale={0.054} position-z={0.03} />
    </group>
  );

  return (
    <group ref={raiz} name="raiz">
      <group rotation-x={0.2}>
        <mesh name={"sombra"} rotation-x={-PI / 2} position-y={0.004}>
          <circleGeometry args={[1, 24]} />
          <meshBasicMaterial color="#18130F" transparent opacity={0.17} depthWrite={false} />
        </mesh>
        <group name={"giro"}>
          <group position-z={-0.5}>
            <group name={"corpo"}>
              {/* anca, tronco e peito */}
              <mesh material={mat.pelo} geometry={ico} scale={[0.36, 0.38, 0.4]} />
              <mesh material={mat.pelo} position={[0, 0.02, 0.52]} rotation-x={PI / 2}>
                <cylinderGeometry args={[0.37, 0.31, 1.05, 8]} />
              </mesh>
              <mesh name={"peito"} material={mat.pelo} geometry={ico} scale={[0.4, 0.42, 0.4]} position={[0, 0, 1.05]} />
              <mesh material={mat.claro} geometry={ico} scale={[0.2, 0.26, 0.2]} position={[0, -0.14, 1.24]} />

              {/* pescoço, coleira e cabeça */}
              <group name={"pescoco"} position={[0, 0.2, 1.15]}>
                <mesh material={mat.pelo} position-y={0.25}>
                  <cylinderGeometry args={[0.17, 0.23, 0.56, 7]} />
                </mesh>
                <mesh material={mat.lingua} position-y={0.17} rotation-x={PI / 2}>
                  <torusGeometry args={[0.205, 0.04, 5, 10]} />
                </mesh>
                <mesh material={mat.osso} position={[0, 0.08, 0.23]} rotation-x={PI / 2}>
                  <cylinderGeometry args={[0.06, 0.06, 0.025, 8]} />
                </mesh>
                <group name={"cabeca"} position-y={0.5} rotation-order="YXZ">
                  <mesh material={mat.pelo} geometry={ico} scale={[0.3, 0.27, 0.31]} position={[0, 0.1, 0.04]} />
                  <mesh material={mat.claro} position={[0, 0.035, 0.42]} rotation-x={PI / 2}>
                    <cylinderGeometry args={[0.115, 0.18, 0.38, 6]} />
                  </mesh>
                  <mesh material={mat.focinho} geometry={ico} scale={[0.075, 0.06, 0.06]} position={[0, 0.09, 0.61]} />
                  <group name={"mandibula"} position={[0, -0.07, 0.26]}>
                    <mesh material={mat.claro} position-z={0.15}>
                      <boxGeometry args={[0.19, 0.05, 0.3]} />
                    </mesh>
                    <group name={"lingua"} position={[0, 0.03, 0.26]}>
                      <mesh material={mat.lingua} position-z={0.09}>
                        <boxGeometry args={[0.1, 0.022, 0.2]} />
                      </mesh>
                    </group>
                  </group>
                  {olho("E")}
                  {olho("D")}
                  <group name={"orelhaE"} position={[0.19, 0.3, -0.02]}>
                    <mesh material={mat.escuro} position-y={0.15} scale={[1, 1, 0.42]}>
                      <coneGeometry args={[0.13, 0.34, 4]} />
                    </mesh>
                  </group>
                  <group name={"orelhaD"} position={[-0.19, 0.3, -0.02]}>
                    <mesh material={mat.escuro} position-y={0.15} scale={[1, 1, 0.42]}>
                      <coneGeometry args={[0.13, 0.34, 4]} />
                    </mesh>
                  </group>
                </group>
              </group>

              {perna("E", true)}
              {perna("D", true)}
              {perna("E", false)}
              {perna("D", false)}

              {/* rabo em três gomos, ponta clara */}
              <group name={"rabo1"} position={[0, 0.16, -0.3]}>
                <mesh material={mat.pelo} position-y={0.14}>
                  <cylinderGeometry args={[0.048, 0.075, 0.3, 5]} />
                </mesh>
                <group name={"rabo2"} position-y={0.28}>
                  <mesh material={mat.pelo} position-y={0.13}>
                    <cylinderGeometry args={[0.036, 0.048, 0.28, 5]} />
                  </mesh>
                  <group name={"rabo3"} position-y={0.26}>
                    <mesh material={mat.claro} position-y={0.12}>
                      <cylinderGeometry args={[0.014, 0.036, 0.26, 5]} />
                    </mesh>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
