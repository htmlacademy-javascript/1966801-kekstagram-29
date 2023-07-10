import { renderThumbnails, arrayThumbnail } from './thumbnails.js';
import { isEscapeKey } from './util.js';

renderThumbnails();
const bigPicture = document.querySelector('.big-picture');
const thumbnails = document.querySelectorAll('.picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsElement = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const COMMENT_STEP = 5;
let currentComments = [];
let currentThumbnail = {};
let currentStart = 0;

const renderCommentsBlock = (comments) => {
  bigPictureComments.innerHTML = '';

  comments.forEach((item) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = item.avatar;
    comment.querySelector('.social__picture').alt = item.name;
    comment.querySelector('.social__text').textContent = item.message;
    bigPictureComments.appendChild(comment);
  });
};

const showComments = () => {
  const { comments } = currentThumbnail;
  const isLastBunch = comments.length <= currentStart + COMMENT_STEP;

  if (!isLastBunch) {
    commentsLoaderButton.classList.remove('hidden');
  } else {
    commentsLoaderButton.classList.add('hidden');
  }

  const textFrom = isLastBunch ? comments.length : currentStart + COMMENT_STEP;
  bigPictureCommentsElement.textContent = `${textFrom} из ${comments.length} комментариев`;
  const bunch = comments.slice(currentStart, currentStart + COMMENT_STEP);
  currentComments = currentComments.concat(bunch);
  currentStart += COMMENT_STEP;
  renderCommentsBlock(currentComments);
};

const addListenerToLoadMoreButton = () => {
  commentsLoaderButton.addEventListener('click', showComments);
};

const createBigPicture = (evt) => {
  currentThumbnail = arrayThumbnail.find((it) => it.id === Number(evt.target.dataset.id));
  bigPictureImg.src = currentThumbnail.url;
  bigPictureImg.alt = currentThumbnail.description;
  bigPictureLikes.textContent = currentThumbnail.likes;
  bigPictureCommentsCount.textContent = currentThumbnail.comments.length;
  bigPictureCaption.textContent = currentThumbnail.description;
  showComments();
};

const onKeydownEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
};

const resetComments = () => {
  currentComments = [];
  currentStart = 0;
};

const closeBigPicture = (evt) => {
  if (isEscapeKey(evt) || evt.type === 'click') {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', onKeydownEscape);
    resetComments();
  }
};

const addListenersToCloseModal = () => {
  document.addEventListener('keydown', closeBigPicture);
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  addListenersToCloseModal();
  addListenerToLoadMoreButton();
};

const addListenersToThumbnails = () => {
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', (evt) => {
      createBigPicture(evt);
      openBigPicture();
    });
  });
};

addListenersToThumbnails();
