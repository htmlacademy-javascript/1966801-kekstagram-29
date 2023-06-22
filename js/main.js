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
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 6;


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateComments = () => {
  const result = [];
  for (let i = 0; i < getRandomInteger(MIN_COMMENTS, MAX_COMMENTS); i++) {
    result.push({
      id: i + 1,
      avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX)}.svg`,
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
      url: `photos/'${(i + 1)}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: generateComments()
    });
  }
  return result;
};

generatePhotos(25);
