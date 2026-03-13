import Link from "next/link";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/project" className="text-blue-500 hover:underline">
        <h1 className="text-2xl font-bold">1) View Project Page</h1>
      </Link>
      <Link href="/developer" className="text-sm text-blue-500 hover:underline">
        <h2 className="m-22 text-2xl font-bold">2) View Developer Page</h2>
      </Link>
      <Link href="/admin" className="text-sm text-blue-500 hover:underline">
        <h2 className="m-22 text-2xl font-bold">3) Admin Panel</h2>
      </Link>
    </div>
  );
}
