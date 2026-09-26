import { useEffect, useState } from 'react'

type SidebarProps = {
	onLogout: () => void
}

function Sidebar({ onLogout }: SidebarProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isLogoutPanelOpen, setIsLogoutPanelOpen] = useState(false)
	const closeMobileMenu = () => setIsMobileMenuOpen(false)
	const openLogoutPanel = () => {
		setIsMobileMenuOpen(false)
		setIsLogoutPanelOpen(true)
	}

	useEffect(() => {
		if (!isLogoutPanelOpen) return
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsLogoutPanelOpen(false)
		}
		window.addEventListener('keydown', closeOnEscape)
		return () => window.removeEventListener('keydown', closeOnEscape)
	}, [isLogoutPanelOpen])

	return (
		<>
		<aside className="flex w-full min-w-0 shrink-0 flex-col border-b border-slate-200 bg-white px-3 py-3 min-[400px]:px-4 sm:py-4 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:h-dvh lg:w-64 lg:overflow-hidden lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
			<div className="flex items-center justify-between gap-2">
				<a href="#top" className="flex min-w-0 items-center gap-3 px-2">
					<span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200"><svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v8.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></span>
					<span className="min-w-0"><span className="block text-[17px] font-bold tracking-tight text-slate-900">Stockwise</span><span className="block text-[11px] font-medium tracking-wide text-slate-400">INVENTORY MANAGER</span></span>
				</a>
				<div className="flex shrink-0 items-center gap-1 lg:hidden">
					<button type="button" aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMobileMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-indigo-500">
						{isMobileMenuOpen ? <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg> : <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>}
					</button>
				</div>
			</div>

			<div className="mt-9 hidden lg:block">
				<p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
				<nav className="space-y-1" aria-label="Main navigation">
					<a href="#overview" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"><svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5"><rect x="3" y="3" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" /><rect x="11.5" y="3" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="11.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" /><rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" /></svg>Overview</a>
					<a href="#products" aria-current="page" className="flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-700"><svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5"><path d="M3 5.5h14M3 10h14M3 14.5h14M5.5 4v3M14.5 8.5v3M8 13v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>Products<span className="ml-auto rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-indigo-600">01</span></a>
					<a href="#categories" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"><svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5"><path d="M3.5 4.5h5l1.5 1.7h6.5v9.3H3.5V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>Categories</a>
				</nav>
			</div>

			<div className="mt-7 hidden lg:block">
				<p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Preferences</p>
				<nav className="space-y-1" aria-label="Preferences">
					<a href="#settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"><svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="m16.2 11.9 1.1.9-1.5 2.6-1.3-.5a7 7 0 0 1-1.3.8l-.2 1.4h-3l-.2-1.4a7 7 0 0 1-1.3-.8l-1.3.5-1.5-2.6 1.1-.9a6 6 0 0 1 0-1.8l-1.1-.9 1.5-2.6 1.3.5a7 7 0 0 1 1.3-.8l.2-1.4h3l.2 1.4a7 7 0 0 1 1.3.8l1.3-.5 1.5 2.6-1.1.9a6 6 0 0 1 0 1.8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>Settings</a>
				</nav>
			</div>

			<div className="mt-auto hidden rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 p-4 text-white lg:block">
				<div className="mb-3 grid h-8 w-8 place-items-center rounded-lg bg-white/15"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="m10 2.5 2.2 4.7 5.2.7-3.8 3.7.9 5.2-4.5-2.5-4.5 2.5.9-5.2-3.8-3.7 5.2-.7L10 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg></div>
				<p className="text-sm font-semibold">Need a hand?</p><p className="mt-1 text-xs leading-5 text-indigo-100">Visit our help center for tips on managing your inventory.</p>
				<a href="mailto:support@stockwise.example" className="mt-3 inline-block text-xs font-semibold text-white underline decoration-white/50 underline-offset-4">Get support</a>
			</div>
			<button type="button" onClick={openLogoutPanel} className="mt-3 hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-indigo-500 lg:flex">
				<svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5"><path d="M8 3.5H4.5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1H8m4-3 3.5-3.5L12 6.5m3.5 3.5H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
				<span>Sign out</span>
			</button>
		</aside>
		{isMobileMenuOpen && (
			<div className="fixed inset-0 z-80 flex lg:hidden">
				<div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]" aria-hidden="true" onClick={closeMobileMenu} />
				<section role="dialog" aria-modal="true" aria-label="Mobile navigation" className="mobile-drawer-panel relative z-10 flex h-full w-[85vw] max-w-80 flex-col bg-white px-5 py-5 shadow-2xl">
					<div className="flex items-center justify-between border-b border-slate-100 pb-5">
						<div className="flex items-center gap-3">
							<span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white"><svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v8.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></span>
							<div><p className="text-sm font-bold text-slate-900">Stockwise</p><p className="text-[10px] font-medium tracking-wide text-slate-400">INVENTORY MANAGER</p></div>
						</div>
						<button type="button" aria-label="Close navigation menu" onClick={closeMobileMenu} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><svg viewBox="0 0 20 20" fill="none" className="h-5 w-5"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button>
					</div>
					<nav id="mobile-navigation" className="mt-6 space-y-1" aria-label="Main navigation">
						<a href="#overview" onClick={closeMobileMenu} className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800">Overview</a>
						<a href="#products" aria-current="page" onClick={closeMobileMenu} className="block rounded-xl bg-indigo-50 px-3 py-3 text-sm font-semibold text-indigo-700">Products</a>
						<a href="#categories" onClick={closeMobileMenu} className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800">Categories</a>
						<a href="#settings" onClick={closeMobileMenu} className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800">Settings</a>
					</nav>
					<button type="button" onClick={openLogoutPanel} className="mt-auto flex w-full items-center gap-3 border-t border-slate-100 px-3 py-4 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-indigo-500">
						<svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5"><path d="M8 3.5H4.5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1H8m4-3 3.5-3.5L12 6.5m3.5 3.5H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
						<span>Sign out</span>
					</button>
				</section>
			</div>
		)}
		{isLogoutPanelOpen && (
			<div className="fixed inset-0 z-70 flex justify-end bg-slate-950/45 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsLogoutPanelOpen(false) }}>
				<section role="dialog" aria-modal="true" aria-labelledby="signout-title" className="logout-side-panel flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl">
					<div className="flex items-start justify-between">
						<span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 text-rose-600"><svg viewBox="0 0 20 20" fill="none" className="h-5 w-5"><path d="M8 3.5H4.5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1H8m4-3 3.5-3.5L12 6.5m3.5 3.5H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
						<button type="button" aria-label="Close sign out panel" onClick={() => setIsLogoutPanelOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><svg viewBox="0 0 20 20" fill="none" className="h-5 w-5"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button>
					</div>
					<h2 id="signout-title" className="mt-6 text-xl font-bold text-slate-900">Sign out</h2>
					<p className="mt-2 text-sm leading-6 text-slate-500">This demo does not have an account session connected, so sign out is not available yet.</p>
					<div className="mt-auto flex gap-2 border-t border-slate-100 pt-5">
						<button type="button" onClick={() => setIsLogoutPanelOpen(false)} className="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
						<button type="button" onClick={() => { setIsLogoutPanelOpen(false); onLogout() }} className="h-11 flex-1 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700">Got it</button>
					</div>
				</section>
			</div>
		)}
		</>
	)
}

export default Sidebar
