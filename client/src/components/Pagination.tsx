type PaginationProps = {
	page: number
	pageCount: number
	totalItems: number
	pageSize: number
	onPageChange: (page: number) => void
}

function Pagination({ page, pageCount, totalItems, pageSize, onPageChange }: PaginationProps) {
	const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
	const end = Math.min(page * pageSize, totalItems)

	return (
		<div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
			<p className="text-slate-500">Showing <span className="font-semibold text-slate-700">{start}–{end}</span> of <span className="font-semibold text-slate-700">{totalItems}</span> products</p>
			<div className="flex items-center gap-1.5">
				<button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="m12 4-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
				{Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} type="button" onClick={() => onPageChange(pageNumber)} className={`grid h-9 min-w-9 place-items-center rounded-lg px-2 text-sm font-semibold transition ${page === pageNumber ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'}`}>{pageNumber}</button>)}
				<button type="button" aria-label="Next page" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="m8 4 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
			</div>
		</div>
	)
}

export default Pagination
