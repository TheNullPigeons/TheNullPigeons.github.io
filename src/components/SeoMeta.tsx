import React from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://thenullpigeons.org';
const DEFAULT_TITLE = 'TheNullPigeons';
const DEFAULT_DESC = 'Professional offensive lab environment for security professionals.';

type MetaConfig = { title: string; description: string };

const ROUTE_META: Array<{ match: (p: string) => boolean; meta: MetaConfig }> = [
  { match: (p) => p === '/', meta: { title: 'TheNullPigeons', description: DEFAULT_DESC } },
  { match: (p) => p.startsWith('/docs/installation'), meta: { title: 'TheNullPigeons - Installation', description: 'Install nihil quickly and start your first offensive containers.' } },
  { match: (p) => p === '/docs/usage', meta: { title: 'TheNullPigeons - CLI Commands', description: 'Complete reference for nihil CLI commands and workflows.' } },
  { match: (p) => p === '/docs/images', meta: { title: 'TheNullPigeons - Images', description: 'Compare nihil images and pick the best stack for your engagement.' } },
  { match: (p) => p === '/docs/nihil-history', meta: { title: 'TheNullPigeons - nihil-history', description: 'Track credentials, hosts, and access links across engagements.' } },
  { match: (p) => p === '/docs/architecture', meta: { title: 'TheNullPigeons - Architecture', description: 'Understand how nihil CLI, Docker manager, and image pipeline fit together.' } },
  { match: (p) => p === '/docs/configuration', meta: { title: 'TheNullPigeons - Configuration', description: 'Configure nihil paths, resources, env variables, and command history.' } },
  { match: (p) => p === '/docs/contributing', meta: { title: 'TheNullPigeons - Contributing', description: 'Report bugs, request tools, and contribute to the nihil ecosystem.' } },
  { match: (p) => p === '/docs/faq', meta: { title: 'TheNullPigeons - FAQ', description: 'Answers to frequent questions about nihil setup and usage.' } },
  { match: (p) => p === '/docs/about', meta: { title: 'TheNullPigeons - About', description: 'Why nihil was built and how the project is structured.' } },
  { match: (p) => p.startsWith('/blog'), meta: { title: 'TheNullPigeons - Blog', description: 'News, release notes, and practical offensive workflow updates.' } },
  { match: (p) => p === '/community', meta: { title: 'TheNullPigeons - Community', description: 'Join discussions, share feedback, and follow project updates.' } },
  { match: (p) => p === '/pricing', meta: { title: 'TheNullPigeons - Pricing', description: 'Project support options for individuals and teams.' } },
  { match: (p) => p === '/source-code', meta: { title: 'TheNullPigeons - Source Code', description: 'Browse repositories behind nihil and nihil-images.' } },
];

function setMetaByName(name: string, content: string) {
  let node = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute('name', name);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function setMetaByProperty(property: string, content: string) {
  let node = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute('property', property);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

export const SeoMeta: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const meta = ROUTE_META.find((r) => r.match(pathname))?.meta ?? {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESC,
    };
    const absoluteUrl = `${BASE_URL}${pathname}`;

    document.title = meta.title;
    setMetaByName('description', meta.description);

    setMetaByProperty('og:type', 'website');
    setMetaByProperty('og:site_name', 'TheNullPigeons');
    setMetaByProperty('og:title', meta.title);
    setMetaByProperty('og:description', meta.description);
    setMetaByProperty('og:url', absoluteUrl);

    setMetaByName('twitter:card', 'summary');
    setMetaByName('twitter:title', meta.title);
    setMetaByName('twitter:description', meta.description);
  }, [pathname]);

  return null;
};
