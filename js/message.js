import { isEscapeKey } from './util';

const REMOVE_ERROR_BLOCK_TIMER = 5000;

const errorDataTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const templates = {
  successUploadTemplate: document.querySelector('#success').content.querySelector('.success'),
  errorUploadTemplate: document.querySelector('#error').content.querySelector('.error')
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    closeMessage();
  }
};

const onBodyClick = (evt) => {
  if (!evt.target.closest('.success__inner, .error__inner')) {
    closeMessage();
  }
};

const showMessage = (template) => {
  const messageElement = template.cloneNode(true);
  const closeTemplateButton = messageElement.querySelector('.success__button, .error__button');
  closeTemplateButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
  document.body.appendChild(messageElement);
};

function closeMessage() {
  const messageElement = document.querySelector('.success, .error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
}

const showUploadSuccess = () => {
  showMessage(templates.successUploadTemplate);
};

const showErrorUpload = () => {
  showMessage(templates.errorUploadTemplate);
};

const showToastError = (errorMessage) => {
  const errorElement = errorDataTemplate.cloneNode(true);
  if (errorMessage) {
    errorElement.querySelector('.data-error__title').textContent = errorMessage;
  }
  document.body.appendChild(errorElement);
  setTimeout(() => (errorElement.remove()), REMOVE_ERROR_BLOCK_TIMER);
};

const showFetchError = () => {
  showToastError();
};

export { showFetchError, showUploadSuccess, showErrorUpload, showToastError };
