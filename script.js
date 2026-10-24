
const CLUB_EMAIL = "Fzfz1425@gmail.com";

/* =========================
   تنسيقات الوضع الداكن والفاتح
========================= */

(function addThemeStyles() {
  if (document.getElementById("club-theme-styles")) return;

  const style = document.createElement("style");
  style.id = "club-theme-styles";

  style.textContent = `
    .theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      min-height: 42px;
      padding: 8px 13px;
      border: 1px solid #DCEBF2;
      border-radius: 12px;
      background: #F2FAFD;
      color: #085982;
      font-family: inherit;
      font-size: .92rem;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      transition: background .2s, color .2s, border-color .2s;
    }

    .theme-toggle:hover {
      background: #E5F7FF;
    }

    html[data-theme="dark"] {
      color-scheme: dark;
      --ink: #E7F1F7;
      --muted: #B5C8D5;
      --light: #142B39;
      --white: #0D1D28;
      --border: #294453;
      --dark: #2DAFEB;
      --blue: #63CCF8;
      --shadow: 0 12px 35px rgba(0,0,0,.22);
    }

    html[data-theme="dark"] body {
      background: #0D1D28 !important;
      color: #E7F1F7 !important;
    }

    html[data-theme="dark"] .top-logos,
    html[data-theme="dark"] .header,
    html[data-theme="dark"] .site-header,
    html[data-theme="dark"] .nav-wrap {
      background: #102633 !important;
      border-color: #294453 !important;
    }

    html[data-theme="dark"] .logo,
    html[data-theme="dark"] .nav a,
    html[data-theme="dark"] .header .logo,
    html[data-theme="dark"] .site-header a {
      color: #E7F1F7;
    }

    html[data-theme="dark"] .nav .nav-cta,
    html[data-theme="dark"] .btn:not(.btn-outline):not(.btn-light) {
      background: #0879A8;
      color: #FFFFFF;
    }

    html[data-theme="dark"] .hero,
    html[data-theme="dark"] .page-hero,
    html[data-theme="dark"] .section.soft,
    html[data-theme="dark"] .soft {
      background: linear-gradient(135deg, #102633, #0D1D28) !important;
    }

    html[data-theme="dark"] .section,
    html[data-theme="dark"] main {
      color: #E7F1F7;
    }

    html[data-theme="dark"] h1,
    html[data-theme="dark"] h2,
    html[data-theme="dark"] h3,
    html[data-theme="dark"] .section-heading h2,
    html[data-theme="dark"] .card h3,
    html[data-theme="dark"] .page-hero h1 {
      color: #80D7FA !important;
    }

    html[data-theme="dark"] p,
    html[data-theme="dark"] .hero p,
    html[data-theme="dark"] .section-heading p,
    html[data-theme="dark"] .card p,
    html[data-theme="dark"] .page-hero p {
      color: #B5C8D5;
    }

    html[data-theme="dark"] .card,
    html[data-theme="dark"] .form-card,
    html[data-theme="dark"] .image-note {
      background: #152D3B !important;
      color: #E7F1F7 !important;
      border-color: #294453 !important;
    }

    html[data-theme="dark"] .text-link {
      color: #80D7FA !important;
    }

    html[data-theme="dark"] .notice {
      background: #152D3B !important;
      color: #E7F1F7 !important;
      border-color: #2DAFEB !important;
    }

    html[data-theme="dark"] .form-card input,
    html[data-theme="dark"] .form-card textarea,
    html[data-theme="dark"] .form-card select,
    html[data-theme="dark"] input,
    html[data-theme="dark"] textarea,
    html[data-theme="dark"] select {
      background: #102633 !important;
      color: #E7F1F7 !important;
      border-color: #426071 !important;
    }

    html[data-theme="dark"] .menu-toggle,
    html[data-theme="dark"] .theme-toggle {
      background: #1A3949 !important;
      color: #80D7FA !important;
      border-color: #426071 !important;
    }

    html[data-theme="dark"] .nav {
      background-color: #102633;
    }

    html[data-theme="dark"] .footer {
      background: #07151E !important;
      color: #E7F1F7 !important;
    }

    html[data-theme="dark"] .footer p,
    html[data-theme="dark"] .footer small {
      color: #B5C8D5 !important;
    }

    html[data-theme="dark"] .btn-outline,
    html[data-theme="dark"] .btn-light {
      background: #193847 !important;
      color: #E7F1F7 !important;
      border-color: #426071 !important;
    }

    @media (max-width: 1000px) {
      .theme-toggle {
        font-size: .85rem;
        padding: 7px 10px;
      }
    }

    @media (max-width: 600px) {
      .theme-toggle {
        min-height: 38px;
        padding: 6px 9px;
      }
    }
  `;

  document.head.appendChild(style);
})();

/* =========================
   إضافة زر الوضع وتطبيق الاختيار
========================= */

function initThemeToggle() {
  const root = document.documentElement;
  const headers = document.querySelectorAll(
    ".header, .site-header"
  );

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("club-theme") || "light";
  } catch (error) {
    savedTheme = "light";
  }

  if (savedTheme !== "dark" && savedTheme !== "light") {
    savedTheme = "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("club-theme", theme);
    } catch (error) {
      // يستمر التبديل حتى لو كان التخزين غير متاح
    }

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      const isDark = theme === "dark";

      button.textContent = isDark
        ? "☀️ الوضع الفاتح"
        : "🌙 الوضع الداكن";

      button.setAttribute(
        "aria-label",
        isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"
      );

      button.setAttribute("aria-pressed", String(isDark));
    });
  }

  applyTheme(savedTheme);

  headers.forEach((header) => {
    if (header.querySelector(".theme-toggle")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme");
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });

    const menuButton = header.querySelector(".menu-toggle");
    const nav = header.querySelector("nav");

    if (menuButton) {
      header.insertBefore(button, menuButton);
    } else if (nav) {
      header.insertBefore(button, nav);
    } else {
      header.appendChild(button);
    }
  });
}

initThemeToggle();

/* =========================
   تشغيل قائمة التنقل في الجوال
========================= */

document.querySelectorAll(".menu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const navId = button.getAttribute("aria-controls");
    const nav = navId
      ? document.getElementById(navId)
      : button.parentElement.querySelector(".nav");

    if (!nav) return;

    const isOpen = nav.classList.toggle("open");

    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute(
      "aria-label",
      isOpen ? "إغلاق القائمة" : "فتح قائمة التنقل"
    );
  });
});

/* =========================
   رسائل حالة النماذج
========================= */

function showFormStatus(form, message, type = "success") {
  const status = form.querySelector(".form-status");
  if (!status) return;

  status.textContent = message;
  status.className = `form-status ${type}`;
  status.setAttribute("role", type === "error" ? "alert" : "status");
}

/* =========================
   نماذج التواصل والانضمام
========================= */

document.querySelectorAll("[data-mail-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showFormStatus(form, "", "success");

    if (!form.checkValidity()) {
      form.reportValidity();
      showFormStatus(
        form,
        "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.",
        "error"
      );
      return;
    }

    const submitButton = form.querySelector('[type="submit"]');
    const originalButtonText = submitButton?.textContent;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "جارٍ الإرسال...";
    }

    const data = new FormData(form);
    const formData = Object.fromEntries(data.entries());
    const name = String(formData.name || "").trim();
    const email = String(formData.email || "").trim();
    const message = String(formData.message || "").trim();

    if (!name || !email || !message) {
      showFormStatus(
        form,
        "يرجى التأكد من إدخال الاسم والبريد الإلكتروني والرسالة.",
        "error"
      );

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }

      return;
    }

    const subject =
      form.id === "join-form"
        ? "طلب اهتمام بالانضمام إلى نادي الابتكار وريادة الأعمال"
        : String(
            formData.subject ||
              "رسالة إلى نادي الابتكار وريادة الأعمال"
          ).trim();

    const payload = {
      recipient: CLUB_EMAIL,
      subject,
      data: formData,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("تعذر إرسال الطلب.");
      }

      form.reset();

      showFormStatus(
        form,
        "تم إرسال رسالتك بنجاح. شكرًا لتواصلك معنا.",
        "success"
      );
    } catch (error) {
      console.error("Form submission error:", error);

      showFormStatus(
        form,
        "تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقًا.",
        "error"
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
});
