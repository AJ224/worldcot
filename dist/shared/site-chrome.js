(() => {
  const LOGO_SRC = "/logo.png";

  const navLinks = [
    { key: "home", label: "Home", href: "/" },
    { key: "about", label: "About Us", href: "/about/" },
    { key: "services", label: "Services", href: "/services/" },
    { key: "products", label: "Products", href: "/products/" },
    { key: "contact", label: "Contact", href: "/contact/" }
  ];

  const linkClass = (isActive) =>
    [
      "font-['Noto_Serif'] tracking-tight text-base pb-1 border-b-2 transition-colors duration-300",
      isActive
        ? "border-[#2E4D23] text-[#2E4D23]"
        : "border-transparent text-[#191c1a]/70 hover:text-[#2E4D23] hover:border-[#2E4D23]"
    ].join(" ");

  function renderNavbar(activeKey) {
    const desktopLinks = navLinks
      .map((l) => `<a class="${linkClass(l.key === activeKey)}" href="${l.href}">${l.label}</a>`)
      .join("");

    const mobileLinks = navLinks
      .map((l) => {
        const active =
          l.key === activeKey
            ? "bg-surface-container-low text-primary font-semibold"
            : "hover:bg-surface-container-low text-on-surface";
        return `<a class="mobile-menu-link block px-4 py-3 rounded-lg transition ${active}" href="${l.href}">${l.label}</a>`;
      })
      .join("");

    return `
      <header class="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3 pointer-events-auto">
          <div class="bg-[#f8faf5]/5 backdrop-blur-xl border border-white/15 shadow-sm shadow-black/5 rounded-full px-3 sm:px-4 py-4 flex justify-between items-center gap-2 sm:gap-3">
            <a class="flex items-center shrink-0" href="/" aria-label="Home">
              <img src="${LOGO_SRC}" alt="" class="h-16 w-16 object-contain" loading="eager" />
            </a>

            <nav class="hidden md:flex items-center space-x-6 lg:space-x-8 shrink-0">
              ${desktopLinks}
            </nav>

            <div class="flex items-center gap-2 sm:gap-3 shrink-0">
              <a class="hidden md:inline-flex bg-primary-container text-on-primary px-5 py-2 rounded-full font-medium text-sm active:opacity-80 transition-all items-center" href="/contact/">
                Enquire Now
              </a>
              <button
                id="mobile-menu-open"
                class="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-outline-variant/40 bg-surface-container-lowest text-primary active:opacity-80 transition"
                type="button"
                aria-label="Open menu"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div id="mobile-menu" class="fixed inset-0 z-[60] hidden md:hidden" aria-hidden="true">
        <button id="mobile-menu-overlay" class="absolute inset-0 bg-black/40" type="button" aria-label="Close menu"></button>
        <aside class="absolute right-0 top-0 h-full w-[min(22rem,85vw)] bg-surface-container-lowest text-on-surface shadow-2xl border-l border-outline-variant/30">
          <div class="p-6 flex items-center justify-between border-b border-outline-variant/20">
            <a class="flex items-center shrink-0" href="/" aria-label="Home">
              <img src="${LOGO_SRC}" alt="" class="h-11 w-11 object-contain" loading="lazy" />
            </a>
            <button
              id="mobile-menu-close"
              class="inline-flex items-center justify-center w-11 h-11 rounded-md border border-outline-variant/40 bg-surface text-primary active:opacity-80 transition"
              type="button"
              aria-label="Close menu"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <nav class="p-6 space-y-2">
            ${mobileLinks}
            <div class="pt-4">
              <a class="mobile-menu-link block w-full text-center bg-primary text-on-primary px-5 py-3 rounded-lg font-semibold" href="/contact/">Enquire Now</a>
            </div>
          </nav>
        </aside>
      </div>
    `;
  }

  function renderFooter() {
    return `
      <footer class="bg-primary text-white">
        <div class="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div class="space-y-5">
            <a class="flex items-center gap-3" href="/">
              <img src="${LOGO_SRC}" alt="Worldcot logo" class="h-12 w-12 object-contain" loading="lazy" />
              <span class="font-['Noto_Serif'] text-xl font-bold text-white">Worldcot International</span>
            </a>
            <p class="text-white/80 text-sm leading-relaxed max-w-sm">
              Global trade partner for premium natural fibers and agricultural commodities—built on clarity, reliability, and fair dealing.
            </p>
          </div>

          <div class="space-y-4">
            <h6 class="font-bold uppercase tracking-widest text-xs text-white/90">Company</h6>
            <ul class="space-y-2 text-sm">
              <li><a class="text-white/80 hover:text-white hover:underline" href="/about/">About Us</a></li>
              <li><a class="text-white/80 hover:text-white hover:underline" href="/services/">Services</a></li>
              <li><a class="text-white/80 hover:text-white hover:underline" href="/products/">Products</a></li>
            </ul>
          </div>

          <div class="space-y-4">
            <h6 class="font-bold uppercase tracking-widest text-xs text-white/90">Get in touch</h6>
            <ul class="space-y-2 text-sm">
              <li>
                <a class="text-white/80 hover:text-white hover:underline break-all" href="mailto:worldcottradingcorpn@gmail.com">
                  worldcottradingcorpn@gmail.com
                </a>
              </li>
              <li>
                <a class="text-white/80 hover:text-white hover:underline" href="/contact/">
                  Contact form / Enquire Now
                </a>
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <h6 class="font-bold uppercase tracking-widest text-xs text-white/90">Quick links</h6>
            <ul class="space-y-2 text-sm">
              <li><a class="text-white/80 hover:text-white hover:underline" href="/">Home</a></li>
              <li><a class="text-white/80 hover:text-white hover:underline" href="/products/raw-cotton/">Raw Cotton</a></li>
              <li><a class="text-white/80 hover:text-white hover:underline" href="/products/cotton-yarn/">Cotton Yarn</a></li>
              <li><a class="text-white/80 hover:text-white hover:underline" href="/products/cotton-waste/">Cotton Waste</a></li>
            </ul>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-8 py-8 border-t border-white/15 text-center">
          <p class="text-white/70 text-xs uppercase tracking-widest font-medium">
            © 2024 Worldcot International. All rights reserved.
          </p>
        </div>
      </footer>
    `;
  }

  function wireMobileMenu() {
    const openBtn = document.getElementById("mobile-menu-open");
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-menu-overlay");
    const closeBtn = document.getElementById("mobile-menu-close");

    if (!openBtn || !menu || !overlay || !closeBtn) return;

    const setOpen = (isOpen) => {
      menu.classList.toggle("hidden", !isOpen);
      menu.setAttribute("aria-hidden", String(!isOpen));
      openBtn.setAttribute("aria-expanded", String(isOpen));
      document.documentElement.classList.toggle("overflow-hidden", isOpen);
    };

    openBtn.addEventListener("click", () => setOpen(true));
    closeBtn.addEventListener("click", () => setOpen(false));
    overlay.addEventListener("click", () => setOpen(false));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    menu.querySelectorAll("a.mobile-menu-link").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });
  }

  function mount({ active = "" } = {}) {
    const navMount = document.getElementById("site-navbar");
    if (navMount) navMount.innerHTML = renderNavbar(active);
    wireMobileMenu();

    const footerMount = document.getElementById("site-footer");
    if (footerMount) footerMount.innerHTML = renderFooter();
  }

  window.WorldcotChrome = { mount };
})();

