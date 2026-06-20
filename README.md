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
  forced HTTPS, no inline scripts, no third-party trackers.
- **Online booking** — every "Book Appointment" button and the QR code route through
  `book.html` to the external booking system (see below).

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
- [x] Professional photo added at assets/img/doctor.webp
- [ ] Add a social share image at assets/img/og-image.png (1200x630)


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
- The CSP allows only same-origin assets and Google Fonts. If you add other services
  (e.g. an embedded map), update the CSP in **both** _headers and .htaccess.
- No analytics or trackers are included by default (privacy-friendly).

## Online appointment booking & QR code

Every "Book Appointment" button and the QR code point to **`book.html`** (the redirect page),
which forwards to the secure online booking system:
`https://meet-my-doctor.firebaseapp.com/#/?doctor=dr-prabhakar-koregol-bangalore-cardiology`

- `book.html` is a lightweight **redirect page** and the **single source of truth** for the
  booking link. If the booking provider ever changes, **edit only the URL inside `book.html`**
  (3 spots: the `meta refresh`, the `canonical` link, and the fallback button). No buttons and
  no QR codes ever need updating.
- `assets/img/appointment-qr.png` and `appointment-qr.svg` are **QR codes that point to
  `book.html`**. Print them on cards/posters; patients scan to book. Because they point to the
  redirect page (not the booking provider directly), the QR never has to be reprinted if the
  booking link changes.
- The QR is also shown on the site in the "Book online instantly" panel of the contact section.

**Tip:** scan-test the QR with a phone before printing.

## Google reviews (live widget)

The "What our patients say" section (`#reviews`) uses **[Featurable](https://featurable.com)** —
a free, auto-updating Google Reviews widget (unlimited views, no watermark). One-time setup:

1. Sign up at [featurable.com](https://featurable.com) (free, no card needed).
2. Connect Dr. Koregol's **Google Business Profile** and create a widget — pick a
   **cards/grid** layout to match the site.
3. Copy the widget id it gives you (looks like `featurable-xxxxxxxx`).
4. In `index.html`, find `featurable-REPLACE_WITH_WIDGET_ID` and swap in your id.
5. (Optional) Replace the "Read all reviews on Google" link with Dr. Koregol's exact
   Google profile URL.

The widget loader script (`featurable.com/assets/bundle.js`) is already in `index.html`,
and the **CSP already allows** `featurable.com` / `*.googleusercontent.com` (reviewer photos)
in both `_headers` and `.htaccess`. If reviews don't appear, open the browser console — if you
see a CSP error naming a domain, add that domain to the `script-src`/`connect-src`/`img-src`
lists in both files.

> Switched to a different provider (Trustindex, Elfsight, EmbedSocial)? Replace the widget
> markup + script in `index.html` and update the CSP domains accordingly.

## WhatsApp button, sticky mobile bar & map

- **WhatsApp:** the floating green button uses `wa.me/919743463444` (the clinic number). If a
  dedicated WhatsApp line is used, update the number in the `.whatsapp-fab` link in `index.html`.
- **Sticky mobile bar:** a Call + Book Appointment bar appears at the bottom on phones only.
- **Google Map:** the locations section embeds a keyless Google Map of the Malleswaram clinic.
  CSP already allows `www.google.com` / `maps.google.com` frames in `_headers` and `.htaccess`.
- **Affiliations strip** and **"What to expect on your first visit"** section were added as
  trust/UX elements. Replace the affiliation names if any change.
