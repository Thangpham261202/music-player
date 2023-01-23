const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector(".img-area img"),
  musicName = wrapper.querySelector(".song-details .name"),
  musicArtist = wrapper.querySelector(".song-details .artist"),
  musicAudio = wrapper.querySelector("#main-audio"),
  playPauseBtn = wrapper.querySelector(".play-pause span"),
  nextBtn = wrapper.querySelector("#next"),
  prevBtn = wrapper.querySelector("#prev"),
  progressBar = wrapper.querySelector(".progress-bar");

let musicIndex = 2;

window.onload = loadMusic(musicIndex);
function loadMusic(indexNumber) {
  musicName.innerText = allMusic[indexNumber - 1].name;
  musicArtist.innerText = allMusic[indexNumber - 1].artist;
  musicImg.src = `./labori/${allMusic[indexNumber - 1].img}.jpg`;
  musicAudio.src = `./labori/${allMusic[indexNumber - 1].src}.mp3`;
}
console.log(wrapper.classList.contains(""));
playPauseBtn.onclick = function () {
  if (playPauseBtn.classList.contains("paused")) {
    pauseMusic();
  } else {
    playMusic();
  }
};
function pauseMusic() {
  musicAudio.pause();
  playPauseBtn.classList.remove("paused");
  playPauseBtn.innerText = "play_arrow";
}
function playMusic() {
  musicAudio.play();
  playPauseBtn.classList.add("paused");
  playPauseBtn.innerText = "pause";
}
function nextMusic() {
  if (musicIndex >= allMusic.length) {
    musicIndex = 1;
    loadMusic(musicIndex);
    playMusic();
  } else {
    musicIndex++;
    loadMusic(musicIndex);
    playMusic();
  }
}
function prevMusic() {
  if (musicIndex <= 1) {
    musicIndex = allMusic.length;
    loadMusic(musicIndex);
    playMusic();
  } else {
    musicIndex--;
    loadMusic(musicIndex);
    playMusic();
  }
}
nextBtn.onclick = function () {
  nextMusic();
};
prevBtn.onclick = function () {
  prevMusic();
};
musicAudio.addEventListener("timeupdate", function (e) {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let porogressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${porogressWidth}%`;
  let current = wrapper.querySelector(".current");
  let durationMax = wrapper.querySelector(".duration");
  let mincurren = Math.floor(musicAudio.currentTime / 60);
  let seccurren = Math.floor(musicAudio.currentTime % 60);
  console.log(seccurren);
  if (seccurren < 10) {
    seccurren = `0${seccurren}`;
  }
  current.innerText = `${mincurren}:${seccurren}`;
  musicAudio.addEventListener("loadeddata", function () {
    let minduration = Math.floor(musicAudio.duration / 60);
    let secduration = Math.floor(musicAudio.duration % 60);
    durationMax.innerText = `${minduration}:${secduration}`;
  });
});
