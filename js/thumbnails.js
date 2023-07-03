import { generatePhotos } from './data.js';
import { COUNTERS } from './data.js';

const thumbnailList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnailFragment = document.createDocumentFragment();

const renderThumbnails = generatePhotos(COUNTERS.PHOTO_AMOUNT);
renderThumbnails.forEach(({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnailFragment.appendChild(thumbnail);
});

thumbnailList.appendChild(thumbnailFragment);
