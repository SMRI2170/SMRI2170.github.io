window.onload = function () {
  const bgm = document.getElementById("bgm");
  bgm.volume = 0.2; // BGM音量を調整
};

function playSE() {
  const se = document.getElementById("se");
  se.currentTime = 0;
  se.play();
  
}
