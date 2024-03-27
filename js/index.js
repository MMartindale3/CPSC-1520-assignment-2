/* 
<tr>
  <td>ALBUM NAME HERE</td>
  <td>RELEASE DATE HERE</td>
  <td>ARTIST NAME HERE</td>
  <td>GENRE HERE</td>
  <td>AVERAGE RATING HERE</td>
  <td>NUMBER OF RATINGS HERE</td>
</tr> 
*/
let albumStore

async function appInit() {
  const response = await fetch("public/albums.json");
  const data = await response.json();
  albumStore = [...data];

  render(data, document.querySelector("tbody"));
}

function render(data, container) {
  data.forEach(data => {
    const template = `
    <tr>
      <td>${data.album}</td>
      <td>${data.releaseDate}</td>
      <td>${data.artistName}</td>
      <td>${data.genres}</td>
      <td>${data.averageRating}</td>
      <td>${data.numberRatings}</td>
    </tr>
    `
    container.insertAdjacentHTML("beforeend", template)
  });
}
appInit();

const filterForm = document.querySelector("#album-search-form");

filterForm.addEventListener("submit", onFilterRequest);
function onFilterRequest(e) {
  e.preventDefault();
  const formData = FormData(e.currentTarget);
  const query = formData.get("query").trim().toLowerCase; // this might be the problem. I'm searching for 2 things at once 
  filterAlbumByText(query);
  filterByRating(query);
}

function filterAlbumByText(queryString) {
  const results = data.filter((album) => {
      const albumTitle = album.album.toLowerCase();
      return albumTitle.includes(queryString);
  })
}

function filterByRating(queryString) {
  const results = data.filter((album) => {
    const albumRating = album.averageRating.toLowerCase();
    if (albumRating >= queryString) {
      return albumRating.includes(queryString);
    }
})
}


