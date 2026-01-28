const BASE_URL = 'https://hn.algolia.com/api/v1';

export const fetchTopStories = async (page = 0) => {
  const response = await fetch(`${BASE_URL}/search?tags=front_page&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }
  return response.json();
};

export const fetchNewStories = async (page = 0) => {
  const response = await fetch(`${BASE_URL}/search_by_date?tags=story&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch new stories');
  }
  return response.json();
};

export const searchStories = async (query, page = 0) => {
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to search stories');
  }
  return response.json();
};

export const fetchStoryById = async (id) => {
  const response = await fetch(`${BASE_URL}/items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch story');
  }
  return response.json();
};
