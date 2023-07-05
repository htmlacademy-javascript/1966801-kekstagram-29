import { generatePhotos } from './data.js';
import { COUNTERS } from './data.js';

const thumbnailList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderThumbnails = () => {
  const thumbnailFragment = document.createDocumentFragment();

  generatePhotos(COUNTERS.PHOTO_AMOUNT).forEach(({url, description, likes, comments}) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnailFragment.appendChild(thumbnail);
  });

  thumbnailList.appendChild(thumbnailFragment);
};

export {renderThumbnails};
