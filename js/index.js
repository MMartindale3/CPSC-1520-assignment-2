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
let albumDataStore

async function appInit() {
  const response = await fetch("public/albums.json");
  const fetchData = await response.json();
  albumDataStore = [...fetchData];

  render(albumDataStore, document.querySelector("tbody"));

  filterDataFunction();
}

function render(data, container) {
  albumDataStore.forEach(albumDataStore => {
    const template = `
    <tr>
      <td>${albumDataStore.album}</td>
      <td>${albumDataStore.releaseDate}</td>
      <td>${albumDataStore.artistName}</td>
      <td>${albumDataStore.genres}</td>
      <td>${albumDataStore.averageRating}</td>
      <td>${albumDataStore.numberRatings}</td>
    </tr>
    `
    container.insertAdjacentHTML("beforeend", template)
  });
}
appInit();

document.querySelector("#album-search-form").addEventListener("submit", onAlbumFilterRequest);

function onAlbumFilterRequest(e) {
  e.preventDefault();
  console.log(e.currentTarget);
  const formData = new FormData(e.currentTarget); //uses the name attribute because it uses the name value pairs
  const searchAlbum = formData.get("search").trim().toLowerCase();
  const searchMinRating = formData.get("min-album-rating").trim().toLowerCase();
  filterDataFunction(searchAlbum, searchMinRating);
}

function filterDataFunction(searchString, searchMinRating) {
  const results = albumDataStore
    .filter((album) => {
      const albumTitle = album.album.toLowerCase();
      return albumTitle.includes(searchString);
    })
    .filter((album) => {
      const albumRating = album.averageRating;
      return albumRating >= searchMinRating;
    })
  console.log(results);
  render(results, document.querySelector("tbody"));

}




