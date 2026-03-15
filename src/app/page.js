import Link from "next/link";

const GOLD = "#B68A35";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 font-sans" style={{ background: "#232528" }}>
      <h1 className="mb-4 text-xl font-bold text-white">Quick Links</h1>
      <div className="flex flex-col gap-3">
        <Link
          href="/home"
          className="inline-flex items-center justify-center rounded-lg border-2 px-6 py-3 text-base font-bold transition-all text-[#B68A35] hover:bg-[#B68A35] hover:border-[#B68A35] hover:text-black"
          style={{ borderColor: GOLD }}
        >
          1) Home Page
        </Link>
        <Link
          href="/project"
          className="inline-flex items-center justify-center rounded-lg border-2 px-6 py-3 text-base font-bold transition-all text-[#B68A35] hover:bg-[#B68A35] hover:border-[#B68A35] hover:text-black"
          style={{ borderColor: GOLD }}
        >
          2) View Project Page
        </Link>
        <Link
          href="/developer"
          className="inline-flex items-center justify-center rounded-lg border-2 px-6 py-3 text-base font-bold transition-all text-[#B68A35] hover:bg-[#B68A35] hover:border-[#B68A35] hover:text-black"
          style={{ borderColor: GOLD }}
        >
          3) View Developer Page
        </Link>
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-lg border-2 px-6 py-3 text-base font-bold transition-all text-[#B68A35] hover:bg-[#B68A35] hover:border-[#B68A35] hover:text-black"
          style={{ borderColor: GOLD }}
        >
          4) Admin Panel
        </Link>
      </div>
    </div>
  );
}
