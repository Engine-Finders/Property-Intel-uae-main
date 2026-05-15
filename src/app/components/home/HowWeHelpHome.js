"use client";
import { useState } from "react";
import {
  BadgeCheck,
  BarChart3,
  FileSearch,
  Handshake,
  Home,
  LockKeyhole,
  RefreshCw,
  Scale,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import SectionImageHeader from "../home-page-common/SectionImageHeader";

const GOLD = "#B68A35";

const CARD_ICONS = {
  analyse: FileSearch,
  match: Target,
  connect: Handshake,
};

const BADGE_ICONS = [ShieldCheck, Scale, UserRound, BarChart3, Home, BadgeCheck];

const splitTitle = (title) => {
  const parts = title.split(" Right Decision");
  return {
    before: parts[0],
    highlight: parts.length > 1 ? "Right Decision" : "",
  };
};

const HowBadge = ({ label, iconIndex, t }) => {
  const Icon = BADGE_ICONS[iconIndex] || ShieldCheck;

  return (
    <span
      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border px-3 text-center text-[11px] font-semibold leading-tight sm:text-xs"
      style={{
        color: t.text,
        borderColor: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.14)",
        background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.74)",
        boxShadow: t.isDark
          ? "0 10px 24px rgba(0,0,0,0.16)"
          : "0 10px 26px rgba(15,23,42,0.04)",
      }}
    >
      <Icon size={17} strokeWidth={1.75} style={{ color: GOLD }} />
      {label}
    </span>
  );
};

const HowCard = ({ card, index, t, isOpen, onToggle }) => {
  const Icon = CARD_ICONS[card.icon] || FileSearch;
  const back = card.back || [];
  const frontBadges = card.front_badges || [];

  return (
    <button
      type="button"
      onClick={onToggle}
      className="group w-full rounded-[22px] border p-4 text-left transition-all lg:cursor-default lg:p-6"
      style={{
        borderColor: t.isDark ? "rgba(255,255,255,0.09)" : "rgba(182,138,53,0.12)",
        background: t.isDark ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.78)",
        boxShadow: t.isDark
          ? "0 18px 46px rgba(0,0,0,0.22)"
          : "0 20px 48px rgba(15,23,42,0.07)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 lg:block">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
            style={{
              color: GOLD,
              background: t.isDark ? "rgba(182,138,53,0.12)" : "rgba(182,138,53,0.08)",
            }}
          >
            <Icon size={30} strokeWidth={1.55} />
          </span>
          <h3
            className="mt-1 max-w-[260px] font-serif text-[1.55rem] font-semibold leading-[1.1] lg:mt-6 lg:text-[1.7rem]"
            style={{ color: t.text }}
          >
            {card.title}
          </h3>
        </div>

        <span className="font-serif text-2xl leading-none" style={{ color: GOLD }}>
          {card.step}
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:max-h-none ${
          isOpen ? "mt-5 max-h-96 opacity-100" : "mt-0 max-h-0 opacity-0 lg:mt-5 lg:opacity-100"
        }`}
      >
        <div className="h-px w-full" style={{ background: t.cardBorder }} />
        <div className="mt-4 space-y-3">
          {back.map((paragraph) => (
            <p key={paragraph} className="text-[14px] leading-5" style={{ color: t.textSecondary }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:grid lg:grid-cols-2">
        {frontBadges.map((label, badgeIndex) => {
          const loneInRow =
            frontBadges.length % 2 === 1 && badgeIndex === frontBadges.length - 1;
          const badgeProps = {
            label,
            iconIndex: index + badgeIndex,
            t,
          };
          if (loneInRow) {
            return (
              <div
                key={`${card.step}-badge-${badgeIndex}`}
                className="col-span-2 flex w-full shrink-0 justify-center sm:basis-full lg:col-span-2"
              >
                <HowBadge {...badgeProps} />
              </div>
            );
          }
          return <HowBadge key={`${card.step}-badge-${badgeIndex}`} {...badgeProps} />;
        })}
      </div>

      <div
        className="mt-5 flex items-center justify-center gap-2 text-xs lg:hidden"
        style={{ color: t.textMuted }}
      >
        <RefreshCw size={14} />
        Tap to flip
      </div>
    </button>
  );
};

const HowWeHelpHome = ({ data }) => {
  const { t } = useTheme();
  const [openCard, setOpenCard] = useState(0);
  const { before, highlight } = splitTitle(data.h2 || "");

  return (
    <section className="py-8 md:py-10" style={{ background: t.bg }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionImageHeader
          title={
            <>
              <span className="block">How We Help You</span>
              <span>
                Make the <span style={{ color: GOLD }}>Right Decision</span>
              </span>
            </>
          }
          subtitle={data.h3}
          t={t}
          imageSrc="/projects/villa-render-2.jpg"
          minHeight={240}
          className="mb-6 hidden rounded-b-[28px] lg:block"
          contentClassName="py-10"
        />

        <div className="mb-6 text-center lg:hidden">
          <h2 className="font-serif text-[32px] md:text-[2.35rem] font-semibold leading-[1.04]" style={{ color: t.text }}>
            {before}
            {highlight && (
              <>
                {" "}
                <span style={{ color: GOLD }}>{highlight}</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm leading-5" style={{ color: t.textSecondary }}>
            {data.h3}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {(data.cards || []).map((card, i) => (
            <HowCard
              key={card.step}
              card={card}
              index={i}
              t={t}
              isOpen={openCard === i}
              onToggle={() => setOpenCard(openCard === i ? -1 : i)}
            />
          ))}
        </div>

        <div
          className="mt-4 flex items-center gap-4 overflow-hidden rounded-[22px] border p-4 lg:p-5"
          style={{
            borderColor: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.10)",
            background: t.isDark
              ? "linear-gradient(90deg, rgba(182,138,53,0.10), rgba(255,255,255,0.03))"
              : "linear-gradient(90deg, rgba(182,138,53,0.08), rgba(255,255,255,0.72))",
          }}
        >
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
            style={{
              color: GOLD,
              background: t.isDark ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.72)",
            }}
          >
            <LockKeyhole size={28} strokeWidth={1.7} />
          </span>
          <div>
            <p className="text-sm font-bold" style={{ color: t.text }}>
              Your privacy is important to us.
            </p>
            <p className="mt-1 text-sm" style={{ color: t.textSecondary }}>
              Your details are never sold. Ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeHelpHome;
