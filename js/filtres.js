const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
const filterContainer = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
let activeFilterID = FilterType.DEFAULT;
let defaultImages = [];

const sortImages = () => {
  if (activeFilterID === FilterType.DEFAULT) {
    return defaultImages;
  }
  if (activeFilterID === FilterType.RANDOM) {
    return defaultImages.slice().sort(() => Math.random() - 0.5).slice(0, 10);
  }

  if (activeFilterID === FilterType.DISCUSSED) {
    return defaultImages.slice().sort((a, b)=>(b.comments.length - a.comments.length));
  }

};

const onFilterButtonClick = (evt, callback) => {
  if (evt.target.id === activeFilterID) {
    return;
  }
  const activeButton = evt.target;
  activeFilterID = evt.target.id;
  filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
  activeButton.classList.add('img-filters__button--active');
  callback(sortImages());
};

const addListnersToFilterButtons = (callback) => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => onFilterButtonClick(evt, callback));
  });
};

const useFilter = (images, callback) => {
  defaultImages = images;
  filterContainer.classList.remove('img-filters--inactive');
  addListnersToFilterButtons(callback);
};

export {useFilter};
