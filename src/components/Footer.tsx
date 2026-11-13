import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600">
                <span className="text-xs font-bold text-white">TD</span>
              </div>
              <span className="font-semibold text-zinc-100">Testdebug</span>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs">
              Full production-ready frontend framework with modules, services, auth scaffolding and live Vercel deployment.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/dashboard" className="hover:text-indigo-400 transition">Dashboard</Link></li>
              <li><Link href="/modules" className="hover:text-indigo-400 transition">Modules</Link></li>
              <li><Link href="/services" className="hover:text-indigo-400 transition">Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 mb-3">Auth</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/auth/login" className="hover:text-indigo-400 transition">Sign in</Link></li>
              <li><Link href="/auth/signup" className="hover:text-indigo-400 transition">Sign up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 mb-3">Deploy</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="https://vercel.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition">Vercel</a></li>
              <li><a href="https://github.com/cantgetalonggta-png/Testdebug" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} Testdebug. Production frontend scaffold.</p>
          <p>Built with Next.js · Tailwind · TypeScript · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
