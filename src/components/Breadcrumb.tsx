import Link from "next/link";

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <div className="border-b border-navy-900/10 bg-cream-100">
      <nav className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 text-sm sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-medium text-gold-600 transition hover:text-gold-500"
        >
          <span aria-hidden>&larr;</span> Home
        </Link>
        <span className="text-navy-300">/</span>
        <span className="text-navy-500">{current}</span>
      </nav>
    </div>
  );
}
