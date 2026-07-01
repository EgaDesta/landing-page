const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline/10 bg-surface/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-desktop py-gutter">
        <span className="font-display text-headline-md font-bold tracking-tighter text-primary">
          vinxxo
        </span>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "border-b-2 border-primary pb-1 font-bold text-primary"
                  : "text-on-surface-variant transition-colors hover:text-primary"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          className="material-symbols-outlined rounded-full p-2 text-primary transition-all hover:bg-secondary-container/10"
          aria-label="Email"
        >
          mail
        </button>
      </nav>
    </header>
  );
}
