/** Pulls the numeric video id out of a TikTok video URL. */
export function tiktokId(url: string): string | null {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

export const tiktokEmbedSrc = (id: string): string =>
  `https://www.tiktok.com/embed/v2/${id}`;
