import { cookies } from 'next/headers';
import styles from './page.module.scss'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Product = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  name: string
  price: number
}

const formatPrice = (p: number) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(p)

export default async function ProductPage({ params }: { params: { id?: string;} }) {
  const id = (await params).id
  if (!id) return notFound()

  try {
    const res = await fetch(`http://localhost:3000/products/${id}`, { cache: 'no-store', headers: { Accept: 'application/json' } })
    if (res.status === 404) return notFound()
    if (!res.ok) {
      const body = await res.text().catch(() => '<no body>')
      return (
        <main className={styles.container}>
          <div className={styles.inner}>
            <h1 className={styles.title}>Product</h1>
            <p className={styles.error}>Error loading product: HTTP {res.status}</p>
            <pre className={styles.pre}>{body}</pre>
            <Link href="/" className={styles.btnSecondary}>← Back</Link>
          </div>
        </main>
      )
    }

    const product: Product = await res.json()

    return (
      <main className={styles.container}>
        <div className={styles.inner}>
          <Link href="/" className={styles.btnSecondary} style={{ marginBottom: 16 }}>← Back</Link>
                    <div className='py-3'></div>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h1 className={styles.title} style={{ margin: 0 }}>{product.name}</h1>
              <div className={styles.price}>{formatPrice(product.price)}</div>
            </div>

            <div className={styles.meta}>
              <div>ID: {product.ID}</div>
              <div>Created: {new Date(product.CreatedAt).toLocaleString()}</div>
              <div>Updated: {new Date(product.UpdatedAt).toLocaleString()}</div>
            </div>

            <div className={styles.actions}>
              {/* <Link href={`/products/${product.ID}/edit`} className={styles.btnSecondary}>Edit</Link> */}
            </div>
          </article>
        </div>
      </main>
    )
  } catch (err) {
    console.error(err)
    return (
      <main className={styles.container}>
        <div className={styles.inner}>
          <h1 className={styles.title}>Product</h1>
          <p className={styles.error}>Error loading product.</p>
          <Link href="/" className={styles.btnSecondary}>← Back</Link>
        </div>
      </main>
    )
  }
}