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
  albumStore = [...data]

  render(data, document.querySelector("tbody"))
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

