import { renderThumbnails, arrayThumbnail } from './thumbnails.js';
import { isEscapeKey } from './util.js';

renderThumbnails();
const bigPicture = document.querySelector('.big-picture');
const thumbnails = document.querySelectorAll('.picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const createBigPicture = (evt) => {
  const {src, alt} = evt.target;
  const currentThumbnail = arrayThumbnail.find((it) => it.id === Number(evt.target.dataset.id));
  bigPictureImg.src = src;
  bigPictureImg.alt = alt;
  bigPictureLikes.textContent = currentThumbnail.likes;
  bigPictureCommentsCount.textContent = currentThumbnail.comments.length;
  bigPictureCaption.textContent = currentThumbnail.description;

  bigPictureComments.innerHTML = '';
  currentThumbnail.comments.forEach((item) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = item.avatar;
    comment.querySelector('.social__picture').alt = item.name;
    comment.querySelector('.social__text').textContent = item.message;
    bigPictureComments.appendChild(comment);
  });
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', (evt) => {
    createBigPicture(evt);
    openBigPicture();
  });
});

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});
