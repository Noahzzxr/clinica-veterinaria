/** O cachorro em desenho fixo. Aparece antes do 3D carregar, sem WebGL e com "movimento reduzido". */
export default function CaoEstatico({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 310" className={className} role="img" aria-label="Cachorro caramelo sentado">
      <polygon points="250,292 288,246 297,258 263,302" fill="#A35E1D" />
      <polygon points="150,302 252,302 263,232 222,170 160,200" fill="#A35E1D" />
      <polygon points="160,200 222,170 202,94 130,90 110,150 130,232" fill="#C9782A" />
      <polygon points="110,150 130,90 152,160 132,232" fill="#E2A35A" />
      <polygon points="116,226 148,226 146,302 104,302 114,288" fill="#C9782A" />
      <polygon points="150,232 176,226 180,302 144,302" fill="#A35E1D" />
      <polygon points="130,90 202,94 187,54 135,50" fill="#A35E1D" />
      <polygon points="128,84 200,90 196,76 131,70" fill="#FF4F8B" />
      <polygon points="100,20 175,14 196,60 136,86 95,66" fill="#C9782A" />
      <polygon points="100,20 136,22 128,50 97,46" fill="#E2A35A" />
      <polygon points="97,34 56,48 52,68 100,76" fill="#E2A35A" />
      <polygon points="52,48 63,44 65,58 52,62" fill="#18130F" />
      <polygon points="70,71 90,74 85,94 72,89" fill="#FF4F8B" />
      <polygon points="163,13 201,3 214,56 186,52" fill="#A35E1D" />
      <circle cx="121" cy="43" r="5.5" fill="#18130F" />
    </svg>
  );
}
