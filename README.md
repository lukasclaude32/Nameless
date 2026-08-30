# AXIO industrial website

Responzivní jednostránkový web pro průmyslovou firmu. Rozhraní je postavené podle dodaného desktopového návrhu a doplněné o mobilní variantu, navigaci, modální přehrávač a jemné animace při scrollování.

## Spuštění

```bash
npm install
npm run dev
```

Web poběží na [http://localhost:3000](http://localhost:3000). Samostatný náhled v rámu telefonu je na [http://localhost:3000/mobile-preview](http://localhost:3000/mobile-preview).

## Produkční sestavení

```bash
npm run build
npm run preview
```

## Technologie

- React a TypeScript
- Vite
- vlastní CSS bez UI frameworku
- inline SVG ikony a CSS kreslené dekorativní plochy
- Intersection Observer pro scroll animace

## Struktura

- `src/App.tsx` — obsah stránky, sekce a interakce
- `src/styles.css` — vizuální systém a responzivní pravidla
- `public/` — favicon a obrázek pro sdílení

Kontaktní údaje a některé reference jsou záměrně anonymizované. Před nasazením je potřeba je nahradit finálními daty a dodat produkční fotografie a video.
