'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [{ href: '/', label: 'Accueil' }, { href: '/anime', label: 'Anime' }, { href: '/series', label: 'Séries' }, { href: '/music', label: 'Musique' }];

export default function SiteHeader() {
  const pathname = usePathname();
  return <header className="site-header"><Link href="/" className="brand-block"><div className="brand-logo">✦</div><div><strong>The Anime Zone</strong><span>curated culture</span></div></Link><nav className="nav-links">{links.map((link) => <Link key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>{link.label}</Link>)}</nav></header>;
}
