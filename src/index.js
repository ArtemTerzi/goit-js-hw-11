import './js/refs';
import { Notify } from 'notiflix';
import fetchData from './js/fetchData';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';

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
        // if (data) refs.loadMoreBtn.classList.remove('hidden'); //! use it if you want use button
        gallery.refresh();
      })
      .catch(error => console.error(error));
  }
});

//! case for button scroll
// refs.loadMoreBtn.addEventListener('click', e => {
//   const q = refs.input.value;

//   if (!q)
//     Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   else {
//     refs.loadMoreBtn.classList.add('hidden');
//     page += 1;
//     fetchData(q, page)
//       .then(markup => refs.gallery.insertAdjacentHTML('beforeend', markup))
//       .then(data => {
//         refs.loadMoreBtn.classList.remove('hidden');
//         gallery.refresh();

//         const { height: cardHeight } = document
//           .querySelector('.gallery')
//           .firstElementChild.getBoundingClientRect();

//         window.scrollBy({
//           top: cardHeight * 2,
//           behavior: 'smooth',
//         });
//       })
//       .catch(error => {
//         console.error(error);
//         refs.loadMoreBtn.classList.add('hidden');
//       });
//   }
// });

let gallery = new SimpleLightbox(`.gallery a`, {
  captionsData: 'alt',
  captionDelay: 250,
});

window.addEventListener(
  'scroll',
  debounce(e => {
    const q = refs.input.value;
    const documentRect = document.documentElement.getBoundingClientRect();
    if (documentRect.bottom < document.documentElement.clientHeight + 1000) {
      page += 1;
      fetchData(q, page)
        .then(markup => refs.gallery.insertAdjacentHTML('beforeend', markup))
        .then(data => {
          gallery.refresh();
        })
        .catch(error => {
          console.error(error);
          refs.loadMoreBtn.classList.add('hidden');
        });
    }
  }, 300)
);
