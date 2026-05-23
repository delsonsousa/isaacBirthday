import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard-client";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Rsvp } from "@/lib/supabase/database.types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | Isaac 1 ano",
  description: "Painel de confirmações do aniversário de 1 ano do Isaac.",
};

async function getRsvps(): Promise<{ rsvps: Rsvp[]; error?: string }> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return { rsvps: data ?? [] };
  } catch (caught) {
    const message =
      caught instanceof Error
        ? caught.message
        : "Não foi possível carregar as confirmações.";

    return {
      rsvps: [],
      error: `Não foi possível carregar os dados do Supabase. ${message}`,
    };
  }
}

export default async function DashboardPage() {
  const { rsvps, error } = await getRsvps();

  return <DashboardClient initialRsvps={rsvps} setupError={error} />;
}
