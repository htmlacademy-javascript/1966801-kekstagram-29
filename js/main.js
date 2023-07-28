import { renderThumbnails } from './thumbnails.js';
import { addListenersToThumbnails, writeThumbnails } from './big-picture.js';
import { toUploadImg, setFormSubmit , closePopup } from './form.js';
import { getData } from './api.js';
import { addListenersToFileChooser } from './upload-img.js';
import { useFilter } from './filtres.js';

getData().then((images) => {
  renderThumbnails(images);
  writeThumbnails(images);
  useFilter(images);
  addListenersToThumbnails();
  toUploadImg();
});

setFormSubmit(closePopup);
addListenersToFileChooser();
