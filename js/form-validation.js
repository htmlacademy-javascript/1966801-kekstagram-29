import { HASHTAG_COUNT, HASHTAG_PATTERN } from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = uploadForm.querySelector('.text__hashtags');

const hashTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidSymbols = (value) => hashTags(value).every((tag) => HASHTAG_PATTERN.test(tag));

const isValidCount = (value) => hashTags(value).length <= HASHTAG_COUNT;

const isHashtagUnique = (value) => {
  const lowerCaseHashTags = hashTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseHashTags.length === new Set(lowerCaseHashTags).size;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
},
true);


pristine.addValidator(
  textHashtags,
  hasValidSymbols,
  'Хэш-тег должен начинаться с #, состоять из букв, цифр, длиной не менее 2 и не более 20 символов'
);

pristine.addValidator(
  textHashtags,
  isValidCount,
  `Количество хэш-тегов не должно превышать ${HASHTAG_COUNT}`
);

pristine.addValidator(
  textHashtags,
  isHashtagUnique,
  'Хэш-теги не должны повторяться'
);

export { pristine };
