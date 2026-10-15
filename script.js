const CLUB_EMAIL = "Fzfz1425@gmail.com";
// تشغيل قائمة التنقل في الجوال
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
// عرض رسالة حالة للمستخدم
function showFormStatus(form, message, type = "success") {
  const status = form.querySelector(".form-status");
  if (!status) return;
  status.textContent = message;
  status.className = `form-status ${type}`;
  status.setAttribute("role", type === "error" ? "alert" : "status");
}
// التحقق من الحقول وتجهيز رسائل التواصل وطلبات الانضمام
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
