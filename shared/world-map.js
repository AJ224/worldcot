import * as d3 from "d3";
import { feature } from "topojson-client";

const DEFAULTS = {
  topoJsonUrl: "/data/world-110m.json",
  highlightsUrl: "/data/map-countries.json",
  containerId: "wc-world-map",
  detailsId: "wc-country-details"
};

function safeText(v) {
  if (v == null) return "";
  return String(v);
}

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function renderDetails(panel, country) {
  if (!panel) return;

  const title = panel.querySelector("[data-role='title']");
  const subtitle = panel.querySelector("[data-role='subtitle']");
  const notes = panel.querySelector("[data-role='notes']");
  const metrics = panel.querySelector("[data-role='metrics']");

  if (title) title.textContent = safeText(country?.name || "Country");
  if (subtitle) subtitle.textContent = safeText(country?.region || "");

  if (notes) {
    notes.innerHTML = "";
    (country?.notes || []).slice(0, 6).forEach((n) => {
      const li = el("li", "text-on-surface-variant text-sm leading-relaxed");
      li.textContent = safeText(n);
      notes.appendChild(li);
    });
  }

  if (metrics) {
    metrics.innerHTML = "";
    const entries = Object.entries(country?.metrics || {});
    if (!entries.length) {
      const p = el("p", "text-on-surface-variant text-sm");
      p.textContent = "More details coming soon.";
      metrics.appendChild(p);
      return;
    }

    const dl = el("dl", "grid grid-cols-1 sm:grid-cols-2 gap-3");
    entries.slice(0, 8).forEach(([k, v]) => {
      const wrap = el("div", "rounded-lg bg-surface-container-low border border-outline-variant/15 p-4");
      const dt = el("dt", "text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant");
      dt.textContent = safeText(k);
      const dd = el("dd", "text-primary font-semibold mt-2");
      dd.textContent = safeText(v);
      wrap.appendChild(dt);
      wrap.appendChild(dd);
      dl.appendChild(wrap);
    });
    metrics.appendChild(dl);
  }
}

function fitToContainer(width, height, projection, geojson) {
  projection.fitExtent(
    [
      [16, 16],
      [width - 16, height - 16]
    ],
    geojson
  );
  return d3.geoPath(projection);
}

export async function mountWorldMap(opts = {}) {
  const config = { ...DEFAULTS, ...opts };
  const container = document.getElementById(config.containerId);
  if (!container) return;

  const detailsPanel = document.getElementById(config.detailsId);
  const closeBtns = detailsPanel?.querySelectorAll("[data-role='close']");
  const openDetails = () => {
    detailsPanel?.classList.remove("hidden");
    detailsPanel?.setAttribute("aria-hidden", "false");
  };
  const closeDetails = () => {
    detailsPanel?.classList.add("hidden");
    detailsPanel?.setAttribute("aria-hidden", "true");
  };

  closeBtns?.forEach((b) => b.addEventListener("click", closeDetails));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDetails();
  });

  const [topology, highlightData] = await Promise.all([
    d3.json(config.topoJsonUrl),
    d3.json(config.highlightsUrl)
  ]);

  const countriesObj = topology?.objects?.countries;
  const countries = countriesObj ? feature(topology, countriesObj) : null;
  if (!countries) return;

  const highlights = (highlightData?.highlights || []).filter((c) => c?.iso3);
  const highlightByIso3 = new Map(highlights.map((c) => [c.iso3, c]));

  // NOTE: countries-110m.json doesn't include ISO3; name match is best-effort.
  const iso3ByName = new Map(
    highlights
      .filter((c) => c?.name)
      .map((c) => [String(c.name).toLowerCase(), c.iso3])
  );

  container.innerHTML = "";

  const width = 1000;
  const height = 520;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("class", "w-full h-auto block");

  const projection = d3.geoNaturalEarth1();
  const path = fitToContainer(width, height, projection, countries);

  svg.append("rect").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).attr("fill", "#f8faf5");

  const g = svg.append("g");

  const getFill = (d) => {
    const name = safeText(d?.properties?.name).toLowerCase();
    const iso3 = iso3ByName.get(name);
    return iso3 && highlightByIso3.has(iso3) ? "#c7edb4" : "#ecefea";
  };

  g.selectAll("path.country")
    .data(countries.features)
    .join("path")
    .attr("class", "country")
    .attr("d", path)
    .attr("fill", getFill)
    .attr("stroke", "#c3c8bc")
    .attr("stroke-width", 1)
    .style("cursor", (d) => {
      const name = safeText(d?.properties?.name).toLowerCase();
      return iso3ByName.has(name) ? "pointer" : "default";
    })
    .on("click", (event, d) => {
      const name = safeText(d?.properties?.name);
      const iso3 = iso3ByName.get(name.toLowerCase());
      if (!iso3) return;
      renderDetails(detailsPanel, highlightByIso3.get(iso3));
      openDetails();
    })
    .on("mouseenter", function (event, d) {
      const name = safeText(d?.properties?.name).toLowerCase();
      if (!iso3ByName.has(name)) return;
      d3.select(this).attr("fill", "#acd19a");
    })
    .on("mouseleave", function (event, d) {
      d3.select(this).attr("fill", getFill(d));
    });

}

// Auto-mount for pages that include this module
mountWorldMap();

