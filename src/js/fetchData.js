import createCard from './createCard';
import { Notify } from 'notiflix';
import axios from 'axios';

//TODO Need to add axios
axios.defaults.baseURL = 'https://pixabay.com';

export default function fetchData(q, page) {
  return fetch(
    `https://pixabay.com/api/?q=${q}&key=33730392-00e87f60b0c2dabc7d687ed2e&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  )
    .then(response => response.json())
    .then(data => {
      if (!data.total) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.loadMoreBtn.classList.add('hidden');
      }
      if (page === 1 && data.total)
        Notify.success(`Hooray! We found ${data.totalHits} images.`);

      return createMarkup(data.hits);
    });
}

function createMarkup(data) {
  return data.reduce((acc, card) => createCard(card) + acc, '');
}
