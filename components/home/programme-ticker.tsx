import { programmes } from "@/lib/programmes";

export function ProgrammeTicker() {
  const items = programmes.map((p) => p.title);
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-ink py-3">
      <div className="animate-marquee flex w-max gap-10 motion-reduce:animate-none">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-heading text-sm tracking-[0.15em] text-paper/70 uppercase"
          >
            {item}
            <span aria-hidden="true" className="text-rust">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
