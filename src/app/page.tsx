import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-surface selection:bg-primary selection:text-surface">
      <Navbar />
      <Sidebar />
      <Hero />
    </div>
  );
}
