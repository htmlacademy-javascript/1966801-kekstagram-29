import { renderThumbnails } from './thumbnails.js';

renderThumbnails();
const bigPicture = document.querySelector('.big-picture');
const thumbnails = document.querySelectorAll('.picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.social__likes');

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', (evt) => {
      console.log(evt);

    const {src, alt} = evt.target;
    bigPictureImg.src = src;
    bigPictureImg.alt = alt;
    // bigPictureLikes.textContent = ;

    bigPicture.classList.remove('hidden');
  });


});
