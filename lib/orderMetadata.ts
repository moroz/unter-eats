/*
 * Build an object of browser metadata for statistics.
 */

export const buildMetadata = () => {
  try {
    const map = {
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      userAgent: navigator.userAgent,
      languages: navigator.languages
    };
    return JSON.stringify(map);
  } catch (_e) {
    return null;
  }
};
