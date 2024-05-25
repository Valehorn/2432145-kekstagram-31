import { isEscapeKey } from './util';
import { pristine } from './validate-upload-form';
import { resetScale } from './zoom';
import { resetEffect } from './effects';
import { uploadPicture } from './api';
import { showUploadSuccess, showErrorUpload, showToastError } from './message';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const uplodadSubmitButton = uploadFormElement.querySelector('#upload-submit');
const uploadPreview = document.querySelector('.img-upload__preview > img');
const uploadPreviewEffects = document.querySelectorAll('.effects__preview');

const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');

const onDocumentKeydownUpload = (evt) => {
  const isErrorUploadVisible = document.querySelector('.error');
  if (isErrorUploadVisible) {
    return;
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement.closest('.img-upload__field-wrapper')) {
      return;
    }
    closeUploadWindow();
  }
};

const onFileInputChange = () => {
  const file = uploadFileInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const fileExtantion = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileExtantion);
  if (matches) {
    const url = URL.createObjectURL(file);
    uploadPreview.src = url;
    uploadPreviewEffects.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  }else {
    showToastError('Неверный тип файла');
    return;
  }

  openUploadWindow();
};

const onUploadCancelButtonClick = () => {
  closeUploadWindow();
};

const onSubmitForm = async (evt) => {
  evt.preventDefault();
  const isFormValid = pristine.validate();
  if (!isFormValid) {
    return;
  }
  const formData = new FormData(uploadFormElement);
  uplodadSubmitButton.disabled = true;
  uplodadSubmitButton.textContent = 'Сохраняю';
  try {
    await uploadPicture(formData);
    closeUploadWindow();
    showUploadSuccess();
  } catch {
    showErrorUpload();
  } finally {
    uplodadSubmitButton.disabled = false;
    uplodadSubmitButton.textContent = 'Опубликовать';
  }
};

function openUploadWindow() {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydownUpload);
  uploadFormElement.addEventListener('submit', onSubmitForm);
}

function closeUploadWindow () {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydownUpload);
  uploadFormElement.removeEventListener('submit', onSubmitForm);

  hashtagInputElement.value = '';
  uploadFormElement.reset();
  pristine.reset();
  resetScale();
  resetEffect();
}

const configUploadHandlers = () => {
  uploadCancelButtonElement.addEventListener('click', onUploadCancelButtonClick);
  uploadFileInputElement.addEventListener('change', onFileInputChange);
};


export { configUploadHandlers };
