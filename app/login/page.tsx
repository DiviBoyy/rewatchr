"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const userKey = "rewatchr.preview.user";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(event: FormEvent) {
    event.preventDefault();
    localStorage.setItem(userKey, JSON.stringify({ username: username.trim(), email: email.trim() }));
    router.push("/");
  }

  return (
    <main className="login-page">
      <section className="login-card panel">
        <Link className="brand login-brand" href="/">
          <img src="/rewatchr-logo.png" alt="Rewatchr logo" />
          <span>Rewatchr</span>
        </Link>
        <h1>Login</h1>
        <p>Step into your watchlist HQ. Your next binge, ratings, and rewatch-worthy legends are already judging your taste.</p>
        <form onSubmit={login}>
          <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" autoComplete="username" required />
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email" autoComplete="email" required />
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" autoComplete="current-password" required />
          <button className="primary" type="submit">Login</button>
        </form>
        <Link className="back-link" href="/">Back to Rewatchr</Link>
      </section>
    </main>
  );
}
