export const getDomain = (url) => {
  if (!url) return "";
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch (e) {
    return "";
  }
};

export const timeAgo = (dateInfo) => {
  const date = new Date(dateInfo);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) return interval + " years";
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + " months";
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return interval + " days";
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return interval + " hours";
  interval = Math.floor(seconds / 60);
  if (interval > 1) return interval + " minutes";
  return Math.floor(seconds) + " seconds";
};
