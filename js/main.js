import { renderThumbnails } from './thumbnails.js';
import { addListenersToThumbnails, writeThumbnails } from './big-picture.js';
import { toUploadImg } from './form.js';
import { getData } from './api.js';

getData().then((data) => {
  renderThumbnails(data);
  writeThumbnails(data);
  addListenersToThumbnails();
  toUploadImg();
});
