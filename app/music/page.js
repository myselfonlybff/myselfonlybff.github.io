'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const genres = ['Tous', 'R&B', 'Jazz', 'Rap US', 'Rap FR', 'Rap UK', 'Afro fusion'];
const artists = [
  { name: 'SZA', genre: 'R&B', score: 95, mood: 'Velours nocturne', note: 'Une voix intime et magnétique, entre confession et mélodie solaire.', preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Kendrick Lamar', genre: 'Rap US', score: 93, mood: 'Lucide & intense', note: 'Un rap d’auteur, dense et vivant, où chaque écoute révèle un détail.', preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { name: 'Masego', genre: 'Jazz', score: 88, mood: 'Late-night groove', note: 'Une élégance soul-jazz pour les fins de journée qui s’étirent.', preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { name: 'Damso', genre: 'Rap FR', score: 91, mood: 'Brut & intérieur', note: 'Des textes à double fond et une signature sonore immédiatement reconnaissable.', preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { name: 'Central Cee', genre: 'Rap UK', score: 90, mood: 'Énergie urbaine', note: 'Des refrains précis et un flow londonien qui ne perd jamais l’allure.', preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { name: 'Tems', genre: 'Afro fusion', score: 89, mood: 'Solaire & libre', note: 'Une présence singulière, au croisement de l’afrobeats, de la soul et de la pop.', preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
];

export default function MusicPage() {
  const [selectedGenre, setSelectedGenre] = useState('Tous');
  const visibleArtists = useMemo(() => selectedGenre === 'Tous' ? artists : artists.filter((artist) => artist.genre === selectedGenre), [selectedGenre]);
  return <main className="page-shell">
    <section className="hero-card music-hero"><div className="hero-content"><span className="eyebrow">Sound selection · Vol. 01</span><h1>La bande-son de vos prochains moments.</h1><p>Des artistes essentiels, de nouvelles textures et des extraits pour trouver rapidement ce qui résonne avec vous.</p><div className="hero-actions"><a href="#selection" className="button primary">Lancer la sélection</a><a href="https://open.spotify.com/" target="_blank" rel="noreferrer" className="button secondary">Ouvrir Spotify ↗</a></div></div></section>
    <section className="spotlight-grid"><article className="spotlight-card"><span className="eyebrow">Mood du jour</span><h3>After hours<br />& golden light.</h3><p>Un mélange de R&B feutré, de jazz moderne et de rythmes qui font durer la nuit un peu plus longtemps.</p></article><article className="spotlight-card"><span className="eyebrow">À propos</span><div className="mini-list"><div className="mini-item"><span>Artistes sélectionnés</span><span>{artists.length}</span></div><div className="mini-item"><span>Genres à explorer</span><span>{genres.length - 1}</span></div><div className="mini-item"><span>Pour chaque humeur</span><span>∞</span></div></div></article></section>
    <section id="selection" className="catalogue-section"><div className="section-heading"><div><span className="eyebrow">Browse by feeling</span><h2>Trouvez votre prochain son.</h2></div><p>Filtrez par genre, lancez un extrait et laissez votre curiosité faire le reste.</p></div><div className="chip-row">{genres.map((genre) => <button type="button" key={genre} className={`chip ${selectedGenre === genre ? 'active' : ''}`} onClick={() => setSelectedGenre(genre)}>{genre}</button>)}</div><div className="card-grid compact-grid">{visibleArtists.map((artist) => <article className="anime-card" key={artist.name}><div className="card-body"><div className="card-top"><h3>{artist.name}</h3><span className="score">{artist.score}/100</span></div><p>{artist.note}</p><div className="genres"><span>{artist.genre}</span><span>{artist.mood}</span></div><audio controls preload="none" className="audio-player" src={artist.preview}>Votre navigateur ne prend pas en charge l’audio.</audio></div></article>)}</div></section><section className="bottom-nav-card"><Link href="/series" className="button secondary">Explorer les séries →</Link><Link href="/anime" className="button secondary">Explorer les anime →</Link></section>
  </main>;
}
