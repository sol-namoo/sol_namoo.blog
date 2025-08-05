interface GreenBorderStrokeProps {
  isDark: boolean;
}

export const GreenBorderStroke = ({ isDark }: GreenBorderStrokeProps) => (
  <svg viewBox="0 0 1200 20" className="absolute bottom-0 left-0 w-full h-5">
    {/* 메인 손그림 스트로크 */}
    <path
      d="M0,10 Q50,8 100,12 Q150,16 200,11 Q250,6 300,13 Q350,18 400,10 Q450,4 500,15 Q550,20 600,8 Q650,3 700,14 Q750,19 800,9 Q850,5 900,16 Q950,21 1000,11 Q1050,6 1100,17 Q1150,14 1200,12"
      fill="none"
      stroke={isDark ? "#22c55e" : "#16a34a"}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
      style={{
        filter: "drop-shadow(0 2px 4px rgba(34, 197, 94, 0.2))",
      }}
    />
    {/* 보조 스트로크 */}
    <path
      d="M20,12 Q70,9 120,14 Q170,18 220,10 Q270,5 320,16 Q370,20 420,8 Q470,3 520,17 Q570,22 620,6 Q670,2 720,16 Q770,21 820,7 Q870,4 920,18 Q970,23 1020,9 Q1070,5 1120,19 Q1170,16 1200,14"
      fill="none"
      stroke={isDark ? "#16a34a" : "#15803d"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
    {/* 추가 디테일 */}
    <path
      d="M10,8 Q60,11 110,7 Q160,14 210,13 Q260,8 310,15 Q360,17 410,12 Q460,6 510,14 Q560,18 610,10 Q660,5 710,12 Q760,17 810,11 Q860,7 910,14 Q960,19 1010,13 Q1060,8 1110,15 Q1160,12 1200,10"
      fill="none"
      stroke={isDark ? "#22c55e" : "#16a34a"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.4"
    />
  </svg>
);
