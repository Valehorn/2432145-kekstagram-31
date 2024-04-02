import { renderBigPhoto } from './big-picture';
import { debounce } from './util';

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const sortFunction = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length
};

const MAX_PICTURE_COUNT = 10;

let currentFilter = FILTER.default;
let pictures = [];
const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const debounceRender = debounce(renderBigPhoto);

function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

function applyFilter() {
  let filteredPictures = [];
  switch (currentFilter) {
    case FILTER.default:
      filteredPictures = pictures;
      break;
    case FILTER.random:
      filteredPictures = pictures.toSorted(sortFunction.random).slice(0, MAX_PICTURE_COUNT);
      break;
    case FILTER.discussed:
      filteredPictures = pictures.toSorted(sortFunction.discussed);
      break;
  }
  debounceRender(filteredPictures);
}

function configFilter(picturesData) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  pictures = picturesData;
}

export { configFilter };
