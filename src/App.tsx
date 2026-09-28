import { Key } from "lucide-react";
import ornament from "./assets/ornament.svg";
import { Link } from "react-router";

export default function App() {
  return (
    <div className=" overflow-hidden relative min-h-screen w-full bg-[#5E1B22] text-[#F5EDE3] flex flex-col items-center justify-center">
      <img
        src={ornament}
        alt=""
        className="pointer-events-none absolute inset-0 m-auto w-[90%] max-w-[1100px] opacity-30 select-none"
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center pt-20">
        <nav className="flex gap-10 text-[11px] uppercase tracking-[0.15em] font-cormorant">
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

        <h1 className="font-cinzel mt-4 text-[48px] uppercase tracking-wide text-center">
          Trust Fund Translator
        </h1>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="max-w-2xl text-[18px] font-light font-cormorant">
          Good day, dear visitor. We could not help but notice that you speak
          <br />
          like a <em className="fancy">commoner</em>. How dreadful for you.
          <br />
          Do step into the <em className="fancy">Drawing Room</em>, where our{" "}
          <em className="fancy">finely bred algorithm</em> shall <br /> dress
          your drivel in a waistcoat.
        </p>

        <div className="mt-12 flex gap-5 font-cormorant">
          <Link
            to="/drawing-room"
            className="flex items-center gap-2 bg-white px-6 py-2.5 text-sm text-[#5E1B22] hover:bg-[#F5EDE3] transition"
          >
            Enter the Drawing Room <Key size={14} />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 pb-6 text-center text-xs opacity-90 font-light font-cormorant">
        Not affiliated with any real aristocracy, who would never be seen on a
        website.
      </footer>
    </div>
  );
}
