import { About } from "@/components/about";
import { Experiences } from "@/components/experiences";
import { Header } from "@/components/header";
import { SocialLinks } from "@/components/social-links";
import { Works } from "@/components/works";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white pb-32 dark:bg-background">
      <Header />
      <SocialLinks />
      <Works />
      <About />
      <Experiences />
    </main>
  );
}
