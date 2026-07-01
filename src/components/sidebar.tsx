const socialLinks = [
  { icon: "photo_camera", label: "Instagram", href: "#" },
  { icon: "work", label: "LinkedIn", href: "#" },
  { icon: "palette", label: "Dribbble", href: "#" },
  { icon: "code", label: "GitHub", href: "#" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-full w-20 flex-col items-center border-r border-outline/10 bg-surface py-margin-desktop md:flex">
      <div className="mt-20 flex flex-col gap-10">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="group relative flex items-center justify-center"
            aria-label={link.label}
          >
            <span className="material-symbols-outlined text-on-surface-variant transition-transform duration-200 hover:scale-110 hover:text-primary">
              {link.icon}
            </span>
            <span className="absolute left-full ml-4 whitespace-nowrap rounded bg-primary px-2 py-1 font-mono text-xs text-surface opacity-0 transition-opacity group-hover:opacity-100">
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}
