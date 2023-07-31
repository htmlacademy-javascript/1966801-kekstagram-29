import { isEscapeKey } from './util.js';

const COMMENT_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsDownload = bigPicture.querySelector('.comments-download');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentsLoadMoreButton = bigPicture.querySelector('.comments-loader');
let currentComments = [];
let currentThumbnail = {};
let currentStart = 0;

let thumbnails = [];

const writeThumbnails = (data) => {
  thumbnails = data;
};

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
    commentsLoadMoreButton.classList.remove('hidden');
    commentsLoadMoreButton.addEventListener('click', showComments);
  } else {
    commentsLoadMoreButton.classList.add('hidden');
    commentsLoadMoreButton.removeEventListener('click', showComments);
  }

  const textFrom = isLastBunch ? comments.length : currentStart + COMMENT_STEP;
  bigPictureCommentsDownload.textContent = `${textFrom}`;
  const bunch = comments.slice(currentStart, currentStart + COMMENT_STEP);
  currentComments = currentComments.concat(bunch);
  currentStart += COMMENT_STEP;
  renderCommentsBlock(currentComments);
};

const createBigPicture = (evt) => {
  currentThumbnail = thumbnails.find((it) => it.id === Number(evt.target.dataset.id));
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
};

const addListenersToThumbnails = () => {
  const thumbnailsContainer = document.querySelector('.pictures');
  thumbnailsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      evt.preventDefault();
      createBigPicture(evt);
      openBigPicture();
    }
  });
};

export {addListenersToThumbnails, writeThumbnails};
