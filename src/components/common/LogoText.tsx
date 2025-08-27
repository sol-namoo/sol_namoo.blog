interface LogoTextProps {
  isDark: boolean;
}

export const LogoText = ({ isDark }: LogoTextProps) => (
  <span
    className={`text-xl font-bold ${
      isDark ? "text-green-400" : "text-green-700"
    }`}
    style={{
      fontFamily: '"Edu NSW ACT Cursive", cursive',
      textShadow: isDark
        ? "0 0 10px rgba(34, 197, 94, 0.3)"
        : "0 0 5px rgba(21, 128, 61, 0.2)",
    }}
  >
    Sol-namoo
  </span>
);
