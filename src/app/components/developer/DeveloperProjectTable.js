"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Building2, Home, Warehouse, ChevronDown, Hotel, Search, X } from "lucide-react";

const typeIcon = (type) => {
  if (type.toLowerCase().includes("apartment")) return Building2;
  if (type.toLowerCase().includes("villa")) return Home;
  if (type.toLowerCase().includes("townhouse")) return Warehouse;
  if (type.toLowerCase().includes("hotel") || type.toLowerCase().includes("residences")) return Hotel;
  return Building2;
};

const TypeBadge = ({ type }) => {
  const Icon = typeIcon(type);
  return (
    <div className="group relative inline-flex items-center mr-2">
      <Icon size={18} style={{ color: "#6b7280" }} />
      <div
        className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block whitespace-nowrap text-[11px] py-1 px-2.5 rounded-md pointer-events-none"
        style={{
          transform: "translateX(-50%)",
          background: "#1f2937",
          color: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        }}
      >
        {type}
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid #1f2937",
          }}
        />
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, options, value, onChange, t }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm w-full min-w-[140px] cursor-pointer"
        style={{
          background: t.isDark ? t.bgAlt : t.cardBg,
          border: `1px solid ${t.cardBorder || "#2a2d33"}`,
          color: value ? t.text : (t.textSecondary || "#6b7280"),
        }}
      >
        <span className="truncate">{value || label}</span>
        <ChevronDown
          size={14}
          style={{
            color: "#B68A35",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1 w-full rounded-lg overflow-hidden z-50 max-h-60 overflow-y-auto"
          style={{
            background: t.isDark ? t.bgAlt : t.cardBg,
            border: `1px solid ${t.cardBorder || "#2a2d33"}`,
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          <button
            onClick={() => { onChange(""); setOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm hover:opacity-80 cursor-pointer"
            style={{ color: t.textSecondary || "#6b7280" }}
          >
            All
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm hover:opacity-80 cursor-pointer"
              style={{
                color: value === opt ? "#B68A35" : t.text,
                fontWeight: value === opt ? 600 : 400,
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DeveloperProjectTable = ({ data }) => {
  const { t } = useTheme();
  const [openIndices, setOpenIndices] = useState([0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const scrollRef = useRef(null);

  const communities = data?.communities || [];
  const legacyCommunities = data?.legacy_communities || [];
  const legacyMarina = data?.legacy_marina || [];

  // Extract unique locations, types, statuses from data
  const locations = useMemo(() => communities.map((c) => c.name), [communities]);

  const allTypes = useMemo(() => {
    const set = new Set();
    communities.forEach((c) => c.projects.forEach((p) => p.types.forEach((t) => set.add(t))));
    return [...set].sort();
  }, [communities]);

  const allStatuses = useMemo(() => {
    const set = new Set();
    communities.forEach((c) =>
      c.projects.forEach((p) => {
        const s = p.status.toLowerCase();
        if (s.includes("completed") || s.includes("sold out")) set.add("Completed / Sold Out");
        else if (s.includes("under")) set.add("Under Construction");
        else if (s === "n/a") set.add("N/A");
        else set.add("Upcoming");
      })
    );
    return [...set].sort();
  }, [communities]);

  const hasActiveFilter = searchQuery || locationFilter || typeFilter || statusFilter;

  // Filter communities & projects
  const filteredCommunities = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return communities
      .filter((community) => {
        if (locationFilter && community.name !== locationFilter) return false;
        return true;
      })
      .map((community) => {
        const filtered = community.projects.filter((project) => {
          // Search
          if (query) {
            const nameMatch = project.name.toLowerCase().includes(query);
            const communityMatch = community.name.toLowerCase().includes(query);
            if (!nameMatch && !communityMatch) return false;
          }
          // Type filter
          if (typeFilter) {
            if (!project.types.some((t) => t.toLowerCase() === typeFilter.toLowerCase())) return false;
          }
          // Status filter
          if (statusFilter) {
            const s = project.status.toLowerCase();
            if (statusFilter === "Completed / Sold Out") {
              if (!s.includes("completed") && !s.includes("sold out")) return false;
            } else if (statusFilter === "Under Construction") {
              if (!s.includes("under")) return false;
            } else if (statusFilter === "N/A") {
              if (s !== "n/a") return false;
            } else if (statusFilter === "Upcoming") {
              if (s.includes("completed") || s.includes("sold out") || s.includes("under") || s === "n/a") return false;
            }
          }
          return true;
        });
        return { ...community, projects: filtered };
      })
      .filter((community) => community.projects.length > 0);
  }, [communities, searchQuery, locationFilter, typeFilter, statusFilter]);

  // Auto-expand & scroll on filter
  useEffect(() => {
    if (hasActiveFilter) {
      setOpenIndices(filteredCommunities.map((_, i) => i));
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [filteredCommunities, hasActiveFilter]);

  const accordionRefs = useRef({});

  const toggle = (i) => {
    const willOpen = !openIndices.includes(i);
    setOpenIndices((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
    if (willOpen && accordionRefs.current[i]) {
      setTimeout(() => accordionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };

  const isOpen = (i) => openIndices.includes(i);

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setTypeFilter("");
    setStatusFilter("");
    setOpenIndices([0]);
  };

  const statusColor = (status) => {
    if (status.toLowerCase().includes("completed") || status.toLowerCase().includes("sold out"))
      return "#16a34a";
    if (status === "N/A") return "#9ca3af";
    if (status.toLowerCase().includes("under")) return "#f59e0b";
    return "#3b82f6";
  };

  const totalFiltered = filteredCommunities.reduce((sum, c) => sum + c.projects.length, 0);

  return (
    <section style={{ background: t.bg }} className="py-4 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: t.text }}
          >
            Complete Emaar Project Database
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-3xl"
            style={{ color: t.textSecondary || "#6b7280" }}
          >
            Browse all current and past projects by Emaar Properties, from iconic towers to master communities. Data verified against DLD and RERA records.
          </p>
        </div>

        {/* Project Database Table H3 */}
        <h3
          className="text-xl sm:text-2xl font-bold mb-4"
          style={{ color: t.text }}
        >
          Project Database Table
        </h3>

        {/* Filter Bar */}
        <div
          className="rounded-xl p-3 sm:p-4 mb-4"
          style={{
            background: t.cardBg,
            border: `1px solid ${t.cardBorder || "#2a2d33"}`,
          }}
        >
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: t.textSecondary || "#6b7280" }}
              />
              <input
                type="text"
                placeholder="Search projects or communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg text-sm outline-none"
                style={{
                  background: t.bg || "#111",
                  border: `1px solid ${t.cardBorder || "#2a2d33"}`,
                  color: t.text,
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <X size={14} style={{ color: t.textSecondary || "#6b7280" }} />
                </button>
              )}
            </div>

            {/* Dropdowns */}
            <FilterDropdown
              label="Location"
              options={locations}
              value={locationFilter}
              onChange={setLocationFilter}
              t={t}
            />
            <FilterDropdown
              label="Property Type"
              options={allTypes}
              value={typeFilter}
              onChange={setTypeFilter}
              t={t}
            />
            <FilterDropdown
              label="Status"
              options={allStatuses}
              value={statusFilter}
              onChange={setStatusFilter}
              t={t}
            />
          </div>

          {/* Active filter info */}
          {hasActiveFilter && (
            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${t.cardBorder || "#2a2d33"}` }}>
              <p className="text-xs" style={{ color: t.textSecondary || "#6b7280" }}>
                Showing <span className="font-semibold" style={{ color: t.text }}>{totalFiltered}</span> project{totalFiltered !== 1 ? "s" : ""} across <span className="font-semibold" style={{ color: t.text }}>{filteredCommunities.length}</span> communit{filteredCommunities.length !== 1 ? "ies" : "y"}
              </p>
              <button
                onClick={clearFilters}
                className="text-xs font-medium px-2 py-1 rounded-md cursor-pointer"
                style={{ color: "#B68A35" }}
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Accordion list */}
        <div
          ref={scrollRef}
          className="flex flex-col gap-2 max-h-[600px] sm:max-h-[800px] overflow-y-auto overflow-x-hidden pr-1"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: `${t.cardBorder || "#2a2d33"} transparent`,
          }}
        >
          {filteredCommunities.length === 0 ? (
            <div
              className="rounded-xl p-8 text-center"
              style={{
                background: t.cardBg,
                border: `1px solid ${t.cardBorder || "#2a2d33"}`,
              }}
            >
              <p className="text-sm mb-2" style={{ color: t.text }}>No projects match your filters</p>
              <p className="text-xs" style={{ color: t.textSecondary || "#6b7280" }}>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredCommunities.map((community, idx) => (
              <div
                key={community.name}
                ref={(el) => { accordionRefs.current[idx] = el; }}
                className="rounded-xl overflow-hidden flex-shrink-0"
                style={{
                  border: `1px solid ${t.cardBorder || "#2a2d33"}`,
                  background: t.cardBg,
                }}
              >
                {/* Accordion header */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left cursor-pointer"
                  style={{ background: "transparent" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="font-semibold text-sm sm:text-base"
                      style={{ color: t.text }}
                    >
                      {community.name}
                    </span>
                    {community.subtitle && (
                      <span
                        className="text-xs"
                        style={{ color: t.textSecondary || "#6b7280" }}
                      >
                        ({community.subtitle})
                      </span>
                    )}
                    <span
                      className="text-[11px] font-medium px-1.5 py-0.5 rounded-full ml-1"
                      style={{
                        color: "#B68A35",
                        background: "rgba(182, 138, 53, 0.12)",
                      }}
                    >
                      {community.projects.length}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    style={{
                      color: "#B68A35",
                      transform: isOpen(idx) ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>

                {/* Accordion body */}
                {isOpen(idx) && (
                  <div className="overflow-x-auto border-t w-full min-w-0" style={{ borderColor: t.cardBorder || "#2a2d33" }}>
                    <table className="w-full text-left text-sm min-w-[400px] sm:min-w-[500px]">
                      <thead>
                        <tr
                          style={{
                            borderTop: `1px solid ${t.cardBorder || "#2a2d33"}`,
                            borderBottom: `1px solid ${t.cardBorder || "#2a2d33"}`,
                            background: t.cardBg,
                          }}
                        >
                          <th
                            className="px-4 sm:px-6 py-2.5 font-medium text-xs uppercase tracking-wider"
                            style={{ color: t.textSecondary || "#6b7280" }}
                          >
                            Project Name
                          </th>
                          <th
                            className="px-4 sm:px-6 py-2.5 font-medium text-xs uppercase tracking-wider"
                            style={{ color: t.textSecondary || "#6b7280" }}
                          >
                            Property Type
                          </th>
                          <th
                            className="px-4 sm:px-6 py-2.5 font-medium text-xs uppercase tracking-wider"
                            style={{ color: t.textSecondary || "#6b7280" }}
                          >
                            Status / Handover
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {community.projects.map((project, pIdx) => (
                          <tr
                            key={pIdx}
                            style={{
                              borderBottom:
                                pIdx < community.projects.length - 1
                                  ? `1px solid ${t.cardBorder || "#2a2d33"}`
                                  : "none",
                            }}
                          >
                            <td
                              className="px-4 sm:px-6 py-3 font-medium text-sm whitespace-nowrap"
                              style={{ color: t.text }}
                            >
                              {project.name}
                            </td>
                            <td className="px-4 sm:px-6 py-3">
                              <div className="flex items-center gap-0">
                                {project.types.map((type, tIdx) => (
                                  <TypeBadge key={tIdx} type={type} />
                                ))}
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                              <span
                                className="text-xs font-medium px-2 py-0.5 rounded-full"
                                style={{
                                  color: statusColor(project.status),
                                  background: statusColor(project.status) + "18",
                                }}
                              >
                                {project.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <a
            href="#"
            className="inline-block rounded-xl px-6 py-3 font-semibold text-sm sm:text-base transition-opacity hover:opacity-95"
            style={{ background: "rgb(182, 139, 53)", color: "#fff" }}
          >
            Compare Emaar Communities
          </a>
          <p className="mt-2 text-xs sm:text-sm" style={{ color: t.textSecondary || "#6b7280" }}>
            Get a side-by-side comparison showing how Emaar communities stack up on pricing, amenities, and ROI.
          </p>
        </div>

        {/* Legacy communities - side by side */}
        <div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 rounded-xl p-4 sm:p-6"
          style={{
            border: `1px solid rgba(182,138,53,0.25)`,
            background: "rgba(182,138,53,0.06)",
          }}
        >
          <div>
            <h4
              className="text-base sm:text-lg font-semibold mb-2"
              style={{ color: t.text }}
            >
              Emirates Living Legacy Communities
            </h4>
            <p className="text-xs mb-3" style={{ color: t.textSecondary || "#6b7280" }}>
              These master communities contain dozens of individual towers and villa clusters not individually listed in search results.
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              {legacyCommunities.map((c, i) => (
                <li key={i} className="text-sm" style={{ color: t.text }}>
                  <span className="font-medium">{c.name}</span>
                  <span style={{ color: t.textSecondary || "#6b7280" }}> — {c.detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4
              className="text-base sm:text-lg font-semibold mb-2"
              style={{ color: t.text }}
            >
              Dubai Marina Legacy Projects
            </h4>
            <ul className="list-disc list-inside space-y-1.5">
              {legacyMarina.map((name, i) => (
                <li key={i} className="text-sm" style={{ color: t.textSecondary || "#6b7280" }}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sources Metadata */}
        <div
          className="mt-6 rounded-lg p-4"
          style={{
            background: t.cardBg,
            border: `1px solid ${t.cardBorder || "#2a2d33"}`,
          }}
        >
          <p
            className="text-xs sm:text-sm font-semibold mb-2"
            style={{ color: t.text }}
          >
            Sources Metadata:
          </p>
          <ul className="text-xs sm:text-sm space-y-1 mb-3">
            <li style={{ color: t.textSecondary || "#6b7280" }}>
              <span className="font-medium">Primary Sources:</span> DLD Dubai REST App, RERA Project Tracker, Oqood Portal
            </li>
            <li style={{ color: t.textSecondary || "#6b7280" }}>
              <span className="font-medium">Secondary Sources:</span> Emaar Annual Report 2025, DLD Open Data 2025
            </li>
          </ul>
          <p
            className="text-xs"
            style={{ color: t.textSecondary || "#6b7280" }}
          >
            <span className="font-medium">Overall Last Verified:</span> 21 February 2026
          </p>
        </div>

        {/* Disclaimer */}
        <div
          className="mt-4 rounded-lg p-4"
          style={{
            background: t.cardBg,
            border: `1px solid ${t.cardBorder || "#2a2d33"}`,
          }}
        >
          <p
            className="text-xs sm:text-sm"
            style={{ color: t.text }}
          >
            <span className="font-semibold">Disclaimer:</span> Project status, prices, and performance data are verified against DLD and RERA records as of 21 February 2026. Capital appreciation calculated from launch price to current market value.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeveloperProjectTable;
