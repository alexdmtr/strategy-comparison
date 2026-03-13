# Strategy Comparison

A React + TypeScript dashboard for comparing quantitative trading strategy performance. Built with Create React App.

## Tech Stack

- **React 18** with TypeScript (CRA, target ES5)
- **AG Grid Enterprise** (v29) — sortable/filterable data table with set filters, context menus, CSV/Excel export
- **ECharts** via `echarts-for-react` — interactive time-series charts with zoom, tooltips, toolbox
- **MUI v5** (`@mui/material`, `@mui/icons-material`) — UI controls (dialogs, menus, switches, text fields, buttons)
- **Emotion** (`@emotion/react`, `@emotion/styled`) — CSS-in-JS engine for MUI
- **react-split-pane** — resizable vertical split layout
- **Jotai** (`jotai`) — atomic state management with storage persistence

## Project Structure

```
src/
├── App.tsx                          # Root layout: ThemeProvider, split pane with grid + charts
├── components/
│   ├── StrategyBreakdown.tsx        # Main AG Grid table with filters, search, context menu
│   ├── CompareStrategies.tsx        # Side-by-side 2-strategy comparison dialog
│   └── StrategyBreakdown.css        # RAG color classes for cell styling
├── charts/
│   ├── pnl.tsx                      # PnL + Turnover chart (also exports useSeries helper)
│   ├── MaxPositions.tsx             # Max positions + long/short count chart
│   └── DeltaPositions.tsx           # Delta positions + sum long/short chart
└── hooks/
    ├── useStrategies.ts             # Generates 26 mock strategies with random walk data
    ├── useDates.ts                  # Generates 1-year daily date range
    ├── useTheme.ts                  # Dark/light theme with localStorage persistence + MUI theme creation
    └── useMultiselect.ts            # Jotai atom with storage persistence for toggle state
```

## Commands

```bash
npm start        # Dev server on localhost:3000
npm test         # Jest tests (watch mode)
npm run build    # Production build
npm run deploy   # Build + deploy to GitHub Pages (gh-pages)
```

## Key Concepts

- **Strategy data** is randomly generated on mount (random walks for PnL, normal distributions for turnover/positions). The `Strategy` type is inferred from `useStrategies` return type.
- **Grid → Charts flow**: selecting rows in the AG Grid populates the right-pane charts (PnL/Turnover, Max Positions, Delta Positions). The `useSeries` hook aggregates selected strategies by summing field values per date.
- **Compare dialog**: right-click context menu on exactly 2 selected strategies opens a side-by-side comparison with individual charts.
- **Theme**: dark/light toggle persisted to localStorage via Jotai's `atomWithStorage` in `useTheme`. MUI `ThemeProvider` wraps the app with a `createTheme({ palette: { mode } })` theme. AG Grid uses `ag-theme-balham` / `ag-theme-balham-dark`. A `dark-theme` CSS class on the split pane wrapper handles AG Grid cell color overrides.
