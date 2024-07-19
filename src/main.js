import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getImages from './js/pixabay-api.js';
import createMarkup from './js/render-functions.js';
import * as messanges from './js/messanges-to-users.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-wrapper');
const btnLoad = document.querySelector('.load-btn');

const PER_PAGE = 15;
let currentPage = 1;
let strSearch = '';
let heightCard = 0;

form.addEventListener('submit', evt => {
  evt.preventDefault();
  btnLoad.classList.add('load-hidden');
  gallery.innerHTML = '';
  strSearch = evt.target.elements.search.value.trim();
  if (strSearch === '') {
    messanges.warning();
    return;
  }
  currentPage = 1;
  displayGallery(currentPage);
  form.reset();
});

btnLoad.addEventListener('click', () => {
  btnLoad.classList.add('load-hidden');
  currentPage += 1;
  displayGallery(currentPage);
});

async function displayGallery(currentPage) {
  loader.classList.remove('loader-wrapper-hidden');
  const data = await getImages(strSearch, currentPage, PER_PAGE);
  loader.classList.add('loader-wrapper-hidden');

  if (data == undefined) {
    messanges.error();
    return;
  }
  if (!data.hits.length) {
    messanges.info();
    return;
  }
  const totalHits = data.totalHits;
  const loadImage =
    PER_PAGE * currentPage <= totalHits ? PER_PAGE * currentPage : totalHits;
  messanges.success(totalHits, loadImage);
  gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();

  if (currentPage === 1 && totalHits > PER_PAGE) {
    heightCard = Math.round(
      document.querySelector('.gallery-item').getBoundingClientRect().height
    );
  } else {
    window.scrollBy({
      top: heightCard * 2,
      left: 0,
      behavior: 'smooth',
    });
  }

  if (currentPage === Math.ceil(totalHits / PER_PAGE)) {
    btnLoad.classList.add('load-hidden');
    messanges.endOfSearch();
  } else {
    btnLoad.classList.remove('load-hidden');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
  backToTop.addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
