import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarCheck, ChevronDown, Menu } from 'lucide-react';
import { useSiteSettings, usePrograms, trackConversion } from '@/lib/cms';
import { PRODUCT_CATEGORIES } from '@/lib/product-categories';
import { ASSETS } from '@/lib/assets';
import { Button } from './ui/Button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from './ui/Sheet';

export function NoticeBar() {
  const { get } = useSiteSettings();
  const bar = get('notice_bar');
  if (!bar.enabled) return null;

  const isInternal = bar.link.startsWith('/');
  const inner = (
    <>
      <CalendarCheck className="h-3.5 w-3.5 text-electric-glow" />
      {bar.text}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  const cls =
    'group mx-auto flex h-9 w-full max-w-7xl items-center justify-center gap-2 px-4 text-[0.7rem] font-semibold tracking-[0.16em] uppercase';

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-ink text-white">
      {isInternal ? (
        <Link to={bar.link} className={cls} aria-label={bar.text}>
          {inner}
        </Link>
      ) : (
        <a href={bar.link} target="_blank" rel="noreferrer" className={cls} aria-label={bar.text}>
          {inner}
        </a>
      )}
    </div>
  );
}

export function Header() {
  const { get } = useSiteSettings();
  const logoUrl = get('logo').url || ASSETS.logo;
  const { programs } = usePrograms();
  const [openMenu, setOpenMenu] = useState<'programs' | 'memberships' | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const navBtnCls =
    'h-10 whitespace-nowrap px-3 text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/5 hover:text-primary-foreground';
  const memberships = ['Silver', 'Golden', 'Diamond', 'Platinum'];

  const handleEnter = (menu: 'programs' | 'memberships') => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setOpenMenu(menu);
  };

  const handleLeave = () => {
    closeTimerRef.current = window.setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <header className="absolute inset-x-0 top-9 z-40 border-b border-primary-foreground/15">
      <nav
        className="relative mx-auto grid min-h-[4.8rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-x-4 px-5 sm:px-10"
        aria-label="Main"
      >
        <Link
          to="/#top"
          className="relative z-10 col-start-2 row-start-1 block shrink-0 justify-self-center"
          aria-label="Lakshit Sethiya home"
        >
          <img
            src={logoUrl}
            alt="AI Business Club by Lakshit Sethiya"
            width={192}
            height={40}
            decoding="async"
            className="h-auto w-40 object-contain sm:w-48"
          />
        </Link>

        <div className="col-span-3 row-start-2 hidden min-w-0 justify-self-center pb-3 xl:block">
          <nav aria-label="Desktop categories" className="relative z-10 flex max-w-none flex-1 items-center justify-center">
            <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
              {/* Programs dropdown */}
              <li
                className="relative"
                onMouseEnter={() => handleEnter('programs')}
                onMouseLeave={handleLeave}
              >
                <button
                  type="button"
                  data-state={openMenu === 'programs' ? 'open' : 'closed'}
                  aria-expanded={openMenu === 'programs'}
                  onClick={() => setOpenMenu(openMenu === 'programs' ? null : 'programs')}
                  className={`group inline-flex w-max items-center justify-center rounded-md cursor-pointer transition-colors focus:outline-none ${navBtnCls} bg-transparent data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-primary-foreground`}
                >
                  Programs{' '}
                  <ChevronDown
                    className={`relative top-[1px] ml-1 h-3 w-3 transition duration-300 ${
                      openMenu === 'programs' ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {openMenu === 'programs' && (
                  <div className="absolute left-0 top-full z-50 mt-1.5 w-96 overflow-hidden rounded-md border bg-popover p-3 text-popover-foreground shadow animate-in fade-in zoom-in-90">
                    <div className="mb-2 border-b border-border pb-2">
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <Link
                          key={cat}
                          to={`/programs?category=${encodeURIComponent(cat)}&mode=All&status=All`}
                          onClick={() => setOpenMenu(null)}
                          className="block rounded-md px-4 py-2 text-sm font-medium text-popover-foreground hover:bg-accent"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                    {programs.map((p) => (
                      <Link
                        key={p.id}
                        to={`/programs/${p.id}`}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-md px-4 py-3 text-sm font-medium text-popover-foreground hover:bg-accent"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Workshops */}
              <li>
                <Button asChild variant="ghost" className={navBtnCls}>
                  <Link to="/programs?category=Workshop&mode=All&status=All">Workshops</Link>
                </Button>
              </li>

              {/* WhatsApp Marketing Workshop Raipur */}
              <li>
                <Button asChild variant="ghost" className="h-10 whitespace-nowrap px-3 text-sm font-bold text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300">
                  <Link to="/whatsapp-workshop" className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>WhatsApp Workshop (Raipur)</span>
                  </Link>
                </Button>
              </li>

              {/* Memberships dropdown */}
              <li
                className="relative"
                onMouseEnter={() => handleEnter('memberships')}
                onMouseLeave={handleLeave}
              >
                <button
                  type="button"
                  data-state={openMenu === 'memberships' ? 'open' : 'closed'}
                  aria-expanded={openMenu === 'memberships'}
                  onClick={() => setOpenMenu(openMenu === 'memberships' ? null : 'memberships')}
                  className={`group inline-flex w-max items-center justify-center rounded-md cursor-pointer transition-colors focus:outline-none ${navBtnCls} bg-transparent data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-primary-foreground`}
                >
                  Memberships{' '}
                  <ChevronDown
                    className={`relative top-[1px] ml-1 h-3 w-3 transition duration-300 ${
                      openMenu === 'memberships' ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {openMenu === 'memberships' && (
                  <div className="absolute left-0 top-full z-50 mt-1.5 w-96 overflow-hidden rounded-md border bg-popover p-3 text-popover-foreground shadow animate-in fade-in zoom-in-90">
                    {memberships.map((m) => (
                      <a
                        key={m}
                        href={`https://wa.me/918370044449?text=${encodeURIComponent(
                          `Hi, I would like to become a ${m.toLowerCase()} member. Please share the details.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackConversion('whatsapp_click');
                          setOpenMenu(null);
                        }}
                        className="block rounded-md px-4 py-3 text-sm font-medium text-popover-foreground hover:bg-accent"
                      >
                        {m} membership
                      </a>
                    ))}
                  </div>
                )}
              </li>

              {/* Blogs */}
              <li>
                <Button asChild variant="ghost" className={navBtnCls}>
                  <Link to="/blogs">Blogs</Link>
                </Button>
              </li>

              {/* Gallery */}
              <li>
                <Button asChild variant="ghost" className={navBtnCls}>
                  <Link to="/#gallery">Gallery</Link>
                </Button>
              </li>

              {/* Results */}
              <li>
                <Button asChild variant="ghost" className={navBtnCls}>
                  <Link to="/#feedback">Results</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="col-start-3 row-start-1 justify-self-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="h-11 w-11 shrink-0 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[88%] overflow-y-auto border-primary-foreground/15 bg-primary text-primary-foreground sm:max-w-md">
              <SheetTitle className="mb-8 mt-5 font-display text-2xl tracking-normal text-primary-foreground">
                Explore
              </SheetTitle>
              <nav aria-label="All categories" className="space-y-2">
                <SheetClose asChild>
                  <Link
                    to="/programs?category=All&mode=All&status=All"
                    className="block border-b border-primary-foreground/15 py-3 font-display text-xl"
                  >
                    Programs
                  </Link>
                </SheetClose>
                {PRODUCT_CATEGORIES.filter((c) => c !== 'Workshop').map((cat) => (
                  <SheetClose key={cat} asChild>
                    <Link
                      to={`/programs?category=${encodeURIComponent(cat)}&mode=All&status=All`}
                      className="block py-2 text-sm text-primary-foreground/70"
                    >
                      {cat}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/programs?category=Workshop&mode=All&status=All"
                    className="block border-b border-primary-foreground/15 py-3 font-display text-xl"
                  >
                    Workshops
                  </Link>
                </SheetClose>
                {programs.map((p) => (
                  <SheetClose key={p.id} asChild>
                    <Link
                      to={`/programs/${p.id}`}
                      className="block py-2 text-sm text-primary-foreground/70 hover:text-electric-glow"
                    >
                      {p.title}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a
                    href="https://wa.me/918370044449?text=Hi%2C%20I%20would%20like%20to%20know%20about%20your%20memberships."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => void trackConversion('whatsapp_click')}
                    className="block border-b border-primary-foreground/15 py-3 font-display text-xl"
                  >
                    Memberships
                  </a>
                </SheetClose>
                {memberships.map((m) => (
                  <SheetClose key={m} asChild>
                    <a
                      href={`https://wa.me/918370044449?text=${encodeURIComponent(
                        `Hi, I would like to become a ${m.toLowerCase()} member. Please share the details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => void trackConversion('whatsapp_click')}
                      className="block py-2 text-sm text-primary-foreground/70 hover:text-electric-glow"
                    >
                      {m} membership
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link to="/blogs" className="block py-3 font-display text-xl">
                    Blogs
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/#gallery" className="block py-3 font-display text-xl">
                    Gallery
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/#feedback" className="block py-3 font-display text-xl">
                    Results
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href="https://youtube.com/@Socialselleracademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 font-display text-xl"
                  >
                    YouTube
                    <ArrowUpRight className="size-5" />
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/consultancy"
                    className="block py-3 font-display text-xl text-electric-glow"
                  >
                    Consult
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
