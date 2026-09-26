type TopbarProps = {
	isDark: boolean
	onToggleTheme: () => void
}

function Topbar({ isDark, onToggleTheme }: TopbarProps) {
	return (
		<header className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-3 min-[400px]:px-4 sm:px-8 sm:py-4 lg:px-10">
			<div className="min-w-0">
				<p className="text-xs font-medium text-slate-400"><span className="hidden sm:inline">Workspace&nbsp; / &nbsp;</span>Inventory</p>
				<h1 className="mt-1 truncate text-base font-bold tracking-tight text-slate-900 min-[400px]:text-lg sm:text-xl">Product management</h1>
			</div>
			<div className="flex shrink-0 items-center gap-1 min-[400px]:gap-2 sm:gap-4">
				<button type="button" aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'} title={isDark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={onToggleTheme} className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100"><svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">{isDark ? <><circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 2v1.5m0 13V18m8-8h-1.5m-13 0H2m13.66-5.66-1.06 1.06M5.4 14.6l-1.06 1.06m11.32 0-1.06-1.06M5.4 5.4 4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></> : <path d="M16.8 12.4A7 7 0 0 1 7.6 3.2 7.5 7.5 0 1 0 16.8 12.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}</svg></button>
				<button type="button" aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100"><svg viewBox="0 0 20 20" fill="none" className="h-5 w-5"><path d="M15 7.5a5 5 0 0 0-10 0c0 5-2 5.5-2 6.5h14c0-1-2-1.5-2-6.5ZM8 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" /></button>
				<span className="hidden h-8 w-px bg-slate-200 sm:block" />
				<button type="button" className="flex items-center gap-2.5 rounded-xl text-left"><span className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white">JD</span><span className="hidden sm:block"><span className="block text-sm font-semibold text-slate-700">Jamie Davis</span><span className="block text-[11px] text-slate-400">Store owner</span></span><svg viewBox="0 0 20 20" fill="none" className="hidden h-4 w-4 text-slate-400 sm:block"><path d="m6 8 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
			</div>
		</header>
	)
}

export default Topbar
