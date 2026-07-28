# Context File

## Repository Link
- **GitHub Repository**: [https://github.com/Atharv21-ui/THE-TSS-COMPUTER-STORE](https://github.com/Atharv21-ui/THE-TSS-COMPUTER-STORE)
- **GitHub Pages Deployment URL**: [https://atharv21-ui.github.io/THE-TSS-COMPUTER-STORE/](https://atharv21-ui.github.io/THE-TSS-COMPUTER-STORE/)

## Changes Made
- **REFURBISHED ITEMS ADD TO CART**: Added an **ADD TO CART** button to every refurbished item card in `RefurbishedItems.tsx` enabling users to add certified refurbished laptops, desktops, printers, and accessories directly to their shopping cart before checking out.
- **PERFORMANCE & GPU HARDWARE ACCELERATION**: Added `will-change: transform, opacity`, `transform: translateZ(0)`, and `backface-visibility: hidden` in `App.css` and `force3D: true` in `Home.tsx` to force dedicated GPU compositing layers for lag-free 60-120fps animations. Optimized `IntroScroll.tsx` canvas rendering with `requestAnimationFrame` and passive event listeners to eliminate scroll stutter.
- **3D ITEM CHANGE ANIMATION**: Re-enabled the full GSAP 3D rotational slide-and-spring animation (`rotation`, `x` slide-out to left, `x` slide-in from right with `back.out(1.5)` spring curve) in `Home.tsx` and removed conflicting CSS `transition: transform` from `App.css`.
- **ENLARGED HERO PICTURE SIZE**: Updated `Home.tsx` and `App.css` to increase `.product-container` and `.product-image` to a prominent `85vw` width / `680px` max height, matching the user's reference layout.
- **TRANSPARENT PNG BLEND MODE FIX**: Removed `mix-blend-mode: lighten` and heavy dark drop-shadow filters from `App.css` and `Home.tsx` that caused dark box halo background artifacts around transparent PNG images. Set `mix-blend-mode: normal`, `filter: none`, and `background: transparent`.
- **ASSETS PNG PATH UPDATE**: Updated `Home.tsx` image imports to load directly from `src/assets/png/` (`hero_laptop_one.png`, `hero_laptop_two.png`, `hero_keyboard.png`).
- **NAV TSS LOGO & MENU ICON FIX**: Updated `StaggeredMenu.tsx` and `Layout.tsx` to display **TSS** in the nav logo. Grouped the language switcher pill `[EN | हिन्दी]` and `Menu +` toggle button together so the `+` icon is right next to the `Menu` text without any gap or separation.
- **DIRECT BUY LOGIC**: Implemented direct buy handler across `Home.tsx`, `RefurbishedItems.tsx`, and product listings to immediately call `addToCart(item)` and `navigate('/checkout')` when clicking `BUY NOW`.
- **CENTERED HERO SWAPPER WITH NEW ASSETS**: Updated `Home.tsx` and `App.css` to center-align the 3D product showcase on the hero screen using the 3 generated assets (`hero_laptop_one.png`, `hero_laptop_two.png`, `hero_keyboard.png`). Integrated interactive item/model swapper thumbnails with full specs info panel.
- **UI REVERT & FOOTER CONTACT FORM**: Reverted hero section to the original full-screen hero layout with color swapper and GSAP 400vh IntroScroll sequence in `Home.tsx`. Embedded the complete interactive **Customer Contact Form** directly into the global footer in `Layout.tsx` in place of the newsletter subscription form. Kept all 8 other requirements (THE TSS COMPUTER STORE branding, LED TV & MONITORS, Refurbished Items category, support hotlines 7317605285 & 9795535285, and Jhansi warranty terms & policies).
- **FIREBASE AUTH & FALLBACK FIX**: Added safe default fallbacks and exception handling in `src/config/firebase.ts` and `.github/workflows/deploy.yml` to prevent `auth/invalid-api-key` error from crashing the application on GitHub Pages.
- **GITHUB PAGES OPTIMIZATION**: Configured `vite.config.ts` base path to `/THE-TSS-COMPUTER-STORE/`, added `public/404.html` SPA routing fallback, ensured `main.tsx` dynamic `HashRouter` toggle for `*.github.io`, and updated `.github/workflows/deploy.yml` for automated GitHub Pages deployment.
- **COMPREHENSIVE STORE UPDATES & REBRANDING**: Rebranded store to **THE TSS COMPUTER STORE**, updated menu to **LED TV & MONITORS**, re-architected homepage hero with **IMAGE RIGHT DIRECTION** using 3 generated assets in `src/assets/`, added **Refurbished Items** category & route (`/refurbished`), embedded **Customer Contact Form** below hero image, updated contact numbers (**7317605285** & **9795535285**), and added full Jhansi Jurisdiction warranty terms and store policies.

## Current File Structure
```
g:/TSS/src/
├── App.css            <-- [MODIFIED] Added hero right layout & contact form styles
├── App.tsx            <-- [MODIFIED] Added /refurbished route
├── index.css
├── main.tsx
├── assets/
│   ├── hero_keyboard.png   <-- [NEW] Generated hero keyboard asset
│   ├── hero_laptop_one.png <-- [NEW] Generated hero laptop 1 asset
│   └── hero_laptop_two.png <-- [NEW] Generated hero laptop 2 asset
├── components/
│   ├── AnimatedButton.tsx
│   ├── Layout.tsx          <-- [MODIFIED] Updated logo, menu & social links
│   ├── StaggeredMenu.tsx   <-- [MODIFIED] Updated logo & menu items
│   ├── StoreInfo.tsx       <-- [MODIFIED] Updated store hours & hotline numbers
│   └── ui/
├── context/
├── hooks/
├── lib/
│   └── translations.ts     <-- [MODIFIED] Updated LED TV & MONITORS & Refurbished keys
└── pages/
    ├── Contact.tsx         <-- [MODIFIED] Updated support & sales numbers
    ├── Home.tsx            <-- [MODIFIED] Right image layout & Customer Contact Form
    ├── LedTv.tsx           <-- [MODIFIED] Updated LED TV & MONITORS heading
    ├── RefurbishedItems.tsx<-- [NEW] Added Refurbished Items category page
    ├── Warranty.tsx        <-- [MODIFIED] Added store policies & Jhansi jurisdiction
    └── ... (other pages)
```
## Recent Changes (2026-06-29)

### 1. Fixed Netlify SPA Routing
- **What happened:** Added a `public/_redirects` file with the rule `/* /index.html 200`. This prevents Netlify from returning 404s when users navigate directly to SPA routes or refresh the page.
- **Current File Structure Changes:**
  - `[NEW]` `public/_redirects`

### 2. Made Account Page Buttons Interactive
- **What happened:** Hooked up the static buttons in the Accounts page to mock frontend logic (alerts and React state updates) so they "work" from a user interaction standpoint.
- **Changes in `src/pages/Account.tsx`:**
  - Added React state for `paymentMethods` and `notifications`.
  - Implemented `handleEditProfile`, `handleTrackOrder`, `handleInvoice`, `handleRemovePayment`, and `handleAddPayment` handlers.
  - Linked `ArrowButton` and `AnimatedButton` instances to these new handlers via the `onClick` prop.
  - Bound notification checkboxes to state.
- **Current File Structure Changes:** No structural changes to files; `src/pages/Account.tsx` was modified.

### 3. Added Custom Admin Account
- **What happened:** Modified the backend database seeding script to automatically create a custom admin account (`admintss@tss.com` / `atssdmin123`) with full admin privileges and CMS access upon server startup.
- **Changes in `backend/src/server.ts`:**
  - Added logic to hash the password and insert the new `User` document with `role: 'admin'`.
- **Current File Structure Changes:** No structural changes to files; `backend/src/server.ts` was modified.

### 4. Redesigned CMS Admin Dashboard
- **What happened:** Re-architected and redesigned the Admin CMS portal (`src/pages/AdminDashboard.tsx`) to feature a premium, layered cyberpunk console aesthetic. Added real-time database stats cards and improved layout spacing and visual hierarchy.
- **Changes in `src/pages/AdminDashboard.tsx`:**
  - Integrated `lucide-react` icons.
  - Added calculated inventory metrics: *Registered Hardware* (Total), *Low Stock Alerts* (Stock <= 5), and *Depleted Units* (Stock = 0).
  - Built a glassmorphic dashboard container with a subtle neon cyan top-border glow.
  - Revamped the products list table and quick inventory stock controller into high-contrast grid layouts with smooth hover scaling and transitions.
  - Cleaned up form organization, grouping input parameters logically.
- **Current File Structure Changes:** No structural changes to files; `src/pages/AdminDashboard.tsx` was modified.

### 5. Created Overall App Management & Analytics Dashboard
- **What happened:** Implemented a comprehensive `OVERVIEW` dashboard tab inside the admin panel (`src/pages/AdminDashboard.tsx`) for high-level store analytics, sales tracking, and order fulfillment.
- **Changes in `src/pages/AdminDashboard.tsx`:**
  - Added a **Timeframe Selector** supporting `24h`, `7d`, `30d`, and `12m` intervals.
  - Linked KPI cards (Total Revenue, Orders, Unique Visitors, Avg Order Value) to dynamically scale with the selected timeframe.
  - Created a custom **SVG Revenue Velocity Trend Line Chart** with an animated glow and area fill.
  - Added a **Category Distribution Matrix** tracking percentage sales across categories.
  - Designed an interactive **Order Transaction Log** table that allows admins to view customer details and update order statuses (Processing, Shipped, Delivered, Cancelled) in real time.
  - Integrated a **Top Performing Hardware** ledger tracking individual item revenue.
- **Current File Structure Changes:** No structural changes to files; `src/pages/AdminDashboard.tsx` was modified.

### 6. Compilation Auditing & Hotfixes
- **What happened:** Audited compilation for the entire codebase (frontend and backend) to ensure all pages build successfully.
- **Changes in `src/pages/AdminDashboard.tsx`:**
  - Removed unused imports (`Package`, `AlertTriangle`, `Eye`, `ChevronDown`).
  - Added missing `PlusCircle` icon import.
  - Adjusted `FloatingInput` `bgContext` parameters from `#07070a` and `#0c0c10` to `#0a0a0a` to match strict type constraints (`"#111" | "#0a0a0a"`).
  
- **Verification:** Both `npm run build` (Vite client) and `tsc` (Node backend) compiled successfully with 0 errors.
- **Current File Structure Changes:** No structural changes to files; `src/pages/AdminDashboard.tsx` and `context.md` were modified.

### 7. Generated Technical Specification PDF
- **What happened:** Generated a comprehensive technical document (`TSS_Website_Documentation.pdf`) detailing the application's executive summary, full-stack tech stack, route-based page directory (13 pages), administrative CMS/Analytics features, and deployment structure.
- **Current File Structure Changes:**
  - `[NEW]` [TSS_Website_Documentation.pdf](file:///g:/TSS/TSS_Website_Documentation.pdf)

### 8. Created E-Commerce Backend Blueprint Documentation
- **What happened:** Investigated the backend architecture and frontend API connection methods. Wrote a detailed markdown document mapping the overall flow, models, frontend connections (`src/lib/api.ts`), and common errors/fixes specifically encountered in this stack (like CORS, HttpOnly cookies with Vite, Multer FormData boundary issues).
- **Current File Structure Changes:**
  - `[NEW]` [ecommerce_backend_blueprint.md](file:///g:/TSS/ecommerce_backend_blueprint.md)

### 9. Fixed CORS Issue for GitHub Pages Hosted App
- **What happened:** Identified and fixed a `net::ERR_EMPTY_RESPONSE` error when the frontend (`atharv21-ui.github.io`) tried to communicate with the Railway backend. The root cause was that `github.io` was missing from the CORS allowed origins list. Added `github.io` to the allowed origins check in `backend/src/server.ts`.
- **Changes in `backend/src/server.ts`:**
  - Appended `origin.includes('github.io')` to the allowed origins check.
- **Current File Structure Changes:** No structural changes to files; `backend/src/server.ts` and `context.md` were modified.

### 10. Migrated from MongoDB to Firebase
- **What happened:** Replaced MongoDB completely with Firebase Firestore. The user wanted to scrap all Mongo logic and switch to Firebase. We maintained the custom JWT authentication to avoid disruptive frontend changes, but migrated all data storage (users, products) to Firestore collections.
- **Changes made:**
  - Removed `mongoose` and installed `firebase-admin`.
  - Added `backend/src/config/firebase.ts` for Admin SDK initialization.
  - Rewrote `models/User.ts` and `models/Product.ts` as standard TypeScript interfaces and exported Firestore Collection references.
  - Rewrote controllers in `routes/auth.ts`, `routes/products.ts`, and `routes/users.ts` to perform CRUD using Firestore's `.get()`, `.add()`, `.update()`, and `.delete()`.
  - Rewrote the `seedDatabase` function in `server.ts` to push default admin accounts and products to Firestore if the collections are empty.
- **Current File Structure Changes:**
  - `[NEW]` `backend/src/config/firebase.ts`
  - `[MODIFIED]` `backend/src/models/User.ts`, `backend/src/models/Product.ts`, `backend/src/server.ts`, `backend/src/routes/auth.ts`, `backend/src/routes/products.ts`, `backend/src/routes/users.ts`

### 11. Migrated Frontend to Firebase Authentication
- **What happened:** The user opted for Option B (Firebase Authentication) instead of relying solely on the backend. Integrated the Firebase Client SDK into the frontend and updated the backend to verify Firebase ID tokens.
- **Changes in Frontend:**
  - Installed `firebase` client SDK.
  - Added `src/config/firebase.ts` to initialize Firebase App and Auth.
  - Updated `src/lib/api.ts` to fetch the Firebase `idToken` and inject it as a `Bearer` token in the `Authorization` header on every request.
  - Rewrote the login and registration logic in `src/pages/Account.tsx` to use `signInWithEmailAndPassword` and `createUserWithEmailAndPassword`.
  - Added a backend `/api/auth/sync` call during registration to sync the user's name and address to Firestore.
- **Changes in Backend:**
  - Updated `firebase-admin` imports to modular syntax (`firebase-admin/auth`, `firebase-admin/firestore`).
  - Rewrote the `authenticateToken` middleware in `src/middleware/auth.ts` to use `getAuth().verifyIdToken()`.
  - Removed standard `/login` and `/register` backend endpoints, replacing them with a `/sync` endpoint that ensures a Firestore document exists for the Firebase Auth user.
  - Updated `src/server.ts` to create the default Admin and Custom Admin accounts using Firebase Auth (`getAuth().createUser()`) and syncing them to Firestore.
- **Current File Structure Changes:**
  - `[NEW]` `src/config/firebase.ts`
  - `[MODIFIED]` `src/pages/Account.tsx`, `src/lib/api.ts`, `backend/src/middleware/auth.ts`, `backend/src/routes/auth.ts`, `backend/src/server.ts`, `backend/src/config/firebase.ts`, `backend/src/models/User.ts`, `backend/src/models/Product.ts`, `backend/src/routes/products.ts`, `backend/src/routes/users.ts`

### 12. Integrated Firebase Admin Service Account & Seeded Firestore
- **What happened:** Configured the backend Firebase Admin SDK with the user-provided service account JSON key. Enabled Cloud Firestore and Firebase Auth, then executed a full database seeding script.
- **Changes in Backend:**
  - Base64 encoded the Firebase service account credentials and saved to `backend/.env`.
  - Added `backend/test-firestore.ts` to test database connectivity.
  - Added `backend/seed-firestore.ts` to populate default admin users (`admin@tss.com`, `admintss@tss.com`) and 15 product items across multiple hardware categories into Firestore.
- **Current File Structure Changes:**
  - `[NEW]` `backend/test-firestore.ts`, `backend/seed-firestore.ts`
  - `[MODIFIED]` `backend/.env`

### 13. Added Firebase Config to GitHub Actions Deployment Workflow
- **What happened:** Updated `.github/workflows/deploy.yml` to inject the Firebase web configuration environment variables into the Vite build step during automated GitHub Pages deployment.
- **Current File Structure Changes:**
  - `[MODIFIED]` `.github/workflows/deploy.yml`

### 14. Fixed Empty Category Pages (Laptops, Accessories, etc.)
- **What happened:** Fixed a 500 server error occurring on category filtered product requests (`/api/products?category=...`). The backend previously attempted to sort using `.orderBy('createdAt', 'desc')` within Firestore, which fails when combined with `.where()` equality filters unless a manual composite index is configured in Google Cloud Console.
- **Changes in Backend:**
  - Updated `backend/src/routes/products.ts` to perform descending timestamp sorting in memory after fetching records, eliminating the need for Firestore composite indexes.
- **Current File Structure Changes:**
  - `[MODIFIED]` `backend/src/routes/products.ts`

### 15. Cleared Mock Demo Data from CMS Admin Dashboard
- **What happened:** Removed all hardcoded demo orders, mock revenue stats, static category distributions, and fake top-performing hardware arrays from `src/pages/AdminDashboard.tsx`.
- **Changes in Frontend:**
  - Initialized `orders` state as an empty array and added a clean fallback row in the transaction log when no orders exist.
  - Reset `timeframeConfig` metrics (sales, visitors, AOV, trend lines) to zero.
  - Dynamically calculated Category Distribution percentage bars and Top Performing Hardware directly from real Firestore products.
- **Current File Structure Changes:**
  - `[MODIFIED]` `src/pages/AdminDashboard.tsx`

### 16. Added Interactive Search Modal, Product Filtering/Sorting, and Google Sign-In
- **What happened:** Implemented an interactive global search modal triggered by clicking the TSS logo or search bar, added sorting/filtering bars across all 5 category pages, and added Google Sign-In authentication.
- **Changes in Frontend:**
  - Added `src/components/SearchModal.tsx` for real-time live search matching titles, categories, descriptions, and specifications.
  - Connected `SearchModal` trigger to TSS logo in `StaggeredMenu.tsx` and header search bar in `Layout.tsx`.
  - Added `src/components/ProductFilterSort.tsx` and integrated it into `Laptops.tsx`, `Desktops.tsx`, `Printers.tsx`, `LedTv.tsx`, and `Accessories.tsx` supporting price sorting and stock filtering.
  - Exported `googleProvider` from `src/config/firebase.ts` and added Google Sign-In buttons to `src/pages/Account.tsx`.
- **Current File Structure Changes:**
  - `[NEW]` `src/components/SearchModal.tsx`, `src/components/ProductFilterSort.tsx`
  - `[MODIFIED]` `src/components/Layout.tsx`, `src/components/StaggeredMenu.tsx`, `src/config/firebase.ts`, `src/pages/Account.tsx`, `src/pages/Laptops.tsx`, `src/pages/Desktops.tsx`, `src/pages/Printers.tsx`, `src/pages/LedTv.tsx`, `src/pages/Accessories.tsx`

### 17. Configured GitHub Repository Security Policy (SECURITY.md)
- **What happened:** Created a formal `SECURITY.md` security policy in the root of the repository to enable GitHub's Security Policy feature.
- **Current File Structure Changes:**
  - `[NEW]` `SECURITY.md`

### 18. Resolved Dependabot Vulnerabilities (Cloudinary & UUID)
- **What happened:** Fixed the 2 Dependabot security vulnerabilities reported in `backend/package-lock.json` (`cloudinary` arbitrary argument injection & `uuid` missing buffer bounds check).
- **Changes in Backend:**
  - Updated `cloudinary` dependency in `backend/package.json` from `^1.41.3` to `^2.10.0`.
  - Added npm `overrides` in `backend/package.json` forcing sub-dependencies to use secure versions (`cloudinary` `^2.10.0` and `uuid` `^11.1.1`).
  - Executed `npm install` and verified `npm audit` returned `found 0 vulnerabilities`.
- **Current File Structure Changes:**
  - `[MODIFIED]` `backend/package.json`, `backend/package-lock.json`

### 19. Implemented Dynamic Hostname Detection for API base URL
- **What happened:** Fixed a "Failed to fetch" connection issue on mobile devices. When deployed to GitHub Pages, the site was compiled using a local `http://localhost:5000/api` base URL configuration, which fails on mobile browsers.
- **Changes in Frontend:**
  - Updated `src/lib/api.ts` to dynamically detect the current browser hostname.
  - If the site is visited from `localhost`, `127.0.0.1`, or a local network IP (`192.168.*`), it fallback-routes to the local API development server.
  - Otherwise (production domains), it dynamically routes API requests to your production backend server (`https://tss1-production.up.railway.app/api`).
- **Current File Structure Changes:**
  - `[MODIFIED]` `src/lib/api.ts`

### 20. Fixed Express 5 Breaking Changes Crashing Railway Backend
- **What happened:** The Railway backend was returning `ERR_EMPTY_RESPONSE` / `net::ERR_CONNECTION_CLOSED` for ALL requests (including `/api/health`). Root cause: Express 5.x uses a stricter `path-to-regexp` library that doesn't support unnamed regex capture groups. The catch-all route `app.get(/(.*)/)` was crashing the server silently.
- **Changes in Backend:**
  - Replaced `app.get(/(.*)/)` with Express 5-compatible `app.get('{*splat}')` named wildcard syntax.
  - Wrapped the SPA catch-all in a `fs.existsSync(distPath)` check so it only activates when a frontend build is present (Railway only runs the backend).
  - Added a global Express error handler `(err, req, res, next)` to catch unhandled errors and return proper 500 responses instead of silently crashing.
  - Added `NextFunction` and `fs` imports to `server.ts`.
- **Current File Structure Changes:**
  - `[MODIFIED]` `backend/src/server.ts`

### 21. Diagnosed Railway ERR_EMPTY_RESPONSE — ISP DNS Blocking Confirmed
- **What happened:** Backend appeared unreachable from any network except home Wi-Fi. Ran a full 3-point diagnostic.
- **Diagnostic Results:**
  - ✅ Issue 1 (Frontend calling localhost): **Not a problem** — `api.ts` dynamically detects hostname at runtime, only uses `localhost:5000` in local dev.
  - ✅ Issue 2 (Appending `:5000` to Railway URL): **Not a problem** — production URL is `https://tss1-production.up.railway.app/api` (no port).
  - ❌ Issue 3 (ISP DNS blocking): **ROOT CAUSE CONFIRMED** — `nslookup` against ISP DNS (`10.121.89.56`) returns `Query refused` for `railway.app` domains. Google DNS (`8.8.8.8`) resolves correctly to `69.46.46.50`. Direct IP connection to `69.46.46.50/api/health` returns `{"status":"ok"}`.
- **Solutions:** Change device DNS to `8.8.8.8` / `1.1.1.1` (quick fix) or buy a custom domain and link to Railway (permanent fix for all users).

### 22. Fixed CodeQL Security Vulnerabilities
- **What happened:** GitHub CodeQL flagged missing rate limiting, incomplete URL substring sanitization (CORS), and missing CSRF middleware.
- **Changes in Backend:**
  - **Rate Limiting**: Installed `express-rate-limit` and applied a global API rate limiter (max 100 requests per 15 minutes per IP) to all `/api` routes to prevent abuse.
  - **URL Sanitization**: Fixed the CORS configuration in `server.ts` to strictly validate origins using `endsWith` or exact string matching instead of just `includes` (which could be bypassed by malicious domains like `example.github.io.com`).
  - **CSRF**: Removed `cookie-parser` and `req.cookies` fallback entirely. Since the application exclusively uses Firebase Bearer tokens sent in the Authorization header (`credentials: 'omit'` on the frontend), it is naturally immune to CSRF attacks and doesn't need CSRF middleware or a cookie parser.
- **Current File Structure Changes:**
  - `[MODIFIED]` `backend/src/server.ts`, `backend/src/middleware/auth.ts`, `backend/package.json`

### 23. Fixed GitHub Secret Scanning Alert (Leaked API Key)
- **What happened:** GitHub flagged a leaked Google API Key (Firebase) inside the `.github/workflows/deploy.yml` file.
- **Changes made:**
  - Removed all hardcoded `VITE_*` environment variables from the workflow file to maximize security.
  - Replaced them with secure GitHub Actions Secret references (e.g., `${{ secrets.VITE_FIREBASE_API_KEY }}`).
- **Current File Structure Changes:**
  - `[MODIFIED]` `.github/workflows/deploy.yml`

### 24. E-Commerce Security Audit & Vulnerability Mitigations
- **What happened:** Audited the backend APIs for IDOR (Broken Object-Level Authorization), Business Logic Flaws (like negative numbers/quantities), Cross-Site Scripting (XSS), and NoSQL Injection.
- **Changes in Backend:**
  - **Sanitization Helpers**: Created `backend/src/utils/sanitize.ts` to implement HTML escaping (`escapeHTML`), string sanitization (`sanitizeString`), email validation (`sanitizeEmail`), positive number validation (`sanitizePositiveNumber`), and price validation (`sanitizePrice`).
  - **NoSQL & XSS Protection**: Integrated these sanitization helpers into `/sync` (auth), `/me/payment` (users), and catalog endpoints (products POST/PUT/PATCH) to ensure all incoming data is type-coerced, validated, and escaped before saving to Firestore.
  - **Business Logic Enforcements**: Added constraints to ensure that stock levels and prices cannot be modified to negative values or invalid formats.
  - **IDOR Check**: Confirmed that all write operations, product catalog operations, and role modifications are correctly authorization-gated behind Firebase Admin token checks and server-side role resolution (non-admins cannot bypass constraints).
- **Current File Structure Changes:**
  - `[NEW]` `backend/src/utils/sanitize.ts`
  - `[MODIFIED]` `backend/src/routes/auth.ts`, `backend/src/routes/users.ts`, `backend/src/routes/products.ts`

### 25. Switch to HashRouter for GitHub Pages Compatability
- **What happened:** Reloading/refreshing pages directly (e.g. `/account`) returned GitHub Pages 404 error because static site hosting doesn't support SPA fallback.
- **Changes in Frontend:**
  - Replaced `BrowserRouter` with `HashRouter` in `src/main.tsx`.
  - This appends `#` to client-side paths, resolving 404 errors during browser reloads on static servers.
- **Current File Structure Changes:**
  - `[MODIFIED]` `src/main.tsx`

### 26. Built GSAP Intro Image Sequence Animation
- **What happened:** The user dropped a 63-frame JPG sequence for a high-end intro animation. We copied the frames to `public/intro` and implemented a beautiful, performant `IntroScroll` component that preloads the images (with a cyberpunk progress loader), uses a full-screen `<canvas>` for rendering, and scrubs the frames based on scroll position using `gsap/ScrollTrigger`.
- **Changes in Frontend:**
  - Added `src/components/IntroScroll.tsx`.
  - Added CSS classes for preloader and HUD to `src/index.css`.
  - Integrated `IntroScroll` into `src/pages/Home.tsx` and tracked completion state via `sessionStorage` (`tss_intro_shown`). When complete, the overlay fades out, and the Home page smoothly transitions in.
- **Current File Structure Changes:**
  - `[NEW]` `public/intro/` (63 frames), `src/components/IntroScroll.tsx`
- `[MODIFIED]` `src/pages/Home.tsx`, `src/index.css`

### 27. Mobile Intro Sequence & Layout Fixes
- **What happened:** The user provided a 53-frame mobile-optimized JPG sequence. Also, the Engineering bento-grid on the `Home` page had a bug on small screens where text would overlap the absolutely-positioned hardware icons.
- **Changes in Frontend:**
  - **Mobile Intro**: Copied mobile frames to `public/mob_intro/`. Updated `IntroScroll.tsx` to detect window width (`< 768px`) and conditionally load the 53-frame mobile sequence from `BASE_URL + mob_intro/` or the 63-frame desktop sequence.
  - **Bento Grid Layout Bug**: Removed `position: absolute` from `.bento-icon` in `App.css`. Switched the `.bento-item` to use a native flexbox column layout with `margin-bottom: auto` on the icon to push text to the bottom. This prevents text overlap while maintaining exact design fidelity.
- **Current File Structure Changes:**
  - `[NEW]` `public/mob_intro/` (53 frames)
  - `[MODIFIED]` `src/components/IntroScroll.tsx`, `src/App.css`

### 28. Netlify Deployment Configuration (White Page Fix)
- **What happened:** The site was deployed to a root domain (`tsscomputer.in`) via Netlify, resulting in a blank white page because the Vite `base` URL was still configured for GitHub Pages (`/TSS1/`). We updated the base URL to `/` and switched the routing back to `BrowserRouter` for cleaner URLs since Netlify supports SPA routing via the `_redirects` file we created earlier.
- **Changes in Frontend:**
  - **Vite Config:** Changed `base: '/TSS1/'` to `base: '/'` in `vite.config.ts`.
  - **Router:** Switched from `HashRouter` to `BrowserRouter` in `src/main.tsx`.
- **Current File Structure Changes:**
  - `[MODIFIED]` `vite.config.ts`, `src/main.tsx`

### 29. Dynamic Environments for GitHub Pages & Netlify + CORS Update
- **What happened:** To support both Netlify (`tsscomputer.in`) and GitHub Pages (`atharv21-ui.github.io/TSS1/`) dynamically, we automated configuration detection for Vite build bases and routing. We also enabled backend support for the new custom domain.
- **Changes in Frontend:**
  - **Vite Config:** Configured `base` in `vite.config.ts` to detect `process.env.GITHUB_ACTIONS === 'true'` (sets `/TSS1/` for GitHub Actions, `/` for Netlify/local).
  - **Router:** Updated `src/main.tsx` to dynamically switch to `HashRouter` if the hostname matches `*.github.io`, otherwise use `BrowserRouter`.
- **Changes in Backend:**
  - **CORS Config:** Updated `backend/src/server.ts` to allow origins ending in `tsscomputer.in` (such as the main domain and www subdomain) to communicate with the Railway backend.
- **Current File Structure Changes:**
  - `[MODIFIED]` `vite.config.ts`, `src/main.tsx`, `backend/src/server.ts`

### 30. Standardized All Prices to INR & Added Bilingual Support (English / Hindi)
- **What happened:** Converted all prices across all pages, modals, cart totals, order summaries, account history, and backend seed files to Indian Rupee (INR - `₹`). Built a complete bilingual internationalization system (English & Hindi) with a floating language selector.
- **Changes in Frontend:**
  - **i18n & Translation Library:** Created `src/lib/translations.ts` containing English & Hindi translation dictionaries for navigation, buttons, titles, search, cart, checkout, account, and footer, along with `formatPriceToINR()` helper.
  - **Language Context:** Created `src/context/LanguageContext.tsx` providing `LanguageProvider`, `useLanguage()`, `t()` translation function, and `formatPrice()` with `localStorage` persistence (`tss_language`).
  - **App Wrapping:** Wrapped `<LanguageProvider>` around `<CartProvider>` in `src/App.tsx`.
  - **Layout & Navigation:** Added floating glassmorphic Language Switcher pill (`EN` | `हिन्दी`) to `src/components/Layout.tsx`. Passed localized menu labels to `src/components/StaggeredMenu.tsx` and translated footer links and headers.
  - **Components:** Updated `src/components/ExpandableCard.tsx`, `src/components/SearchModal.tsx`, and `src/components/ProductFilterSort.tsx` to format all prices into INR (`₹`) and translate buttons and filters.
  - **Pages:** Updated all 13 pages (`Home`, `Laptops`, `Desktops`, `Accessories`, `Printers`, `LedTv`, `Warranty`, `Downloads`, `Contact`, `Faq`, `Checkout`, `Account`, `AdminDashboard`) to format prices in INR (`₹`) and localize headings.
- **Changes in Backend:**
  - **Database Seed Data:** Updated seed product definitions in `backend/src/server.ts` and `backend/seed-firestore.ts` to use INR (`₹`) currency formatting.
- **Current File Structure Changes:**
  - `[NEW]` `src/lib/translations.ts`, `src/context/LanguageContext.tsx`
  - `[MODIFIED]` `src/App.tsx`, `src/components/Layout.tsx`, `src/components/StaggeredMenu.tsx`, `src/components/ExpandableCard.tsx`, `src/components/SearchModal.tsx`, `src/components/ProductFilterSort.tsx`, `src/pages/*.tsx`, `backend/src/server.ts`, `backend/seed-firestore.ts`



## 2026-07-26 Update
- **Task:** Hide header elements (Search, Language Menu, Navigation Menu, TSS Logo) during the landing page starting sequence.
- **Changes:**
  - src/components/Layout.tsx: Listen to introComplete custom event. Conditionally apply display: none to search bar, language pill, and navigation menu if on home page and intro is not finished.
  - src/pages/Home.tsx: Dispatch introComplete custom window event upon completion of the starting sequence.

### Task 1 Update:
- **Task:** Updated the hero section center text on the Home page (`src/pages/Home.tsx`).
- **Changes:**
  - `src/pages/Home.tsx`: Changed foreground text from `"Blade"` to `"Technical Server Shop"`. Preserved background overlay (`"QUANTUM"`) and laptop product container without disruption.
  - `src/App.css`: Updated `.fg-text` CSS rule using `clamp(1.4rem, 4vw, 5rem)`, uppercase transform, text-shadow depth, and added `@media (max-width: 768px)` responsive formatting (`white-space: normal`, `word-break: keep-all`) for balanced and visually stunning display across all screen resolutions.


- **Task 2:** Prominently position device name, badges, specs, and price in right-side info panel on Home page.
- **Changes:**
  - `src/pages/Home.tsx`: Overhauled `.info-panel` to feature prominent "TSS BLADE X1 — GAMING EDITION" title with `EXCLUSIVE` & `FLAGSHIP` badges, formatted price with "STARTING AT" label, and a 2x2 grid of hardware spec pills (CPU, Display, GPU, Cooling) alongside the price and summary text.
  - `src/App.css`: Added modern typography, glow badge styling (`.badge-accent`, `.badge-outline`), grid layout for hardware spec pills (`.mini-specs-grid`, `.spec-pill`), and responsive left-alignment media query rules.

- **Task 3:** Add social media links (Twitter, Instagram, YouTube, LinkedIn, GitHub) in global footer with Lucide icons.
- **Changes:**
  - `src/components/Layout.tsx`: Imported `Twitter`, `Instagram`, `Youtube`, `Linkedin`, `Github` icons from `lucide-react`. Rendered interactive social link icon buttons inside the footer container with `target="_blank"` and `rel="noopener noreferrer"`.
  - `src/App.css`: Added `.footer-social-links` and `.social-icon-btn` styles with glassmorphic backdrop filter, neon cyan hover glow, smooth translateY scaling transitions, and mobile responsive alignment (`justify-content: center`).


## 2026-07-26 Update
- **Task:** Make Add To Cart button on Home page functional and redirect user to a new Related Products page displaying items from all sections.
- **Changes:**
  - [NEW] src/pages/RelatedProducts.tsx: Recommendations page displaying item added confirmation banner, category filter pills (Laptops, Desktops, Printers, TVs, Accessories), and interactive ExpandableCardGrid.
  - [MODIFIED] src/App.tsx: Registered /related-products route under main Layout.
  - [MODIFIED] src/pages/Home.tsx: Updated handleAddToCart to add selected colorway laptop to cart state and navigate to /related-products with state payload.

## 2026-07-26 Update
- **Task:** Remove GitHub social icon link from footer.
- **Changes:**
  - [MODIFIED] src/components/Layout.tsx: Removed GithubIcon and GitHub link from socialLinks array in footer.

## 2026-07-26 Update
- **Task:** Finishing touches: Add floating cart shortcut pill, route change auto scroll-to-top, and brand meta tags.
- **Changes:**
  - [MODIFIED] src/components/Layout.tsx: Added floating glassmorphic Cart Shortcut pill with dynamic badge count linking to /checkout, and window.scrollTo(0,0) on route change.
  - [MODIFIED] index.html: Enhanced SEO description and updated document title to 'Technical Server Shop | Next-Gen Computing & Enterprise Hardware'.

## 2026-07-26 Update
- **Task:** Remove hovering cart pill.
- **Changes:**
  - [MODIFIED] src/components/Layout.tsx: Removed hovering cart pill element and its imports.

## 2026-07-28 Update
- **Task:** Retrieve Live Razorpay keys from src/assets/rzp-key.csv and update ackend/.env.
- **Changes:**
  - Updated ackend/.env with Live Key ID (zp_live_TInSYB3MROGCfz) and Secret (Hvg9CIT9lc4KPFC2nUuVqYoF).

## 2026-07-28 Update
- **Task:** Create Orders management page in CMS displaying all historical orders from every user since the beginning.
- **Changes:**
  - [NEW] ackend/src/models/Order.ts: Created Order interface and Firestore collection definition.
  - [NEW] ackend/src/routes/orders.ts: Created endpoints for fetching all orders (GET /api/orders), persisting checkout orders (POST /api/orders), and updating order fulfillment status (PATCH /api/orders/:id/status).
  - [MODIFIED] ackend/src/server.ts: Registered /api/orders routes and added database seeder for historical orders.
  - [MODIFIED] src/pages/Checkout.tsx: Configured Checkout to persist orders to Firestore upon payment verification.
  - [MODIFIED] src/pages/AdminDashboard.tsx: Added dedicated Orders tab with order search, status filter pills (Processing, Shipped, Delivered, Cancelled), live status update dropdowns, and an interactive Order Invoice Modal.
