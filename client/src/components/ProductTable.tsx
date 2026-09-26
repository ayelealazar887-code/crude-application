import ProductRow from './ProductRow'

export type Product = {
	id: string
	name: string
	sku: string
	category: string
	price: number
	stock: number
}

type ProductTableProps = {
	products: Product[]
	selectedIds: string[]
	onToggleOne: (id: string) => void
	onToggleAll: () => void
	onEdit: (product: Product) => void
	onDelete: (product: Product) => void
}

function ProductTable({ products, selectedIds, onToggleOne, onToggleAll, onEdit, onDelete }: ProductTableProps) {
	const allSelected = products.length > 0 && products.every((product) => selectedIds.includes(product.id))

	return (
		<>
			<div className="divide-y divide-slate-100 xl:hidden">
				{products.map((product) => {
					const status = product.stock === 0 ? 'Out of stock' : product.stock <= 10 ? 'Low stock' : 'In stock'
					const statusColor = product.stock === 0 ? 'bg-rose-50 text-rose-700' : product.stock <= 10 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
					return (
						<article key={product.id} className={`p-4 transition-colors ${selectedIds.includes(product.id) ? 'bg-indigo-50/40' : ''}`}>
							<div className="flex items-start gap-3">
								<input aria-label={`Select ${product.name}`} type="checkbox" checked={selectedIds.includes(product.id)} onChange={() => onToggleOne(product.id)} className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-indigo-600" />
								<div className="min-w-0 flex-1">
									<div className="flex items-start justify-between gap-2">
										<div className="min-w-0"><h4 className="truncate text-sm font-semibold text-slate-800">{product.name}</h4><p className="mt-0.5 font-mono text-xs text-slate-400">{product.sku}</p></div>
										<span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${statusColor}`}>{status}</span>
									</div>
									<div className="mt-3 flex flex-wrap items-center justify-between gap-2">
										<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500"><span>{product.category}</span><span className="font-semibold text-slate-700">${product.price.toFixed(2)}</span><span>{product.stock} units</span></div>
										<div className="flex gap-1">
											<button type="button" aria-label={`Edit ${product.name}`} onClick={() => onEdit(product)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="m13.8 3.2 3 3M3 17l3.5-.7L16.5 6.3a2.1 2.1 0 0 0-3-3L3.5 13.3 3 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
											<button type="button" aria-label={`Delete ${product.name}`} onClick={() => onDelete(product)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="M4 6h12M8 6V4h4v2m2 0-.7 10H6.7L6 6m2.5 3v4m3-4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
										</div>
									</div>
								</div>
							</div>
						</article>
					)
				})}
			</div>
			<div className="hidden xl:block">
				<table className="w-full min-w-190 border-collapse text-left">
				<thead>
					<tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-400">
						<th className="w-12 px-6 py-4">
							<input aria-label="Select all products" type="checkbox" checked={allSelected} onChange={onToggleAll} className="h-4 w-4 rounded border-slate-300 accent-indigo-600" />
						</th>
						<th className="px-3 py-4">Product</th>
						<th className="px-3 py-4">SKU</th>
						<th className="px-3 py-4">Category</th>
						<th className="px-3 py-4">Price</th>
						<th className="px-3 py-4">Stock</th>
						<th className="px-3 py-4">Status</th>
						<th className="w-20 px-6 py-4 text-right">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
					{products.map((product) => (
						<ProductRow key={product.id} product={product} selected={selectedIds.includes(product.id)} onToggle={onToggleOne} onEdit={onEdit} onDelete={onDelete} />
					))}
				</tbody>
				</table>
			</div>
		</>
	)
}

export default ProductTable
