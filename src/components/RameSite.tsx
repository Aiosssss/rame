"use client";
import { DialogProvider } from "./dialogs/DialogProvider";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Hero } from "./sections/Hero";
import { Ribbon } from "./sections/Ribbon";
import { Steps } from "./sections/Steps";
import { EventDiscovery } from "./events/EventDiscovery";
import { Faq } from "./sections/Faq";
import { Creator } from "./sections/Creator";
import { IconLibrary } from "./ui/IconLibrary";

export function RameSite() {
  return (
    <DialogProvider>
      <IconLibrary />
      <div className="page w-full" id="beranda">
        <Header />
        <main>
          <Hero />
          <Ribbon />
          <Steps />
          <EventDiscovery />
          <Faq />
          <Creator />
        </main>
        <Footer />
      </div>
    </DialogProvider>
  );
}
