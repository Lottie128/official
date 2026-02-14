# Performance Report

## Lighthouse Metrics (Desktop)

| Metric | Baseline | Final |
| --- | --- | --- |
| Performance | Not captured in this sandbox (preview server bind failure) | Not captured in this sandbox (preview server bind failure) |
| FCP | Not captured in this sandbox | Not captured in this sandbox |
| LCP | Not captured in this sandbox | Not captured in this sandbox |
| TBT | Not captured in this sandbox | Not captured in this sandbox |
| CLS | Not captured in this sandbox | Not captured in this sandbox |

Lighthouse CLI is wired via `bun run perf:lighthouse`, but this environment cannot bind a preview port (`Port ... is already in use`) so runtime metrics must be collected on a host that allows local HTTP binding.

## Bundle Size Comparison

| Asset Group | Baseline | Final |
| --- | --- | --- |
| Initial entry JS chunk | 998.14 KB (single chunk) / 301.69 KB gzip | 447.22 KB / 142.49 KB gzip |
| Main CSS | 68.72 KB / 11.67 KB gzip | 65.63 KB / 11.15 KB gzip |
| Total JS (all chunks) | 998.14 KB (single chunk) | 981.47 KB (split across lazy chunks) |

Initial entry JS dropped by ~55.2% while preserving behavior.

## Top 10 Contributors

### Initial Entry Chunk (rendered)

1. `.bun/react-dom@19.2.4+b1ab299f0a400331/node_modules/react-dom/cjs/react-dom-client.production.js` - 441.75 KB
2. `.bun/react-router@7.13.0+bf16f8eded5e12ee/node_modules/react-router/dist/development/chunk-JZWAC4HX.mjs` - 181.54 KB
3. `.bun/tailwind-merge@3.4.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs` - 52.39 KB
4. `.bun/sonner@2.0.7+bf16f8eded5e12ee/node_modules/sonner/dist/index.mjs` - 50.50 KB
5. `.bun/react@19.2.4/node_modules/react/cjs/react.production.js` - 15.00 KB
6. `/src/routes/home/index.tsx` - 11.80 KB
7. `.bun/@radix-ui+react-dialog@1.1.15+243b16c7711ca280/node_modules/@radix-ui/react-dialog/dist/index.mjs` - 10.94 KB
8. `.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/query.js` - 9.82 KB
9. `.bun/scheduler@0.27.0/node_modules/scheduler/cjs/scheduler.production.js` - 9.05 KB
10. `.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/queryClient.js` - 8.05 KB

### Total JS (rendered)

1. `.bun/react-dom@19.2.4+b1ab299f0a400331/node_modules/react-dom/cjs/react-dom-client.production.js` - 441.75 KB
2. `.bun/react-router@7.13.0+bf16f8eded5e12ee/node_modules/react-router/dist/development/chunk-JZWAC4HX.mjs` - 181.54 KB
3. `.bun/libphonenumber-js@1.12.36/node_modules/libphonenumber-js/metadata.min.json.js` - 118.31 KB
4. `.bun/gsap@3.14.2/node_modules/gsap/gsap-core.js` - 106.69 KB
5. `.bun/gsap@3.14.2/node_modules/gsap/ScrollTrigger.js` - 75.54 KB
6. `.bun/tailwind-merge@3.4.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs` - 52.39 KB
7. `.bun/sonner@2.0.7+bf16f8eded5e12ee/node_modules/sonner/dist/index.mjs` - 50.50 KB
8. `.bun/gsap@3.14.2/node_modules/gsap/CSSPlugin.js` - 41.86 KB
9. `.bun/@radix-ui+react-select@2.2.6+243b16c7711ca280/node_modules/@radix-ui/react-select/dist/index.mjs` - 40.32 KB
10. `/src/components/evolution-lab/quote-builder.tsx` - 34.57 KB

### Total Transferred Assets

1. `index-D3BSF_Tp.js` - 436.74 KB
2. `quote-builder-sLFlgF0O.js` - 371.48 KB
3. `gsap-Dc1XMSxe.js` - 68.33 KB
4. `index-INqBlLE3.css` - 64.07 KB
5. `ScrollTrigger-CZvEENR4.js` - 41.89 KB
6. `labs-CIKh2is6.js` - 16.25 KB
7. `about-Cl0MOsHT.js` - 11.44 KB
8. `contact-OSpu1YDn.js` - 8.18 KB
9. `dist-BuzvX4oI.js` - 7.73 KB
10. `label-DUPkTPn2.js` - 4.93 KB

## Minifier Comparison

| Minifier | Entry JS | Entry JS (gzip) | Quote Chunk | Quote Chunk (gzip) | Build Time |
| --- | --- | --- | --- | --- | --- |
| esbuild | 453.46 KB | 147.35 KB | 383.55 KB | 103.02 KB | 6.54s |
| terser | 447.22 KB | 142.49 KB | 380.39 KB | 100.14 KB | 19.00s |

Production build now defaults to `terser` for smaller shipped bytes.

## Top Changes Implemented

1. Added route-level lazy loading for non-home routes and intent-based route prefetching.
2. Deferred GSAP loading to runtime interaction hooks (removed from app bootstrap).
3. Lazy-loaded Labs quote builder (keeps `react-phone-number-input` and `libphonenumber-js` out of initial route).
4. Replaced monolithic `radix-ui` imports with package-scoped Radix modules.
5. Gated React Query Devtools to dev-only lazy loading.
6. Switched external font stylesheet loading to non-blocking preload pattern.
7. Added Lighthouse CI + bundle analysis tooling and generated bundle artifacts.
8. Added minifier A/B measurement and selected the smaller production output.

## Caching Guidance

Use immutable cache for hashed assets and short/no-cache for HTML:

- `Cache-Control: public, max-age=31536000, immutable` for `/assets/*.[hash].(js|css|...)`
- `Cache-Control: no-cache` (or short `max-age`) for `index.html`

Examples to apply at host/CDN layer:

- Nginx:
  - `location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }`
  - `location = /index.html { add_header Cache-Control "no-cache"; }`
- Cloudflare:
  - Cache Rule: path contains `/assets/` -> cache everything, edge TTL 1 year
  - Bypass Rule: `/index.html` -> bypass cache
- Vercel:
  - `headers` rule for `/assets/(.*)` with long immutable cache
  - `headers` rule for `/` and `/index.html` with `no-cache`
