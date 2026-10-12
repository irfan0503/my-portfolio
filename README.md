# Ahamed Irfan Portfolio

A responsive React portfolio built with Vite, Tailwind CSS, Lucide icons, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

## Customize before publishing

- Edit the profile, suggested technologies, project concepts, and social URLs in `src/data.js`.
- The listed skills are suggestions from the original brief. Remove any technology you do not use.
- Replace the three concept projects with real work and add real demo/repository URLs. Until configured, the project actions remain disabled.
- Add a real PDF at `public/resume.pdf` and set `resumeUrl: '/resume.pdf'` in `src/data.js` to enable the resume link.
- Add study dates and school completion year to the education timeline in `src/App.jsx` when known.
- Set `VITE_CONTACT_ENDPOINT` in a local `.env` file to a form service or backend endpoint that accepts JSON fields `name`, `email`, `subject`, and `message`. The form validates locally but does not claim to send anything until this endpoint is configured and responds successfully.
- Update the page URL in the Open Graph metadata in `index.html` if your deployment platform needs absolute social-preview URLs.

## Production build

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static hosting provider. Configure the contact endpoint as a build-time environment variable on your hosting platform if you enable form delivery.