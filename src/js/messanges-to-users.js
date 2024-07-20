import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function error() {
  iziToast.error({
    position: 'topRight',
    theme: 'dark',
    backgroundColor: '#FF0000',
    messageSize: '20',
    messageColor: '#FFFFFF',
    message: 'no connection to the server',
  });
}
function warning() {
  iziToast.warning({
    theme: 'dark',
    backgroundColor: '#CD5C5C',
    messageSize: '18',
    messageColor: '#FFFFFF',
    position: 'topRight',
    message: 'Please enter a value in the search field!',
  });
}
function info() {
  iziToast.info({
    messageSize: '16',
    position: 'topRight',
    messageColor: '#000000',
    message: 'Sorry, there are no images matching your search query.',
  });
}
function endOfSearch() {
  iziToast.info({
    backgroundColor: '#8FBC8F',
    messageSize: '16',
    position: 'bottomRight',
    messageColor: '#000000',
    timeout: 10000,
    message: "We're sorry, but you've reached the end of search results.",
    closeOnClick: true,
  });
}
function success(totalPhotos, loadedPhotos) {
  iziToast.success({
    backgroundColor: '#F0FFFF',
    messageSize: '16',
    position: 'topRight',
    message: `Loaded: ${loadedPhotos} (${totalPhotos})`,
  });
}

export { error, warning, info, endOfSearch, success };
