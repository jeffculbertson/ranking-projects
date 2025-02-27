let categoryArray = createFilteredArray(rankList, songList);
//console.log(categoryArray);

for (let i = 0; i < rankList.length; i++) {
    createSongCard(rankList[i], i);
}

function createSongCard(rankListItem, index) {

    var songListItem;

    for (let l = 0; l < songList.length; l++) {
        if (songList[l].Song == rankListItem.SongTitle) {
            songListItem = songList[l];
            break;
        }
    }

    const container = document.getElementById("song-container");

    var songCard = createElementWithClass("div", "song-card");
    songCard.setAttribute("data-id", index);
    var contentContainer = createElementWithClass("div", "content-container");
    var metaContainer = createElementWithClass("div", "meta-container");
    var songNumber = createElementWithClass("div", "song-number");
    var songTitle = createElementWithClass("div", "song-title");
    var songAlbum = createElementWithClass("div", "song-album");
    var bullet = createElementWithClass("div", "bullet");
    var songYear = createElementWithClass("div", "song-year");
    var commentContainer = createElementWithClass("div", "comment-container");
    var spotifyLink = createElementWithClass("a", "spotify-link");
    var songArt = createElementWithClass("img", "album-art");

    container.appendChild(songCard);
    songCard.appendChild(songArt);
    songCard.appendChild(contentContainer);
    contentContainer.appendChild(songNumber);
    contentContainer.appendChild(songTitle);
    contentContainer.appendChild(metaContainer);
    metaContainer.appendChild(songAlbum);
    metaContainer.appendChild(bullet);
    metaContainer.appendChild(songYear);
    // check for lowest rank
    for (let c = 0; c < categoryArray.length; c++) {
        if (index == categoryArray[c][1]) {
            var rankTag = createElementWithClass("div", "tag lowest");
            contentContainer.appendChild(rankTag);
            rankTag.appendChild(document.createTextNode('Lowest ' + categoryArray[c][0] + " track"));
            break;
        } 
    }
    // check for highest rank
    for (let c = 0; c < categoryArray.length; c++) {
        if (index == categoryArray[c][2]) {
            var rankTag = createElementWithClass("div", "tag highest");
            contentContainer.appendChild(rankTag);
            rankTag.appendChild(document.createTextNode('Highest ' + categoryArray[c][0] + " track"));
            break;
        } 
    }
    if (songListItem.Instrumental) {
        var instrumentalTag = createElementWithClass("div", "tag instrumental");
        contentContainer.appendChild(instrumentalTag);
        instrumentalTag.appendChild(document.createTextNode('instrumental'));
    }
    contentContainer.appendChild(commentContainer);
    if (rankListItem.Version) {
        var versionContainer = createElementWithClass("div", "version-container");
        contentContainer.appendChild(versionContainer);
        versionContainer.appendChild(document.createTextNode(rankListItem.Version));
    }
    songCard.appendChild(spotifyLink);

    songNumber.appendChild(document.createTextNode(rankListItem.oRank));
    songTitle.appendChild(document.createTextNode(songListItem.Song));
    songAlbum.appendChild(document.createTextNode(songListItem.Album));
    songYear.appendChild(document.createTextNode(songListItem.Year));
    bullet.appendChild(document.createTextNode('•'));
    commentContainer.appendChild(document.createTextNode(rankListItem.Comment));
    spotifyLink.appendChild(document.createTextNode('spotify link'));
    
    spotifyLink.href = 'https://open.spotify.com/track/' + songListItem.SpotifyID;
    spotifyLink.target = '_blank';
    songArt.src = './images/' + songListItem.ImagePath;

}

function createElementWithClass(type, className) {
    const element = document.createElement(type);
    element.className = className;
    return element;
}

function createFilteredArray(rankedArray, listArray) {
    let fullCategoryArray = [];
    let newArray = [];
    for (let i = 0; i < rankedArray.length; i++) {
        for (let j = 0; j < listArray.length; j++) {
            if (rankedArray[i].SongTitle == listArray[j].Song) {
                fullCategoryArray.push(listArray[j].Category);
                break;
            };
        };
    };
    let tempArray = removeArrayDuplicates(fullCategoryArray);
    for (let c = 0; c < tempArray.length; c++) {
        for (let index = 0; index < fullCategoryArray.length; index++) {
            if (tempArray[[c]] == fullCategoryArray[index]) {
                tempArray.push(index);
                break;
            }
        }
    }
    for (let c = 0; c < tempArray.length; c++) {
        for (let index = fullCategoryArray.length; index >= 0 ; index--) {
            if (tempArray[c] == fullCategoryArray[index]) {
                tempArray.push(index);
                break;
            }
        }
    }
    let divider = tempArray.length / 3;
    for (let c = 0; c < divider; c++) {
        newArray.push([tempArray[c], tempArray[c + divider], tempArray[c + divider + divider]]);
    }
    return newArray;
}

function removeArrayDuplicates(arr) {
    const uniqueArray = arr.filter((element, index) => arr.indexOf(element) === index);
    return uniqueArray;
}