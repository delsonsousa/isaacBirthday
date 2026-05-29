'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import type { ReactNode } from 'react';
import { Anchor, CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { AnimatedArk } from './animated-ark';
import { RsvpForm } from './rsvp-form';

export function LandingPage() {
  return (
    <main className="storybook-texture min-h-screen overflow-hidden bg-[#fff7e8] text-[#49372a]">
      <Hero />
      <NarrativeJourney />
      <section
        id="confirmar"
        className="relative px-4 pt-30 pb-24 sm:px-6 lg:px-8 lg:pt-8"
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-[#fff7e8]" />
        <div className="relative mx-auto max-w-2xl">
          <RsvpForm />
        </div>
      </section>
    </main>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.22], [0, -70]);
  const sceneY = useTransform(scrollYProgress, [0, 0.22], [0, 44]);

  return (
    <section className="story-sky relative flex min-h-[100svh] flex-col px-4 pt-15 -mb-38 sm:px-6 sm:pb-12 lg:px-8">
      <MovingClouds />
      <SoftStars />

      <motion.div
        style={{ y: titleY }}
        className="relative z-20 mx-auto w-full max-w-6xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72 }}
      >
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/62 px-3 py-2 text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#9b7432] shadow-sm backdrop-blur-md">
          <Sparkles size={14} fill="currentColor" />
          Isaac faz 1 ano
        </p>
        <h1 className="font-display max-w-[10ch] text-balance text-[3.18rem] font-black leading-[0.85] tracking-normal text-[#49372a] drop-shadow-[0_4px_0_rgba(255,255,255,0.32)] sm:max-w-[12ch] sm:text-7xl lg:max-w-[13ch] lg:text-[6.4rem]">
          O Isaac embarca em uma linda jornada…
        </h1>
        <p className="mt-3 max-w-[22rem] text-pretty text-xl font-black leading-7 text-[#604a3c] sm:max-w-xl sm:text-2xl">
          E esse 1º aninho só fica completo com você.
        </p>
      </motion.div>

      <motion.div
        style={{ y: sceneY }}
        className="relative z-10 -mx-4 mt-5 flex min-h-[402px] items-end justify-center sm:mx-0 sm:min-h-[560px] lg:min-h-[430px]"
      >
        <AnimatedArk />
      </motion.div>

      <motion.div
        className="relative z-20 mx-auto -mt-10 grid w-full max-w-md grid-cols-2 gap-3 overflow-visible pb-0 sm:max-w-xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.55 }}
      >
        <EventPill icon={<CalendarDays size={18} />} label="27/06 • 13h" />
        <EventPill icon={<MapPin size={18} />} label="Niterói" />
        <motion.a
          href="#confirmar"
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
          className="col-span-2 flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#7a4b2e] px-6 text-base font-black text-[#fffaf0] shadow-[0_18px_38px_rgba(93,61,41,0.28)] outline-none ring-[#d8b45f]/40 transition hover:bg-[#633b26] focus:ring-4"
        >
          <Anchor size={20} />
          Entrar na arca
        </motion.a>
      </motion.div>
    </section>
  );
}

function NarrativeJourney() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="historia"
      className="relative isolate overflow-hidden bg-[#fff6e6] pb-16 pt-0 sm:px-0"
    >
      <FallingLeaves shouldReduceMotion={shouldReduceMotion} />
      <AnimatedPaws shouldReduceMotion={shouldReduceMotion} />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[450px] sm:max-w-[620px]"
        initial={
          shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }
        }
        whileInView={
          shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
        }
        viewport={{ once: true, margin: '-90px' }}
        transition={{ type: 'spring', stiffness: 90, damping: 18 }}
      >
        <div className="relative mt-95 mb-0 h-[480px] lg:mt-20 lg:h-auto">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 z-0 h-full w-screen -translate-x-1/2 bg-[linear-gradient(180deg,#fff6e6_0%,#f8e3be_10%,#f8e3be_90%,#fff6e6_100%)]"
          />
          <motion.img
            src="/story-cards-section.png"
            alt="Uma pequena grande história do Isaac"
            className="absolute z-10 -mt-50 w-full select-none lg:relative lg:mt-0"
            draggable={false}
          />
        </div>
      </motion.div>
    </section>
  );
}

function FallingLeaves({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  const leaves = [
    {
      left: '8%',
      delay: 0,
      duration: 8.5,
      size: 'text-3xl',
      opacity: 'opacity-80',
    },
    {
      left: '18%',
      delay: 2.1,
      duration: 9.8,
      size: 'text-xl',
      opacity: 'opacity-70',
    },
    {
      left: '34%',
      delay: 1.2,
      duration: 8.9,
      size: 'text-2xl',
      opacity: 'opacity-75',
    },
    {
      left: '62%',
      delay: 0.8,
      duration: 10.2,
      size: 'text-xl',
      opacity: 'opacity-70',
    },
    {
      left: '76%',
      delay: 2.8,
      duration: 9.3,
      size: 'text-3xl',
      opacity: 'opacity-75',
    },
    {
      left: '90%',
      delay: 1.7,
      duration: 8.2,
      size: 'text-2xl',
      opacity: 'opacity-70',
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {leaves.map((leaf, index) => (
        <motion.span
          key={`${leaf.left}-${index}`}
          className={`absolute -top-12 ${leaf.size} ${leaf.opacity} drop-shadow-sm`}
          style={{ left: leaf.left }}
          initial={
            shouldReduceMotion
              ? { y: 0, opacity: 0.45 }
              : { y: -40, rotate: index % 2 ? -18 : 18 }
          }
          animate={
            shouldReduceMotion
              ? { y: 0, opacity: 0.45 }
              : {
                  y: ['-8vh', '112vh'],
                  x: index % 2 ? [0, 24, -18, 18] : [0, -22, 16, -14],
                  rotate: index % 2 ? [-18, 28, -12, 18] : [18, -24, 14, -16],
                }
          }
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
    </div>
  );
}

function AnimatedPaws({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  const paws = [
    { left: '7%', top: '18%', rotate: '-18deg', delay: 0.1 },
    { left: '87%', top: '23%', rotate: '17deg', delay: 0.35 },
    { left: '14%', top: '46%', rotate: '12deg', delay: 0.6 },
    { left: '82%', top: '51%', rotate: '-14deg', delay: 0.85 },
    { left: '9%', top: '72%', rotate: '-8deg', delay: 1.1 },
    { left: '89%', top: '77%', rotate: '10deg', delay: 1.35 },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      {paws.map((paw, index) => (
        <motion.span
          key={`${paw.left}-${paw.top}`}
          className="absolute text-3xl text-[#b88945]/30"
          style={{ left: paw.left, top: paw.top, rotate: paw.rotate }}
          initial={
            shouldReduceMotion ? { opacity: 0.22 } : { opacity: 0, scale: 0.65 }
          }
          whileInView={
            shouldReduceMotion
              ? { opacity: 0.22 }
              : { opacity: [0, 0.36, 0.22], scale: [0.65, 1.12, 1] }
          }
          viewport={{ once: false, margin: '-70px' }}
          transition={{
            duration: 0.8,
            delay: paw.delay + index * 0.05,
            ease: 'easeOut',
          }}
        >
          🐾
        </motion.span>
      ))}
    </div>
  );
}

function EventPill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex min-h-12 items-center justify-center gap-2 rounded-[18px] border border-white/75 bg-white/68 px-3 text-sm font-black text-[#49372a] shadow-sm backdrop-blur-md">
      <span className="text-[#768b58]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function MovingClouds() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {[0, 1, 2, 3].map((cloud) => (
        <motion.div
          key={cloud}
          className="absolute h-16 rounded-full bg-white/58 blur-[1px]"
          style={{
            width: cloud % 2 ? 138 : 104,
            top: `${8 + cloud * 15}%`,
            left: `${cloud % 2 ? 58 : -10}%`,
          }}
          animate={{ x: cloud % 2 ? [-28, 24, -28] : [0, 38, 0] }}
          transition={{
            duration: 11 + cloud * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function SoftStars() {
  const positions = [
    'left-[11%] top-[20%]',
    'left-[74%] top-[19%]',
    'left-[84%] top-[46%]',
    'left-[18%] top-[63%]',
  ];

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {positions.map((position, index) => (
        <motion.span
          key={position}
          className={`absolute ${position} text-[#d8b45f]/75`}
          animate={{ opacity: [0.28, 0.9, 0.28], scale: [0.85, 1.12, 0.85] }}
          transition={{
            duration: 2.5 + index * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles size={index % 2 ? 18 : 14} fill="currentColor" />
        </motion.span>
      ))}
    </div>
  );
}
