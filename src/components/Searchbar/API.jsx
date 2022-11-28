import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export async function fetchItems(q, page) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: '30500534-ec5f5c30a1edd00a61f5d8ab9',
        q: q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
