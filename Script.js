/* =========================================================
   AADISH KUMAR — PORTFOLIO SCRIPT
   Sections: Config -> Scroll Reveal -> Scroll Buttons -> EmailJS Forms
   Nothing here is required for the page to work — if any block
   below is removed, the rest of the site still functions normally.
   ========================================================= */

/* ---------- EmailJS Config ---------- */
/* Public key is safe to expose client-side — this is how EmailJS is designed to work. */
const EMAILJS_PUBLIC_KEY = "xRMbBXqn3PvNmyNu1";
const EMAILJS_SERVICE_ID = "service_vqwf4v7";
const EMAILJS_TEMPLATE_CONTACT = "template_tvqadas"; // Template A — contact form
const EMAILJS_TEMPLATE_RESUME = "template_rs5napr";  // Template B — resume auto-send

if (window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/* ---------- Footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Scroll reveal on scroll ---------- */
// Fades + slides each .reveal element into place the first time it enters the viewport.
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate once, not on every scroll
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: if IntersectionObserver isn't supported, just show everything immediately.
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

/* ---------- "See my work" / "Contact me" buttons ---------- */
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.getAttribute("data-scroll-to"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ---------- Contact form (Template A) ---------- */
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactStatus.textContent = "Sending...";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CONTACT, contactForm)
      .then(() => {
        contactStatus.textContent = "Message sent — thanks for reaching out!";
        contactForm.reset();
      })
      .catch(() => {
        contactStatus.textContent = "Something went wrong. Please try again or email directly.";
      });
  });
}

/* ---------- Resume request form (Template B) ---------- */
const resumeForm = document.getElementById("resume-form");
const resumeStatus = document.getElementById("resume-status");

if (resumeForm) {
  resumeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    resumeStatus.textContent = "Sending...";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_RESUME, resumeForm)
      .then(() => {
        resumeStatus.textContent = "Check your inbox — the resume is on its way!";
        resumeForm.reset();
      })
      .catch(() => {
        resumeStatus.textContent = "Something went wrong. Please try again in a moment.";
      });
  });
}
