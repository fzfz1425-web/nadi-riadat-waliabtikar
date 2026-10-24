
/* =========================================
   نادي الابتكار وريادة الأعمال
   ملف JavaScript المشترك لجميع الصفحات
========================================= */

const CLUB_EMAIL = "Fzfz1425@gmail.com";

/* 1. الوضع الفاتح والداكن */

(function setupTheme() {
  const root = document.documentElement;

  const style = document.createElement("style");
  style.id = "club-theme-global-style";
  style.textContent = `
    .theme-toggle {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 42px !important;
      height: 42px !important;
      min-width: 42px !important;
      padding: 0 !important;
      margin: 5px !important;
      border: 1px solid #2DAFEB !important;
      border-radius: 50% !important;
      background: transparent !important;
      color: inherit !important;
      font-size: 22px !important;
      line-height: 1 !important;
      cursor: pointer !important;
      flex-shrink: 0 !important;
      z-index: 1000 !important;
    }

    .theme-toggle:hover {
      background: rgba(45,175,235,.15) !important;
    }

    html[data-theme="dark"] body {
      background: #101923 !important;
      color: #edf4fa !important;
    }

    html[data-theme="dark"] header,
    html[data-theme="dark"] .header,
    html[data-theme="dark"] .site-header,
    html[data-theme="dark"] .nav-wrap {
      background-color: #172532 !important;
      color: #edf4fa !important;
    }

    html[data-theme="dark"] main,
    html[data-theme="dark"] section,
    html[data-theme="dark"] .section,
    html[data-theme="dark"] .hero,
    html[data-theme="dark"] .page-hero {
      color: #edf4fa;
    }

    html[data-theme="dark"] .card,
    html[data-theme="dark"] .project-card,
    html[data-theme="dark"] .team-card,
    html[data-theme="dark"] .event-card,
    html[data-theme="dark"] .opportunity-card,
    html[data-theme="dark"] .journey-card {
      background: #1b2b3a !important;
      color: #edf4fa !important;
      border-color: #344b5e !important;
    }

    html[data-theme="dark"] h1,
    html[data-theme="dark"] h2,
    html[data-theme="dark"] h3,
    html[data-theme="dark"] p,
    html[data-theme="dark"] li,
    html[data-theme="dark"] label {
      color: inherit;
    }

    html[data-theme="dark"] .soft,
    html[data-theme="dark"] .home-opportunities {
      background: #14212d !important;
    }

    html[data-theme="dark"] footer,
    html[data-theme="dark"] .footer {
      background: #0b131b !important;
      color: #edf4fa !important;
    }

    html[data-theme="dark"] input,
    html[data-theme="dark"] textarea,
    html[data-theme="dark"] select {
      background: #172532 !important;
      color: #edf4fa !important;
      border-color: #496276 !important;
    }

    html[data-theme="dark"] .nav a,
    html[data-theme="dark"] .nav-links a {
      color: #edf4fa !important;
    }
  `;

  if (!document.getElementById("club-theme-global-style")) {
    document.head.appendChild(style);
  }

  function readTheme() {
    try {
      return localStorage.getItem("club-theme") || "light";
    } catch (error) {
      return "light";
    }
  }

  function applyTheme(theme) {
    const dark = theme === "dark";
    root.setAttribute("data-theme", dark ? "dark" : "light");

    try {
      localStorage.setItem("club-theme", dark ? "dark" : "light");
    } catch (error) {
      // يستمر التبديل دون حفظ الاختيار
    }

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.textContent = dark ? "☀️" : "🌙";
      button.title = dark ? "الوضع الفاتح" : "الوضع الداكن";
      button.setAttribute(
        "aria-label",
        dark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"
      );
      button.setAttribute("aria-pressed", String(dark));
    });
  }

  /* العثور على رؤوس الصفحات المختلفة */
  const headers = document.querySelectorAll(
    "header, .header, .site-header, .nav-wrap"
  );

  headers.forEach((header) => {
    if (header.querySelector(".theme-toggle")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.textContent = "🌙";
    button.title = "الوضع الداكن";
    button.setAttribute("aria-label", "التبديل إلى الوضع الداكن");

    const menuButton = header.querySelector(".menu-toggle");

    if (menuButton && menuButton.parentElement === header) {
      header.insertBefore(button, menuButton);
    } else {
      const nav = header.querySelector("nav, .nav, .nav-links");

      if (nav && nav.parentElement === header) {
        header.insertBefore(button, nav);
      } else {
        header.appendChild(button);
      }
    }
  });

  applyTheme(readTheme());

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".theme-toggle");
    if (!button) return;

    const current = root.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
})();

/* 2. قائمة الجوال */

(function setupMobileMenu() {
  document.querySelectorAll(".menu-toggle").forEach((button) => {
    if (button.dataset.menuReady === "true") return;
    button.dataset.menuReady = "true";

    button.addEventListener("click", () => {
      const navId = button.getAttribute("aria-controls");
      let nav = navId ? document.getElementById(navId) : null;

      if (!nav) {
        nav = button.nextElementSibling;
      }

      if (!nav) {
        const header = button.closest("header, .header, .site-header");
        nav = header?.querySelector(".nav, .nav-links, nav");
      }

      if (!nav) return;

      const opened = nav.classList.toggle("open");
      button.setAttribute("aria-expanded", String(opened));
    });
  });

  document.querySelectorAll(".nav a, .nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      const nav = link.closest(".nav, .nav-links");
      if (nav) nav.classList.remove("open");

      const header = link.closest("header, .header, .site-header");
      const button = header?.querySelector(".menu-toggle");

      if (button) button.setAttribute("aria-expanded", "false");
    });
  });
})();

/* 3. رسائل النماذج */

function showFormStatus(form, message) {
  let status = form.querySelector(".form-status");

  if (!status) {
    status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    form.appendChild(status);
  }

  status.textContent = message;
}

document.querySelectorAll(
  "form[data-mail-form], form[data-demo-form]"
).forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    showFormStatus(
      form,
      "شكرًا لك! هذا نموذج تجريبي، ولم يتم إرسال البيانات أو حفظها."
    );
  });
});

/* 4. سنة حقوق النشر */

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
