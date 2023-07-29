import { renderThumbnails } from './thumbnails.js';
import { addListenersToThumbnails, writeThumbnails } from './big-picture.js';
import { toUploadImg, setFormSubmit , closePopup } from './form.js';
import { getData } from './api.js';
import { addListenersToFileChooser } from './upload-img.js';
import { useFilter } from './filtres.js';
import { debounce, showAlert } from './util.js';

toUploadImg();
addListenersToFileChooser();
setFormSubmit(closePopup);

getData().then((images) => {
  const debouncedThumbnails = debounce(renderThumbnails);
  renderThumbnails(images);
  writeThumbnails(images);
  useFilter(images, debouncedThumbnails);
  addListenersToThumbnails();
})
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );


