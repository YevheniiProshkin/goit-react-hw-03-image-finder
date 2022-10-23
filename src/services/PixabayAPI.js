import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (search, page) => {
  const response = await axios.get(
    `?q=${search}&key=29769595-36b0829e88a1fc1cbb43ad5d4&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
  const images = response.data.hits.map(
    ({ id, webformatURL, largeImageURL }) => ({
      id: id,
      webformatURL: webformatURL,
      largeImageURL: largeImageURL,
    })
  );
  return images;
};

const api = {
  fetchImages,
};

export default api;
