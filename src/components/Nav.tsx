'use client';

import React, { useState } from 'react';

const WA = `https://wa.me/541123808166?text=${encodeURIComponent('Hola, quiero solicitar acceso a escribanIA.')}`;

const links = [
  { label: 'El problema', href: '#problema' },
  { label: 'Casos de uso', href: '#casos' },
  { label: 'Cómo funciona', href: '#proceso' },
  { label: 'Precios', href: '#precios' },
  { label: 'FAQ', href: '#faq' },
];

const Nav = () => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav">
        <div className="brand">
          <div className="logo"></div>
          <div className="brandName">escriban<b>IA</b></div>
        </div>

        {/* Desktop links */}
        <div className="navLinks">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a href={WA} target="_blank" rel="noopener noreferrer" className="navCta">Solicitar acceso</a>
        </div>

        {/* Hamburger */}
        <button className="navHamburger" onClick={() => setOpen(v => !v)} aria-label="Menú">
          <span className={`navHamLine${open ? ' open' : ''}`} />
          <span className={`navHamLine${open ? ' open' : ''}`} />
          <span className={`navHamLine${open ? ' open' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="navMobileMenu">
          {links.map(l => (
            <a key={l.href} href={l.href} className="navMobileLink" onClick={close}>{l.label}</a>
          ))}
          <a href={WA} target="_blank" rel="noopener noreferrer" className="navCta navMobileCta" onClick={close}>
            Solicitar acceso
          </a>
        </div>
      )}
    </>
  );
};

export default Nav;
