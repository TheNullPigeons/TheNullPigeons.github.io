/**
 * Les avatars sont chargés depuis l’API GitHub (avatar_url) dans CommunityPage.
 * Ce fichier n’est plus utilisé pour les photos ; conservé au cas où tu voudrais
 * des URLs manuelles en fallback.
 */
export const TEAM_AVATAR_URLS: Record<string, string> = {
  '0xbbuddha': '',
  'Goultarde': '',
};

/** Usernames GitHub pour récupérer les avatars via l’API */
export const GITHUB_USERNAMES: Record<string, string> = {
  '0xbbuddha': '0xbbuddha',
  'Goultarde': 'Goultarde',
};
