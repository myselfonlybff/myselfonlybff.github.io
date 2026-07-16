'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const seriesList = [
  { title: 'Stranger Things', platform: 'Netflix', score: 97, year: 2016, genre: 'Sci-Fi', summary: 'Du mystère, de la nostalgie et une bande d’amis face à l’impossible.', accent: 'linear-gradient(135deg, #10172c, #4266cc)', icon: '◒', link: 'https://www.netflix.com/' },
  { title: 'The Boys', platform: 'Prime Video', score: 95, year: 2019, genre: 'Action', summary: 'Une satire électrique du mythe super-héroïque, sans aucun filtre.', accent: 'linear-gradient(135deg, #4a1f1c, #d35542)', icon: '✹', link: 'https://www.amazon.com/prime-video' },
  { title: 'The Crown', platform: 'Netflix', score: 94, year: 2016, genre: 'Drame', summary: 'Le pouvoir, l’intime et l’Histoire racontés avec une précision majestueuse.', accent: 'linear-gradient(135deg, #18202c, #8b8b8f)', icon: '♛', link: 'https://www.netflix.com/' },
  { title: 'Wednesday', platform: 'Netflix', score: 93, year: 2022, genre: 'Comédie', summary: 'Une enquête gothique à l’humour sec, guidée par une héroïne inoubliable.', accent: 'linear-gradient(135deg, #262332, #7655ad)', icon: '☾', link: 'https://www.netflix.com/' },
  { title: 'Reacher', platform: 'Prime Video', score: 92, year: 2022, genre: 'Thriller', summary: 'Une série d’action directe et nerveuse, pensée pour enchaîner les épisodes.', accent: 'linear-gradient(135deg, #15372c, #43ad80)', icon: '↯', link: 'https://www.amazon.com/prime-video' },
  { title: 'House of the Dragon', platform: 'Max', score: 91, year: 2022, genre: 'Fantastique', summary: 'Dynasties, dragons et trahisons : une fresque où chaque alliance compte.', accent: 'linear-gradient(135deg, #352042, #be7b36)', icon: '♜', link: 'https://www.max.com/' }
];
const platforms = ['Tous', 'Netflix', 'Prime Video', 'Max'];
const genres = ['Tous', 'Sci-Fi', 'Action', 'Drame', 'Thriller', 'Comédie', 'Fantastique'];

export default function SeriesPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('Tous'); const [selectedGenre, setSelectedGenre] = useState('Tous');
  const filtered = useMemo(() => seriesList.filter((serie) => (selectedPlatform === 'Tous' || serie.platform === selectedPlatform) && (selectedGenre === 'Tous' || serie.genre === selectedGenre)).sort((a, b) => b.score - a.score), [selectedPlatform, selectedGenre]);
  const featured = filtered[0] || seriesList[0];
  return <main className="page-shell">
    <section className="hero-card series-hero"><div className="hero-content"><span className="eyebrow">Screen selection · This week</span><h1>Votre prochaine grande série commence ici.</h1><p>Des mondes à habiter, des intrigues à dévorer et une sélection qui vous aide à choisir sans faire défiler pendant une heure.</p><div className="hero-actions"><a href="#catalogue" className="button primary">Voir la sélection</a><a href="https://www.netflix.com/" target="_blank" rel="noreferrer" className="button secondary">Ouvrir Netflix ↗</a></div></div></section>
    <section className="stats-bar"><div><strong>{seriesList.length}</strong><span>séries sélectionnées</span></div><div><strong>03</strong><span>plateformes à explorer</span></div><div><strong>100%</strong><span>prêtes à regarder</span></div></section>
    <section className="featured-card"><div className="featured-card-body"><span className="eyebrow">En tête d’affiche</span><h3>{featured.title}</h3><p>{featured.summary}</p><div className="genres"><span>{featured.platform}</span><span>{featured.genre}</span><span>{featured.year}</span></div><a href={featured.link} target="_blank" rel="noreferrer" className="button card-link">Regarder maintenant ↗</a></div><div className="featured-visual" style={{ background: featured.accent }}>{featured.icon}</div></section>
    <section id="catalogue" className="catalogue-section"><div className="section-heading"><div><span className="eyebrow">Curated watchlist</span><h2>À regarder maintenant.</h2></div><p>Affinez la sélection selon la plateforme et l’ambiance qui vous tente ce soir.</p></div><div className="chip-row">{platforms.map((platform) => <button type="button" key={platform} className={`chip ${selectedPlatform === platform ? 'active' : ''}`} onClick={() => setSelectedPlatform(platform)}>{platform}</button>)}</div><div className="chip-row">{genres.map((genre) => <button type="button" key={genre} className={`chip ${selectedGenre === genre ? 'active' : ''}`} onClick={() => setSelectedGenre(genre)}>{genre}</button>)}</div><div className="card-grid compact-grid">{filtered.map((serie) => <article className="anime-card series-card" key={serie.title}><div className="series-cover" style={{ background: serie.accent }}>{serie.icon}</div><div className="card-body"><div className="card-top"><h3>{serie.title}</h3><span className="score">★ {serie.score}</span></div><p>{serie.summary}</p><div className="genres"><span>{serie.platform}</span><span>{serie.genre}</span><span>{serie.year}</span></div><a href={serie.link} target="_blank" rel="noreferrer" className="button card-link">Voir la série ↗</a></div></article>)}</div></section><section className="bottom-nav-card"><Link href="/music" className="button secondary">Explorer la musique →</Link><Link href="/anime" className="button secondary">Explorer les anime →</Link></section>
  </main>;
}
