import { isEscapeKey } from './util.js';
import { pristine } from './form-validation.js';
import { resetScale, addListenersToScaleButton, removeListenersToScaleButton } from './scale.js';
import { setDefaultSlider, resetSlider, addListenersToEffectList,removeListenersToEffectList } from './effects.js';
import { sendData } from './api.js';
import { toggleMessage } from './message.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};

const uploadField = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const imgUploadButton = document.querySelector('.img-upload__input');
const resetButton = uploadField.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const closePopup = (evt) => {
  if (isEscapeKey(evt) || evt.type === 'click' || evt.type === 'submit') {
    uploadForm.reset();
    pristine.reset();
    resetScale();
    resetSlider();
    uploadField.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', closePopup);
    resetButton.removeEventListener('click', closePopup);
    removeListenersToScaleButton();
    removeListenersToEffectList();
  }
};

const addListenersToCloseUploadField = () => {
  document.addEventListener('keydown', closePopup);
  resetButton.addEventListener('click', closePopup);
};

const setFormSubmit = (onSuccess) => {
  uploadForm.addEventListener ('submit', (evt) =>{
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => onSuccess(evt))
        .then(() => toggleMessage(true))
        .catch(
          (error) => {
            toggleMessage();
            throw new Error(error.message);
          }
        )
        .finally(unblockSubmitButton);
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
    addListenersToScaleButton();
    addListenersToEffectList();
  });
  setDefaultSlider();
};

export {toUploadImg, setFormSubmit, closePopup};
