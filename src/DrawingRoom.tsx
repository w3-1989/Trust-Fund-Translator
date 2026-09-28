import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Link } from "react-router";
import { ArrowUp, Copy, Check } from "lucide-react";
import ornament from "./assets/ornament.svg";
import fleur from "./assets/fleur.svg";
import { translate } from "./lib/translate";

const TYPE_SPEED = 25; // ms per character: lower is faster

export default function DrawingRoom() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  // Derived, not stored
  const displayed = response.slice(0, count);
  const isTyping = count < response.length;

  // Typewriter: adds one character each tick until done
  useEffect(() => {
    if (count >= response.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), TYPE_SPEED);
    return () => clearTimeout(id);
  }, [count, response]);

  // Keep the newest text in view while typing
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [count]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const message = text.trim();
    if (!message || loading || isTyping) return;

    // Clear the box straight away
    setText("");
    setLoading(true);
    setError("");
    setResponse("");
    setCount(0);

    try {
      const result = await translate(message);
      setResponse(result);
    } catch (err) {
      console.error(err);
      setText(message); // give their text back so they can try again
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
          The Drawing Room
        </h1>
      </header>

      {/* Main */}
      <main className="relative z-10 flex w-full max-w-[710px] flex-1 flex-col justify-center px-4 py-6 md:mt-24 md:flex-none md:px-6 md:py-0">
        <div className="flex flex-col">
          {/* Response area: fleur above text on mobile, beside it on desktop */}
          <div
            ref={scrollRef}
            className="h-[240px] overflow-y-auto py-6 md:h-[300px]"
          >
            <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-4">
              <img
                src={fleur}
                alt=""
                className="w-7 shrink-0 select-none pointer-events-none ghost-float md:w-8"
              />

              <div className="w-full flex-1 font-cormorant text-[15px] font-light leading-relaxed md:pt-1 md:text-[12px]">
                {loading && (
                  <p className="italic opacity-70">
                    One moment, the butler is consulting the thesaurus…
                  </p>
                )}

                {error && <p className="italic text-[#F2B8B8]">{error}</p>}

                {!loading && displayed && (
                  <p className="whitespace-pre-wrap">
                    {displayed}
                    {isTyping && (
                      <span className="ml-0.5 inline-block animate-pulse">|</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Input box */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-[#F2E0D6] p-3 text-[#3A1015] shadow-lg md:p-4"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
              }}
              placeholder="Speak, commoner..."
              rows={3}
              className="w-full resize-none bg-transparent font-cormorant text-[16px] placeholder:text-[#3A1015]/80 focus:outline-none md:text-[12px]"
            />

            <div className="mt-2 flex items-center justify-between">
              {/* Copy response */}
              <button
                type="button"
                onClick={handleCopy}
                disabled={!response || isTyping}
                className="flex h-10 w-10 items-center justify-center border border-[#3A1015]/20 hover:bg-[#3A1015]/5 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Copy translation"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>

              {/* Send */}
              <button
                type="submit"
                disabled={!text.trim() || loading || isTyping}
                className="flex h-10 w-10 items-center justify-center bg-[#8E2A33] text-[#F5EDE3] hover:brightness-110 transition cursor-pointer disabled:cursor-not-allowed [&:disabled:not([aria-busy=true])]:opacity-50"
                aria-label={loading ? "Translating" : "Translate"}
                aria-busy={loading}
              >
                {loading ? (
                  <span className="dot-wave flex items-center gap-[3px]">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  <ArrowUp size={18} />
                )}
              </button>
            </div>
          </form>
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