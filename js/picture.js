const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');

function createPicture(data) {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  pictureImg.src = data.url;
  pictureImg.alt = data.description;

  const likes = picture.querySelector('.picture__likes');
  likes.textContent = data.likes;

  const comments = picture.querySelector('.picture__comments');
  comments.textContent = data.comments.length;

  return picture;
}

function renderPictures(pictures) {
  const fragment = document.createDocumentFragment();
  pictures.forEach((item) => {
    const picture = createPicture(item);
    fragment.append(picture);
  });
  pictureContainer.append(fragment);
}

export {renderPictures};
