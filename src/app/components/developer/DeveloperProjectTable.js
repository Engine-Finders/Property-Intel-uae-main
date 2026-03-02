"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Building2, Home, Warehouse, ChevronDown, Hotel } from "lucide-react";

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

const DeveloperProjectTable = ({ data }) => {
  const { t } = useTheme();
  const [openIndices, setOpenIndices] = useState([0]);

  const communities = data?.communities || [];
  const legacyCommunities = data?.legacy_communities || [];
  const legacyMarina = data?.legacy_marina || [];

  const toggle = (i) => {
    setOpenIndices((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const isOpen = (i) => openIndices.includes(i);

  const statusColor = (status) => {
    if (status.toLowerCase().includes("completed") || status.toLowerCase().includes("sold out"))
      return "#16a34a";
    if (status === "N/A") return "#9ca3af";
    if (status.toLowerCase().includes("under")) return "#f59e0b";
    return "#3b82f6";
  };

  return (
    <section style={{ background: t.bg }} className="py-4 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h3
          className="text-xl sm:text-2xl font-bold mb-4"
          style={{ color: t.text }}
        >
          Project Database Table
        </h3>

        <div className="flex flex-col gap-2">
          {communities.map((community, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${t.cardBorder}`,
                background: t.cardBg,
              }}
            >
              {/* Accordion header */}
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left cursor-pointer"
                style={{ background: "transparent" }}
              >
                <div>
                  <span
                    className="font-semibold text-sm sm:text-base"
                    style={{ color: t.text }}
                  >
                    {community.name}
                  </span>
                  {community.subtitle && (
                    <span
                      className="ml-2 text-xs"
                      style={{ color: t.textSecondary || "#6b7280" }}
                    >
                      ({community.subtitle})
                    </span>
                  )}
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
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr
                        style={{
                          borderTop: `1px solid ${t.cardBorder}`,
                          borderBottom: `1px solid ${t.cardBorder}`,
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
                                ? `1px solid ${t.cardBorder}`
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
          ))}
        </div>

        {/* Legacy communities */}
        <div
          className="mt-4 rounded-xl p-4 sm:p-6"
          style={{
            border: `1px solid ${t.cardBorder}`,
            background: t.cardBg,
          }}
        >
          <h4
            className="text-base sm:text-lg font-semibold mb-2"
            style={{ color: t.text }}
          >
            Emirates Living Legacy Communities
          </h4>
          <p className="text-xs mb-3" style={{ color: t.textSecondary || "#6b7280" }}>
            These master communities contain dozens of individual towers and villa clusters not individually listed in search results.
          </p>
          <ul className="list-disc list-inside space-y-1.5 mb-6">
            {legacyCommunities.map((c, i) => (
              <li key={i} className="text-sm" style={{ color: t.text }}>
                <span className="font-medium">{c.name}</span>
                <span style={{ color: t.textSecondary || "#6b7280" }}> — {c.detail}</span>
              </li>
            ))}
          </ul>

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
    </section>
  );
};

export default DeveloperProjectTable;
