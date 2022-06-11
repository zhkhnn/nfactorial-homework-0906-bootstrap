// import {trackList} from "./music";

let trackList = [
    {
        name: "I am the best",
        path: "./music/iamthebest.mp3",
        video: "./video/iamthebest.mp4",
        singer: "2NE1",
    },
    {
        name: "Тримай",
        path: "./music/trimai.mp3",
        video: "./video/trimai.mp4",
        singer: "Христина Соловйи",
    },
    {
        name: "Avarice",
        path: "./music/avarice.mp3",
        video: "./video/avarice.mp4",
        singer: "Power-Haus, Jonathan Deering",
    },
    {
        name: "Кездесу мен Коштасу",
        path: "./music/kezdesu.mp3",
        video: "./video/kezdesu.mp4",
        singer: "Курмаш Маханов",
    },

    {
        name: "I've never been there",
        path: "./music/amelie.mp3",
        video: "./video/amelie.mp4",
        singer: "Yann Tiersen",
    },
    {
        name: "Я это ты",
        path: "./music/nasyrov.mp3",
        video: "./video/nasyrov.mp4",
        singer: "Мурат Насыров",
    },
    {
        name: "Continent",
        path: "./music/continent.mp3",
        video: "./video/continent.mp4",
        singer: "Adrian Berenguer",
    },
    {
        name: "Музыка нас связала",
        path: "./music/muzika.mp3",
        video: "./video/muzika.mp4",
        singer: "Мираж",
    },
    {
        name: "Abuse",
        path: "./music/abuse.mp3",
        video: "./video/abuse.mp4",
        singer: "Ninety One",
    },
    {
        name: "Menulis",
        path: "./music/menulis.mp3",
        video: "./video/menulis.mp4",
        singer: "Алина Орлова",
    },
    {
        name: "Revenge",
        path: "./music/revenge.mp3",
        video: "./video/revenge.mp4",
        singer: "XXXTENTACION",
    },
];

const play = document.querySelector(".play"),
    previous = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    trackVideo = document.querySelector(".video"),
    title = document.querySelector(".title"),
    artist = document.querySelector(".artist"),
    slider = document.querySelector(".duration-slider"),
    trackCurrentTime = document.querySelector(".current-time"),
    trackDuration = document.querySelector(".duration-time"),
    currentVolume = document.querySelector("#volume"),
    showVolume = document.querySelector("#show-volume"),
    volumeIcon = document.querySelector("#volume-icon"),
    hamburger = document.querySelector(".fa-bars"),
    closeIcon = document.querySelector(".fa-times"),
    musicPlaylist = document.querySelector(".music-playlist"),
    playlist = document.querySelector(".playlist"),
    pDiv = document.querySelector(".playlist-div");


let timer;
let indexTrack = 0;
let songIsPlaying = false;
let track = document.createElement("audio");

play.addEventListener("click", justPlay);
next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);
volumeIcon.addEventListener("click", muteSound);
currentVolume.addEventListener("click", changeVolume);
slider.addEventListener("click", changeDuration);
// track.addEventListener("click", songTimeUpdate);
hamburger.addEventListener("click", showPlaylist);
closeIcon.addEventListener("click", hidePlaylist);
// trackVideo.addEventListener('play', justPlay)

function loadTrack(indexTrack) {
    clearInterval(timer);
    resetSlider();
    track.setAttribute("src", trackList[indexTrack].path);
    console.log(trackList[indexTrack].path)
    trackVideo.setAttribute("src", trackList[indexTrack].video)

    title.innerHTML = trackList[indexTrack].name;
    artist.innerHTML = trackList[indexTrack].singer;
    track.load();


    timer = setInterval(updateSlider, 1000)
}

function playSong() {
    track.play();
    trackVideo.play()
    songIsPlaying = true;
    play.innerHTML = '<i class="fas fa-pause"></i>'
}

function justPlay() {

    if (songIsPlaying == false) {
        playSong()
        trackVideo.play()
    } else {
        pauseSong()
        trackVideo.pause()
    }
}
function setDurationInHtml(){
    console.log("changing", track.duration)
    let curmins = Math.floor(track.currentTime / 60);
    let cursecs = Math.floor(track.currentTime - curmins * 60);
    let durmins = Math.floor(track.duration / 60);
    let dursecs = Math.floor(track.duration - durmins * 60);

    if(curmins<10){
        curmins = "0" + curmins;
    }
    if(dursecs<10){
        dursecs = "0" + dursecs;
    }

    if(durmins<10){
        durmins = "0" + durmins;
    }

    if(cursecs<10){
        cursecs = "0" + cursecs;
    }
    console.log(durmins, dursecs)
    trackCurrentTime.innerHTML=curmins+ ":" + cursecs;
    trackDuration.innerHTML = durmins ? durmins + ":" + dursecs : "";
}

track.addEventListener('timeupdate', (event) =>{
    setDurationInHtml()
})

// track.onplaying = function() {
//     console.log(track.duration)
//     // trackDuration.innerHTML=track.duration
//
//     let curmins = Math.floor(track.currentTime / 60);
//     let cursecs = Math.floor(track.currentTime - curmins * 60);
//     let durmins = Math.floor(track.duration / 60);
//     let dursecs = Math.floor(track.duration - durmins * 60);
//
//     if(curmins<10){
//         curmins = "0" + curmins;
//     }
//     if(dursecs<10){
//         dursecs = "0" + dursecs;
//     }
//     if(durmins<10){
//         durmins = "0" + durmins;
//     }
//     if(cursecs<10){
//         cursecs = "0" + cursecs;
//     }
//     trackCurrentTime.innerHTML=curmins+ ":" + cursecs;
//     trackDuration.innerHTML = durmins + ":" + dursecs;
// }


function pauseSong() {
    track.pause();
    trackVideo.pause()
    songIsPlaying = false;
    play.innerHTML = '<i class="fas fa-play"></i>'
}

function nextSong() {
    if (indexTrack < trackList.length - 1) {
        indexTrack++;
        loadTrack(indexTrack);
        playSong()
    } else {
        indexTrack = 0;
        loadTrack(indexTrack);
        playSong();
    }
}

function prevSong() {

    if (indexTrack == 0) {
        indexTrack = trackList.length - 1;
        loadTrack(indexTrack);
        playSong();
    } else {
        indexTrack--;
        console.log(indexTrack)
        loadTrack(indexTrack);
        playSong()
    }
}
function muteSound(){
    track.volume= 0;
    showVolume.innerHTML= '0';
    currentVolume.value = 0;
}
function changeVolume(){
    showVolume.value = currentVolume.value;
    track.volume = currentVolume.value / 100;
    showVolume.innerHTML = track.volume * 100
}
function changeDuration(){
    let sliderPosition = track.duration * (slider.value / 100);
    track.currentTime = sliderPosition;
}
function resetSlider(){
    slider.value = 0;
}
function updateSlider(){
    let position = 0;
    if (!isNaN(track.duration)){
        position=track.currentTime * (100/track.duration);
        slider.value = position;
    }
    if (track.ended){
        play.innerHTML = '<i class="fas fa-play"></i>';
    }




    // else {
    //     trackCurrentTime.innerHTML = "00" + ":" + "00";
    //     trackDuration.innerHTML = "00" + ":" + "00";
    // }
}
function showPlaylist(){
    musicPlaylist.style.transform = "translateX(0)"
}
function hidePlaylist(){
    musicPlaylist.style.transform = "translateX(-100%)"
}
let counter = 1;
function displayTracks(){
    for(let i=0; i<trackList.length; i++){
        let div = document.createElement("div");
        div.classList.add("playlist");
        div.innerHTML = `<span class="song-index">${counter++}</span><p class="single-song">${trackList[i].name}</p>`;
        pDiv.appendChild(div);
        playFromPlaylist();
    }
}
function playFromPlaylist(){
    pDiv.addEventListener("click", (e)=>{
        if(e.target.classList.contains("single-song")){
            const indexNum = trackList.findIndex((item, index)=>{
                if(item.name === e.target.innerHTML){
                    return true;
                }
            });
            loadTrack(indexNum);
            playSong();
            hidePlaylist();
        }
    })
}

displayTracks();
loadTrack(indexTrack);
