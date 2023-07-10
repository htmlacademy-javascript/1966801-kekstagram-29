import { getRandomInteger } from './util.js';
import { getRandomArrayElement } from './util.js';

const COUNTERS = {
  PHOTO_AMOUNT: 25,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  MIN_COMMENTS: 0,
  MAX_COMMENTS: 30,
  MIN_AVATAR_INDEX: 1,
  MAX_AVATAR_INDEX: 6
};

const DESCRIPTIONS = [
  'Париж',
  'Морское путешествие',
  'Прогулка на лошадях',
  'Поход в горы'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Иван',
  'Пётр',
  'Мария',
  'Анна',
  'Виктор',
  'Юлия',
  'Марина',
  'Алексей'
];

const generateComments = () => {
  const result = [];
  for (let i = 0; i < getRandomInteger(COUNTERS.MIN_COMMENTS, COUNTERS.MAX_COMMENTS); i++) {
    result.push({
      id: i + 1,
      avatar: `img/avatar-${getRandomInteger(COUNTERS.MIN_AVATAR_INDEX, COUNTERS.MAX_AVATAR_INDEX)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    });
  }
  return result;
};

const generatePhotos = (photoAmount) => {
  const result = [];
  for (let i = 0; i < photoAmount; i++) {
    result.push({
      id: i + 1,
      url: `photos/${(i + 1)}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(COUNTERS.MIN_LIKES, COUNTERS.MAX_LIKES),
      comments: generateComments()
    });
  }
  return result;
};

export {generatePhotos, COUNTERS};
