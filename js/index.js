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

let albumsStore
async function appInit() {
  const response = await fetch("public/albums.json");
  const albums = await response.json();
  const albumsArray = albums;
  const albumsStore = [...albumsArray];

  render(albums, document.querySelector("tbody"))
}

function render(data, container) {
  console.table(data)
  // data.forEach(element => {
  //   const template = `
  //   <tr>
  //     <td>${albumsStore.album}</td>
  //     <td>${artistName}</td>
  //     <td>${releaseDate}</td>
  //     <td>${genres}</td>
  //     <td>${averageRating}</td>
  //     <td>${numberRatings}</td>
  //   </tr>
  //   `
  //   container.insertAdjacentHTML("beforeend", template)
  // });
}
appInit();

