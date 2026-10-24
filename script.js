
/* =====================================
   نادي الابتكار وريادة الأعمال
===================================== */

const CLUB_EMAIL = "Fzfz1425@gmail.com";

/* 1. تنسيقات الوضع الفاتح والداكن */

(function addThemeStyles() {
  if (document.getElementById("club-theme-styles")) return;

  const style = document.createElement("style");
  style.id = "club-theme-styles";

  style.textContent = `
    .theme-toggle {
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      min-width: 42px;
      padding: 0 !important;
      border: 1px solid #2DAFEB !important;
      border-radius: 50% !important;
      background: transparent !important;
      color: inherit !important;
      font-size: 22px !important;
      line-height: 1;
      cursor: pointer;
      flex-shrink: 0;
    }

    .theme-toggle:hover {
      background: rgba(45, 175, 235, .12) !important;
    }

    html[data-theme="dark"] body {
      background: #101923 !important;
      color: #edf4fa !important;
    }

    html[data-theme="dark"] header,
    html[data-theme="dark"] .header,
    html[data-theme="dark"] .site-header,
    html[data-theme="dark"] .nav,
    html[data-theme="dark"] .nav-links {
      background-color: #172532 !important;
      color: #edf4fa !important;
    }

    html[data-theme="dark"] main,
    html[data-theme="dark"] section,
    html[data-theme="dark"] .section,
    html[data-theme="dark"] .page-hero,
    html[data-theme="dark"] .hero,
    html[data-theme="dark"] .home-intro,
    html[data-theme="dark"] .home-journey {
      color: #edf4fa;
    }

    html[data-theme="dark"] .card,
    html[data-theme="dark"] .home-card,
    html[data-theme="dark"] .opportunity-card,
    html[data-theme="dark"] .journey-card,
    html[data-theme="dark"] .notice {
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

    html[data-theme="dark"] a:not(.button):not(.btn) {
      color: #70d2ff;
    }

    html[data-theme="dark"] input,
    html[data-theme="dark"] textarea,
    html[data-theme="dark"] select {
      background: #172532 !important;
      color: #edf4fa !important;
      border-color: #496276 !important;
    }

    html[data-theme="dark"] .soft,
    html[data-theme="dark"] .home-opportunities {
      background: #14212d !important;
    }

    html[data-theme="dark"] .footer,
    html[data-theme="dark"] footer {
      background: #0b131b !important;
      color: #edf4fa !important;
    }

    html[data-theme="dark"] .footer a,
    html[data-theme="dark"] footer a {
      color: #70d2ff;
    }

    html[data-theme="dark"] .menu-toggle {
      color: #edf4fa !important;
    }

    @media (max-width: 768px) {
      .theme-toggle {
        width: 40px;
        height: 40px;
        min-width: 40px;
      }
    }
  `;

  document.head.appendChild(style);
})();

/* 2. إعداد زر الشمس والقمر */

(function initThemeToggle() {
  const root = document.documentElement;

  function getTheme() {
    try {
      return localStorage.getItem("club-theme") || "light";
    } catch (error) {
      return "light";
    }
  }

  function applyTheme(theme) {
    const selected = theme === "dark" ? "dark" : "light";

    root.setAttribute("data-theme", selected);

    try {
      localStorage.setItem("club-theme", selected);
    } catch (error) {
      // يستمر التبديل حتى عند تعذر الحفظ
    }

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      const dark = selected === "dark";

      button.textContent = dark ? "☀️" : "🌙";
      button.title = dark ? "الوضع الفاتح" : "الوضع الداكن";
      button.setAttribute(
        "aria-label",
        dark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"
      );
      button.setAttribute("aria-pressed", String(dark));
    });
  }

  // إنشاء الزر في الصفحات التي لا تحتوي عليه
  document.querySelectorAll("header, .header, .site-header").forEach((header) => {
    if (header.querySelector(".theme-toggle")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.textContent = "🌙";
    button.setAttribute("aria-label", "التبديل إلى الوضع الداكن");

    const nav = header.querySelector("nav, .nav, .nav-links");

    if (nav && nav.parentElement === header) {
      header.insertBefore(button, nav);
    } else {
      header.appendChild(button);
    }
  });

  applyTheme(getTheme());

  // حدث موحّد حتى يعمل الزر الموجود أو الذي أنشأه الكود
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".theme-toggle");
    if (!button) return;

    const current = root.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
})();

/* 3. قائمة الجوال */

(function initMobileMenu() {
  document.querySelectorAll(".menu-toggle").forEach((button) => {
    if (button.dataset.menuReady === "true") return;
    button.dataset.menuReady = "true";

    button.addEventListener("click", () => {
      const navId = button.getAttribute("aria-controls");
      const nav = navId
        ? document.getElementById(navId)
        : button.nextElementSibling;

      if (!nav) return;

      const isOpen = nav.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.querySelectorAll(".nav a, .nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      const nav = link.closest(".nav, .nav-links");
      if (nav) nav.classList.remove("open");

      const header = link.closest("header");
      const button = header?.querySelector(".menu-toggle");

      if (button) button.setAttribute("aria-expanded", "false");
    });
  });
})();

/* 4. النماذج التجريبية */

function showFormStatus(form, message) {
  let status = form.querySelector(".form-status");

  if (!status) {
    status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("role", "status");
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

/* 5. سنة حقوق النشر */

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
