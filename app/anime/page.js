'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const PLATFORM_KEYWORDS = [
  { label: 'Netflix', keywords: ['netflix'] },
  { label: 'Prime Video', keywords: ['prime video', 'amazon prime', 'amazon'] },
  { label: 'Crunchyroll', keywords: ['crunchyroll'] },
  { label: 'Disney+', keywords: ['disney'] },
  { label: 'Apple TV', keywords: ['apple tv', 'itunes'] },
  { label: 'YouTube', keywords: ['youtube'] }
];

function findPlatforms(streamingLinks = []) {
  const matches = [];
  streamingLinks.forEach((link) => {
    const combined = `${(link.name || '').toLowerCase()} ${(link.url || '').toLowerCase()}`;
    PLATFORM_KEYWORDS.forEach((platform) => {
      if (platform.keywords.some((keyword) => combined.includes(keyword)) && !matches.includes(platform.label)) {
        matches.push(platform.label);
      }
    });
  });
  return matches;
}

const fallbackAnimes = [
  {
    mal_id: 1,
    title: 'Solo Leveling',
    score: 9.0,
    synopsis: 'Un héros ordinaire devient l’une des figures les plus puissantes d’un monde rempli de dangers.',
    genres: [{ mal_id: 1, name: 'Action' }, { mal_id: 2, name: 'Fantasy' }],
    images: { jpg: { large_image_url: 'https://cdn.myanimelist.net/images/anime/200/132002.jpg' } },
    platforms: ['Crunchyroll'],
    primaryLink: 'https://www.crunchyroll.com/'
  },
  {
    mal_id: 2,
    title: 'Spy x Family',
    score: 8.8,
    synopsis: 'Une famille secrète aux missions impossibles découvre la vraie valeur de l’unité et du rire.',
    genres: [{ mal_id: 3, name: 'Comédie' }, { mal_id: 4, name: 'Action' }],
    images: { jpg: { large_image_url: 'https://cdn.myanimelist.net/images/anime/1448/135813.jpg' } },
    platforms: ['Crunchyroll', 'Netflix'],
    primaryLink: 'https://www.netflix.com/'
  },
  {
    mal_id: 3,
    title: 'One Piece',
    score: 9.2,
    synopsis: 'L’épopée de Monkey D. Luffy et son équipage continue de captiver des millions de fans.',
    genres: [{ mal_id: 5, name: 'Aventure' }, { mal_id: 6, name: 'Fantasy' }],
    images: { jpg: { large_image_url: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg' } },
    platforms: ['Netflix'],
    primaryLink: 'https://www.netflix.com/'
  }
];

export default function AnimePage() {
  const [animes, setAnimes] = useState(fallbackAnimes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch('https://api.jikan.moe/v4/seasons/now?limit=12&sfw=true');
        const data = await res.json();
        if (ignore) return;
        const list = await Promise.all(
          data.data.map(async (anime) => {
            const streamingRes = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/streaming`);
            const streamData = streamingRes.ok ? await streamingRes.json() : { data: [] };
            return {
              ...anime,
              platforms: findPlatforms(streamData.data || []),
              primaryLink: (streamData.data || [])[0]?.url || anime.url || '#'
            };
          })
        );
        setAnimes(list.sort((a, b) => (b.score || 0) - (a.score || 0)));
      } catch {
        setAnimes(fallbackAnimes);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  return (
    <main className="page-shell">
      <section className="hero-card anime-hero">
        <div className="hero-content">
          <span className="eyebrow">ANIMES • Tendance mondiale</span>
          <h1>Découvrez les meilleurs animes du moment</h1>
          <p>Un catalogue dédié à l’actualité, à la popularité et aux plateformes officielles pour regarder chaque anime dans le meilleur endroit.</p>
          <div className="hero-actions">
            <a href="#catalogue" className="button primary">Voir le catalogue</a>
            <a href="https://www.crunchyroll.com/" target="_blank" rel="noreferrer" className="button secondary">Aller sur Crunchyroll</a>
          </div>
        </div>
      </section>

      <section id="catalogue" className="catalogue-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Recommandations</span>
            <h2>Les animes à suivre maintenant</h2>
          </div>
          <p>Chaque titre est choisi selon sa popularité, son score et sa disponibilité sur les plateformes officielles.</p>
        </div>

        {loading ? <div className="state-card">Chargement…</div> : (
          <div className="card-grid">
            {animes.map((anime) => (
              <article className="anime-card" key={anime.mal_id}>
                <img src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url} alt={anime.title} />
                <div className="card-body">
                  <div className="card-top">
                    <h3>{anime.title}</h3>
                    <span className="score">★ {anime.score || 'N/A'}</span>
                  </div>
                  <p>{anime.synopsis ? anime.synopsis.replace(/\[.*?\]/g, '').slice(0, 120) + '...' : 'Description disponible prochainement.'}</p>
                  <div className="genres">
                    {(anime.genres || []).slice(0, 3).map((genre) => <span key={genre.mal_id}>{genre.name}</span>)}
                  </div>
                  <div className="platforms">
                    {anime.platforms?.length > 0 ? anime.platforms.map((platform) => <span key={platform}>{platform}</span>) : <span>Streaming à venir</span>}
                  </div>
                  <a href={anime.primaryLink} target="_blank" rel="noreferrer" className="button card-link">Regarder maintenant</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bottom-nav-card">
        <Link href="/series" className="button secondary">Explorer les séries</Link>
        <Link href="/music" className="button secondary">Explorer la musique</Link>
      </section>
    </main>
  );
}
