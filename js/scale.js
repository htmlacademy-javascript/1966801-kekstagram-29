import { SCALE } from "./data.js";

const scaleControlValue = document.querySelector('.scale__control');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img')

const scaleImage = (value) => {
  scaleValue.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = currentValue - SCALE.STEP;
  if (newValue < SCALE.MIN) {
    scaleImage(SCALE.MIN);
  } else {
    scaleImage(newValue);
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = currentValue - SCALE.STEP;
  if (newValue > SCALE.MAX) {
    scaleImage(SCALE.MAX);
  } else {
    scaleImage(newValue);
  }
};

const resetScale = () => scaleImage(SCALE.default);

const addEventListenerToScaleButton = () => {
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
};

const removeEventListenerToScaleButton = () => {
  smallerButton.removeEventListener('click', onSmallerButtonClick);
  biggerButton.removeEventListener('click', onBiggerButtonClick);
};

export { resetScale, addEventListenerToScaleButton, removeEventListenerToScaleButton};
