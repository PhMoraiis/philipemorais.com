import { Header } from "@/components/header";
import { SocialLinks } from "@/components/social-links";
import { Works } from "@/components/works";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white dark:bg-black">
      <Header />
      <SocialLinks />
      <Works />
    </main>
  );
}
