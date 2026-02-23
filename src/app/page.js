import Link from "next/link";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/project" className="text-blue-500 hover:underline">
       <h1 className="text-2xl font-bold">View Project</h1>
      </Link>
    </div>
  );
}
