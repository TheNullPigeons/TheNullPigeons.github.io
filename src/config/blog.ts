export interface BlogPost {
  slug: string;
  title: string;
  date: string;       // ISO format YYYY-MM-DD
  tags: string[];
  excerpt: string;
  content: string;    // Markdown-like JSX string - rendered in BlogPostPage
}

export const blogPosts: BlogPost[] = [
  // Add articles here. Example:
  // {
  //   slug: 'why-we-built-nihil',
  //   title: 'Why we built Nihil',
  //   date: '2026-03-11',
  //   tags: ['tooling', 'pentest'],
  //   excerpt: 'A quick rundown of why we started this project and what problems it solves.',
  //   content: '...',
  // },
];
