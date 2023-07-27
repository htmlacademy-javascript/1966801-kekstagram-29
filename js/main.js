import { renderThumbnails } from './thumbnails.js';
import { addListenersToThumbnails, writeThumbnails } from './big-picture.js';
import { toUploadImg, setFormSubmit , closePopup } from './form.js';
import { getData } from './api.js';
import { addListenersToFileChooser } from './upload-img.js';

getData().then((data) => {
  renderThumbnails(data);
  writeThumbnails(data);
  addListenersToThumbnails();
  toUploadImg();
});

setFormSubmit(closePopup);
addListenersToFileChooser();
