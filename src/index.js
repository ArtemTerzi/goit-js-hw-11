import './js/refs';
import { Notify } from 'notiflix';
import fetchData from './js/fetchData';
import axios from 'axios';

// const options = {
//   method: 'GET',
//   q: 'cat',
//   key: '33730392-00e87f60b0c2dabc7d687ed2e',
//   headers: {
//     'Content-Type': 'application/json; charset=UTF-8',
//   },
// };

let page = 1;

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const q = refs.input.value;
  page = 1;

  if (q === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    fetchData(q, page)
      .then(markup => (refs.gallery.innerHTML = markup))
      .then(data => {
        if (data) refs.loadMoreBtn.classList.remove('hidden');
      })
      .catch(error => console.error(error));
  }
});

refs.loadMoreBtn.addEventListener('click', e => {
  //TODO MAKE REALLY CONSTANT IN GLOBAL CODE, DON'T USE 2 TIMES SAME CODE
  const q = refs.input.value;

  if (!q)
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  else {
    refs.loadMoreBtn.classList.add('hidden');
    page += 1;
    fetchData(q, page)
      .then(markup => refs.gallery.insertAdjacentHTML('beforeend', markup))
      .then(() => refs.loadMoreBtn.classList.remove('hidden'))
      .catch(error => console.error(error));
  }
});
