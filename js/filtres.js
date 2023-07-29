import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';


const TIMEOUT_DELAY = 500;
const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
const filterContainer = document.querySelector('.img-filters');
let activeFilterID = FilterType.DEFAULT;
let defaultImages = [];

const sortImages = () => {
  let currentImages;
  if (activeFilterID === FilterType.DEFAULT) {
    currentImages = defaultImages;
  }
  if (activeFilterID === FilterType.RANDOM) {
    currentImages = defaultImages.slice().sort(() => Math.random() - 0.5).slice(0, 10);
  }

  if (activeFilterID === FilterType.DISCUSSED) {
    currentImages = defaultImages.slice().sort((a, b)=>(b.comments.length - a.comments.length));
  }
  const debouncedRenderThumbnails = debounce(() => renderThumbnails(currentImages), TIMEOUT_DELAY);
  debouncedRenderThumbnails();

};

const onFilterButtonClick = (evt, filterButtons) => {
  if (evt.target.id === activeFilterID) {
    return;
  }
  const activeButton = evt.target;
  activeFilterID = evt.target.id;
  filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
  activeButton.classList.add('img-filters__button--active');
  sortImages();
};

const addListnersToFilterButtons = () => {
  const filterButtons = document.querySelectorAll('.img-filters__button');
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => onFilterButtonClick(evt, filterButtons));
  });
};

const useFilter = (images) => {
  defaultImages = images;
  filterContainer.classList.remove('img-filters--inactive');
  addListnersToFilterButtons();
};

export {useFilter};
