interface SolNamooTextProps {
  isDark: boolean;
}

export const SolNamooText = ({ isDark }: SolNamooTextProps) => (
  <span
    className={`text-2xl font-bold ${
      isDark ? "text-green-400" : "text-green-700"
    }`}
    style={{
      fontFamily: '"Dancing Script", cursive',
      textShadow: isDark
        ? "0 0 10px rgba(34, 197, 94, 0.3)"
        : "0 0 5px rgba(21, 128, 61, 0.2)",
    }}
  >
    Sol-namoo
  </span>
);
