const errorMsg = (error)=>{
    const errorMsg = document.createElement('h4');
    errorMsg.innerText = error;
    errorMsg.className = "text-center my-5 text-danger";
    document.getElementById('errorMsg').appendChild(errorMsg);
}
const searchSongs = async () => {
    const keyWord = document.getElementById('searchInput').value;
    const link = `https://api.lyrics.ovh/suggest/${keyWord}`
    try{
        const res = await fetch(link);
        const downloadedData = await res.json();
        let newLink = downloadedData.next;
        const totalResults = downloadedData.total;
        const searchResult = downloadedData.data;
        const resultsDiv = document.getElementById('searchResults');
        //clearing the previous search
        resultsDiv.innerHTML = "";
        //clearing errorMsg (in any)
        document.getElementById('errorMsg').innerHTML= "";
        searchResult.map(song => {
            const artistInfo = song.artist;
            const albumInfo = song.album;
            const previewLink = song.preview;
            const newDiv = document.createElement('div');
            newDiv.className = "single-result row align-items-center my-3 p-3";
            const insideElement = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album: ${albumInfo.title}<br>Artist: <span>${artistInfo.name}</span></p>
                <audio controls loop>
                    <source src="${previewLink}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
            `;
            newDiv.innerHTML= insideElement;
            resultsDiv.appendChild(newDiv);
        })
    }
    catch(error){
        errorMsg('something went wrong');
    }
}