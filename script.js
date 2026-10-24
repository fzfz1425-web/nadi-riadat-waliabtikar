/* =====================================
   نادي الابتكار وريادة الأعمال
   JavaScript
===================================== */
const CLUB_EMAIL = "Fzfz1425@gmail.com";
/* =====================================
   1. الوضع الفاتح والداكن
===================================== */
(function initThemeToggle() {
  const root = document.documentElement;
  function getSavedTheme() {
    try {
      return localStorage.getItem("club-theme") || "light";
    } catch (error) {
      return "light";
    }
  }
  function applyTheme(theme) {
    const selectedTheme = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", selectedTheme);
    try {
      localStorage.setItem("club-theme", selectedTheme);
    } catch (error) {
      // يستمر تغيير المظهر حتى إذا تعذر الحفظ
    }
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      const isDark = selectedTheme === "dark";
      button.textContent = isDark ? "☀️" : "🌙";
      button.title = isDark
        ? "التبديل إلى الوضع الفاتح"
        : "التبديل إلى الوضع الداكن";
      button.setAttribute(
        "aria-label",
        isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"
      );
      button.setAttribute("aria-pressed", String(isDark));
    });
  }
  applyTheme(getSavedTheme());
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme");
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  });
})();
/* =====================================
   2. قائمة التنقل في الجوال والآيباد
===================================== */
(function initMobileMenu() {
  document.querySelectorAll(".menu-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const navId = button.getAttribute("aria-controls");
      const nav = navId
        ? document.getElementById(navId)
        : button.nextElementSibling;
      if (!nav) return;
      const isOpen = nav.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute(
        "aria-label",
        isOpen ? "إغلاق القائمة" : "فتح القائمة"
      );
    });
  });
  document.querySelectorAll(".nav a, .nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      const nav = link.closest(".nav, .nav-links");
      if (nav) {
        nav.classList.remove("open");
      }
      const header = link.closest("header");
      if (header) {
        const button = header.querySelector(".menu-toggle");
        if (button) {
          button.setAttribute("aria-expanded", "false");
          button.setAttribute("aria-label", "فتح القائمة");
        }
      }
    });
  });
})();
/* =====================================
   3. رسائل النماذج
   عرض تجريبي فقط، دون إرسال بيانات
===================================== */
function showFormStatus(form, message, type = "success") {
  let status = form.querySelector(".form-status");
  if (!status) {
    status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    form.appendChild(status);
  }
  status.textContent = message;
  status.dataset.type = type;
}
/* =====================================
   4. نموذج التواصل ونموذج الانضمام
===================================== */
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
      "شكرًا لك! هذا نموذج تجريبي للعرض، ولم يتم إرسال البيانات أو حفظها.",
      "success"
    );
  });
});
/* =====================================
   5. سنة حقوق النشر تلقائيًا
===================================== */
document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
