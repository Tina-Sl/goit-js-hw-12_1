import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '44698390-237f634988ff1cc21b0da43c0';

export default async function getImages(str, page, perPage) {
  if (str.includes(' ')) {
    str.replace(/\s+/g, '+');
  }

  const searchParams = {
    params: {
      key: KEY,
      q: str,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: perPage,
    },
  };
  try {
    const response = await axios.get(BASE_URL, searchParams);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}
