const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=48&regionCode=US&key=" +
  GOOGLE_API_KEY;

export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

export const YOUTUBE_SEARCH_API = `${BACKEND_URL}/api/search-suggestions?q=`;

// add the "&key=" text and GOOGLE_API _KEY
export const YOUTUBE_COMMENTS_API =
  "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=";

export const YOUTUBE_SEARCH_RESULTS_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=" +
  GOOGLE_API_KEY+"&q=";

// Real YouTube video categories (only needs the API key, no OAuth).
export const YOUTUBE_CATEGORIES_API =
  "https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=" +
  GOOGLE_API_KEY;

// Batch channel lookup -> used to show real channel avatars on cards.
// Pass a comma-separated list of channel ids (max 50 per call).
export const getChannelsApi = (idsCsv) =>
  "https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=" +
  idsCsv +
  "&key=" +
  GOOGLE_API_KEY;

// Full details for a single video (used by the watch page).
export const getVideoDetailsApi = (id) =>
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=" +
  id +
  "&key=" +
  GOOGLE_API_KEY;

// Fallback avatar when a channel image can't be loaded.
export const DEFAULT_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s";
