import Link from 'next/link';

const universes = [
  { number: '01', title: 'Anime', text: 'Des mondes dessinés à découvrir, du grand classique aux nouvelles obsessions.', href: '/anime', action: 'Explorer les anime' },
  { number: '02', title: 'Séries', text: 'Les titres qui font parler, sélectionnés par ambiance, genre et plateforme.', href: '/series', action: 'Voir les séries' },
  { number: '03', title: 'Musique', text: 'Des artistes et des textures sonores pour renouveler votre playlist.', href: '/music', action: 'Écouter les découvertes' }
];

export default function HomePage() {
  return <main className="page-shell">
    <section className="hero-card home-hero"><div className="hero-content"><span className="eyebrow">Sélection culturelle · 2026</span><h1>Tout ce qui mérite votre temps.</h1><p>The Anime Zone est votre guide pour trouver le prochain anime à dévorer, la série qui vous tiendra éveillé et le son qui tournera en boucle.</p><div className="hero-actions"><Link href="/anime" className="button primary">Commencer l’exploration</Link><a href="#univers" className="button secondary">Découvrir les univers</a></div></div></section>
    <section className="stats-bar"><div><strong>03</strong><span>univers à parcourir</span></div><div><strong>01</strong><span>sélection éditoriale</span></div><div><strong>∞</strong><span>prochaines obsessions</span></div></section>
    <section id="univers" className="catalogue-section"><div className="section-heading"><div><span className="eyebrow">Choisissez votre entrée</span><h2>Quel univers vous appelle ?</h2></div><p>Une navigation simple, des recommandations sélectionnées avec intention et aucun bruit inutile.</p></div><div className="card-grid">{universes.map((universe) => <article className="anime-card" key={universe.title}><div className="card-body"><span className="score">{universe.number} / THE ZONE</span><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', margin: '16px 0 0' }}>{universe.title}</h3><p>{universe.text}</p><Link href={universe.href} className="button card-link">{universe.action} →</Link></div></article>)}</div></section>
    <section className="spotlight-grid"><article className="spotlight-card"><span className="eyebrow">L’idée</span><h3>Moins chercher.<br />Mieux tomber.</h3><p>Nous avons imaginé The Anime Zone comme une porte d’entrée élégante vers les histoires, images et artistes qui vous ressemblent.</p></article><article className="spotlight-card"><span className="eyebrow">En ce moment</span><div className="mini-list"><div className="mini-item"><span>Anime à lancer</span><span>→ ANIME</span></div><div className="mini-item"><span>Série à binge-watch</span><span>→ SÉRIES</span></div><div className="mini-item"><span>Son à ajouter</span><span>→ MUSIQUE</span></div></div></article></section>
  </main>;
}
