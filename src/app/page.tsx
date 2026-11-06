import Dining from "@/components/sections/Dining";
import Experiences from "@/components/sections/Experiences";
import GalleryBlock from "@/components/sections/GalleryBlock";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Marquee from "@/components/sections/Marquee";
import Reserve from "@/components/sections/Reserve";
import RoomsBento from "@/components/sections/RoomsBento";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <RoomsBento />
      <Marquee />
      <Experiences />
      <Dining />
      <GalleryBlock />
      <Reserve idPrefix="home" />
    </>
  );
}
