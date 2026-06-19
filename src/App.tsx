import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Facebook,
  Flame,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Music2,
  Phone,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { branches, mediaAssets, menuCategories, reviews, signatureOrders, siteFacts } from "./data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navItems = [
  { label: "Fire", id: "fire" },
  { label: "Menu", id: "menu" },
  { label: "Branches", id: "branches" },
  { label: "Story", id: "story" },
  { label: "Gallery", id: "gallery" },
];

const scrollTargets: Record<string, string> = {
  fire: "#fire",
  menu: "#menu .menu-command",
  branches: "#branches .branch-console",
  story: "#story .heritage-copy",
  gallery: "#gallery .gallery-grid",
};

let scrollRequest = 0;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ahmadalabdalla.lb?igsh=ZWV0bXZ0aWY0cDd3/",
    Icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1LwdyiQM5x/?mibextid=wwXIfr",
    Icon: Facebook,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ahmadalabdalla.lb?_r=1&_t=ZS-977edooi6mT",
    Icon: Music2,
  },
];

function scrollToId(id: string) {
  const target = document.querySelector<HTMLElement>(scrollTargets[id] ?? `#${id}`);
  if (!target) return;

  const request = ++scrollRequest;
  const getTargetScrollTop = () => {
    const topbarHeight = document.querySelector<HTMLElement>(".topbar")?.offsetHeight ?? 0;
    const availableHeight = window.innerHeight - topbarHeight;
    const rect = target.getBoundingClientRect();
    const targetHeight = target.offsetHeight;
    const transform = window.getComputedStyle(target).transform;
    const revealOffset = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;

    // Remove GSAP's temporary reveal translation so the first scroll uses the
    // same document position the element has after its animation completes.
    const targetTop = rect.top + window.scrollY - revealOffset;
    const centeredTop = targetTop - topbarHeight + targetHeight / 2 - availableHeight / 2;
    const topAligned = targetTop - topbarHeight - 18;
    const galleryNudge = id === "gallery" ? -2 : 0;
    return Math.max(0, (targetHeight < availableHeight ? centeredTop : topAligned) - galleryNudge);
  };

  window.addEventListener(
    "scrollend",
    () => {
      window.setTimeout(() => {
        if (request !== scrollRequest) return;
        window.scrollTo({ top: getTargetScrollTop(), behavior: "auto" });
      }, 250);
    },
    { once: true },
  );
  window.scrollTo({ top: getTargetScrollTop(), behavior: "smooth" });
}

function FireTableCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileViewport = window.matchMedia("(max-width: 760px)").matches;
    let frame = 0;
    let raf = 0;
    let isVisible = true;
    let pageVisible = !document.hidden;

    const cancelDraw = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const scheduleDraw = () => {
      if (!reduceMotion && isVisible && pageVisible && !raf) {
        raf = requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      const height = parent?.clientHeight ?? window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      frame += 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const grillY = height * 0.72;
      const centerX = width * 0.5;

      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(centerX, grillY, 20, centerX, grillY, width * 0.42);
      glow.addColorStop(0, "rgba(255, 119, 43, .34)");
      glow.addColorStop(0.38, "rgba(236, 6, 47, .16)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(centerX, grillY);
      context.rotate(-0.06);
      context.strokeStyle = "rgba(255, 244, 229, .13)";
      context.lineWidth = 5;
      context.lineCap = "round";
      for (let index = -8; index <= 8; index += 1) {
        const y = index * 38;
        context.beginPath();
        context.moveTo(-width * 0.45, y);
        context.lineTo(width * 0.45, y - 42);
        context.stroke();
      }
      context.restore();

      const smokeCount = reduceMotion ? 8 : mobileViewport ? 16 : 34;
      for (let index = 0; index < smokeCount; index += 1) {
        const phase = reduceMotion ? index : frame * 0.012 + index * 0.43;
        const x = centerX - width * 0.22 + index * (width / smokeCount) + Math.sin(phase * 1.7) * 18;
        const y = grillY + 42 - ((phase * 38 + index * 14) % (height * 0.42));
        const alpha = reduceMotion ? 0.025 : 0.025 + ((Math.sin(phase) + 1) / 2) * 0.06;
        context.fillStyle = `rgba(255, 247, 232, ${alpha})`;
        context.beginPath();
        context.ellipse(x, y, 34 + (index % 6) * 7, 8 + (index % 3) * 4, -0.45, 0, Math.PI * 2);
        context.fill();
      }

      const emberCount = reduceMotion ? 0 : mobileViewport ? 12 : 28;
      for (let index = 0; index < emberCount; index += 1) {
        const x = centerX + Math.sin(frame * 0.018 + index * 1.4) * (72 + index * 5);
        const y = grillY + 72 - ((frame * 1.5 + index * 27) % 280);
        const radius = 1.8 + (index % 4);
        context.fillStyle = index % 3 === 0 ? "rgba(236, 6, 47, .76)" : "rgba(255, 176, 70, .82)";
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      raf = 0;
      scheduleDraw();
    };

    resize();
    draw();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          scheduleDraw();
        } else {
          cancelDraw();
        }
      },
      { threshold: 0.05 },
    );

    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) {
        scheduleDraw();
      } else {
        cancelDraw();
      }
    };

    observer.observe(canvas);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelDraw();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="fire-table-canvas" aria-hidden="true" />;
}

function BranchStatus({ status }: { status: "open" | "soon" | "kitchen" }) {
  const text = status === "soon" ? "Soon" : status === "kitchen" ? "Kitchen" : "Open";
  return <span className={`branch-status ${status}`}>{text}</span>;
}

export function App() {
  const pageRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const closeMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [query, setQuery] = useState("");

  const activeMenu = menuCategories.find((category) => category.id === activeCategory) ?? menuCategories[0];
  const filteredBranches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return branches;
    return branches.filter((branch) => `${branch.name} ${branch.region}`.toLowerCase().includes(normalized));
  }, [query]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  const openMobileMenu = () => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setMenuOpen(true);
  };

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    closeMenuButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.from(".hero-logo-mark, .hero-copy > *, .order-console", {
        y: 28,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.to(".hero-food", {
        scale: 1.08,
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-stage",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((element) => {
        gsap.from(element, {
          y: 36,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".gallery-frame").forEach((element, index) => {
        gsap.from(element, {
          y: index % 2 ? 50 : 26,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
          },
        });
      });
    },
    { scope: pageRef },
  );

  return (
    <main ref={pageRef} className="site-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => scrollToId("fire")} aria-label="Go to top">
          <img src={mediaAssets.logo} alt="Ahmad Al Abdalla" />
        </button>
        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => scrollToId(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
        <a className="hotline" href="tel:1535">
          <Phone size={18} strokeWidth={2.4} />
          <span>1535</span>
        </a>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          onClick={openMobileMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <MenuIcon size={32} strokeWidth={2.5} />
        </button>
      </header>

      {menuOpen ? (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="mobile-menu open"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button ref={closeMenuButtonRef} className="close-menu" type="button" onClick={closeMobileMenu} aria-label="Close menu">
            <X size={28} />
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                closeMobileMenu();
                scrollToId(item.id);
              }}
            >
              {item.label}
            </button>
          ))}
          <a href="tel:1535">Call 1535</a>
        </div>
      ) : null}

      <section id="fire" className="hero-stage">
        <img
          className="hero-food"
          src={mediaAssets.heroSpread}
          alt="Ahmad Al Abdalla charcoal chicken spread"
          width={1600}
          height={1067}
          decoding="async"
          fetchPriority="high"
        />
        <FireTableCanvas />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-logo-mark">
            <img src={mediaAssets.logo} alt="" aria-hidden="true" />
            <span>Since 1987</span>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">
              <Flame size={16} /> Charcoal chicken, Lebanon first
            </p>
            <h1>Lebanon's charcoal chicken. Fired since 1987.</h1>
            <p>
              Whole grilled chicken, garlic bread, chilli, fries, ayran, and the sauce people remember before they
              remember the street.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="tel:1535">
                <Phone size={20} /> Call 1535
              </a>
              <button className="ghost-action" type="button" onClick={() => scrollToId("menu")}>
                View menu <ArrowUpRight size={18} />
              </button>
              <button className="ghost-action compact" type="button" onClick={() => scrollToId("branches")}>
                Find branch
              </button>
            </div>
          </div>

          <aside className="order-console" aria-label="Fast order console">
            <div className="console-head">
              <span>Hotline delivery</span>
              <strong>1535</strong>
            </div>
            <div className="console-ticket">
              <span>Ready order</span>
              <strong>Whole Charcoal Chicken</strong>
              <small>Garlic bread, chilli, fries, ayran</small>
            </div>
            <div className="console-items">
              <span>
                Chicken Whole <strong>$21</strong>
              </span>
              <span>
                Garlic Bread <strong>$2.5</strong>
              </span>
              <span>
                Ayran <strong>$2</strong>
              </span>
            </div>
            <a href="tel:1535">
              Start order <ArrowUpRight size={17} />
            </a>
          </aside>
        </div>

        <div className="fact-rail" aria-label="Brand facts">
          {siteFacts.map((fact) => (
            <span key={fact.label}>
              <strong>{fact.value}</strong>
              {fact.label}
            </span>
          ))}
        </div>
      </section>

      <section className="signature-strip reveal-block" aria-label="Signature orders">
          {signatureOrders.map((order, index) => (
          <article key={order.nameEn} className={index === 0 ? "wide" : ""}>
            <img src={order.image} alt="" aria-hidden="true" width={900} height={700} loading="lazy" decoding="async" />
            <div>
              <small>{order.price}</small>
              <h2>{order.nameEn}</h2>
              <span dir="rtl">{order.nameAr}</span>
              <p>{order.detail}</p>
            </div>
          </article>
        ))}
      </section>

      <section id="menu" className="menu-theatre">
        <div className="section-heading reveal-block">
          <p className="eyebrow dark">
            <ShoppingBag size={16} /> Menu theatre
          </p>
          <h2>The grill is the headline. The menu moves like an order counter.</h2>
        </div>

        <div className="menu-command reveal-block">
          <div className="category-tabs" aria-label="Menu categories">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                className={category.id === activeCategory ? "active" : ""}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={category.id === activeCategory}
              >
                <span>{category.nameEn}</span>
                <small>{category.nameAr}</small>
              </button>
            ))}
          </div>

          <div className="menu-ledger">
            <div className="ledger-head">
              <div>
                <small>{activeMenu.nameAr}</small>
                <h3>{activeMenu.nameEn}</h3>
                <p>{activeMenu.intro}</p>
              </div>
              <span>{activeMenu.items.length} items</span>
            </div>
            <div className="ledger-items">
              {activeMenu.items.map((item) => (
                <article key={`${activeMenu.id}-${item.nameEn}`} className={item.featured ? "featured" : ""}>
                  <div>
                    <strong>{item.nameEn}</strong>
                    <span dir="rtl">{item.nameAr}</span>
                  </div>
                  <em>{item.price}</em>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="branches" className="branch-finder">
        <div className="branch-copy reveal-block">
          <p className="eyebrow dark">
            <MapPin size={16} /> Branch finder
          </p>
          <h2>Find the nearest fire before the craving cools.</h2>
          <p>
            Search Lebanon branches or call the hotline. The path from appetite to pickup should feel immediate.
          </p>
        </div>

        <div className="branch-console reveal-block">
          <label className="search-box" htmlFor="branch-search">
            <span className="sr-only">Search branches</span>
            <Search size={18} />
            <input
              id="branch-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Beirut, Sidon, Khaldeh..."
              autoComplete="off"
            />
          </label>
          <div className="branch-list" aria-live="polite">
            {filteredBranches.length ? (
              filteredBranches.map((branch) => (
                <article key={`${branch.name}-${branch.region}`}>
                  <MapPin className="branch-pin" size={18} />
                  <div className="branch-details">
                    <strong>{branch.name}</strong>
                    <span>{branch.region}</span>
                  </div>
                  <div className="branch-card-meta">
                    <BranchStatus status={branch.status} />
                    {branch.status === "open" ? (
                      <div className="branch-actions">
                        <a href="tel:1535">{branch.callLabel}</a>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <strong>No branch found</strong>
                <span>Try Beirut, Sidon, Khaldeh, Aadshit, or Mount Lebanon.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="story" className="heritage-section">
        <figure className="reveal-block">
          <img
            src={mediaAssets.archive}
            alt="Ahmad Al Abdalla grilling chicken in 1987"
            width={900}
            height={1125}
            loading="lazy"
            decoding="async"
          />
          <figcaption>Adshit, Nabatieh. 1987.</figcaption>
        </figure>
        <div className="heritage-copy reveal-block">
          <p className="eyebrow">
            <Flame size={16} /> Origin story
          </p>
          <h2>The archive belongs beside the flame.</h2>
          <p>
            Before the hotline, branches, and delivery apps, the proof was simpler: chicken over charcoal, sauce on the
            table, and a name that travelled by appetite.
          </p>
          <div className="heritage-metrics">
            <span>
              <strong>39</strong>
              years of public memory
            </span>
            <span>
              <strong>63K</strong>
              social audience
            </span>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-wall">
        <div className="section-heading reveal-block">
          <p className="eyebrow dark">
            <ShoppingBag size={16} /> Food first
          </p>
          <h2>No filler. Every image should make the order easier.</h2>
        </div>
        <div className="gallery-grid">
          <figure className="gallery-frame tall">
            <img src={mediaAssets.sauceDip} alt="Chicken bite dipped into Ahmad Al Abdalla sauce" width={900} height={1200} loading="lazy" decoding="async" />
            <figcaption>Sauce memory</figcaption>
          </figure>
          <figure className="gallery-frame wide">
            <img src={mediaAssets.heroSpread} alt="Full Ahmad Al Abdalla food spread" width={1200} height={800} loading="lazy" decoding="async" />
            <figcaption>Table spread</figcaption>
          </figure>
          <figure className="gallery-frame">
            <img src={mediaAssets.sandwichBoard} alt="Chicken sandwich board with fries and pickles" width={900} height={700} loading="lazy" decoding="async" />
            <figcaption>Fast lunch</figcaption>
          </figure>
        </div>
      </section>

      <section className="order-finale">
        <div className="finale-copy reveal-block">
          <p className="eyebrow">
            <Phone size={16} /> Order now
          </p>
          <h2>1535 should feel impossible to miss.</h2>
          <p>Hotline, branches, menu, and proof all point to the same next action.</p>
          <div className="finale-actions">
            <a className="primary-action" href="tel:1535">
              <Phone size={20} /> Call 1535
            </a>
            <button className="ghost-action" type="button" onClick={() => scrollToId("branches")}>
              Find a branch <MapPin size={18} />
            </button>
          </div>
          <nav className="finale-socials" aria-label="Social media">
            <span>Follow the fire</span>
            <div>
              {socialLinks.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  <Icon size={18} strokeWidth={1.8} />
                  <strong>{label}</strong>
                </a>
              ))}
            </div>
          </nav>
        </div>
        <div className="finale-proof reveal-block" aria-label="Fast order desk">
          <div className="hotline-desk">
            <div className="hotline-dial">
              <span>Call</span>
              <strong>1535</strong>
              <a href="tel:1535">
                <Phone size={18} /> Start the order
              </a>
            </div>

            <div className="order-route" aria-label="Order route">
              <span>
                <ShoppingBag size={18} />
                Pick chicken
              </span>
              <span>
                <Flame size={18} />
                Add garlic bread
              </span>
              <span>
                <MapPin size={18} />
                Choose branch
              </span>
            </div>

            <div className="branch-radar">
              <div>
                <small>Fast branch picks</small>
                <strong>Beirut, Khaldeh, Aadshit</strong>
              </div>
              <button type="button" onClick={() => scrollToId("branches")}>
                Open finder <ArrowUpRight size={17} />
              </button>
            </div>

            <div className="proof-notes">
              {reviews.slice(0, 2).map((review) => (
                <article key={review.name}>
                  <p>"{review.quote}"</p>
                  <strong>{review.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <img src={mediaAssets.logo} alt="Ahmad Al Abdalla" loading="lazy" decoding="async" />
        <div className="footer-meta">
          <span>
            <strong>Open daily</strong> 12 noon — 12 midnight
          </span>
          <a href="tel:1535">Call 1535</a>
          <a href="mailto:info@ahmadalabdalla.com">info@ahmadalabdalla.com</a>
        </div>
        <button className="footer-top" type="button" onClick={() => scrollToId("fire")} aria-label="Back to top">
          <ArrowUpRight size={19} strokeWidth={1.8} />
        </button>
      </footer>
    </main>
  );
}
