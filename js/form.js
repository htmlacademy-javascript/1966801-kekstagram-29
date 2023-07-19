import { isEscapeKey } from './util.js';
import { pristine } from './form-validation.js';
import { resetScale, addEventListenerToScaleButton, removeEventListenerToScaleButton } from './scale.js';

const uploadField = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const imgUploadButton = document.querySelector('.img-upload__input');
const resetButton = uploadField.querySelector('.img-upload__cancel');

const closeUploadField = (evt) => {
  if (isEscapeKey(evt) || evt.type === 'click') {
    uploadForm.reset();
    pristine.reset();
    resetScale();
    uploadField.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', closeUploadField);
    resetButton.removeEventListener('click', closeUploadField);
    removeEventListenerToScaleButton();
  }
};

const addListenersToCloseUploadField = () => {
  document.addEventListener('keydown', closeUploadField);
  resetButton.addEventListener('click', closeUploadField);
};

const addListenersToSubmitForm = () => {
  uploadForm.addEventListener ('submit', (evt) =>{
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

const toStopPropagation = (field) => {
  field.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
};

const toUploadImg = () => {
  imgUploadButton.addEventListener('change', () => {
    uploadField.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    addListenersToCloseUploadField();
    toStopPropagation(commentField);
    toStopPropagation(hashtagField);
  });
  addListenersToSubmitForm();
  addEventListenerToScaleButton();
};

toUploadImg();
