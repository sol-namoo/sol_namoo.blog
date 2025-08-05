interface FooterProps {
  isDark: boolean;
  t: any;
}

export const Footer = ({ isDark, t }: FooterProps) => {
  return (
    <footer
      className={`border-t mt-16 ${
        isDark
          ? "border-gray-700 bg-slate-800/30"
          : "border-gray-200 bg-white/40"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-end">
        <p className="text-sm text-gray-500">{t.footer.rights}</p>
      </div>
    </footer>
  );
};
