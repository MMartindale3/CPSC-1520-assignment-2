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

}

function render(data, container) {
  data.forEach(albumDataStore => {
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
  const formData = new FormData(e.currentTarget); // uses the name attribute for name value pairs
  const searchAlbum = formData.get("search").trim().toLowerCase(); // sanitize the search
  const searchMinRating = formData.get("min-album-rating").trim().toLowerCase();
  filterArtistFunction(searchAlbum, searchMinRating);
  filterTitleFunction(searchAlbum, searchMinRating);

}


function filterTitleFunction(searchString, searchMinRating) {
  const results = albumDataStore
    .filter((album) => {
      const albumTitle = album.album.toLowerCase(); // sanitize the results
      return albumTitle.includes(searchString);
    })
    .filter((album) => {
      const albumRating = album.averageRating;
      return albumRating >= searchMinRating;
    })
  document.querySelector("tbody").replaceChildren(); // I couldn't get the table to clear without this. 

  console.log(results);
  renderResults(results, document.querySelector("tbody"));
}

function filterArtistFunction(searchString, searchMinRating) {
  const results = albumDataStore
    .filter((album) => {
      const artistName = album.artistName.toLowerCase(); // sanitize the results
      return artistName.includes(searchString);
    })
    .filter((album) => {
      const albumRating = album.averageRating;
      return albumRating >= searchMinRating;
    })
  document.querySelector("tbody").replaceChildren(); // I couldn't get the table to clear without this. 

  console.log(results);
  renderResults(results, document.querySelector("tbody"));
}


function renderResults(data, container) {
  data.forEach(results => {
    const template = `
      <tr>
        <td>${results.album}</td>
        <td>${results.releaseDate}</td>
        <td>${results.artistName}</td>
        <td>${results.genres}</td>
        <td>${results.averageRating}</td>
        <td>${results.numberRatings}</td>
      </tr>
      `
    container.insertAdjacentHTML("beforeend", template)
  });
}