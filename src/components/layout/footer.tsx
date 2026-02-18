const Footer = () => {
  const startYear: number = 2025;
  const currentYear: number = new Date().getFullYear();
  const label: string =
    currentYear > startYear
      ? `${startYear}-${currentYear}`
      : startYear.toString();

  return (
    <footer className="w-full h-14 bg-card border-t border-secondary flex items-center justify-center">
      <p className="text-xs text-zinc-600">
        © <time dateTime={label}>{label}</time> Universidade Brasileira Livre.
      </p>
    </footer>
  );
};

export default Footer;
