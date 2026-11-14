// Dados de exemplo. Tudo aqui é fictício e fica marcado pela configuração "dadosDeExemplo",
// que faz o site mostrar um aviso até a clínica trocar pelos dados reais.
// Rodar de novo do zero: npx prisma migrate reset
import { PrismaClient, type CategoriaServico, type Perfil, type TipoSala } from "@prisma/client";
import { gerarHash } from "../src/lib/senha";
import { dataLocal, instante, somarDias, diaDaSemana } from "../src/lib/tempo";

const db = new PrismaClient();
const SENHA_EXEMPLO = "caramelo123";

async function main() {
  if (await db.clinica.count()) {
    console.log("O banco já tem dados; nada a fazer. Para recomeçar: npx prisma migrate reset");
    return;
  }

  // ───── Clínica, unidade, salas ─────
  const clinica = await db.clinica.create({
    data: {
      nome: "Caramelo",
      razaoSocial: "Caramelo Clínica Veterinária (nome provisório)",
      telefone: "1130000000",
      whatsappPlantao: "5511900000000",
      email: "contato@exemplo.vet",
      slogan: "Bicho em boas mãos.",
    },
  });
  const horarios = [
    ...[1, 2, 3, 4, 5].map((dia) => ({ dia, abre: "08:00", fecha: "20:00" })),
    { dia: 6, abre: "08:00", fecha: "18:00" },
  ];
  const unidade = await db.unidade.create({
    data: {
      clinicaId: clinica.id,
      nome: "Centro",
      slug: "centro",
      endereco: "Rua de Exemplo, 123",
      bairro: "Centro",
      cidade: "São Paulo",
      uf: "SP",
      cep: "01000-000",
      latitude: -23.5505,
      longitude: -46.6333,
      telefone: "1130000000",
      whatsapp: "5511900000000",
      horarios,
      plantao24h: true,
    },
  });
  const salasDef: [string, string, TipoSala][] = [
    ["Consultório 1", "C1", "CONSULTORIO"],
    ["Consultório 2", "C2", "CONSULTORIO"],
    ["Centro cirúrgico", "CIR", "CIRURGIA"],
    ["Imagem", "IMG", "IMAGEM"],
    ["Banho e tosa", "B1", "BANHO_TOSA"],
    ["Internação", "INT", "INTERNACAO"],
    ["Hotel", "HOT", "HOTEL"],
  ];
  const salas: Record<string, string> = {};
  for (const [nome, sigla, tipo] of salasDef) {
    salas[sigla] = (await db.sala.create({ data: { unidadeId: unidade.id, nome, sigla, tipo } })).id;
  }

  // ───── Equipe ─────
  const senhaHash = await gerarHash(SENHA_EXEMPLO);
  const equipeDef: {
    nome: string;
    email: string;
    perfis: Perfil[];
    crmv?: string;
    especialidades?: string[];
    bio?: string;
    slug?: string;
    cor?: string;
  }[] = [
    { nome: "Administração", email: "admin@exemplo.vet", perfis: ["ADMIN"] },
    {
      nome: "Dra. Helena Prado",
      email: "helena@exemplo.vet",
      perfis: ["VETERINARIO"],
      crmv: "CRMV-SP 00001 (exemplo)",
      especialidades: ["Clínica geral", "Dermatologia"],
      bio: "Atende cães e gatos há doze anos. Cuida dos casos de pele e alergia, que quase sempre pedem paciência e acompanhamento de perto.",
      slug: "helena-prado",
      cor: "#18130F",
    },
    {
      nome: "Dr. Caio Menezes",
      email: "caio@exemplo.vet",
      perfis: ["VETERINARIO"],
      crmv: "CRMV-SP 00002 (exemplo)",
      especialidades: ["Cirurgia", "Ortopedia", "Diagnóstico por imagem"],
      bio: "Responsável pelo centro cirúrgico e pelos exames de imagem. Explica cada procedimento com desenho, antes e depois.",
      slug: "caio-menezes",
      cor: "#C9782A",
    },
    {
      nome: "Dra. Lívia Tanaka",
      email: "livia@exemplo.vet",
      perfis: ["VETERINARIO"],
      crmv: "CRMV-SP 00003 (exemplo)",
      especialidades: ["Medicina felina", "Clínica médica"],
      bio: "Dedicada aos gatos. Conduz a consulta no tempo do animal, em sala separada dos cães.",
      slug: "livia-tanaka",
      cor: "#FF4F8B",
    },
    { nome: "Rosana Lima", email: "recepcao@exemplo.vet", perfis: ["RECEPCAO"] },
    { nome: "Otávio Reis", email: "financeiro@exemplo.vet", perfis: ["FINANCEIRO"] },
    { nome: "Jonas Farias", email: "estoque@exemplo.vet", perfis: ["ESTOQUE"] },
    { nome: "Tati Souza", email: "banho@exemplo.vet", perfis: ["BANHO_TOSA"] },
  ];
  const u: Record<string, string> = {};
  for (const e of equipeDef) {
    const criado = await db.usuario.create({
      data: {
        nome: e.nome,
        email: e.email,
        senhaHash,
        crmv: e.crmv,
        especialidades: e.especialidades ?? [],
        bio: e.bio,
        slug: e.slug,
        exibirNoSite: !!e.slug,
        corAgenda: e.cor,
        perfis: { create: e.perfis.map((perfil) => ({ perfil })) },
      },
    });
    u[e.email.split("@")[0]] = criado.id;
    await db.usuarioUnidade.create({ data: { usuarioId: criado.id, unidadeId: unidade.id } });
  }

  // ───── Serviços ─────
  type S = [string, string, CategoriaServico, number, number, TipoSala | null, boolean, string, string, string[]];
  const servicosDef: S[] = [
    ["Consulta clínica", "consulta-clinica", "CONSULTA", 30, 18000, "CONSULTORIO", true,
      "Avaliação completa, do focinho ao rabo.",
      "A consulta começa pela conversa: o que mudou, desde quando, o que ele come, onde dorme.\n\nDepois vem o exame físico completo, com peso, temperatura, ausculta, pele, boca, olhos e ouvidos. Você sai com o diagnóstico ou com o plano para chegar nele, por escrito, e a receita fica disponível no portal.\n\n## O que levar\n\n- Carteira de vacinação\n- Exames anteriores, se houver\n- Nome dos remédios em uso",
      ["helena", "caio", "livia"]],
    ["Retorno", "retorno", "CONSULTA", 20, 9000, "CONSULTORIO", true,
      "Reavaliação em até 30 dias da consulta.",
      "O retorno serve para conferir a resposta ao tratamento e ajustar a dose ou o caminho.\n\nVale por 30 dias a partir da consulta, com o mesmo veterinário.",
      ["helena", "caio", "livia"]],
    ["Vacinação", "vacinacao", "VACINA", 15, 12000, "CONSULTORIO", true,
      "Protocolo completo para cães e gatos, com lembrete do reforço.",
      "Toda vacina é aplicada depois de um exame rápido: animal doente não se vacina.\n\nO lote e a validade ficam registrados na carteira digital, e o lembrete do reforço chega antes da data.\n\n## Protocolos\n\n- Cães: V10, antirrábica e gripe canina\n- Gatos: V4 ou V5 e antirrábica",
      ["helena", "caio", "livia"]],
    ["Medicina felina", "medicina-felina", "CONSULTA", 40, 20000, "CONSULTORIO", true,
      "Consulta só para gatos, em sala separada dos cães.",
      "Gato estressado esconde sintoma. Por isso a consulta felina tem mais tempo, sala própria e manejo sem contenção forçada.\n\nA Dra. Lívia atende só gatos nesse horário.",
      ["livia"]],
    ["Dermatologia", "dermatologia", "CONSULTA", 40, 24000, "CONSULTORIO", true,
      "Coceira, queda de pelo, otite e alergias.",
      "Problema de pele raramente se resolve em uma consulta. Aqui o caso é acompanhado: raspado, citologia e cultura quando preciso, dieta de eliminação quando a suspeita é alimentar.",
      ["helena"]],
    ["Ultrassom", "ultrassom", "EXAME", 30, 28000, "IMAGEM", true,
      "Abdominal e gestacional, com laudo no mesmo dia.",
      "Exame sem dor e sem anestesia. O laudo com as imagens fica no portal do tutor assim que o veterinário libera.\n\n## Preparo\n\n- Jejum de 8 horas\n- Não deixar urinar na hora anterior ao exame",
      ["caio"]],
    ["Raio-X digital", "raio-x", "EXAME", 20, 22000, "IMAGEM", true,
      "Tórax, abdômen e ossos, com imagem imediata.",
      "A imagem sai na hora e o veterinário já avalia com você na sala.",
      ["caio"]],
    ["Castração", "castracao", "CIRURGIA", 90, 90000, "CIRURGIA", false,
      "Com exames pré-operatórios e anestesia inalatória.",
      "A cirurgia é marcada depois de uma consulta e dos exames de sangue.\n\nVocê assina o termo de consentimento, recebe as orientações de jejum e acompanha o pós-operatório pelo boletim.",
      ["caio"]],
    ["Limpeza de tártaro", "limpeza-de-tartaro", "CIRURGIA", 60, 65000, "CIRURGIA", false,
      "Profilaxia dentária sob anestesia, com ultrassom odontológico.",
      "Feita sob anestesia geral, depois de avaliação e exames. Inclui polimento e orientação de escovação.",
      ["caio"]],
    ["Banho", "banho", "ESTETICA", 60, 7000, "BANHO_TOSA", true,
      "Banho morno, secagem sem gaiola e corte de unhas.",
      "Produtos próprios para cada tipo de pelo. Secagem manual, sem gaiola de secagem. Corte de unhas e limpeza de ouvidos incluídos.",
      ["banho"]],
    ["Banho e tosa", "banho-e-tosa", "ESTETICA", 90, 12000, "BANHO_TOSA", true,
      "Tosa higiênica, na máquina ou na tesoura.",
      "A tosa é combinada na entrada, com foto de referência se você tiver. Tudo fica anotado na ficha de entrada.",
      ["banho"]],
    ["Hotel e creche", "hotel-e-creche", "HOSPEDAGEM", 30, 11000, "HOTEL", false,
      "Diária com passeio, alimentação no horário e boletim por foto.",
      "Para hospedar, a carteira de vacinação precisa estar em dia. A reserva é feita por telefone ou na recepção.",
      []],
  ];
  const s: Record<string, string> = {};
  let ordem = 0;
  for (const [nome, slug, categoria, duracaoMin, precoCentavos, tipoSala, agendavelOnline, descricao, descricaoLonga, quem] of servicosDef) {
    const criado = await db.servico.create({
      data: {
        nome, slug, categoria, duracaoMin, precoCentavos, tipoSala, agendavelOnline, descricao, descricaoLonga,
        ordem: ordem++,
        profissionais: { create: quem.map((q) => ({ usuarioId: u[q] })) },
      },
    });
    s[slug] = criado.id;
  }

  // ───── Horários de trabalho (minutos desde a meia-noite) ─────
  const turnos: [string, number[], number, number][] = [
    ["helena", [1, 2, 3, 4, 5], 8 * 60, 12 * 60],
    ["helena", [1, 2, 3, 4, 5], 13 * 60, 17 * 60],
    ["caio", [1, 2, 3, 4, 5], 10 * 60, 14 * 60],
    ["caio", [1, 2, 3, 4, 5], 15 * 60, 20 * 60],
    ["caio", [6], 8 * 60, 13 * 60],
    ["livia", [1, 3, 5], 9 * 60, 13 * 60],
    ["livia", [1, 3, 5], 14 * 60, 19 * 60],
    ["livia", [6], 9 * 60, 15 * 60],
    ["banho", [2, 3, 4, 5, 6], 9 * 60, 18 * 60],
  ];
  for (const [quem, dias, inicioMin, fimMin] of turnos) {
    for (const diaSemana of dias) {
      await db.horarioTrabalho.create({ data: { usuarioId: u[quem], unidadeId: unidade.id, diaSemana, inicioMin, fimMin } });
    }
  }

  // ───── Espécies, raças e protocolos vacinais ─────
  const cao = await db.especie.create({
    data: { nome: "Cão", racas: { create: ["SRD (vira-lata)", "Labrador", "Shih-tzu", "Golden retriever", "Bulldog francês", "Poodle", "Pinscher", "Yorkshire"].map((nome) => ({ nome })) } },
    include: { racas: true },
  });
  const gato = await db.especie.create({
    data: { nome: "Gato", racas: { create: ["SRD", "Siamês", "Persa", "Maine coon"].map((nome) => ({ nome })) } },
    include: { racas: true },
  });
  const raca = (lista: { id: string; nome: string }[], nome: string) => lista.find((r) => r.nome.startsWith(nome))!.id;

  const v10 = await db.protocoloVacinal.create({
    data: {
      nome: "V10 (polivalente)", especieId: cao.id,
      descricao: "Cinomose, parvovirose, hepatite, leptospirose e outras.",
      doses: { create: [
        { ordem: 1, nome: "1ª dose", idadeMinDias: 45, intervaloDias: 21 },
        { ordem: 2, nome: "2ª dose", idadeMinDias: 66, intervaloDias: 21 },
        { ordem: 3, nome: "3ª dose", idadeMinDias: 87, reforcoDias: 365 },
      ] },
    },
  });
  await db.protocoloVacinal.create({
    data: { nome: "Antirrábica", especieId: cao.id, descricao: "Obrigatória. Dose única e reforço anual.",
      doses: { create: [{ ordem: 1, nome: "Dose única", idadeMinDias: 120, reforcoDias: 365 }] } },
  });
  await db.protocoloVacinal.create({
    data: { nome: "Gripe canina", especieId: cao.id, descricao: "Indicada para quem frequenta creche, hotel e parques.",
      doses: { create: [
        { ordem: 1, nome: "1ª dose", idadeMinDias: 60, intervaloDias: 21 },
        { ordem: 2, nome: "2ª dose", idadeMinDias: 81, reforcoDias: 365 },
      ] } },
  });
  await db.protocoloVacinal.create({
    data: { nome: "V4 (quádrupla felina)", especieId: gato.id, descricao: "Rinotraqueíte, calicivirose, panleucopenia e clamidiose.",
      doses: { create: [
        { ordem: 1, nome: "1ª dose", idadeMinDias: 60, intervaloDias: 21 },
        { ordem: 2, nome: "2ª dose", idadeMinDias: 81, intervaloDias: 21 },
        { ordem: 3, nome: "3ª dose", idadeMinDias: 102, reforcoDias: 365 },
      ] } },
  });
  await db.protocoloVacinal.create({
    data: { nome: "Antirrábica felina", especieId: gato.id, descricao: "Dose única e reforço anual.",
      doses: { create: [{ ordem: 1, nome: "Dose única", idadeMinDias: 120, reforcoDias: 365 }] } },
  });
  await db.protocoloVacinal.create({
    data: { nome: "Vermífugo", especieId: cao.id, tipo: "VERMIFUGO", descricao: "Filhotes a cada 15 dias até 3 meses; adultos a cada 4 meses.",
      doses: { create: [{ ordem: 1, nome: "Dose", idadeMinDias: 15, reforcoDias: 120 }] } },
  });

  // ───── Tutores e pets ─────
  const hoje = dataLocal();
  const anosAtras = (anos: number, dias = 0) => new Date(`${somarDias(hoje, -Math.round(anos * 365) - dias)}T12:00:00Z`);
  const tutoresDef = [
    { nome: "Marina Duarte", tel: "11988880001", email: "marina@exemplo.com", pets: [{ nome: "Paçoca", especie: cao, raca: "SRD", sexo: "MACHO", anos: 4, peso: 14200, chip: "982000411275306" }] },
    { nome: "Rafael Prates", tel: "11988880002", email: "rafael@exemplo.com", pets: [{ nome: "Mingau", especie: gato, raca: "SRD", sexo: "MACHO", anos: 2, peso: 4100 }, { nome: "Farofa", especie: gato, raca: "Siamês", sexo: "FEMEA", anos: 6, peso: 3800 }] },
    { nome: "Júlia Sampaio", tel: "11988880003", email: "julia@exemplo.com", pets: [{ nome: "Thor", especie: cao, raca: "Labrador", sexo: "MACHO", anos: 7, peso: 31000, alergia: "Dipirona" }] },
    { nome: "Bruno Leal", tel: "11988880004", email: "bruno@exemplo.com", pets: [{ nome: "Amora", especie: cao, raca: "Shih-tzu", sexo: "FEMEA", anos: 3, peso: 6300 }] },
    { nome: "Carla Nóbrega", tel: "11988880005", email: "carla@exemplo.com", pets: [{ nome: "Fubá", especie: cao, raca: "SRD", sexo: "MACHO", anos: 0.3, peso: 4800 }] },
    { nome: "Diego Antunes", tel: "11988880006", email: "diego@exemplo.com", pets: [{ nome: "Jabuticaba", especie: cao, raca: "Bulldog", sexo: "FEMEA", anos: 5, peso: 11400 }] },
  ] as const;
  const pets: Record<string, { id: string; tutorId: string }> = {};
  for (const t of tutoresDef) {
    const tutor = await db.tutor.create({
      data: {
        nome: t.nome, telefone: t.tel, whatsapp: t.tel, email: t.email, cidade: "São Paulo", uf: "SP",
        consentimentos: undefined,
      },
    });
    await db.consentimento.create({ data: { tutorId: tutor.id, tipo: "TRATAMENTO_DADOS", concedido: true, versaoTexto: "2026-11", origem: "recepcao" } });
    for (const p of t.pets) {
      const pet = await db.pet.create({
        data: {
          tutorId: tutor.id, nome: p.nome, especieId: p.especie.id, racaId: raca(p.especie.racas, p.raca),
          sexo: p.sexo, castrado: p.anos > 1, nascimento: anosAtras(p.anos),
          microchip: "chip" in p ? p.chip : null,
          pesos: { create: [{ pesoGramas: p.peso, medidoEm: anosAtras(0, 20) }] },
          alergias: "alergia" in p ? { create: [{ substancia: p.alergia, gravidade: "GRAVE" }] } : undefined,
        },
      });
      pets[p.nome] = { id: pet.id, tutorId: tutor.id };
    }
  }

  // ───── Agenda: próximos dias úteis ─────
  const proximoDia = (aPartir: string, dias: number[]) => {
    let d = aPartir;
    while (!dias.includes(diaDaSemana(d))) d = somarDias(d, 1);
    return d;
  };
  const d1 = proximoDia(hoje, [1, 2, 3, 4, 5]);
  const d2 = proximoDia(somarDias(d1, 1), [1, 2, 3, 4, 5]);
  const d3 = proximoDia(somarDias(d1, 1), [1, 3, 5]);
  const agenda: [string, string, string, string, number, string, "AGENDADO" | "CONFIRMADO"][] = [
    ["Paçoca", "consulta-clinica", "helena", d1, 8 * 60 + 30, "C1", "CONFIRMADO"],
    ["Thor", "retorno", "helena", d1, 9 * 60 + 30, "C1", "AGENDADO"],
    ["Fubá", "vacinacao", "helena", d1, 10 * 60, "C1", "CONFIRMADO"],
    ["Jabuticaba", "ultrassom", "caio", d1, 10 * 60, "IMG", "AGENDADO"],
    ["Mingau", "medicina-felina", "livia", d3, 9 * 60, "C2", "CONFIRMADO"],
    ["Amora", "banho-e-tosa", "banho", proximoDia(d1, [2, 3, 4, 5, 6]), 9 * 60, "B1", "AGENDADO"],
    ["Farofa", "medicina-felina", "livia", d3, 10 * 60, "C2", "AGENDADO"],
    ["Paçoca", "dermatologia", "helena", d2, 14 * 60, "C1", "AGENDADO"],
  ];
  const duracaoDe = Object.fromEntries(servicosDef.map((x) => [x[1], x[3]]));
  for (const [pet, servico, prof, dia, min, sala, status] of agenda) {
    await db.agendamento.create({
      data: {
        unidadeId: unidade.id, petId: pets[pet].id, tutorId: pets[pet].tutorId, servicoId: s[servico],
        profissionalId: u[prof], salaId: salas[sala], inicio: instante(dia, min), fim: instante(dia, min + duracaoDe[servico]),
        status, origem: "RECEPCAO", criadoPorId: u.recepcao,
      },
    });
  }

  // ───── Carteira de vacinação do Paçoca ─────
  for (const [nome, anos] of [["V10 (polivalente)", 1.1], ["Antirrábica", 1.1]] as const) {
    const aplicadoEm = anosAtras(anos);
    await db.aplicacao.create({
      data: {
        petId: pets["Paçoca"].id, protocoloId: nome.startsWith("V10") ? v10.id : undefined, nome, dose: "Reforço anual",
        loteCodigo: "0417B", validade: anosAtras(-1), fabricante: "Exemplo Vet", aplicadoEm, aplicadoPorId: u.helena,
        proximaDoseEm: new Date(aplicadoEm.getTime() + 365 * 86400000),
      },
    });
  }

  // ───── Conteúdo do site ─────
  const depoimentos = [
    ["Marina D.", "Paçoca", "O Paçoca entra abanando o rabo. Para quem tinha pavor de veterinário, isso diz tudo."],
    ["Rafael P.", "Mingau e Farofa", "Consulta de gato em sala só de gato faz diferença. A Farofa nem rosnou."],
    ["Júlia S.", "Thor", "Recebi o boletim da internação todo dia, com foto. Dormi tranquila pela primeira vez na semana."],
    ["Bruno L.", "Amora", "Agendei o banho pelo site às onze da noite. Chegou lembrete e ela voltou cheirosa."],
  ];
  await db.depoimento.createMany({ data: depoimentos.map(([autor, pet, texto], ordem) => ({ autor, pet, texto, aprovado: true, ordem })) });

  const diasAtras = (n: number) => new Date(Date.now() - n * 86400000);
  await db.post.createMany({
    data: [
      {
        slug: "calendario-de-vacinas-do-filhote",
        titulo: "Calendário de vacinas do filhote: o que tomar e quando",
        resumo: "As doses do primeiro ano, os intervalos entre elas e por que não dá para pular o reforço.",
        tags: ["vacinas", "filhotes"],
        autorId: u.helena,
        publicadoEm: diasAtras(6),
        corpo: "O filhote nasce protegido pelos anticorpos da mãe, mas essa proteção cai nas primeiras semanas. A vacina entra justamente nesse intervalo, em doses repetidas, até o organismo dele responder sozinho.\n\n## Cães\n\n- **A partir de 45 dias:** primeira dose da polivalente (V10)\n- **21 dias depois:** segunda dose\n- **Mais 21 dias:** terceira dose\n- **A partir de 4 meses:** antirrábica\n- **Todo ano:** reforço das duas\n\n## Gatos\n\n- **A partir de 60 dias:** primeira dose da quádrupla (V4)\n- **21 dias depois:** segunda dose\n- **Mais 21 dias:** terceira dose\n- **A partir de 4 meses:** antirrábica\n\n## Antes da última dose\n\nAté completar o esquema, o filhote não deve passear na rua nem ter contato com animais de vacinação desconhecida. Parvovirose e cinomose continuam circulando e são graves.\n\n## E se atrasar?\n\nAtraso de poucos dias não invalida o esquema. Passou de duas semanas, o veterinário avalia se é preciso repetir uma dose. O lembrete do reforço chega pelo WhatsApp antes da data.",
      },
      {
        slug: "sinais-de-emergencia",
        titulo: "Sete sinais de que é emergência",
        resumo: "Quando não dá para esperar a consulta de amanhã e o que fazer no caminho até o plantão.",
        tags: ["emergência", "plantão"],
        autorId: u.caio,
        publicadoEm: diasAtras(19),
        corpo: "Na dúvida, ligue para o plantão. Mas alguns sinais não deixam dúvida: é para vir agora.\n\n## Venha imediatamente\n\n- **Dificuldade para respirar:** boca aberta, língua arroxeada, barriga puxando\n- **Barriga inchada e dura**, com tentativa de vomitar sem sair nada\n- **Convulsão** que dura mais de dois minutos ou se repete\n- **Não consegue urinar**, principalmente gato macho\n- **Sangramento** que não para com cinco minutos de pressão\n- **Suspeita de veneno**, chocolate, uva, remédio humano ou planta\n- **Atropelamento ou queda**, mesmo que ele pareça bem\n\n## No caminho\n\nMantenha o animal aquecido e o mais parado possível. Não dê remédio, leite nem provoque vômito. Se houve ingestão de algo, traga a embalagem.\n\nAvise pelo WhatsApp que está a caminho: a equipe prepara a sala antes de você chegar.",
      },
      {
        slug: "gato-e-a-caixa-de-transporte",
        titulo: "Como fazer as pazes entre o gato e a caixa de transporte",
        resumo: "A caixa não precisa ser sinônimo de veterinário. Um passo a passo de duas semanas.",
        tags: ["gatos", "comportamento"],
        autorId: u.livia,
        publicadoEm: diasAtras(33),
        corpo: "Se a caixa só aparece no dia da consulta, o gato aprende rápido o que ela significa. O caminho é torná-la parte da mobília.\n\n## Semana 1\n\n- Deixe a caixa aberta em um canto que ele já frequenta\n- Forre com uma manta que tenha o cheiro dele\n- Coloque petiscos dentro, sem fechar a porta\n\n## Semana 2\n\n- Sirva uma refeição por dia dentro da caixa\n- Feche a porta por alguns segundos e abra antes de ele reclamar\n- Levante a caixa, dê uma volta pela casa e solte\n\n## No dia\n\nCubra a caixa com um pano no trajeto e apoie no banco, presa pelo cinto. Na clínica, peça a sala dos gatos: sem cheiro e sem latido de cachorro, metade do estresse some.",
      },
    ],
  });

  // Planta da clínica em uma grade de 100 × 60.
  const ambientes: [string, string, string, number, number, number, number][] = [
    ["Recepção", "REC", "Entrada com espera separada para cães e gatos.", 0, 34, 34, 26],
    ["Consultório 1", "C1", "Clínica geral e dermatologia.", 34, 34, 22, 26],
    ["Consultório 2", "C2", "Sala dos gatos, longe do latido.", 56, 34, 22, 26],
    ["Imagem", "IMG", "Raio-X digital e ultrassom.", 78, 34, 22, 26],
    ["Centro cirúrgico", "CIR", "Anestesia inalatória e monitoração completa.", 56, 0, 44, 34],
    ["Internação", "INT", "Baias com acompanhamento e boletim diário.", 28, 0, 28, 34],
    ["Banho e tosa", "B1", "Secagem manual, sem gaiola.", 0, 0, 28, 17],
    ["Hotel e creche", "HOT", "Diária com passeio e boletim por foto.", 0, 17, 28, 17],
  ];
  await db.ambiente.createMany({
    data: ambientes.map(([nome, sigla, descricao, x, y, largura, altura], ordem) => ({ unidadeId: unidade.id, nome, sigla, descricao, x, y, largura, altura, ordem })),
  });

  // ───── Comunicação e financeiro: bases ─────
  const modelos = [
    ["agendamento_confirmado", "Agendamento recebido", "Oi, {tutor}! Recebemos o agendamento de {pet}: {servico} em {data} às {hora}. Para remarcar, responda esta mensagem."],
    ["lembrete_consulta", "Lembrete de consulta", "Oi, {tutor}! Lembrete: {pet} tem {servico} amanhã, {data} às {hora}. Confirma a presença? {link}"],
    ["lembrete_vacina", "Reforço de vacina", "Oi, {tutor}! O reforço da {vacina} de {pet} vence em {data}. Quer agendar? {link}"],
    ["aniversario", "Aniversário do pet", "Hoje é dia de {pet}! Parabéns de toda a equipe."],
  ];
  for (const [chave, nome, corpo] of modelos) {
    await db.modeloMensagem.create({ data: { chave, nome, corpo, canal: "WHATSAPP" } });
  }
  await db.categoriaFinanceira.createMany({
    data: [
      { nome: "Serviços", tipo: "RECEITA", grupoDre: "RECEITA_SERVICOS" },
      { nome: "Produtos", tipo: "RECEITA", grupoDre: "RECEITA_PRODUTOS" },
      { nome: "Planos", tipo: "RECEITA", grupoDre: "RECEITA_PLANOS" },
      { nome: "Compra de mercadorias", tipo: "DESPESA", grupoDre: "CUSTO_MERCADORIA" },
      { nome: "Folha de pagamento", tipo: "DESPESA", grupoDre: "DESPESA_PESSOAL" },
      { nome: "Aluguel e contas", tipo: "DESPESA", grupoDre: "DESPESA_OPERACIONAL" },
      { nome: "Impostos", tipo: "DESPESA", grupoDre: "IMPOSTOS" },
    ],
  });
  await db.configuracao.create({ data: { chave: "dadosDeExemplo", valor: true } });

  console.log(`Dados de exemplo criados. Equipe: <perfil>@exemplo.vet, senha "${SENHA_EXEMPLO}".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
