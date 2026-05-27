"use client";

import Link from "next/link";
import { useState } from "react";

type User = {
  username: string;
  email: string;
};

type NavbarProps = {
  user: User | null;
  onLogout: () => void;
};

export function Navbar({ user, onLogout }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const initial = user?.username?.trim()?.[0]?.toUpperCase() || "";

  function closeMenus() {
    setOpen(false);
    setProfileOpen(false);
  }

  return (
    <nav className="rewatchr-nav">
      <Link className="brand" href="/" onClick={closeMenus}>
        <img src="/rewatchr-logo.png" alt="Rewatchr logo" />
        <span>Rewatchr</span>
      </Link>

      <div className="links">
        <Link href="/">Home</Link>
        <a href="#popular">Popular</a>
        <a href="#watchlist">Watchlist</a>
        <a href="#stats">Stats</a>
        <a href="#ai">Rewatchr AI</a>
      </div>

      <div className="nav-account">
        {user ? (
          <div className="profile-wrap">
            <button className="avatar" type="button" onClick={() => setProfileOpen((value) => !value)} aria-label="Open profile menu">
              {initial}
            </button>
            {profileOpen ? (
              <div className="profile-menu">
                <Link href="/" onClick={closeMenus}>View Profile</Link>
                <button type="button" onClick={() => { onLogout(); closeMenus(); }}>Logout</button>
              </div>
            ) : null}
          </div>
        ) : (
          <Link className="signin" href="/login">Sign In</Link>
        )}
      </div>

      <button className="menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open navigation">
        <span />
        <span />
        <span />
      </button>

      {open ? (
        <div className="mobile-menu">
          <Link href="/" onClick={closeMenus}>Home</Link>
          <a href="#popular" onClick={closeMenus}>Popular</a>
          <a href="#watchlist" onClick={closeMenus}>Watchlist</a>
          <a href="#stats" onClick={closeMenus}>Stats</a>
          <a href="#ai" onClick={closeMenus}>Rewatchr AI</a>
          {user ? (
            <>
              <Link href="/" onClick={closeMenus}>View Profile</Link>
              <button type="button" onClick={() => { onLogout(); closeMenus(); }}>Logout</button>
            </>
          ) : (
            <Link href="/login" onClick={closeMenus}>Sign In</Link>
          )}
        </div>
      ) : null}
    </nav>
  );
}
