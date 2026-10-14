
const CLUB_EMAIL = "club@example.com";

// تشغيل قائمة التنقل في الجوال
document.querySelectorAll(".menu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const navId = button.getAttribute("aria-controls");
    const nav = document.getElementById(navId);

    if (!nav) return;

    const isOpen = nav.classList.toggle("open");

    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute(
      "aria-label",
      isOpen ? "إغلاق القائمة" : "فتح القائمة"
    );
  });
});

// تجهيز رسائل التواصل وطلبات الاهتمام بالانضمام
document.querySelectorAll("[data-mail-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const lines = [];

    for (const [key, value] of data.entries()) {
      lines.push(`${key}: ${value}`);
    }

    const subject =
      form.id === "join-form"
        ? "طلب اهتمام بالانضمام إلى نادي الابتكار وريادة الأعمال"
        : (
            data.get("subject") ||
            "رسالة إلى نادي الابتكار وريادة الأعمال"
          );

    const mailto =
      `mailto:${CLUB_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;

    const status = form.querySelector(".form-status");

    if (status) {
      status.textContent =
        "سيتم فتح تطبيق البريد لإكمال إرسال رسالتك.";
    }

    window.location.href = mailto;
  });
});
