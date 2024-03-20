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


async function appInit() {
  const response = await fetch("public/albums.json");
  const albums = await response.json();
  const albumsArray = albums;
  const albumsStore = [...albumsArray]; // where should I store this??

  render(albums, document.querySelector("tbody"))
}
let albumsStore

function render(data, container) {
  data.forEach(albums => {
    const template = `
    <tr>
      <td>${albums.album}</td>
      <td>${albums.releaseDate}</td>
      <td>${albums.artistName}</td>
      <td>${albums.genres}</td>
      <td>${albums.averageRating}</td>
      <td>${albums.numberRatings}</td>
    </tr>
    `
    container.insertAdjacentHTML("beforeend", template)
  });
}
appInit();

