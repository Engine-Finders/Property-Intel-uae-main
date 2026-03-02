const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || "http://134.255.232.233:8080";

export async function getProjects() {
  const res = await fetch(`${getApiUrl()}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}
