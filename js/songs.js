fetch('./js/songsWithInfo.json')
.then(res=>res.json())
.then(songs=>{
  //console.log(songs);
  initSongTableUI(songs)
})
.catch(error => {
  console.error('Error:', error);
});

function initSongTableUI(songsWithInfo){
    const songsTable = document.querySelector('table#songs-table')
    //console.log(songsTable);
    for(song of songsWithInfo){
        const tr = document.createElement('tr')
        tr.classList.add('song-item')
        tr.innerHTML = 
        `
            <td class="title">${song.title}</td>
            <td class="artist">${song.artist}</td>
            <td class="album">${song.album}</td>
            <td class="year">${song.year}</td>
            <td class="genre">${song.genre}</td>
        `

        songsTable.appendChild(tr)
    }

}