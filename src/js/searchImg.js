import refs from './refs.js';
import cardMarkUp from '../templetes/cardMarkUp.hbs';
import ApiService from './apiService.js';
import LoadMoreBtn from './loadMoreBtn.js';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import onGalleryEl from './modal.js';

const { searchForm, gallery } = refs;

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const apiService = new ApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
gallery.addEventListener('click', onGalleryEl);

function onSearch(e) {
  e.preventDefault();
  clearGallery();
  apiService.query = e.currentTarget.elements.query.value;
  if (apiService.query === '') {
    loadMoreBtn.disable();
    return noRes();
  }

  loadMoreBtn.show();
  apiService.resetPage();
  fetchCards();
}

function fetchCards() {
  try {
    loadMoreBtn.disable();
    return apiService.fetchImage().then(img => {
      renderMarkup(img);
      scrollPage();
      loadMoreBtn.enable();
      if (img.length === 0) {
        loadMoreBtn.hide();
        noMatches();
      }
    });
  } catch (err) {
    console.log(err);
  }
}

function onLoadMore() {
  fetchCards();
}

function renderMarkup(hits) {
  gallery.insertAdjacentHTML('beforeend', cardMarkUp(hits));
}

function clearGallery() {
  gallery.innerHTML = '';
}

function noRes() {
  error({
    text: 'Nothing entered.',
    delay: 3000,
  });
}

function noMatches() {
  error({
    text: 'No matches.',
    delay: 3000,
  });
}

function scrollPage() {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);
  } catch (error) {
    console.log(error);
  }
}