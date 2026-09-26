function Sidebar() {
	return (
		<aside className="flex w-full min-w-0 shrink-0 flex-col border-b border-slate-200 bg-white px-3 py-3 min-[400px]:px-4 sm:py-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
			<a href="#top" className="flex items-center gap-3 px-2">
				<span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200"><svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v8.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></span>
				<span><span className="block text-[17px] font-bold tracking-tight text-slate-900">Stockwise</span><span className="block text-[11px] font-medium tracking-wide text-slate-400">INVENTORY MANAGER</span></span>
			</a>
			<nav className="-mx-1 mt-3 flex min-w-0 gap-1 overflow-x-auto pb-0.5 lg:hidden" aria-label="Main navigation">
				<a href="#overview" className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50">Overview</a>
				<a href="#products" aria-current="page" className="shrink-0 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">Products</a>
				<a href="#categories" className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50">Categories</a>
				<a href="#settings" className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50">Settings</a>
			</nav>

			<div className="mt-9 hidden lg:block">
				<p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
				<nav className="space-y-1" aria-label="Main navigation">
					<a href="#overview" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"><svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]"><rect x="3" y="3" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" /><rect x="11.5" y="3" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="11.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" /><rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" /></svg>Overview</a>
					<a href="#products" aria-current="page" className="flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-700"><svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]"><path d="M3 5.5h14M3 10h14M3 14.5h14M5.5 4v3M14.5 8.5v3M8 13v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>Products<span className="ml-auto rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-indigo-600">01</span></a>
					<a href="#categories" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"><svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]"><path d="M3.5 4.5h5l1.5 1.7h6.5v9.3H3.5V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>Categories</a>
				</nav>
			</div>

			<div className="mt-7 hidden lg:block">
				<p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Preferences</p>
				<nav className="space-y-1" aria-label="Preferences">
					<a href="#settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"><svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="m16.2 11.9 1.1.9-1.5 2.6-1.3-.5a7 7 0 0 1-1.3.8l-.2 1.4h-3l-.2-1.4a7 7 0 0 1-1.3-.8l-1.3.5-1.5-2.6 1.1-.9a6 6 0 0 1 0-1.8l-1.1-.9 1.5-2.6 1.3.5a7 7 0 0 1 1.3-.8l.2-1.4h3l.2 1.4a7 7 0 0 1 1.3.8l1.3-.5 1.5 2.6-1.1.9a6 6 0 0 1 0 1.8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>Settings</a>
				</nav>
			</div>

			<div className="mt-auto hidden rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 p-4 text-white lg:block">
				<div className="mb-3 grid h-8 w-8 place-items-center rounded-lg bg-white/15"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="m10 2.5 2.2 4.7 5.2.7-3.8 3.7.9 5.2-4.5-2.5-4.5 2.5.9-5.2-3.8-3.7 5.2-.7L10 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg></div>
				<p className="text-sm font-semibold">Need a hand?</p><p className="mt-1 text-xs leading-5 text-indigo-100">Visit our help center for tips on managing your inventory.</p>
				<a href="mailto:support@stockwise.example" className="mt-3 inline-block text-xs font-semibold text-white underline decoration-white/50 underline-offset-4">Get support</a>
			</div>
		</aside>
	)
}

export default Sidebar
