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
