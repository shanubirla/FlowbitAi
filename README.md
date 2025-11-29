

# 🌍 **AOI Creation App – Flowbit Frontend Engineer Internship Assignment**

**Candidate:** **Shanu Birla**
**Email:** **[shanubirlashanubirla@gmail.com](mailto:shanubirlashanubirla@gmail.com)**

A lightweight React + TypeScript single-page application that allows users to define **Areas of Interest (AOIs)** on an interactive map, manage them from a sidebar, and persist them locally.
Built as part of the **Frontend Engineer Internship Assignment** for **Flowbit Private Limited**.

---

# ✨ **Features**

* 🗺️ **Interactive Map**

  * OSM base layer
  * NRW WMS orthophoto layer
  * Click to select AOI location
* 📍 **AOI Creation**

  * Select a point on the map
  * Add name & description
  * Save & manage AOIs
* 📦 **Persistence**

  * AOIs stored in `localStorage`
  * Survive page refresh
* 🧭 **Sidebar Panel**

  * List of AOIs
  * Focus AOI on map
  * Delete AOIs
  * Toggle WMS layer visibility
* 🧪 **Automated Tests**

  * End-to-end tests using Playwright

---

# 🛠️ **Tech Stack**

| Category    | Technology              |
| ----------- | ----------------------- |
| Framework   | React (TypeScript)      |
| Bundler     | Vite                    |
| Styling     | Tailwind CSS            |
| Map Engine  | Leaflet + React-Leaflet |
| Persistence | localStorage            |
| Testing     | Playwright              |

---

# 📦 **Installation & Setup**

### **1. Install dependencies**

```bash
npm install
```

### **2. Start development server**

```bash
npm run dev
```

### **3. Run E2E tests**

```bash
npm run test:e2e
```

---

# 📁 **Project Structure**

```
src/
│── components/
│   ├── Header.tsx        # Top bar
│   ├── Sidebar.tsx       # AOI panel + list + layer toggle
│   └── MapView.tsx       # Map, WMS layer, markers, interactions
│
│── hooks/
│   └── useAoiStore.ts    # AOI state + localStorage sync
│
│── types/
│   └── aoi.ts            # AOI models & geometry types
│
│── App.tsx               # Layout & component orchestration
└── main.tsx              # Entry point
```

### Playwright Tests

```
playwright/
└── tests/
    ├── basic.spec.ts     # App loads & basic UI visibility
    └── aoi.spec.ts       # AOI creation flow
```

---

# 🗺️ **Mapping Architecture**

### **Why React-Leaflet**

* First-class WMS support
* Simple React component model
* Lightweight, easy to integrate
* Mature ecosystem

### **Layers Used**

* **OSM Tile Layer** – base map
* **NRW Orthophoto WMS Layer**
  `https://www.wms.nrw.de/geobasis/wms_nw_dop`

### **AOI Interaction Flow**

1. User clicks anywhere on the map
2. App captures latitude/longitude
3. Sidebar panel opens for AOI creation
4. AOI saved → marker rendered
5. AOI list updates (stored in localStorage)

Marker selection moves the map to the AOI.

---

# 🧠 **State Management (useAoiStore)**

Custom hook responsibilities:

* AOI array
* Selected AOI ID
* Draft AOI from map click
* `addAoi`, `removeAoi`, `updateAoi`, `setSelectedId`
* Serialization into `localStorage`

No Redux/Zustand needed — minimal, clean, scalable.

---

# 🧩 **Data Model**

### TypeScript Types

```ts
type GeometryType = "point" | "polygon";

interface AoiGeometry {
  type: GeometryType;
  coordinates: [number, number][];
}

interface Aoi {
  id: string;
  name: string;
  description?: string;
  geometry: AoiGeometry;
  createdAt: string;
  updatedAt: string;
}
```

### Schema Overview

```
AOI
├── id
├── name
├── description?
├── geometryType
├── coordinates[]
├── createdAt
└── updatedAt
```

---

# 🔌 **Hypothetical REST API (If backend existed)**

The frontend is structured to match a future real API:

* `GET /api/aois` → load AOIs
* `POST /api/aois` → create
* `PATCH /api/aois/:id` → update
* `DELETE /api/aois/:id` → remove

Today, these actions are simulated using **useAoiStore** and `localStorage`.

---

# 🧪 **Testing Strategy**

### ✔ **E2E Tests (Playwright)**

**basic.spec.ts**

* App loads
* Core UI renders
* Map is visible

**aoi.spec.ts**

* Click map → select point
* Name AOI
* Save AOI
* AOI appears in list

### Future Testing Additions

* Unit tests (Vitest) for useAoiStore
* Visual regression tests
* Error boundary tests
* WMS availability tests

---

# 🚀 **Performance Considerations**

If scaled to thousands of AOIs:

* Use Leaflet layers instead of many React components
* Memoize map elements
* Marker clustering
* Virtualized sidebar list
* Debounced interactions
* Optionally move to a WebGL renderer like MapLibre GL

---

# ⚙️ **Trade-offs**

* Implemented only point AOIs (polygon support planned).
* Hardcoded WMS configuration for simplicity.
* Lightweight custom store instead of Redux.
* Tailwind only — no large UI kit.

---

# 🧱 **Production-Ready Enhancements (Future Work)**

* Real backend with PostGIS
* User authentication
* Better validation (Zod + RHF)
* Accessibility improvements
* Error boundaries + logging
* CI/CD pipeline
* Dynamic WMS capabilities loader
* Switchable map styles

---

# 🎁 **Bonus Features Included**

* WMS layer toggle
* Persistent AOIs across reloads
* Clean ARIA-friendly form structure
* Automated E2E coverage

---

# ⏱️ **Time Spent (Approx.)**

| Task                   | Time     |
| ---------------------- | -------- |
| Project setup          | ~3 hrs   |
| Map + WMS integration  | ~2 hrs   |
| AOI logic + state      | ~4 hrs   |
| Sidebar & UX           | ~3 hrs   |
| Testing                | ~1 hr    |
| Documentation + polish | ~1–2 hrs |

---

# 🎥 **Demo Video**

👉 Add your video link here
*(e.g., Google Drive / Loom / YouTube)*

---

# 📝 **Closing Note**

This project is designed to be:

* Clear
* Maintainable
* Scalable
* Easy to extend
* True to the assignment requirements

If extended, it can support polygon editing, user authentication, multi-layer workflows, and backend persistence without major structural changes.

---


