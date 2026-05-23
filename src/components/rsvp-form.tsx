'use client';

import { FormEvent, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  Baby,
  LoaderCircle,
  Minus,
  Phone,
  Plus,
  ShipWheel,
  UserRound,
  UsersRound,
} from 'lucide-react';
import { formatPhone } from '@/lib/rsvp-utils';
import { Animal } from './animated-ark';
import { SuccessScreen } from './success-screen';

type SubmitState = {
  sent: boolean;
  willAttend: boolean;
};

type FocusedField = 'name' | 'phone' | 'adults' | 'children' | null;

export function RsvpForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [willAttend, setWillAttend] = useState<boolean | null>(true);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [focused, setFocused] = useState<FocusedField>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState<SubmitState | null>(null);

  const canSubmit = useMemo(() => {
    const phoneDigits = phone.replace(/\D/g, '');
    const hasPeople = willAttend ? adults + children > 0 : true;

    return (
      name.trim().length >= 3 &&
      phoneDigits.length >= 10 &&
      willAttend !== null &&
      adults >= 0 &&
      children >= 0 &&
      hasPeople
    );
  }, [adults, children, name, phone, willAttend]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!canSubmit || willAttend === null) {
      setError('Revise os campos destacados antes de enviar.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, willAttend, adults, children }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? 'Não foi possível enviar.');
      }

      setSubmitted({ sent: true, willAttend });
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Não foi possível enviar agora.',
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted?.sent) {
    return (
      <SuccessScreen
        willAttend={submitted.willAttend}
        onReset={() => {
          setSubmitted(null);
          setName('');
          setPhone('');
          setWillAttend(true);
          setAdults(1);
          setChildren(0);
          setError('');
        }}
      />
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative mt-[-92px] overflow-hidden rounded-[32px] border border-[#e4c38e] bg-[#fff8ea] p-2.5 shadow-[0_26px_70px_rgba(73,55,42,0.18)] sm:rounded-[38px] sm:p-3 lg:mt-0"
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.72, type: 'spring', damping: 18 }}
      noValidate
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 wood-grain opacity-95"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-6 h-px bg-[#f6d9a5]/70"
      />
      <div
        aria-hidden="true"
        className="absolute -left-8 top-36 h-24 w-24 rotate-[-8deg] opacity-80 sm:h-28 sm:w-28"
      >
        <Animal kind="giraffe" />
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-8 bottom-28 h-24 w-24 scale-x-[-1] opacity-85 sm:h-28 sm:w-28"
      >
        <Animal kind="elephant" />
      </div>

      <div className="relative rounded-[26px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,252,244,0.98)_0%,rgba(255,246,230,0.96)_54%,rgba(255,238,207,0.94)_100%)] px-4 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-18px_50px_rgba(216,180,95,0.12)] sm:rounded-[32px] sm:px-7 sm:py-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_14%_18%,rgba(216,180,95,0.13)_0_2px,transparent_2.5px),radial-gradient(circle_at_86%_28%,rgba(143,166,109,0.11)_0_2px,transparent_2.5px)] bg-[length:34px_34px,42px_42px] sm:rounded-[32px]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-10 w-44 -translate-x-1/2 -translate-y-1/2 rounded-b-[30px] border border-[#f2d39d] bg-[#bd7d4d] shadow-[0_10px_22px_rgba(93,61,41,0.18)]"
        />

        <div className="relative mb-6 text-center">
          <p className="mx-auto inline-flex min-h-9 items-center rounded-full border border-[#ead2ad] bg-white/70 px-4 text-[0.68rem] font-black uppercase tracking-[0.24em] text-[#b78d35] shadow-sm">
            Confirmação da arca
          </p>
          <h2 className="font-display mx-auto mt-4 max-w-[20ch] text-balance text-[2.8rem] font-black leading-[0.82] tracking-normal text-[#49372a] sm:text-[2.5rem]">
            Você vem comemorar com a gente?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-[0.98rem] font-extrabold leading-7 text-[#765f4c]">
            Confirme quem vai embarcar na festa do Isaac.
          </p>
          <p className="mx-auto mt-1 max-w-md text-pretty text-[0.98rem] font-extrabold leading-7 text-[#765f4c]">
            O endereço será enviado no convite oficial depois da sua
            confirmação.
          </p>
        </div>

        <div className="relative space-y-4">
          <StoryField
            icon={<UserRound size={19} />}
            label="Nome completo"
            focused={focused === 'name'}
          >
            <input
              id="name"
              name="name"
              value={name}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              placeholder="Quem vai entrar na arca?"
              className="min-h-14 w-full bg-transparent px-4 text-base font-black text-[#49372a] outline-none placeholder:text-[#aa927b]"
              required
            />
          </StoryField>

          <StoryField
            icon={<Phone size={19} />}
            label="WhatsApp"
            focused={focused === 'phone'}
          >
            <input
              id="phone"
              name="phone"
              value={phone}
              onFocus={() => setFocused('phone')}
              onBlur={() => setFocused(null)}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
              inputMode="tel"
              autoComplete="tel"
              placeholder="(21) 99999-9999"
              className="min-h-14 w-full bg-transparent px-4 text-base font-black text-[#49372a] outline-none placeholder:text-[#aa927b]"
              required
            />
          </StoryField>

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              icon={<UsersRound size={18} />}
              label="Adultos"
              value={willAttend ? adults : 0}
              onChange={setAdults}
              disabled={!willAttend}
              focused={focused === 'adults'}
              onFocus={() => setFocused('adults')}
              onBlur={() => setFocused(null)}
            />
            <NumberField
              icon={<Baby size={18} />}
              label="Crianças"
              value={willAttend ? children : 0}
              onChange={setChildren}
              disabled={!willAttend}
              focused={focused === 'children'}
              onFocus={() => setFocused('children')}
              onBlur={() => setFocused(null)}
            />
          </div>
        </div>

        {error ? (
          <motion.p
            className="mt-5 rounded-[20px] border border-[#eab7a9] bg-[#fff0ed] px-4 py-3 text-sm font-bold leading-6 text-[#8b4338]"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
          >
            {error}
          </motion.p>
        ) : null}

        <motion.button
          type="submit"
          disabled={loading || !canSubmit}
          whileTap={{ scale: loading || !canSubmit ? 1 : 0.965 }}
          whileHover={loading || !canSubmit ? undefined : { y: -2 }}
          className="mt-6 flex min-h-16 w-full items-center justify-center gap-2 rounded-full bg-[#7a4b2e] px-6 text-lg font-black text-[#fffaf0] shadow-[0_18px_34px_rgba(93,61,41,0.24)] outline-none ring-[#d8b45f]/35 transition hover:bg-[#633b26] focus:ring-4 disabled:cursor-not-allowed disabled:bg-[#b8a18c] disabled:shadow-none"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={21} />
          ) : (
            <ShipWheel size={22} />
          )}
          {loading ? 'Abrindo a arca...' : 'Entrar na arca'}
        </motion.button>
      </div>
    </motion.form>
  );
}

function StoryField({
  icon,
  label,
  focused,
  children,
}: {
  icon: ReactNode;
  label: string;
  focused: boolean;
  children: ReactNode;
}) {
  return (
    <motion.label
      className="block overflow-hidden rounded-[22px] border bg-[#fffdf8]/86 shadow-sm backdrop-blur"
      animate={{
        borderColor: focused ? '#d8b45f' : '#ead2ad',
        boxShadow: focused
          ? '0 0 0 5px rgba(216,180,95,0.18), 0 16px 28px rgba(93,61,41,0.11)'
          : '0 8px 18px rgba(93,61,41,0.055)',
        y: focused ? -2 : 0,
      }}
      transition={{ duration: 0.18 }}
    >
      <span className="flex items-center gap-2 px-4 pt-3 text-xs font-black uppercase tracking-[0.18em] text-[#7c604c]">
        <span className="grid size-7 place-items-center rounded-full bg-[#f3dfbd] text-[#8b5f3d]">
          {icon}
        </span>
        <span>{label}</span>
      </span>
      {children}
    </motion.label>
  );
}

function NumberField({
  icon,
  label,
  value,
  onChange,
  disabled,
  focused,
  onFocus,
  onBlur,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <motion.div
      className="rounded-[22px] border bg-[#fffdf8]/86 shadow-sm backdrop-blur"
      animate={{
        borderColor: focused ? '#d8b45f' : '#ead2ad',
        boxShadow: focused
          ? '0 0 0 5px rgba(216,180,95,0.16), 0 14px 24px rgba(93,61,41,0.09)'
          : '0 8px 18px rgba(93,61,41,0.055)',
        y: focused ? -2 : 0,
      }}
    >
      <label className="flex items-center justify-center gap-2 px-2 pt-3 text-center text-[0.7rem] font-black uppercase tracking-[0.16em] text-[#7c604c]">
        {icon}
        <span>{label}</span>
      </label>
      <div className="grid min-h-16 grid-cols-[44px_1fr_44px] items-center px-2 pb-2">
        <CounterButton
          label={`Diminuir ${label.toLowerCase()}`}
          disabled={disabled || value <= 0}
          onClick={() => onChange(Math.max(0, value - 1))}
        >
          <Minus size={17} />
        </CounterButton>
        <input
          type="number"
          min={0}
          max={30}
          value={value}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(event) => {
            const next = Number(event.target.value);
            onChange(Number.isNaN(next) ? 0 : Math.max(0, Math.min(30, next)));
          }}
          className="h-12 w-full bg-transparent px-1 text-center text-[2rem] font-black leading-none text-[#49372a] outline-none disabled:text-[#b1a396]"
          aria-label={label}
        />
        <CounterButton
          label={`Aumentar ${label.toLowerCase()}`}
          disabled={disabled || value >= 30}
          onClick={() => onChange(Math.min(30, value + 1))}
        >
          <Plus size={17} />
        </CounterButton>
      </div>
    </motion.div>
  );
}

function CounterButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      className="grid size-10 place-items-center rounded-full border border-[#ead2ad] bg-[#fff7e8] text-[#7a4b2e] shadow-sm outline-none ring-[#d8b45f]/25 transition hover:bg-white focus:ring-4 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#fff7e8]"
    >
      {children}
    </motion.button>
  );
}
