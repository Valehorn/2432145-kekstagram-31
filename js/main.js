import { renderBigPhoto } from './big-picture.js';
import { configUploadHandlers } from './upload-form.js';
import { fetchPictures } from './api.js';
import { showFetchError } from './message.js';
import { configFilter } from './filter.js';

const bootstrapApp = async () => {
  configUploadHandlers();
  try {
    const pictures = await fetchPictures();
    renderBigPhoto(pictures);
    configFilter(pictures);
  } catch {
    showFetchError();
  }
};

bootstrapApp();
