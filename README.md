# Dr. Prabhakar C. Koregol — Cardiology Website

A modern, fast, secure, and fully responsive website for **Dr. Prabhakar C. Koregol**,
Senior Interventional Cardiologist, Bengaluru.

Built as a **static site** (plain HTML, CSS and vanilla JS) — no server, no database,
no build step. This makes it extremely fast, cheap to host, and secure by design
(there is no server-side code to attack).

---

## What's included

- **Responsive single-page design** — works on phones, tablets and desktops.
- **Modern UI** — clean medical theme, animated hero, scroll reveals, sticky nav, mobile menu.
- **Accessibility** — semantic HTML, skip link, ARIA, keyboard support, reduced-motion support, focus styles.
- **SEO** — meta tags, Open Graph/Twitter cards, sitemap.xml, robots.txt, and
  schema.org Physician structured data for rich Google results.
- **Security** — strict Content-Security-Policy and security headers (_headers, .htaccess),
  forced HTTPS, no inline scripts, no third-party trackers, spam-protected contact form.
- **Appointment form** — client-side validation, honeypot anti-spam, and AJAX submission
  ready to connect to a no-code form backend.

## Structure

```
index.html            Main page
404.html              Custom not-found page
assets/css/styles.css Styles & design system
assets/js/main.js     Interactions (menu, scroll reveal, form)
assets/img/           Images & icons (add doctor.jpg + og-image.png)
_headers              Security headers (Netlify / Cloudflare Pages)
.htaccess             Security headers + HTTPS redirect (Apache / cPanel)
netlify.toml          Netlify config
robots.txt, sitemap.xml, site.webmanifest
```

## Before going live — content to verify

The text was drafted from public directory listings and **must be confirmed by Dr. Koregol**
before publishing:

- [ ] Exact qualifications, years and institutions
- [ ] Years of experience and the headline stats (24+ years, procedure counts, etc.)
- [ ] List of hospitals/clinics and their current addresses & timings
- [ ] Phone number(s) and any email address
- [ ] Memberships, fellowships and awards
- [ ] Add a real professional photo at assets/img/doctor.jpg
      (then replace the .photo-placeholder block in index.html with an <img>)
- [ ] Add a social share image at assets/img/og-image.png (1200x630)

## Connect the appointment form

The form currently posts to a placeholder. To receive submissions by email without a server:

1. Create a free account at Formspree (https://formspree.io) (or Web3Forms / Basin).
2. Copy your form endpoint URL.
3. In index.html, replace https://formspree.io/f/your-form-id in the form action.

That's it — no secrets live in this codebase.

## Deploy

**Option A — Netlify / Cloudflare Pages (recommended, free, auto-HTTPS):**
Connect this repository; the _headers and netlify.toml are picked up automatically.

**Option B — Existing cPanel / Apache host (keeps drprabhakarkoregol.in):**
Upload all files to public_html/. The .htaccess enforces HTTPS and security headers.

**Local preview:**
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Security notes

- All security headers are verifiable at securityheaders.com after deployment (target grade A).
- The CSP allows only Google Fonts and the Formspree endpoint. If you add other services
  (e.g. an embedded map), update the CSP in **both** _headers and .htaccess.
- No analytics or trackers are included by default (privacy-friendly).

## Online appointment booking & QR code

The "Book Appointment" buttons open the secure online booking system:
`https://meet-my-doctor.firebaseapp.com/#/?doctor=dr-prabhakar-koregol-bangalore-cardiology`

- `book.html` is a lightweight **redirect page** that forwards to that booking system.
  Use it as a short, stable link (`https://drprabhakarkoregol.in/book.html`) — if the
  booking provider ever changes, you only update this one file (and the buttons in `index.html`).
- `assets/img/appointment-qr.png` and `appointment-qr.svg` are **QR codes that point to
  `book.html`**. Print them on cards/posters; patients scan to book. Because they point to the
  redirect page (not the booking provider directly), the QR never has to be reprinted if the
  booking link changes.
- The QR is also shown on the site in the "Book online instantly" panel of the contact section.

**Tip:** scan-test the QR with a phone before printing.
