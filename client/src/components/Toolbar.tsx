type ToolbarProps = {
	search: string
	onSearchChange: (value: string) => void
	category: string
	onCategoryChange: (value: string) => void
	categories: string[]
	selectedCount: number
	onAdd: () => void
	onDeleteSelected: () => void
	onExport: () => void
}

function Toolbar({ search, onSearchChange, category, onCategoryChange, categories, selectedCount, onAdd, onDeleteSelected, onExport }: ToolbarProps) {
	return (
		<div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
			<div className="flex min-w-0 flex-1 flex-col gap-2.5 min-[480px]:flex-row min-[480px]:items-center sm:gap-3">
				<label className="relative block sm:w-72">
					<span className="sr-only">Search products</span>
					<svg viewBox="0 0 20 20" fill="none" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"><circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" strokeWidth="1.6" /><path d="m13.2 13.2 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
					<input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search products..." className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50" />
				</label>
				<label className="min-w-0">
					<span className="sr-only">Filter by category</span>
					<select value={category} onChange={(event) => onCategoryChange(event.target.value)} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 sm:w-44">
						<option value="All categories">All categories</option>
						{categories.map((item) => <option key={item} value={item}>{item}</option>)}
					</select>
				</label>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				{selectedCount > 0 && <button type="button" onClick={onDeleteSelected} className="h-10 rounded-xl border border-rose-200 px-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50">Delete ({selectedCount})</button>}
				<button type="button" onClick={onExport} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="M10 3v9m0 0 3-3m-3 3L7 9m-3 5v2.5c0 .3.2.5.5.5h11c.3 0 .5-.2.5-.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="hidden sm:inline">Export</span></button>
				<button type="button" onClick={onAdd} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:flex-none"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg><span>Add product</span></button>
			</div>
		</div>
	)
}

export default Toolbar
