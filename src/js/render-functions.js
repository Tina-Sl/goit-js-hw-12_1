export default function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              width="360"
            />
          </a>
          <div class="gallery-img-title">
            <div class="box">
              <h2 class="box-title">Likes</h2>
              <p class="box-number">${likes}</p>
            </div>
            <div class="box">
              <h2 class="box-title">Views</h2>
              <p class="box-number">${views}</p>
            </div>
            <div class="box">
              <h2 class="box-title">Comments</h2>
              <p class="box-number">${comments}</p>
            </div>
            <div class="box">
              <h2 class="box-title">Downloads</h2>
              <p class="box-number">${downloads}</p>
            </div>
          </div>
        </li>`
    )
    .join('');
}
