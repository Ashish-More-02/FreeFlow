import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImg from "../Images/logo.png";
import homepageShot from "../assets/freeflow-homepage.png";
import {
  MdPlayArrow,
  MdSearch,
  MdWhatshot,
  MdGridView,
  MdChatBubbleOutline,
  MdOutlineDarkMode,
  MdSettings,
  MdArrowForward,
  MdBolt,
} from "react-icons/md";
import { SOFT_GRADIENT } from "../Utils/theme";

const CATEGORIES = [
  "Gaming",
  "Music",
  "Live",
  "Programming",
  "Podcasts",
  "Movies",
  "News",
  "Cooking",
  "Sports",
  "Minecraft",
  "Smartphones",
  "Songs",
];

const FEATURES = [
  {
    icon: MdSearch,
    span: "md:col-span-2",
    title: "Search that keeps up with you",
    body: "Live suggestions as you type. Move through them with the arrow keys, press Enter, and you're watching — the box always remembers what you actually typed.",
    glow: true,
  },
  {
    icon: MdWhatshot,
    span: "md:col-span-1",
    title: "Trending, up front",
    body: "The home feed opens on what's popular right now, with real view counts and channels.",
  },
  {
    icon: MdGridView,
    span: "md:col-span-1",
    title: "Real categories",
    body: "Browse chips and a sidebar built from YouTube's own live category list.",
  },
  {
    icon: MdChatBubbleOutline,
    span: "md:col-span-2",
    title: "Watch, then read the room",
    body: "A clean player with the video's real details and description, and the full comment thread — replies included — right underneath.",
    glow: true,
  },
  {
    icon: MdOutlineDarkMode,
    span: "md:col-span-1",
    title: "Dark mode that sticks",
    body: "Flip the theme once; it's remembered the next time you open FreeFlow.",
  },
  {
    icon: MdSettings,
    span: "md:col-span-2",
    title: "Your account, your settings",
    body: "Sign in and your session stays put across refreshes. Manage your profile and theme from one settings page.",
  },
];

const Landing = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".ff-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ff-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen bg-[#07070f] text-white overflow-x-hidden selection:bg-fuchsia-500/40"
    >
      {/* Ambient flow glows */}
      <div
        className="ff-flow pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full opacity-25 blur-[120px]"
        style={{ backgroundImage: SOFT_GRADIENT }}
      />
      <div
        className="ff-flow pointer-events-none absolute top-[28rem] -right-40 h-[34rem] w-[34rem] rounded-full opacity-20 blur-[120px]"
        style={{ backgroundImage: SOFT_GRADIENT }}
      />

      {/* ---------- Nav ---------- */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="FreeFlow" className="h-8 w-auto" />
          <span className="font-display text-2xl">FreeFlow</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#categories" className="hover:text-white">
            Categories
          </a>
          <Link to="/login" className="hover:text-white">
            Log in
          </Link>
        </nav>
        <Link
          to="/home"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Start watching
        </Link>
      </header>

      {/* ---------- Hero (centered) ---------- */}
      <section className="relative z-10 mx-auto max-w-4xl px-5 pt-10 pb-12 text-center lg:pt-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
          <MdBolt className="text-fuchsia-400" />
          Free. Uncluttered. Always flowing.
        </span>

        <h1 className="font-display mx-auto mt-6 text-5xl leading-[1.05] sm:text-6xl xl:text-7xl">
          Your feed, in{" "}
          <span
            className="ff-flow bg-clip-text text-transparent"
            style={{ backgroundImage: SOFT_GRADIENT }}
          >
            free flow
          </span>
          .
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
          A calmer way to watch YouTube. Real trending videos, sharp search,
          live categories, and a distraction-free player — wrapped in one fast,
          modern interface.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-[#141026] shadow-lg shadow-indigo-500/25 transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070f]"
            style={{ backgroundImage: SOFT_GRADIENT }}
          >
            <MdPlayArrow className="text-xl" />
            Start watching
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white/90 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Create account
            <MdArrowForward />
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
          <span>No sign-up to start</span>
          <span className="hidden sm:inline">•</span>
          <span>Keyboard-first search</span>
          <span className="hidden sm:inline">•</span>
          <span>Light &amp; dark</span>
        </div>
      </section>

      {/* ---------- Product showcase (real screenshot) ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-16">
        <div className="ff-reveal relative">
          <div
            className="ff-flow pointer-events-none absolute -inset-6 rounded-[2.5rem] opacity-40 blur-3xl"
            style={{ backgroundImage: SOFT_GRADIENT }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d1a] shadow-2xl shadow-black/60">
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 truncate text-xs text-white/40">
                freeflow.app/home
              </span>
            </div>
            <img
              src={homepageShot}
              alt="FreeFlow home page showing the trending video feed, category chips and sidebar"
              className="block w-full"
              loading="lazy"
            />
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-white/50">
          The FreeFlow home feed — trending videos, real categories, dark by
          default.
        </p>
      </section>

      {/* ---------- Category marquee ---------- */}
      <section id="categories" className="relative z-10 py-6">
        <div className="flex gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="ff-marquee flex shrink-0 gap-4 pr-4">
            {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
              <span
                key={c + i}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm text-white/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Features (bento) ---------- */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-5 py-20">
        <div className="ff-reveal max-w-2xl">
          <h2 className="font-display text-4xl sm:text-5xl">
            Everything you came for. Nothing you didn't.
          </h2>
          <p className="mt-4 text-white/60">
            FreeFlow is a real YouTube client — these aren't mockups, they're the
            features you'll use.
          </p>
        </div>

        <div className="ff-reveal mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body, span, glow }) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.05] ${span}`}
            >
              {glow && (
                <div
                  className="ff-flow pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-50"
                  style={{ backgroundImage: SOFT_GRADIENT }}
                />
              )}
              <div className="relative">
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#141026] shadow-lg shadow-indigo-500/20"
                  style={{ backgroundImage: SOFT_GRADIENT }}
                >
                  <Icon className="text-2xl" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-white/60">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA band ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div
          className="ff-reveal relative overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:px-16"
          style={{ backgroundImage: SOFT_GRADIENT }}
        >
          <h2 className="font-display text-4xl text-[#141026] sm:text-6xl">
            Ready to press play?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#141026]/75">
            Jump straight into the feed. No downloads, no setup — just start
            watching.
          </p>
          <Link
            to="/home"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#141026] px-8 py-4 font-semibold text-white transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141026] focus-visible:ring-offset-2 focus-visible:ring-offset-white/60"
          >
            <MdPlayArrow className="text-xl" />
            Enter FreeFlow
          </Link>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-white/50 sm:flex-row">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="FreeFlow" className="h-6 w-auto" />
            <span className="font-display text-lg text-white/80">FreeFlow</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/home" className="hover:text-white">
              Home
            </Link>
            <Link to="/login" className="hover:text-white">
              Log in
            </Link>
            <a href="#features" className="hover:text-white">
              Features
            </a>
          </div>
          <p>Built with React &amp; the YouTube Data API</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
