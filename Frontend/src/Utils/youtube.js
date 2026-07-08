import { getChannelsApi } from "./Constants";

// Given a list of channel ids, returns a map { channelId: avatarUrl }.
// The videos/search endpoints don't include channel avatars, so we batch
// them into a single channels.list call (max 50 ids).
export const fetchChannelIcons = async (channelIds) => {
  const unique = [...new Set((channelIds || []).filter(Boolean))].slice(0, 50);
  if (!unique.length) return {};

  try {
    const res = await fetch(getChannelsApi(unique.join(",")));
    const json = await res.json();
    const map = {};
    (json.items || []).forEach((c) => {
      map[c.id] = c?.snippet?.thumbnails?.default?.url || null;
    });
    return map;
  } catch (error) {
    console.error("Error fetching channel icons:", error);
    return {};
  }
};
