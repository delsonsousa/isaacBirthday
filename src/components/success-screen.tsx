'use client';

import { motion } from 'framer-motion';
import { Check, RefreshCcw, Sparkles } from 'lucide-react';

type SuccessScreenProps = {
  willAttend: boolean;
  onReset: () => void;
};

const floatingLeaves = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${6 + ((index * 19) % 88)}%`,
  delay: index * 0.22,
  duration: 5.8 + (index % 4) * 0.45,
  size: ['text-lg', 'text-xl', 'text-2xl'][index % 3],
}));

export function SuccessScreen({ willAttend, onReset }: SuccessScreenProps) {
  return (
    <motion.div
      className="relative -mt-16 overflow-hidden rounded-[34px] border-[6px] border-[#5b3824] bg-[#fff7e8] px-5 pb-8 pt-8 text-center shadow-[0_30px_80px_rgba(73,55,42,0.22)] sm:p-8"
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.62, type: 'spring', damping: 17 }}
      role="status"
      aria-live="polite"
    >
      <div aria-hidden="true" className="absolute inset-0 storybook-texture" />
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_50%_0%,rgba(143,166,109,0.18),transparent_62%)]" />
      <div className="absolute -left-20 top-28 h-40 w-40 rounded-full bg-[#8fcce0]/12 blur-2xl" />
      <div className="absolute -right-24 top-16 h-48 w-48 rounded-full bg-[#8fa66d]/12 blur-2xl" />

      {floatingLeaves.map((leaf, index) => (
        <motion.span
          key={leaf.id}
          aria-hidden="true"
          className={`absolute -top-10 z-20 ${leaf.size} opacity-75`}
          style={{ left: leaf.left }}
          animate={{
            y: ['-5vh', '82vh'],
            x: index % 2 ? [0, 18, -12, 8] : [0, -16, 12, -8],
            rotate: index % 2 ? [-12, 24, -18, 14] : [14, -22, 16, -12],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: leaf.delay,
          }}
        >
          🍃
        </motion.span>
      ))}

      <div className="relative z-20 mx-auto mb-7 flex h-36 items-center justify-center">
        <motion.div
          className="absolute h-32 w-32 rounded-full bg-[#e9f4de]"
          initial={{ scale: 0.72, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute h-40 w-40 rounded-full border border-[#8fa66d]/25"
          initial={{ scale: 0.55, opacity: 0 }}
          animate={{ scale: [0.72, 1.05, 1], opacity: [0, 0.7, 0.2] }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute h-48 w-48 rounded-full border border-[#8fa66d]/15"
          initial={{ scale: 0.55, opacity: 0 }}
          animate={{ scale: [0.62, 1.12, 1.04], opacity: [0, 0.45, 0.12] }}
          transition={{ delay: 0.12, duration: 1.35, ease: 'easeOut' }}
        />

        <motion.div
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#7f9f5f] text-white shadow-[0_18px_35px_rgba(82,104,60,0.26)] ring-[10px] ring-white/70"
          initial={{ scale: 0.4, opacity: 0, rotate: -18 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            delay: 0.16,
            type: 'spring',
            stiffness: 220,
            damping: 14,
          }}
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.34, duration: 0.42, ease: 'easeOut' }}
          >
            <Check size={48} strokeWidth={4.5} />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-20">
        <motion.p
          className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.22em] text-[#8fa66d] shadow-sm ring-1 ring-[#8fa66d]/15"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
        >
          <Sparkles size={14} fill="currentColor" />
          Resposta recebida
        </motion.p>

        <motion.h2
          className="font-display mx-auto max-w-[22rem] text-balance text-[2.35rem] font-black leading-[0.92] text-[#49372a] sm:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.45 }}
        >
          {`Eba! Sua presença foi confirmada.`}
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-md text-pretty text-lg font-bold leading-8 text-[#6f5948]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.45 }}
        >
          {'A arca do Isaac ficou ainda mais especial com você.'}
        </motion.p>

        {willAttend ? (
          <motion.div
            className="mx-auto mt-5 max-w-md rounded-[26px] border border-[#d7e9c8] bg-[#e9f4de] px-5 py-4 text-base font-black leading-7 text-[#52683c] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.52, type: 'spring', damping: 16 }}
          >
            Em breve você receberá o convite oficial com todos os detalhes do
            local.
          </motion.div>
        ) : null}

        <motion.button
          type="button"
          onClick={onReset}
          whileTap={{ scale: 0.96 }}
          whileHover={{ y: -2 }}
          className="mt-7 inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#d8b45f]/55 bg-white px-6 text-sm font-black text-[#6f472e] shadow-[0_10px_24px_rgba(73,55,42,0.12)] transition hover:bg-[#fff8e8] focus:outline-none focus:ring-4 focus:ring-[#d8b45f]/35"
        >
          <RefreshCcw size={16} />
          Enviar outra resposta
        </motion.button>
      </div>
    </motion.div>
  );
}
