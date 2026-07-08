// Shared formatting helpers used across cards, search rows and the watch page.

// 1234567 -> "1.2M", 12000 -> "12K"
export const formatCount = (value) => {
  if (value == null) return "0";
  const n = Number(value);
  if (Number.isNaN(n)) return "0";
  const trim = (num) => num.toFixed(1).replace(/\.0$/, "");
  if (n >= 1_000_000_000) return trim(n / 1_000_000_000) + "B";
  if (n >= 1_000_000) return trim(n / 1_000_000) + "M";
  if (n >= 1_000) return trim(n / 1_000) + "K";
  return String(n);
};

// ISO date -> "3 days ago"
export const timeAgo = (publishedAt) => {
  if (!publishedAt) return "";
  const diff = Date.now() - new Date(publishedAt).getTime();
  if (Number.isNaN(diff)) return "";

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const unit = (value, label) =>
    value + " " + label + (value === 1 ? "" : "s") + " ago";

  if (years > 0) return unit(years, "year");
  if (months > 0) return unit(months, "month");
  if (days > 0) return unit(days, "day");
  if (hours > 0) return unit(hours, "hour");
  if (minutes > 0) return unit(minutes, "minute");
  return unit(Math.max(seconds, 0), "second");
};
