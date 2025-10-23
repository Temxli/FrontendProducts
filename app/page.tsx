import { cookies } from 'next/headers'
import styles from './page.module.scss'
import Link from 'next/link'

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

export default async function Home() {
  const cookie = (await cookies()).get('Authorization')?.value;
  console.log("Cookie:", cookie);
  
  try {
    const res = await fetch("http://localhost:3000/products", { cache: 'no-store', headers: { Accept: 'application/json' } })
    if (!res.ok) {
      const body = await res.text().catch(() => '<no body>')
      console.error('Fetch failed', res.status, body)
      return (
        <main className={styles.container}>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.error}>Error loading products: HTTP {res.status}</p>
          <pre className={styles.pre}>{body}</pre>
        </main>
      )
    }

    const json = await res.json().catch(() => null)
    const products: Product[] = Array.isArray(json) ? json : (json ? [json] : [])
return (
      <main className={styles.container}>
        <div className={styles.inner}>
          <h1 className={styles.title}>Products</h1>

          {products.length === 0 ? (
            <p className={styles.empty}>No products found.</p>
          ) : (
            <section className={styles.grid}>
              {products.map(p => (
                <article key={p.ID} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.name}>{p.name}</h2>
                    <div className={styles.price}>{formatPrice(p.price)}</div>
                  </div>

                  <div className={styles.meta}>
                    <div>Created: {new Date(p.CreatedAt).toLocaleString()}</div>
                    <div>Updated: {new Date(p.UpdatedAt).toLocaleString()}</div>
                  </div>

                  <div className={styles.actions}>
                    {/* View -> переход на страницу продукта */}
                    <Link href={`/products/${p.ID}`} className={styles.btnPrimary}>View</Link>
                    {/* <button className={styles.btnSecondary}>Edit</button> */}
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
    )
  } catch (err) {
    console.error(err)
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Products</h1>
        <p className={styles.error}>Error loading products.</p>
      </main>
    )
  }
}
