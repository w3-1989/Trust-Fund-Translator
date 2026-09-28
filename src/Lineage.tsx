import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import ornament from "./assets/ornament.svg";
import fleur from "./assets/fleur.svg";

export default function Lineage() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-[#5E1B22] text-[#F5EDE3] flex flex-col items-center md:justify-center">
      {/* Background */}
      <img
        src={ornament}
        alt=""
        className="pointer-events-none absolute inset-0 m-auto w-[95%] max-h-[90vh] object-contain opacity-30 select-none md:w-[90%] md:max-w-[1100px]"
      />

      {/* Header */}
      <header className="relative z-10 flex flex-col items-center px-4 pt-10 md:absolute md:top-0 md:left-0 md:right-0 md:px-0 md:pt-20">
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.15em] font-cormorant md:gap-10 md:text-[11px]">
          <Link to="/lineage" className="hover:opacity-70">
            Our Lineage
          </Link>
          <Link to="/" className="hover:opacity-70">
            The Foyer
          </Link>
          <Link to="/drawing-room" className="hover:opacity-70">
            The Drawing Room
          </Link>
        </nav>

        <h1 className="font-cinzel mt-4 text-[32px] leading-tight uppercase tracking-wide text-center md:text-[48px] md:leading-normal">
          Our Lineage
        </h1>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-10 text-center md:flex-none md:py-0">
        <img
          src={fleur}
          alt=""
          className="w-9 mb-6 select-none pointer-events-none ghost-float md:w-10 md:mb-8"
        />

        <p className="font-cinzel text-[18px] uppercase tracking-[0.2em] md:text-[22px]">
          Private. Family Only.
        </p>

        <p className="mt-5 max-w-xl text-[16px] font-light font-cormorant leading-relaxed md:mt-6 md:text-[18px]">
          Our lineage stretches back eleven centuries, and at no point in that
          time has it included <em className="fancy">you</em>.{" "}
          <br className="hidden md:block" />
          The family records are not for public viewing, and the public are,
          regrettably, <em className="fancy">what you are</em>.
        </p>

        <p className="mt-5 text-[14px] font-light font-cormorant italic opacity-70 md:mt-6">
          In plainer terms, for the benefit of the servants: piss off, peasant.
        </p>

        <div className="mt-10 flex gap-5 font-cormorant md:mt-12">
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#8E2A33] px-6 py-2.5 text-sm text-[#F5EDE3] hover:brightness-110 transition"
          >
            <ArrowLeft size={14} /> Retreat to the Foyer
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 pb-6 text-center text-xs opacity-90 font-light font-cormorant md:absolute md:bottom-0 md:left-0 md:right-0 md:px-0">
        Not affiliated with any real aristocracy, who would never be seen on a
        website.
      </footer>
    </div>
  );
}