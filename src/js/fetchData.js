import createCard from './createCard';
import { Notify } from 'notiflix';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export default async function FetchData(q, page) {
  const { data } = await axios.get(`/api/`, {
    params: {
      key: `33730392-00e87f60b0c2dabc7d687ed2e`,
      q: `${q}`,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 40,
      page: `${page}`,
      safesearch: true,
    },
  });

  if (!data.total) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.loadMoreBtn.classList.add('hidden');
  }
  if (page === 1 && data.total)
    Notify.success(`Hooray! We found ${data.totalHits} images.`);

  console.log(data);
  if (data.hits == 0 && data.total) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    throw new Error('No more results');
  }

  return createMarkup(data.hits);
}

function createMarkup(data) {
  return data.reduce((acc, card) => createCard(card) + acc, '');
}
