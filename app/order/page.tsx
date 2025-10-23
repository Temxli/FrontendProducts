import { cookies } from 'next/headers'
import styles from './page.module.scss'
import Link from 'next/link'

// Define TypeScript types based on your Go API response
type OrderItem = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  order_id: string
  product_id: number
  product_name: string
  unit_price: number
}

type Order = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  order_id: string
  customer_id: number
  items: OrderItem[]
}

const formatPrice = (p: number) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(p)

export default async function OrdersPage() {
  const cookie = (await cookies()).get('Authorization')?.value
  console.log('Cookie:', cookie)

  try {
    const res = await fetch('http://localhost:3000/orders', {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '<no body>')
      console.error('Fetch failed', res.status, body)
      return (
        <main className={styles.container}>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.error}>Error loading orders: HTTP {res.status}</p>
          <pre className={styles.pre}>{body}</pre>
        </main>
        
      )
    }

    const json = await res.json().catch(() => null)
    const orders: Order[] = Array.isArray(json) ? json : (json ? [json] : [])

    return (
      <main className={styles.container}>
        <div className={styles.inner}>
          <h1 className={styles.title}>Orders</h1>

          {orders.length === 0 ? (
            <p className={styles.empty}>No orders found.</p>
          ) : (
            <section className={styles.grid}>
              {orders.map((o) => (
                <article key={o.order_id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.name}>Order #{o.order_id}</h2>
                    <div>Created: {new Date(o.CreatedAt).toLocaleString()}</div>
                  </div>

                  <div className={styles.meta}>
                    <strong>Items:</strong>
                    <ul style={{ marginTop: '8px' }}>
                      {o.items.map((item) => (
                        <li key={item.ID}>
                          {item.product_name} — {formatPrice(item.unit_price)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.actions}>
                    <Link href={`/orders/${o.order_id}`} className={styles.btnPrimary}>
                      View Details
                    </Link>
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
        <h1 className={styles.title}>Orders</h1>
        <p className={styles.error}>Error loading orders.</p>
      </main>
    )
  }
}
