import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-1 px-0">
        <Navbar />

        <div className="flex-1 flex flex-col">
          <Hero />
          <Features />
        </div>

        <Footer />
      </div>
    </main>
  );
}
