
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import Pagination from './components/Pagination'
import ProductTable, { type Product } from './components/ProductTable'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import Topbar from './components/Topbar'

const starterProducts: Product[] = [
  { id: 'p-101', name: 'Studio Headphones', sku: 'AUD-2048', category: 'Electronics', price: 129.99, stock: 34 },
  { id: 'p-102', name: 'Arc Desk Lamp', sku: 'HOM-1180', category: 'Furniture', price: 84.5, stock: 8 },
  { id: 'p-103', name: 'Everyday Tote', sku: 'ACC-3721', category: 'Accessories', price: 38, stock: 52 },
  { id: 'p-104', name: 'Linen Shirt', sku: 'APP-0904', category: 'Clothing', price: 64, stock: 0 },
  { id: 'p-105', name: 'The Creative Habit', sku: 'BOK-6412', category: 'Books', price: 24.95, stock: 19 },
  { id: 'p-106', name: 'Wireless Speaker', sku: 'AUD-3017', category: 'Electronics', price: 89, stock: 6 },
  { id: 'p-107', name: 'Oak Side Table', sku: 'HOM-2290', category: 'Furniture', price: 179, stock: 12 },
  { id: 'p-108', name: 'Canvas Cap', sku: 'APP-1188', category: 'Clothing', price: 29.5, stock: 41 },
  { id: 'p-109', name: 'Leather Card Case', sku: 'ACC-4420', category: 'Accessories', price: 55, stock: 3 },
]

const categories = ['Accessories', 'Books', 'Clothing', 'Electronics', 'Furniture']
const pageSize = 6

type ProductDraft = Omit<Product, 'id' | 'price' | 'stock'> & { price: string; stock: string }

const emptyDraft: ProductDraft = { name: '', sku: '', category: 'Electronics', price: '', stock: '' }

function readProducts(): Product[] {
  try {
    const saved = localStorage.getItem('stockwise-products')
    if (saved) {
      const parsed: unknown = JSON.parse(saved)
      if (Array.isArray(parsed)) return parsed as Product[]
    }
  } catch {
    // Fall back to the sample inventory if browser storage is unavailable or invalid.
  }
  return starterProducts
}

function MetricIcon({ kind }: { kind: 'box' | 'value' | 'alert' }) {
  if (kind === 'value') return <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M12 3v18m4-13.5c-.5-1-1.8-1.5-4-1.5-2.5 0-4 .9-4 2.5s1.5 2.5 4 2.5 4 1 4 2.5-1.5 2.5-4 2.5c-2.1 0-3.5-.6-4-1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
  if (kind === 'alert') return <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M12 3 2.8 19h18.4L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M12 9v4m0 3h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
  return <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="m12 3 9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
}

function App() {
  const [products, setProducts] = useState<Product[]>(readProducts)
  const [isDark, setIsDark] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('stockwise-theme')
      return savedTheme ? savedTheme === 'dark' : (window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)
    } catch {
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
    }
  })
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All categories')
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft)
  const [formError, setFormError] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('stockwise-products', JSON.stringify(products))
    } catch {
      // The inventory still works for this session when storage is disabled.
    }
  }, [products])

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    try {
      localStorage.setItem('stockwise-theme', isDark ? 'dark' : 'light')
    } catch {
      // Theme selection remains active for this session when storage is disabled.
    }
  }, [isDark])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'All categories' || product.category === category
      const matchesQuery = !query || `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [products, search, category])

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const visibleProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize)
  const lowStockCount = products.filter((product) => product.stock > 0 && product.stock <= 10).length
  const inventoryValue = products.reduce((total, product) => total + product.price * product.stock, 0)

  const openCreateModal = () => {
    setEditingId(null)
    setDraft(emptyDraft)
    setFormError('')
    setIsModalOpen(true)
  }

  const openEditModal = (product: Product) => {
    setEditingId(product.id)
    setDraft({ name: product.name, sku: product.sku, category: product.category, price: String(product.price), stock: String(product.stock) })
    setFormError('')
    setIsModalOpen(true)
  }

  const saveProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedSku = draft.sku.trim().toUpperCase()
    if (products.some((product) => product.sku.toLowerCase() === normalizedSku.toLowerCase() && product.id !== editingId)) {
      setFormError('That SKU is already in use. Enter a unique SKU.')
      return
    }
    const nextProduct: Product = {
      id: editingId ?? (globalThis.crypto?.randomUUID?.() ?? `product-${Date.now()}`),
      name: draft.name.trim(),
      sku: normalizedSku,
      category: draft.category,
      price: Number(draft.price),
      stock: Number(draft.stock),
    }
    setProducts((current) => editingId
      ? current.map((product) => product.id === editingId ? nextProduct : product)
      : [nextProduct, ...current])
    setIsModalOpen(false)
    setPage(1)
    setToast(editingId ? 'Product updated successfully' : 'Product added successfully')
  }

  const deleteProduct = (product: Product) => {
    if (!window.confirm(`Delete “${product.name}” from your inventory?`)) return
    setProducts((current) => current.filter((item) => item.id !== product.id))
    setSelectedIds((current) => current.filter((id) => id !== product.id))
    setToast('Product deleted')
  }

  const deleteSelected = () => {
    if (!window.confirm(`Delete ${selectedIds.length} selected product${selectedIds.length === 1 ? '' : 's'}?`)) return
    setProducts((current) => current.filter((product) => !selectedIds.includes(product.id)))
    setSelectedIds([])
    setToast('Selected products deleted')
  }

  const toggleProduct = (id: string) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const toggleVisibleProducts = () => {
    const visibleIds = visibleProducts.map((product) => product.id)
    const everyVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id))
    setSelectedIds((current) => everyVisibleSelected
      ? current.filter((id) => !visibleIds.includes(id))
      : [...new Set([...current, ...visibleIds])])
  }

  const exportProducts = () => {
    const escapeCsv = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`
    const rows = [['Product', 'SKU', 'Category', 'Price', 'Stock'], ...filteredProducts.map((product) => [product.name, product.sku, product.category, product.price.toFixed(2), product.stock])]
    const csv = rows.map((row) => row.map(escapeCsv).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'stockwise-products.csv'
    link.click()
    URL.revokeObjectURL(url)
    setToast('Inventory exported as CSV')
  }

  return (
    <div id="top" data-theme={isDark ? 'dark' : 'light'} className="min-h-screen bg-[#f7f8fc] text-slate-800 transition-colors duration-200 lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar isDark={isDark} onToggleTheme={() => setIsDark((current) => !current)} />
        <main id="products" className="mx-auto w-full max-w-[1500px] px-3 py-5 min-[400px]:px-4 sm:px-6 sm:py-8 lg:px-10">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 text-sm font-medium text-indigo-600">Your store at a glance</p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">Inventory overview</h2>
              <p className="mt-1 text-sm text-slate-500">Manage your products and keep stock right where it needs to be.</p>
            </div>
            <p className="text-xs font-medium text-slate-400">Last updated just now</p>
          </div>

          <section aria-label="Inventory summary" className="mb-5 grid gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            <article className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.03)] min-[400px]:p-5 sm:p-6">
              <div><p className="text-sm font-medium text-slate-500">Total products</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{products.length}</p><p className="mt-1 text-xs text-slate-400">Across your catalog</p></div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><MetricIcon kind="box" /></span>
            </article>
            <article className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.03)] min-[400px]:p-5 sm:p-6">
              <div><p className="text-sm font-medium text-slate-500">Stock value</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">${inventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p><p className="mt-1 text-xs text-slate-400">Retail value on hand</p></div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><MetricIcon kind="value" /></span>
            </article>
            <article className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.03)] min-[400px]:p-5 sm:col-span-2 sm:p-6 xl:col-span-1">
              <div><p className="text-sm font-medium text-slate-500">Low stock alerts</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{lowStockCount}</p><p className="mt-1 text-xs text-slate-400">Products with 10 units or fewer</p></div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-600"><MetricIcon kind="alert" /></span>
            </article>
          </section>

          <section aria-labelledby="products-heading" className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between gap-2 px-4 pb-1 pt-4 sm:px-6 sm:pt-6">
              <div><h3 id="products-heading" className="text-base font-bold text-slate-900">All products</h3><p className="mt-1 text-xs text-slate-400">A clear view of everything in your inventory</p></div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">{filteredProducts.length} items</span>
            </div>
            <Toolbar search={search} onSearchChange={(value) => { setSearch(value); setPage(1) }} category={category} onCategoryChange={(value) => { setCategory(value); setPage(1) }} categories={categories} selectedCount={selectedIds.length} onAdd={openCreateModal} onDeleteSelected={deleteSelected} onExport={exportProducts} />
            {visibleProducts.length > 0 ? <ProductTable products={visibleProducts} selectedIds={selectedIds} onToggleOne={toggleProduct} onToggleAll={toggleVisibleProducts} onEdit={openEditModal} onDelete={deleteProduct} /> : (
              <div className="px-5 py-12 text-center sm:px-6 sm:py-16"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-400"><MetricIcon kind="box" /></span><h4 className="mt-4 font-semibold text-slate-800">No products found</h4><p className="mt-1 text-sm text-slate-500">Try a different search or add a new product to your catalog.</p><button type="button" onClick={openCreateModal} className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700">Add your first product</button></div>
            )}
            <Pagination page={page} pageCount={pageCount} totalItems={filteredProducts.length} pageSize={pageSize} onPageChange={setPage} />
          </section>
          <p className="py-5 text-center text-xs text-slate-400">Stockwise inventory · Your data is saved on this device</p>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-slate-950/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false) }}>
          <section role="dialog" aria-modal="true" aria-labelledby="product-modal-title" className="w-full max-w-lg rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-7">
            <div className="mb-6 flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Product catalog</p><h2 id="product-modal-title" className="mt-1 text-xl font-bold text-slate-900">{editingId ? 'Edit product' : 'Add a product'}</h2><p className="mt-1 text-sm text-slate-500">Fill in the details below to {editingId ? 'update this item' : 'add it to your inventory'}.</p></div><button type="button" aria-label="Close dialog" onClick={() => setIsModalOpen(false)} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><svg viewBox="0 0 20 20" fill="none" className="h-5 w-5"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button></div>
            <form onSubmit={saveProduct} className="space-y-4">
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Product name</span><input autoFocus required maxLength={80} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="e.g. Studio Headphones" className="form-field" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">SKU</span><input required maxLength={32} value={draft.sku} onChange={(event) => setDraft({ ...draft, sku: event.target.value })} placeholder="e.g. AUD-2048" className="form-field" /></label>
                <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Category</span><select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} className="form-field">{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Price</span><div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span><input required type="number" min="0.01" step="0.01" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} placeholder="0.00" className="form-field pl-8" /></div></label>
                <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">Stock quantity</span><input required type="number" min="0" step="1" value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: event.target.value })} placeholder="0" className="form-field" /></label>
              </div>
              {formError && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{formError}</p>}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-5"><button type="button" onClick={() => setIsModalOpen(false)} className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button><button type="submit" className="h-10 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">{editingId ? 'Save changes' : 'Add product'}</button></div>
            </form>
          </section>
        </div>
      )}

      {toast && <div role="status" className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg"><span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500"><svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5"><path d="m5 10 3.2 3.2L15 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>{toast}</div>}
    </div>
  )
}

export default App;