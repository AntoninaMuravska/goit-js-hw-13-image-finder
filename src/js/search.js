import refs from './refs.js';
import ApiService from './apiService.js';
import cardTpl from '../templates/card.hbs';
import onScroll from './scroll.js';
import Notiflix from "notiflix";

const {formRef, galleryRef, btnLoadMore} = refs;
btnLoadMore.classList.add('is-hidden');

formRef.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);

const fetchService = new ApiService();

function onSearch(e) {
e.preventDefault();

fetchService.query = e.target.elements.searchQuery.value;

if (!fetchService.query) {
    clearContainer();
    return;
  }

  fetchService.resetPage();

  try {
    fetchService.fetchImg().then(data => {
      clearContainer();
      createMarkup(data);
    });
  } catch (error) {
    throw error;
  }

}

function createMarkup(images) {
  // console.log(images);

  if (images.length === 0) {
    Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  const imageCard = cardTpl(images);
  galleryRef.insertAdjacentHTML('beforeend', imageCard);

  if (images.length < 40) {
    btnLoadMore.classList.add('is-hidden');
    Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
  } else {
    btnLoadMore.classList.remove('is-hidden');
  }

  if (images.length >= 481 && images.length <= 500) {
    Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    btnLoadMore.classList.add('is-hidden');
  }
}

function clearContainer() {
  galleryRef.innerHTML = '';
  btnLoadMore.classList.add('is-hidden');
}

function onLoadMore() {
  try {
    fetchService.fetchImg().then(data => {
      createMarkup(data);
      onScroll();
    });
  } catch (error) {
    throw error;
  }
}
