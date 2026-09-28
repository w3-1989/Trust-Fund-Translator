import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router";
import { ArrowUp, Copy, Check } from "lucide-react";
import ornament from "./assets/ornament.svg";
import fleur from "./assets/fleur.svg";
import { translate } from "./lib/translate";

export default function DrawingRoom() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!text.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await translate(text);
      setResponse(result);
      setText("");
    } catch {
      setError("The butler has dropped the tray. Do try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!response) return;
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#5E1B22] text-[#F5EDE3] flex flex-col items-center justify-center">
      {/* Background */}
      <img
        src={ornament}
        alt=""
        className="pointer-events-none absolute inset-0 m-auto w-[90%] max-w-[1100px] max-h-[90vh] object-contain opacity-30 select-none"
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
          The Drawing Room
        </h1>
      </header>

      {/* Main */}
      <main className="relative z-10 w-full max-w-[710px] px-6 mt-24">
        <div className="flex flex-col">
          {/* Fleur-de-lis */}
          <img
            src={fleur}
            alt=""
            className="w-8 self-start select-none pointer-events-none ghost-float"
          />

          {/* Response area */}
          <div className="h-[300px] overflow-y-auto py-6 font-cormorant text-[18px] font-light leading-relaxed">
            {loading && (
              <p className="italic opacity-70">
                One moment, the butler is consulting the thesaurus…
              </p>
            )}
            {error && <p className="italic text-[#F2B8B8]">{error}</p>}
            {!loading && response && <p>{response}</p>}
          </div>

          {/* Input box */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-[#F2E0D6] p-4 text-[#3A1015] shadow-lg"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
              }}
              placeholder="Speak, commoner..."
              rows={3}
              className="w-full resize-none bg-transparent font-cormorant text-[12px] placeholder:text-[#3A1015]/80 focus:outline-none"
            />

            <div className="mt-2 flex items-center justify-between">
              {/* Copy response */}
              <button
                type="button"
                onClick={handleCopy}
                disabled={!response}
                className="flex h-10 w-10 items-center justify-center border border-[#3A1015]/20 hover:bg-[#3A1015]/5 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Copy translation"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>

              {/* Send */}
              <button
                type="submit"
                disabled={!text.trim() || loading}
                className="flex h-10 w-10 items-center justify-center bg-[#8E2A33] text-[#F5EDE3] hover:brightness-110 transition cursor-pointer disabled:opacity-50"
                aria-label="Translate"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </form>
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
