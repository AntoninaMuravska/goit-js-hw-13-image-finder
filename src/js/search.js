import refs from './refs';
import errorNotification from './pnotify.js';
import imageCardTpl from '../templates/image-card.hbs';
import ApiService from './api-service.js';
import onScroll from './scroll.js';

const { formRef, galleryRef, loadMoreBtn } = refs;

formRef.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

const fetchService = new ApiService();

function onSearch(event) {
  event.preventDefault();

  fetchService.query = event.target.elements.query.value;
  //   fetchService.query = event.target.value;

  if (!fetchService.query) {
    clearContainer();
    return;
  }

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
  if (images.length === 0) {
    errorNotification('No matches found. Try again.');
    return;
  }

  const imageCard = imageCardTpl(images);
  galleryRef.insertAdjacentHTML('beforeend', imageCard);
  loadMoreBtn.classList.remove('is-hidden');
}

function clearContainer() {
  galleryRef.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
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
