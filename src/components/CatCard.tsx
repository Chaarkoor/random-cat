import { useEffect, useState } from "react";
import { cats, getRandomCat, type Cat } from "../data/cats";

export default function CatCard() {
  const [cat, setCat] = useState<Cat>(cats[0]!);
  const [fading, setFading] = useState(false);

  const next = () => {
    setFading(true);
    setTimeout(() => {
      setCat((current) => getRandomCat(current.name));
      setFading(false);
    }, 180);
  };

  useEffect(() => {
    setCat(getRandomCat());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <article
        className={[
          "rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elev)]",
          "p-8 sm:p-10 transition-opacity duration-200",
          fading ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <header className="flex items-baseline justify-between gap-4 mb-6">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight">
            {cat.name}
          </h2>
          <span className="font-mono text-sm text-[var(--color-text-faint)]">
            #{(cats.findIndex((c) => c.name === cat.name) + 1)
              .toString()
              .padStart(2, "0")}
          </span>
        </header>

        <dl className="space-y-1.5 mb-6 font-mono text-[13px]">
          <div className="flex gap-3">
            <dt className="text-[var(--color-text-faint)] w-16 shrink-0">
              age
            </dt>
            <dd className="text-[var(--color-text-dim)]">{cat.age}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-[var(--color-text-faint)] w-16 shrink-0">
              lives
            </dt>
            <dd className="text-[var(--color-text-dim)]">{cat.location}</dd>
          </div>
        </dl>

        <p className="text-[15px] leading-relaxed text-[var(--color-text)] mb-4">
          {cat.bio}
        </p>

        <p className="text-[14px] leading-relaxed text-[var(--color-accent)] italic mb-7">
          {cat.quirk}
        </p>

        <div className="flex items-center gap-2">
          {cat.palette.map((color) => (
            <div key={color} className="flex flex-col items-center gap-1.5">
              <div
                className="h-8 w-8 rounded-md border border-[var(--color-line-2)]"
                style={{ background: color }}
              />
              <span className="font-mono text-[10px] text-[var(--color-text-faint)] uppercase">
                {color.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </article>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={next}
          className={[
            "group inline-flex items-center gap-2 px-4 py-2.5",
            "font-mono text-sm text-[var(--color-text-dim)]",
            "border border-[var(--color-line-2)] rounded-lg",
            "hover:text-[var(--color-text)] hover:border-[var(--color-accent)]",
            "transition-colors duration-150 cursor-pointer",
          ].join(" ")}
        >
          <span>next cat</span>
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--color-line-2)] text-[var(--color-text-faint)] group-hover:border-[var(--color-line-2)]">
            space
          </kbd>
        </button>

        <span className="font-mono text-[11px] text-[var(--color-text-faint)]">
          {cats.length} cats total
        </span>
      </div>
    </div>
  );
}
