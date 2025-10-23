import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Header() {
  const cookie = (await cookies()).get('Authorization')?.value;

  return (
    <header style={{ padding: '16px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
      <h1 style={{ margin: 0, fontSize: '24px' }}>Product Management App</h1>
      {cookie ? (
        <form action="/api/logout" method="POST">
          <button className="border rounded-full pl-2 pr-2 py-1 hover:bg-white">Logout</button>
        </form>
      ) : (
        <>
          <Link href="/login">
            <button className="border rounded-full pl-2 pr-2 py-1 hover:bg-white">Login</button>
          </Link>
          <Link href="/register">
            <button className="border rounded-full pl-2 pr-2 py-1 hover:bg-white">Sign Up</button>
          </Link>
        </>
      )}
    </header>
  );
}
