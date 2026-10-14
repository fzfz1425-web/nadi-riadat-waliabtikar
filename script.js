
const CLUB_EMAIL = "club@example.com";

document.querySelectorAll("[data-mail-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const lines = [];

    for (const [key, value] of data.entries()) {
      lines.push(`${key}: ${value}`);
    }

    const subject = form.id === "join-form"
      ? "طلب اهتمام بالانضمام إلى نادي الابتكار وريادة الأعمال"
      : (data.get("subject") || "رسالة إلى نادي الابتكار وريادة الأعمال");

    const mailto =
      `mailto:${CLUB_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;

    const status = form.querySelector(".form-status");
    if (status) {
      status.textContent = "سيتم فتح تطبيق البريد لإكمال إرسال رسالتك.";
    }

    window.location.href = mailto;
  });
});
