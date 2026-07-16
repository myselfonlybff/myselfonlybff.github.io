import './globals.css';
import SiteHeader from './components/SiteHeader';

export const metadata = { title: 'The Anime Zone | Anime, séries & musique', description: 'Une sélection soignée d’animes, de séries et de musique.' };
export default function RootLayout({ children }) { return <html lang="fr"><body><SiteHeader />{children}</body></html>; }
