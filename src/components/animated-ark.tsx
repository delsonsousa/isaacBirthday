'use client';

import { motion } from 'framer-motion';

export function AnimatedArk() {
  return (
    <div
      className="relative mx-auto h-[378px] w-full max-w-[430px] overflow-visible sm:h-[500px] sm:max-w-[720px] lg:h-[420px] lg:max-w-[650px]"
      aria-label="Arca de Noé do Isaac com animais"
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-12 h-[310px] w-[310px] -translate-x-1/2 rounded-full bg-[#f4c978]/35 blur-3xl sm:top-16 sm:h-[430px] sm:w-[430px] lg:top-2"
        animate={{ opacity: [0.58, 0.9, 0.58], scale: [0.95, 1.04, 0.95] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-20 h-[270px] w-[270px] -translate-x-1/2 rounded-full bg-white/55 blur-2xl sm:h-[390px] sm:w-[390px]"
        animate={{ opacity: [0.42, 0.72, 0.42] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute left-1/2 top-[18px] z-20 h-[295px] w-[340px] -translate-x-1/2 sm:top-[18px] sm:h-[410px] sm:w-[520px] lg:top-[-8px] lg:h-[430px] lg:w-[560px]"
        initial={{ opacity: 0, y: 34, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
          scale: 1,
          rotate: [-0.45, 0.45, -0.45],
        }}
        transition={{
          opacity: { delay: 0.15, duration: 0.65 },
          scale: { delay: 0.15, duration: 0.72, type: 'spring', damping: 17 },
          y: { duration: 5.8, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 5.8, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <motion.img
          src="/arca-noe-isaac-1-aninho.svg"
          alt="Isaac vestido como Noé em uma arca com animais"
          className="h-full w-full object-contain drop-shadow-[0_30px_38px_rgba(73,55,42,0.24)]"
          draggable={false}
          animate={{
            filter: [
              'saturate(1) brightness(1)',
              'saturate(1.05) brightness(1.04)',
              'saturate(1) brightness(1)',
            ],
          }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[14%] top-[13%] h-[42%] rounded-full bg-[#ffe7a8]/18 blur-2xl"
          animate={{ opacity: [0.22, 0.55, 0.22], scale: [0.92, 1.05, 0.92] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute left-[12%] top-[170px] z-30 text-[#d8b45f] sm:left-[9%] sm:top-[240px]"
        animate={{
          y: [0, -10, 0],
          opacity: [0.35, 0.9, 0.35],
          scale: [0.8, 1.15, 0.8],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SparkleShape />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute right-[13%] top-[170px] z-30 text-[#eabf63] sm:right-[12%] sm:top-[232px]"
        animate={{
          y: [0, 9, 0],
          opacity: [0.4, 1, 0.4],
          scale: [0.75, 1.08, 0.75],
        }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SparkleShape />
      </motion.div>

      <div className="absolute bottom-3 left-1/2 h-[126px] w-[124%] -translate-x-1/2 overflow-hidden">
        <motion.div
          className="absolute left-[-10%] top-4 h-16 w-[122%] rounded-[50%] bg-[#83c8dd]/70"
          animate={{ x: ['-3%', '4%', '-3%'] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[-14%] top-12 h-20 w-[132%] rounded-[50%] bg-[#5eabc6]/55"
          animate={{ x: ['4%', '-4%', '4%'] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute bottom-0 h-12 w-full bg-gradient-to-b from-[#fff5e5]/0 to-[#fff5e5]" />
      </div>
    </div>
  );
}

function SparkleShape() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="fill-current">
      <path d="M13.1 2.7c.3-1 1.5-1 1.8 0l1.9 6.1c.1.3.3.5.6.6l6.1 1.9c1 .3 1 1.5 0 1.8L17.4 15c-.3.1-.5.3-.6.6l-1.9 6.1c-.3 1-1.5 1-1.8 0l-1.9-6.1c-.1-.3-.3-.5-.6-.6l-6.1-1.9c-1-.3-1-1.5 0-1.8l6.1-1.9c.3-.1.5-.3.6-.6l1.9-6.1Z" />
      <path d="M21 2.5h2.4v2.4H21zM4 21.4h2.6V24H4z" />
    </svg>
  );
}

type AnimalKind = 'elephant' | 'giraffe' | 'lion' | 'turtle';

export function Animal({ kind }: { kind: AnimalKind }) {
  if (kind === 'elephant') {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <path
          d="M18 44c0-16 12-26 29-25 15 1 24 10 24 24 0 14-10 23-26 23H29c-7 0-11-7-11-22Z"
          fill="#9eb5b3"
        />
        <path
          d="M15 39c-7 1-10 7-9 14 1 8 8 13 16 11 8-3 8-14 3-20-2-3-5-5-10-5Z"
          fill="#8ca4a2"
        />
        <path
          d="M54 25c8 0 13 6 13 14 0 11-10 17-18 12-8-5-5-26 5-26Z"
          fill="#b6c8c5"
          opacity=".75"
        />
        <path
          d="M33 64v10M56 62v10"
          stroke="#6f7773"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="45" cy="35" r="3" fill="#49372a" />
      </svg>
    );
  }

  if (kind === 'giraffe') {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <path
          d="M42 20c0-8 5-13 12-13 7 0 12 5 12 12 0 9-7 14-15 13"
          fill="#d2a45f"
        />
        <path
          d="M38 70V27c0-8 7-13 14-9 5 3 6 9 3 15L50 45v25"
          fill="#c8944d"
        />
        <path
          d="M22 72V50c0-9 7-16 17-16h12c9 0 16 7 16 16v22"
          fill="#d0a15d"
        />
        <path
          d="M30 51h6M46 43h7M55 56h6M44 62h5"
          stroke="#8a5a32"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M49 9V2M60 11l4-6"
          stroke="#7b5130"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="57" cy="18" r="2.5" fill="#49372a" />
      </svg>
    );
  }

  if (kind === 'lion') {
    return (
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <circle cx="40" cy="34" r="26" fill="#b87538" />
        <circle cx="40" cy="38" r="18" fill="#e2b76d" />
        <path
          d="M20 58c7-8 31-8 40 0 6 5 7 14-2 16H22c-9-2-8-11-2-16Z"
          fill="#c88a45"
        />
        <circle cx="33" cy="35" r="2.8" fill="#49372a" />
        <circle cx="47" cy="35" r="2.8" fill="#49372a" />
        <path
          d="M35 45c4 4 8 4 12 0"
          stroke="#8b4c37"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 80" className="h-full w-full">
      <path
        d="M18 51c4-18 17-28 34-22 12 4 18 14 17 27-9 8-39 11-51-5Z"
        fill="#81985f"
      />
      <path
        d="M27 48c5-11 16-16 28-12 8 3 12 9 13 18-11 5-30 5-41-6Z"
        fill="#9eaf77"
      />
      <circle cx="67" cy="43" r="8" fill="#8fa66d" />
      <circle cx="70" cy="41" r="2" fill="#49372a" />
      <path
        d="M24 60h-7M45 61h-7M58 59h-7"
        stroke="#5e7045"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
