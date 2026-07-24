import { useEffect } from "react";
import { useTimeStore } from "./context/TimeStore";

type TimeUnit = {
  value: number;
  label: string;
};

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function Heart({
  className,
  delay = "0s",
}: {
  className?: string;
  delay?: string;
}) {
  return (
    <svg
      className={className}
      style={{ animationDelay: delay }}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function DistanceLine() {
  return (
    <div className="flex w-full max-w-md items-center gap-3 px-2" aria-hidden="true">
      <span className="h-2 w-2 rounded-full bg-rose/80" />
      <div className="relative h-px flex-1 overflow-hidden bg-ink/15">
        <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-rose to-transparent animate-drift-slow opacity-80" />
      </div>
      <Heart className="h-4 w-4 text-rose animate-soft-pulse" />
      <div className="relative h-px flex-1 overflow-hidden bg-ink/15">
        <span
          className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent via-dusk to-transparent animate-drift opacity-70"
          style={{ animationDelay: "1.5s" }}
        />
      </div>
      <span className="h-2 w-2 rounded-full bg-dusk/80" />
    </div>
  );
}

function App() {
  const timeLeft = useTimeStore((state) => state.timeLeft);
  const setTimeLeft = useTimeStore((state) => state.setTimeLeft);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const year = new Date().getFullYear();

  useEffect(() => {
    const reuniteAt = new Date(`Jul 31 ${year}, 15:23:00`).getTime();

    const tick = () => {
      setTimeLeft(reuniteAt - Date.now());
    };

    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [setTimeLeft, year]);

  const units: TimeUnit[] = [
    { value: days, label: "días" },
    { value: hours, label: "horas" },
    { value: minutes, label: "minutos" },
    { value: seconds, label: "segundos" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden sky-gradient grain">
      <Heart
        className="pointer-events-none absolute left-[8%] top-[18%] h-8 w-8 text-rose/30 animate-drift"
        delay="0s"
      />
      <Heart
        className="pointer-events-none absolute right-[12%] top-[28%] h-12 w-12 text-petal/30 animate-drift-slow"
        delay="1.2s"
      />
      <Heart
        className="pointer-events-none absolute bottom-[16%] left-[18%] h-6 w-6 text-dusk/30 animate-drift"
        delay="2.4s"
      />
      <Heart
        className="pointer-events-none absolute bottom-[22%] right-[10%] h-10 w-10 text-sky/35 animate-soft-pulse"
        delay="0.8s"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 px-5 py-16 text-center md:gap-10">
        <header className="animate-fade-up flex flex-col items-center gap-3">
          <p className="font-display text-5xl font-semibold tracking-tight text-ink md:text-7xl">
            Hasta vernos
          </p>
          <p className="max-w-md text-sm font-light leading-relaxed text-ink-soft md:text-base">
            Cada segundo acerca un poco más el abrazo que espera al otro lado
            de la distancia.
          </p>
        </header>

        <div className="animate-fade-up w-full" style={{ animationDelay: "0.15s" }}>
          <DistanceLine />
        </div>

        {timeLeft > 0 ? (
          <section
            className="animate-fade-up flex w-full flex-col items-center gap-8"
            style={{ animationDelay: "0.28s" }}
            aria-live="polite"
            aria-label="Tiempo restante hasta vernos"
          >
            <p className="font-display text-xl italic text-ink-soft md:text-2xl">
              Quedan
            </p>

            <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-4">
              {units.map((unit) => (
                <div key={unit.label} className="flex flex-col items-center gap-1">
                  <span className="font-display text-5xl font-semibold tabular-nums tracking-tight text-ink md:text-6xl">
                    {unit.label === "días" ? unit.value : pad(unit.value)}
                  </span>
                  <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-soft/80">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-display text-lg text-ink-soft/90 md:text-xl">
              Hasta el{" "}
              <span className="italic text-rose">31 de julio</span>
            </p>
          </section>
        ) : (
          <section
            className="animate-fade-up flex flex-col items-center gap-4"
            style={{ animationDelay: "0.28s" }}
          >
            <Heart className="h-10 w-10 text-rose animate-soft-pulse" />
            <p className="font-display text-4xl font-semibold text-ink md:text-5xl">
              ¡Ya es el momento!
            </p>
            <p className="max-w-sm text-sm font-light text-ink-soft md:text-base">
              La distancia se acabó. Que este reencuentro llene todo lo que
              esperamos.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
