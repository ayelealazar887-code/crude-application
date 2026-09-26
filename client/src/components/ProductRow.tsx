import type { Product } from './ProductTable'

type ProductRowProps = {
	product: Product
	selected: boolean
	onToggle: (id: string) => void
	onEdit: (product: Product) => void
	onDelete: (product: Product) => void
}

const productColors: Record<string, string> = {
	Electronics: 'from-violet-100 to-indigo-50 text-indigo-600',
	Furniture: 'from-amber-100 to-orange-50 text-orange-600',
	Clothing: 'from-pink-100 to-rose-50 text-rose-600',
	Accessories: 'from-emerald-100 to-teal-50 text-teal-600',
	Books: 'from-sky-100 to-cyan-50 text-cyan-700',
}

function ProductRow({ product, selected, onToggle, onEdit, onDelete }: ProductRowProps) {
	const stockStatus = product.stock === 0 ? 'Out of stock' : product.stock <= 10 ? 'Low stock' : 'In stock'
	const statusStyle = product.stock === 0
		? 'bg-rose-50 text-rose-700'
		: product.stock <= 10
			? 'bg-amber-50 text-amber-700'
			: 'bg-emerald-50 text-emerald-700'
	const initials = product.name.split(' ').slice(0, 2).map((word) => word[0]).join('').toUpperCase()

	return (
		<tr className={`group transition-colors hover:bg-slate-50/80 ${selected ? 'bg-indigo-50/40' : ''}`}>
			<td className="px-6 py-4">
				<input aria-label={`Select ${product.name}`} type="checkbox" checked={selected} onChange={() => onToggle(product.id)} className="h-4 w-4 rounded border-slate-300 accent-indigo-600" />
			</td>
			<td className="px-3 py-4">
				<div className="flex items-center gap-3">
					  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-xs font-bold ${productColors[product.category] ?? 'from-slate-100 to-slate-50 text-slate-600'}`}>{initials}</div>
					<div>
						<p className="font-semibold text-slate-800">{product.name}</p>
						<p className="mt-0.5 text-xs text-slate-400">Updated recently</p>
					</div>
				</div>
			</td>
			<td className="px-3 py-4 font-mono text-xs text-slate-500">{product.sku}</td>
			<td className="px-3 py-4"><span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">{product.category}</span></td>
			<td className="px-3 py-4 font-semibold text-slate-700">${product.price.toFixed(2)}</td>
			<td className="px-3 py-4 text-sm text-slate-600">{product.stock} <span className="text-xs text-slate-400">units</span></td>
			<td className="px-3 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${statusStyle}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{stockStatus}</span></td>
			<td className="px-6 py-4">
				<div className="flex justify-end gap-1 opacity-70 transition-opacity group-hover:opacity-100">
					<button type="button" aria-label={`Edit ${product.name}`} onClick={() => onEdit(product)} className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="m13.8 3.2 3 3M3 17l3.5-.7L16.5 6.3a2.1 2.1 0 0 0-3-3L3.5 13.3 3 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
					<button type="button" aria-label={`Delete ${product.name}`} onClick={() => onDelete(product)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="M4 6h12M8 6V4h4v2m2 0-.7 10H6.7L6 6m2.5 3v4m3-4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
				</div>
			</td>
		</tr>
	)
}

export default ProductRow
