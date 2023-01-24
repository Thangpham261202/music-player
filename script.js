const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector(".img-area img"),
  musicName = wrapper.querySelector(".song-details .name"),
  musicArtist = wrapper.querySelector(".song-details .artist"),
  musicAudio = wrapper.querySelector("#main-audio"),
  playPauseBtn = wrapper.querySelector(".play-pause span"),
  nextBtn = wrapper.querySelector("#next"),
  prevBtn = wrapper.querySelector("#prev"),
  progressBar = wrapper.querySelector(".progress-bar"),
  progressArea = wrapper.querySelector(".progress-area"),
  moreMusic = wrapper.querySelector("#more-music"),
  musicList = wrapper.querySelector(".music-list"),
  closeList = wrapper.querySelector("#close");
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
  var porogressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${porogressWidth}%`;
  let current = wrapper.querySelector(".current");
  let durationMax = wrapper.querySelector(".duration");
  let mincurren = Math.floor(musicAudio.currentTime / 60);
  let seccurren = Math.floor(musicAudio.currentTime % 60);
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

//
progressArea.addEventListener("click", function (i) {
  let progressWidthval = progressArea.clientWidth;
  console.log(progressWidthval);
  let clickOffSetX = i.offsetX;
  console.log(clickOffSetX);
  let songDuration = musicAudio.duration;
  console.log(songDuration);
  console.log((clickOffSetX / progressWidthval) * songDuration);
  musicAudio.currentTime = (clickOffSetX / progressWidthval) * songDuration;
});
moreMusic.addEventListener("click", function () {
  musicList.classList.toggle("show");
});
closeList.addEventListener("click", function () {
  musicList.classList.toggle("show");
});
const ulTang = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {
  let liTang = ` <li li-index="${i + 1}">
  <div class="row">
      <span>${allMusic[i].name}</span>
      <p>${allMusic[i].artist}</p>
  </div>
   <audio class="a${i}" src="./labori/${allMusic[i].src}.mp3"></audio>
  <div id="a${i}"></div>
</li>`;
  ulTang.insertAdjacentHTML("beforeend", liTang);
  let liAudio = ulTang.querySelector(`.a${i}`);
  let liDuration = ulTang.querySelector(`#a${i}`);
  liAudio.addEventListener("loadeddata", function () {
    let minduration = Math.floor(liAudio.duration / 60);
    let secduration = Math.floor(liAudio.duration % 60);
    liDuration.innerText = `${minduration}:${secduration}`;
  });
}

const allLiTang = ulTang.querySelectorAll("li");
for (let j = 0; j < allLiTang.length; j++) {
  if (allLiTang[j].getAttribute("li-index") == musicIndex) {
    allLiTang[j].classList.add("playing");
  }
  allLiTang[j].setAttribute("onclick", "clicked(this)");
}
function clicked(u) {
  let getLiIndex = u.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
}
