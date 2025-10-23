'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import { redirect } from 'next/dist/server/api-utils';
import { RedirectType, useRouter } from 'next/navigation';
import router from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // must call the hook here, returns the router object


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
      router.replace('/'); // <-- use replace or push
      console.log('Registered successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.verticalCenter}>
      <main className={styles.container}>
        <div className={styles.inner}>
          <h1 className={styles.title}>Sign Up</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              Username:
              <input className={styles.input} type="text" name="username" required />
            </label>
            <label className={styles.label}>
              Password:
              <input className={styles.input} type="password" name="password" required />
            </label>
            
            <div className="py-3">if you dont have account: <Link href={"/register"} className='text-blue-400 active:text-blue-600'>Sign Up</Link> </div>
            <button className={styles.btnPrimary} type="submit">
              submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
