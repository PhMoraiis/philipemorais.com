import { Writing } from "@/components/ writing";
import { About } from "@/components/about";
import { Experiences } from "@/components/experiences";
import { Header } from "@/components/header";
import { SocialLinks } from "@/components/social-links";
import { Stack } from "@/components/stack";
import { Works } from "@/components/works";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden pb-32">
      <Header revealDelay={0.22} revealDuration={1.0} />
      <SocialLinks revealDelay={0.55} revealDuration={1.0} />
      <Works
        titleRevealDelay={0}
        cardsRevealDelay={1.05}
        revealDuration={1.0}
      />
      <About />
      <Stack />
      <Experiences />
      <Writing />
    </main>
  );
}
