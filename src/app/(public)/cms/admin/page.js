// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";

const API_BASE = "https://134.255.232.233:8080/api";
const LOGIN_API = "/api/admin/login";

export default function AdminPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Theme classes
  const bgMain = darkMode ? "bg-[#232528]" : "bg-zinc-50";
  const bgCard = darkMode ? "bg-[#232528]" : "bg-white";
  const textPrimary = darkMode ? "text-white" : "text-zinc-900";
  const textSecondary = darkMode ? "text-[#c0c7d6]" : "text-zinc-600";
  const textMuted = darkMode ? "text-[#6b7a99]" : "text-zinc-500";
  const borderColor = darkMode ? "border-[#2a2d33]" : "border-zinc-200";
  const inputBg = darkMode ? "bg-[#232528]" : "bg-white";

  // Check session on mount
  useEffect(() => {
    const session = localStorage.getItem("adminSession");
    const savedTheme = localStorage.getItem("adminTheme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.expires > Date.now()) {
          setApiKey(parsed.apiKey);
          setIsLoggedIn(true);
          fetchProjects(parsed.apiKey);
        } else localStorage.removeItem("adminSession");
      } catch { localStorage.removeItem("adminSession"); }
    }
  }, []);

  useEffect(() => { localStorage.setItem("adminTheme", darkMode ? "dark" : "light"); }, [darkMode]);

  const handleLogin = async () => {
    setLoading(true); setMessage(null);
    try {
      const res = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminSession", JSON.stringify({ apiKey: data.apiKey, expires: Date.now() + 8 * 60 * 60 * 1000 }));
        setApiKey(data.apiKey); setIsLoggedIn(true); fetchProjects(data.apiKey);
        setMessage({ type: "success", text: "Welcome!" });
      } else setMessage({ type: "error", text: data.error || "Login failed" });
    } catch { setMessage({ type: "error", text: "Network error" }); }
    setLoading(false);
  };

  const fetchProjects = async (key) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/projects`, { headers: { "x-admin-key": key } });
      const data = await res.json(); setProjects(data.data || []);
    } catch { setMessage({ type: "error", text: "Failed to load projects" }); }
    setLoading(false);
  };

  const loadProject = async (slug) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/projects/${slug}`);
      setSelected(await res.json()); setActiveTab("basic");
    } catch { setMessage({ type: "error", text: "Failed to load project" }); }
    setLoading(false);
  };

  const saveChanges = async () => {
    if (!selected?.project?.slug || !apiKey) return;
    setLoading(true); setMessage(null);
    const payload = {
      name: selected.project?.name, status: selected.project?.status,
      construction_status: selected.project?.construction_status,
      launch_date: selected.project?.launch_date, handover_date: selected.project?.handover_date,
      price_from: selected.project?.pricing?.price_from, price_to: selected.project?.pricing?.price_to,
      price_per_sqft_from: selected.project?.pricing?.price_per_sqft_from,
      currency: selected.project?.pricing?.currency,
      lat: selected.project?.location?.lat, lng: selected.project?.location?.lng,
      address: selected.project?.location?.address,
      payment_plan_type: selected.project?.payment_plan?.type,
      booking_percent: selected.project?.payment_plan?.booking_percent,
      construction_percent: selected.project?.payment_plan?.construction_percent,
      handover_percent: selected.project?.payment_plan?.handover_percent,
      total_units: selected.project?.metrics?.total_units,
      master_community_units: selected.project?.metrics?.master_community_units,
      master_community_area_sqft: selected.project?.metrics?.master_community_area_sqft,
      yield_estimate: selected.project?.metrics?.yield_estimate,
      images: selected.project?.images, slide_labels: selected.project?.slide_labels,
      hero_section: selected.hero_section, unit_mix_section: selected.unit_mix_section,
      developer_section: selected.developer_section, target_buyer_section: selected.target_buyer_section,
      location_section: selected.location_section, financing_section: selected.financing_section,
      risks_section: selected.risks_section, construction_section: selected.construction_section,
      comparison_section: selected.comparison_section, reviews_section: selected.reviews_section,
      expert_tips_section: selected.expert_tips_section, faq_section: selected.faq_section,
      seo: selected.seo,
    };
    Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k]);
    try {
      const res = await fetch(`${API_BASE}/projects/${selected.project.slug}`, {
        method: "PUT", headers: { "Content-Type": "application/json", "x-admin-key": apiKey },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok) { setMessage({ type: "success", text: "✅ Saved!" }); fetchProjects(apiKey); }
      else setMessage({ type: "error", text: `❌ ${result.error || "Update failed"}` });
    } catch { setMessage({ type: "error", text: "❌ Network error" }); }
    setLoading(false);
  };

  const handleDelete = async (slug) => {
    if (!apiKey) return;
    setLoading(true); setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/projects/${slug}`, {
        method: "DELETE", headers: { "x-admin-key": apiKey },
      });
      const result = await res.json();
      if (res.ok) { setMessage({ type: "success", text: "✅ Deleted!" }); fetchProjects(apiKey); setSelected(null); }
      else setMessage({ type: "error", text: `❌ ${result.error || "Delete failed"}` });
    } catch { setMessage({ type: "error", text: "❌ Network error" }); }
    setLoading(false); setDeleteConfirm(null);
  };

  const updateField = (path, value) => {
    const parts = path.split(".");
    setSelected((prev) => {
      const clone = JSON.parse(JSON.stringify(prev || {}));
      let cur = clone;
      for (let i = 0; i < parts.length - 1; i++) { if (!cur[parts[i]]) cur[parts[i]] = {}; cur = cur[parts[i]]; }
      cur[parts[parts.length - 1]] = value; return clone;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession"); setIsLoggedIn(false); setApiKey(""); setProjects([]); setSelected(null);
    setMessage({ type: "success", text: "Logged out" });
  };

  // ============ LOGIN VIEW ============
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bgMain} p-4`}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B68A35] to-[#D4A843] shadow-lg shadow-[#B68A35]/20 mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Admin Portal</h1>
            <p className={`${textMuted} mt-2`}>Secure project management</p>
          </div>
          <div className={`${bgCard} rounded-3xl shadow-xl ${borderColor} border p-6 sm:p-8`}>
            <div className="space-y-5">
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} placeholder="Enter username" />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className={`w-full px-4 py-3 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} placeholder="Enter password" />
              </div>
              {message && <div className={`p-3 rounded-xl text-sm font-medium ${message.type === "success" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>{message.text}</div>}
              <button onClick={handleLogin} disabled={loading} className="w-full py-3.5 px-4 bg-gradient-to-r from-[#B68A35] to-[#D4A843] hover:from-[#A07828] hover:to-[#C49838] disabled:from-zinc-400 disabled:to-zinc-500 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</> : "Sign In"}
              </button>
            </div>
            <div className={`mt-6 pt-6 border-t ${borderColor}`}>
              <a href="/" className={`flex items-center justify-center gap-2 text-sm ${textMuted} hover:${textPrimary} transition-colors`}><span>←</span> Back to website</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ DASHBOARD VIEW ============
  return (
    <div className={`min-h-screen ${bgMain} ${textPrimary}`}>
      {/* Header */}
      <header className={`sticky top-0 z-20 ${bgCard}/80 backdrop-blur-md ${borderColor} border-b px-4 py-3.5`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B68A35] to-[#D4A843] flex items-center justify-center"><span className="text-lg">🏠</span></div>
            <div><h1 className="font-bold text-lg">Project Admin</h1><p className={`text-xs ${textMuted}`}>Manage listings</p></div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className={`w-10 h-10 rounded-xl flex items-center justify-center ${borderColor} ${darkMode ? 'bg-[#1a1c1f] text-[#B68A35]' : 'bg-zinc-100 text-zinc-600'}`}>
              {darkMode ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>}
            </button>
            <button onClick={handleLogout} className={`px-4 py-2 text-sm font-medium ${textSecondary} hover:${textPrimary} ${darkMode ? 'hover:bg-[#1a1c1f]' : 'hover:bg-zinc-100'} rounded-xl transition`}>Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
        {/* Project List */}
        <aside className="lg:col-span-1 space-y-4">
          <div className={`${bgCard} rounded-2xl ${borderColor} border p-4`}>
            <div className="flex items-center justify-between mb-3"><h2 className={`font-semibold ${textPrimary}`}>Projects</h2><span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-[#1a1c1f] text-[#c0c7d6]' : 'bg-zinc-100 text-zinc-600'}`}>{projects.length}</span></div>
            {loading && !selected ? <p className={`${textMuted}`}>Loading...</p> : (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {projects.map((p) => (
                  <button key={p.id} onClick={() => loadProject(p.slug)} className={`w-full text-left p-3.5 rounded-xl border transition ${selected?.project?.slug === p.slug ? "border-[#B68A35] bg-[#B68A35]/5" : `${borderColor} hover:border-zinc-400 ${darkMode ? 'hover:bg-[#1a1c1f]' : 'hover:bg-zinc-50'}`}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0"><div className={`font-medium text-sm truncate ${textPrimary}`}>{p.name}</div><div className={`text-xs ${textMuted} mt-0.5`}>{p.area?.name} • <span className={p.status === "completed" ? "text-emerald-500" : p.status === "off_plan" ? "text-[#B68A35]" : textMuted}>{p.status?.replace("_", " ")}</span></div></div>
                      {p.price_from && <div className={`text-xs font-semibold ${textPrimary}`}>AED {(parseInt(p.price_from) / 1e6).toFixed(1)}M</div>}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Edit Panel */}
        <section className="lg:col-span-2">
          <div className={`${bgCard} rounded-2xl ${borderColor} border shadow-sm`}>
            {selected ? (
              <>
                {/* Header */}
                <div className={`px-5 py-4 ${borderColor} border-b flex items-center justify-between`}>
                  <div><h2 className={`font-semibold text-lg ${textPrimary}`}>Edit: {selected.project?.name}</h2><p className={`text-sm ${textMuted}`}>{selected.project?.slug}</p></div>
                  <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${selected.project?.status === "completed" ? "bg-emerald-500/10 text-emerald-500" : selected.project?.status === "off_plan" ? "bg-[#B68A35]/10 text-[#B68A35]" : darkMode ? "bg-[#1a1c1f] text-[#c0c7d6]" : "bg-zinc-100 text-zinc-600"}`}>{selected.project?.status?.replace("_", " ")}</span>
                </div>

                {/* Tabs */}
                <div className={`px-5 pt-4 ${borderColor} border-b`}>
                  <div className={`flex gap-1 ${darkMode ? 'bg-[#1a1c1f]' : 'bg-zinc-100'} p-1 rounded-xl w-fit`}>
                    {[{ id: "basic", label: "Basic" }, { id: "pricing", label: "Pricing" }, { id: "content", label: "Content" }, { id: "seo", label: "SEO" }].map((tab) => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 text-sm font-medium rounded-lg transition ${activeTab === tab.id ? `${bgCard} ${textPrimary} shadow-sm` : `${textMuted} hover:${textPrimary}`}`}>{tab.label}</button>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <div className="p-5 space-y-5">
                  {activeTab === "basic" && (
                    <div className="space-y-4">
                      <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Project Name</label><input type="text" value={selected.project?.name || ""} onChange={(e) => updateField("project.name", e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} /></div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Status</label><select value={selected.project?.status || ""} onChange={(e) => updateField("project.status", e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`}><option value="off_plan">Off-Plan</option><option value="completed">Completed</option><option value="sold_out">Sold Out</option><option value="upcoming">Upcoming</option><option value="hot_demand">Hot Demand</option></select></div>
                        <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Address</label><input type="text" value={selected.project?.location?.address || ""} onChange={(e) => updateField("project.location.address", e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} /></div>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Latitude</label><input type="number" step="any" value={selected.project?.location?.lat || ""} onChange={(e) => updateField("project.location.lat", parseFloat(e.target.value))} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} /></div>
                        <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Longitude</label><input type="number" step="any" value={selected.project?.location?.lng || ""} onChange={(e) => updateField("project.location.lng", parseFloat(e.target.value))} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} /></div>
                        <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Total Units</label><input type="number" value={selected.project?.metrics?.total_units || ""} onChange={(e) => updateField("project.metrics.total_units", parseInt(e.target.value))} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} /></div>
                      </div>
                    </div>
                  )}

                  {activeTab === "pricing" && (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Price From (AED)</label><input type="number" value={selected.project?.pricing?.price_from || ""} onChange={(e) => updateField("project.pricing.price_from", parseInt(e.target.value))} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} /></div>
                        <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Currency</label><input type="text" value={selected.project?.pricing?.currency || "AED"} onChange={(e) => updateField("project.pricing.currency", e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition uppercase`} /></div>
                      </div>
                      <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Yield Estimate</label><input type="text" value={selected.project?.metrics?.yield_estimate || ""} onChange={(e) => updateField("project.metrics.yield_estimate", e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} placeholder="e.g., 5-6%" /></div>
                    </div>
                  )}

                  {activeTab === "content" && (
                    <div className="space-y-4">
                      <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Hero Subtitle</label><input type="text" value={selected.hero_section?.subtitle || ""} onChange={(e) => updateField("hero_section.subtitle", e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} /></div>
                      <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Images (comma-separated)</label><textarea value={selected.project?.images?.join(", ") || ""} onChange={(e) => updateField("project.images", e.target.value.split(",").map((s) => s.trim()))} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition resize-none`} rows={3} placeholder="/images/1.jpg, /images/2.jpg" /></div>
                    </div>
                  )}

                  {activeTab === "seo" && (
                    <div className="space-y-4">
                      <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Meta Title</label><input type="text" value={selected.seo?.meta_title || ""} onChange={(e) => updateField("seo.meta_title", e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} /></div>
                      <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Meta Description</label><textarea value={selected.seo?.meta_description || ""} onChange={(e) => updateField("seo.meta_description", e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition resize-none`} rows={3} /></div>
                      <div><label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>H1 Heading</label><input type="text" value={selected.seo?.h1 || ""} onChange={(e) => updateField("seo.h1", e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#B68A35] outline-none transition`} /></div>
                    </div>
                  )}

                  {/* Delete + Save */}
                  {message && <div className={`p-4 rounded-xl text-sm font-medium ${message.type === "success" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>{message.text}</div>}
                  <div className={`flex items-center justify-between pt-4 ${borderColor} border-t`}>
                    <button onClick={() => setDeleteConfirm(selected.project?.slug)} className="px-5 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-xl transition">🗑️ Delete</button>
                    <div className="flex gap-3">
                      <button onClick={() => setSelected(null)} className={`px-5 py-2.5 text-sm font-medium ${textSecondary} hover:${textPrimary} ${darkMode ? 'hover:bg-[#1a1c1f]' : 'hover:bg-zinc-100'} rounded-xl transition`}>Cancel</button>
                      <button onClick={saveChanges} disabled={loading} className="px-6 py-2.5 bg-gradient-to-r from-[#B68A35] to-[#D4A843] hover:from-[#A07828] hover:to-[#C49838] disabled:from-zinc-400 disabled:to-zinc-500 text-white font-semibold rounded-xl shadow-md transition flex items-center gap-2">
                        {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</> : "💾 Save"}
                      </button>
                    </div>
                  </div>

                  {/* Delete Confirmation */}
                  {deleteConfirm === selected.project?.slug && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <p className="text-xs text-red-400 mb-2">Permanently delete this project?</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleDelete(selected.project.slug)} className="flex-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition">Confirm Delete</button>
                        <button onClick={() => setDeleteConfirm(null)} className={`flex-1 px-3 py-1.5 ${darkMode ? 'bg-[#1a1c1f] hover:bg-[#232528]' : 'bg-zinc-100 hover:bg-zinc-200'} text-zinc-400 text-xs font-medium rounded-lg transition`}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className={`flex flex-col items-center justify-center h-80 ${textMuted}`}><div className={`w-16 h-16 rounded-2xl ${darkMode ? 'bg-[#1a1c1f]' : 'bg-zinc-100'} flex items-center justify-center mb-4`}><span className="text-2xl">👈</span></div><p className="text-lg font-medium">Select a project to edit</p><p className={`text-sm mt-1`}>Choose from the list on the left</p></div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}