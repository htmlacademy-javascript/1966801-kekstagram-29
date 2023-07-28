const thumbnailList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderThumbnails = (thumbnails) => {
  const thumbnailFragment = document.createDocumentFragment();
  document.querySelectorAll('.picture').forEach((element)=>element.remove());

  thumbnails.forEach(({id, url, description, likes, comments}) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').dataset.id = id;
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnailFragment.appendChild(thumbnail);
  });
  thumbnailList.appendChild(thumbnailFragment);
};

export {renderThumbnails};
