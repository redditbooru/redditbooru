export function generateThumbnailUrl(
  url: string,
  width: number,
  height: number,
): string {
  // As noted in https://github.com/dxprog/rbthumbs/blob/master/src/url-tools.js
  const encodedUrl = btoa(url).replace(/\=/g, '-').replace(/\//g, '_');
  return `https://thumb.awwni.me/${encodedUrl}_${width}_${height}.jpg`;
}
