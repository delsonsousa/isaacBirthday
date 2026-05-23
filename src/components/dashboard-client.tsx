"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Download, Filter, MessageCircle, UsersRound } from "lucide-react";
import { csvEscape, formatDateTime, formatPhone } from "@/lib/rsvp-utils";
import type { Rsvp } from "@/lib/supabase/database.types";

type FilterValue = "all" | "confirmed" | "absent";

type DashboardClientProps = {
  initialRsvps: Rsvp[];
  setupError?: string;
};

export function DashboardClient({
  initialRsvps,
  setupError,
}: DashboardClientProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visibleRsvps = useMemo(() => {
    if (filter === "confirmed") {
      return initialRsvps.filter((rsvp) => rsvp.will_attend);
    }

    if (filter === "absent") {
      return initialRsvps.filter((rsvp) => !rsvp.will_attend);
    }

    return initialRsvps;
  }, [filter, initialRsvps]);

  const totals = useMemo(
    () => ({
      responses: initialRsvps.length,
      confirmed: initialRsvps.filter((rsvp) => rsvp.will_attend).length,
      absent: initialRsvps.filter((rsvp) => !rsvp.will_attend).length,
      adults: initialRsvps.reduce((sum, rsvp) => sum + rsvp.adults, 0),
      children: initialRsvps.reduce((sum, rsvp) => sum + rsvp.children, 0),
    }),
    [initialRsvps],
  );

  function exportCsv() {
    const header = [
      "Nome",
      "WhatsApp",
      "Status",
      "Adultos",
      "Crianças",
      "Data da resposta",
    ];
    const rows = visibleRsvps.map((rsvp) => [
      rsvp.name,
      formatPhone(rsvp.phone),
      rsvp.will_attend ? "Confirmado" : "Ausente",
      rsvp.adults,
      rsvp.children,
      formatDateTime(rsvp.created_at),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => csvEscape(cell)).join(","))
      .join("\n");

    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "confirmacoes-isaac.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-[#f7efe2] px-4 py-6 text-[#49372a] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a07d31]">
              Dashboard
            </p>
            <h1 className="text-3xl font-black tracking-normal sm:text-4xl">
              Confirmações do Isaac
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#6f5948]">
              Visão simples das respostas recebidas para o aniversário de 1 ano.
            </p>
          </div>

          <button
            type="button"
            onClick={exportCsv}
            disabled={!visibleRsvps.length}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6f472e] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#5d3d29] focus:outline-none focus:ring-4 focus:ring-[#d8b45f]/35 disabled:cursor-not-allowed disabled:bg-[#bda999]"
          >
            <Download size={18} />
            Exportar CSV
          </button>
        </div>

        {setupError ? (
          <div className="mb-6 rounded-2xl border border-[#eab7a9] bg-white px-4 py-3 text-sm font-bold leading-6 text-[#8b4338]">
            {setupError}
          </div>
        ) : null}

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Metric label="Total de respostas" value={totals.responses} />
          <Metric label="Confirmados" value={totals.confirmed} />
          <Metric label="Adultos" value={totals.adults} />
          <Metric label="Crianças" value={totals.children} />
          <Metric label="Ausentes" value={totals.absent} />
        </section>

        <section className="mt-6 rounded-[24px] border border-white bg-white/85 p-4 shadow-sm backdrop-blur sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-[#6f5948]">
              <Filter size={17} />
              Lista de confirmações
            </div>
            <div className="grid grid-cols-3 gap-1 rounded-full bg-[#f1eadf] p-1 text-xs font-black sm:w-auto">
              <FilterButton
                active={filter === "all"}
                onClick={() => setFilter("all")}
              >
                Todos
              </FilterButton>
              <FilterButton
                active={filter === "confirmed"}
                onClick={() => setFilter("confirmed")}
              >
                Confirmados
              </FilterButton>
              <FilterButton
                active={filter === "absent"}
                onClick={() => setFilter("absent")}
              >
                Ausentes
              </FilterButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#eadcc6]">
            <div className="hidden bg-[#f7efe2] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#6f5948] md:grid md:grid-cols-[1.4fr_1fr_0.8fr_0.55fr_0.55fr_1fr]">
              <span>Nome</span>
              <span>WhatsApp</span>
              <span>Status</span>
              <span>Adultos</span>
              <span>Crianças</span>
              <span>Data da resposta</span>
            </div>

            {visibleRsvps.length ? (
              <div className="divide-y divide-[#eadcc6]">
                {visibleRsvps.map((rsvp) => (
                  <RsvpRow key={rsvp.id} rsvp={rsvp} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-48 flex-col items-center justify-center gap-3 bg-white px-4 text-center">
                <UsersRound className="text-[#b78d35]" size={34} />
                <p className="text-sm font-bold text-[#6f5948]">
                  Nenhuma resposta nesse filtro.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[22px] border border-white bg-white/82 p-4 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8a745f]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-[#49372a]">{value}</p>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-10 rounded-full px-3 transition focus:outline-none focus:ring-4 focus:ring-[#d8b45f]/25 ${
        active ? "bg-white text-[#49372a] shadow-sm" : "text-[#7b6654]"
      }`}
    >
      {children}
    </button>
  );
}

function RsvpRow({ rsvp }: { rsvp: Rsvp }) {
  return (
    <article className="grid gap-3 bg-white p-4 text-sm md:grid-cols-[1.4fr_1fr_0.8fr_0.55fr_0.55fr_1fr] md:items-center">
      <div>
        <p className="font-black text-[#49372a]">{rsvp.name}</p>
        <p className="mt-1 flex items-center gap-1 text-xs font-bold text-[#8a745f] md:hidden">
          <MessageCircle size={14} />
          {formatPhone(rsvp.phone)}
        </p>
      </div>
      <p className="hidden font-bold text-[#6f5948] md:block">
        {formatPhone(rsvp.phone)}
      </p>
      <p>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
            rsvp.will_attend
              ? "bg-[#e9f4de] text-[#52683c]"
              : "bg-[#fff0ed] text-[#8b4338]"
          }`}
        >
          {rsvp.will_attend ? "Confirmado" : "Ausente"}
        </span>
      </p>
      <p className="font-black text-[#49372a]">
        <span className="mr-1 text-xs font-bold uppercase text-[#8a745f] md:hidden">
          Adultos
        </span>
        {rsvp.adults}
      </p>
      <p className="font-black text-[#49372a]">
        <span className="mr-1 text-xs font-bold uppercase text-[#8a745f] md:hidden">
          Crianças
        </span>
        {rsvp.children}
      </p>
      <p className="text-xs font-bold text-[#6f5948]">
        {formatDateTime(rsvp.created_at)}
      </p>
    </article>
  );
}
