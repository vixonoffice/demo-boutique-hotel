"use client";

import { useState } from "react";
import { menu, type MenuTab } from "@/data/content";

const tabs = Object.keys(menu) as MenuTab[];

export default function DiningMenu() {
  const [tab, setTab] = useState<MenuTab>("dinner");
  const current = menu[tab];

  return (
    <div>
      <div role="tablist" aria-label="Menus" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            id={`tab-${t}`}
            aria-selected={tab === t}
            aria-controls="menu-panel"
            tabIndex={tab === t ? 0 : -1}
            onClick={() => setTab(t)}
            onKeyDown={(e) => {
              const i = tabs.indexOf(tab);
              if (e.key === "ArrowRight") setTab(tabs[(i + 1) % tabs.length]);
              if (e.key === "ArrowLeft") setTab(tabs[(i - 1 + tabs.length) % tabs.length]);
            }}
            className={`rounded-full border px-5 py-3 text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-colors ${
              tab === t ? "border-bone bg-bone text-ink" : "border-bone/40 hover:border-bone"
            }`}
          >
            {menu[t].label}
          </button>
        ))}
      </div>

      <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} key={tab} className="mt-8">
        <p className="eyebrow mb-6 text-ember">{current.hours}</p>
        <ul className="divide-y divide-bone/20 border-y border-bone/20">
          {current.items.map((it, i) => (
            <li key={it.name} className="vl-fade flex items-baseline justify-between gap-6 py-5" style={{ ["--d" as string]: `${i * 0.07}s` }}>
              <div>
                <p className="t-display text-[clamp(1.5rem,2.2vw,2.1rem)] leading-tight">{it.name}</p>
                <p className="mt-1 text-sm text-mist">{it.note}</p>
              </div>
              <p className="shrink-0 text-lg tabular-nums">{it.price === "market" ? "market" : `€${it.price}`}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
