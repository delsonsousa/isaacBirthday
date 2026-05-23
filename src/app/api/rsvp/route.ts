import { NextResponse, type NextRequest } from "next/server";
import { normalizePhone } from "@/lib/rsvp-utils";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type RsvpPayload = {
  name?: string;
  phone?: string;
  willAttend?: boolean;
  adults?: number;
  children?: number;
};

function toCount(value: unknown) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0 || number > 30) {
    return null;
  }

  return number;
}

export async function POST(request: NextRequest) {
  let payload: RsvpPayload;

  try {
    payload = (await request.json()) as RsvpPayload;
  } catch {
    return NextResponse.json(
      { message: "Não foi possível ler a confirmação." },
      { status: 400 },
    );
  }

  const name = payload.name?.trim().replace(/\s+/g, " ") ?? "";
  const phone = normalizePhone(payload.phone ?? "");
  const adults = toCount(payload.adults);
  const children = toCount(payload.children);

  if (name.length < 3) {
    return NextResponse.json(
      { message: "Informe o nome completo." },
      { status: 400 },
    );
  }

  if (phone.length < 10 || phone.length > 13) {
    return NextResponse.json(
      { message: "Informe um WhatsApp válido com DDD." },
      { status: 400 },
    );
  }

  if (typeof payload.willAttend !== "boolean") {
    return NextResponse.json(
      { message: "Escolha se você vai comparecer." },
      { status: 400 },
    );
  }

  if (adults === null || children === null) {
    return NextResponse.json(
      { message: "Informe quantidades válidas de adultos e crianças." },
      { status: 400 },
    );
  }

  if (payload.willAttend && adults + children < 1) {
    return NextResponse.json(
      { message: "Para confirmar presença, informe pelo menos uma pessoa." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: existing, error: lookupError } = await supabase
      .from("rsvps")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    if (existing) {
      return NextResponse.json(
        {
          message:
            "Já existe uma confirmação com esse WhatsApp. Se precisar alterar, fale com os organizadores.",
        },
        { status: 409 },
      );
    }

    const { data, error } = await supabase
      .from("rsvps")
      .insert({
        name,
        phone,
        will_attend: payload.willAttend,
        adults: payload.willAttend ? adults : 0,
        children: payload.willAttend ? children : 0,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ rsvp: data }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Não conseguimos salvar agora. Tente novamente em instantes.",
      },
      { status: 500 },
    );
  }
}
