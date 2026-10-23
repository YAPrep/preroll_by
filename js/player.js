// =======================================================
// ИНТЕРАКТИВНЫЙ ДЕМО-ПЛЕЕР С ЖИВЫМ ЗВУКОМ (ЮМОР FM)
// =======================================================

const playBtn = document.getElementById('play-demo-btn');
const playerStatus = document.getElementById('player-status');
const stationName = document.getElementById('station-name');
const progressFill = document.getElementById('progress-fill');
const playerTimer = document.getElementById('player-timer');

const audioAd = document.getElementById('audio-ad');
const audioLive = document.getElementById('audio-live');

let progressInterval = null;
let liveTimerInterval = null;
let isPlaying = false;

if (playBtn) {
  playBtn.addEventListener('click', function() {
    if (isPlaying) {
      stopAllAudio();
      return;
    }

    isPlaying = true;
    playBtn.innerHTML = "⏹ ОСТАНОВИТЬ";
    playBtn.classList.add('playing');
    
    playerStatus.innerHTML = "Воспроизведение преролла...";
    playerStatus.className = "player-status ad-mode";
    stationName.innerHTML = "Рекламный аудиоролик (Преролл)";
    
    progressFill.style.background = "var(--primary-pink)";

    // Воспроизводим ad-spot.mp3 из папки img
    audioAd.currentTime = 0;
    audioAd.play().catch(err => {
      console.log("Добавьте файл ad-spot.mp3 в папку img", err);
    });

    // Отрисовка полосы прогресса
    progressInterval = setInterval(function() {
      if (!audioAd.duration) return;
      let current = audioAd.currentTime;
      let duration = audioAd.duration;
      progressFill.style.width = (current / duration) * 100 + "%";

      let curSec = Math.floor(current % 60);
      let durSec = Math.floor(duration % 60);
      playerTimer.innerHTML = "00:" + (curSec < 10 ? "0" : "") + curSec + " / 00:" + (durSec < 10 ? "0" : "") + durSec;
    }, 100);
  });

  // Автопереключение на поток Радио Релакс (лимит прослушивания 30 сек)
  audioAd.addEventListener('ended', function() {
    clearInterval(progressInterval);
    
    playerStatus.innerHTML = "🟢 В ЭФИРЕ";
    playerStatus.className = "player-status live-mode";
    stationName.innerHTML = "ONLINE RADIO";
    playBtn.innerHTML = "⏹ ОСТАНОВИТЬ";
    
    progressFill.style.width = "100%";
    progressFill.style.background = "#30d158";

    // Ссылка на поток без ломающих параметров кэша
    audioLive.src = "https://live.humorfm.by:8443/relax"; 
    audioLive.play().catch(err => console.log("Ошибка запуска живого потока радио: ", err));

    let liveSeconds = 0;
    playerTimer.innerHTML = "LIVE (00:00)";
    
    liveTimerInterval = setInterval(function() {
      liveSeconds++;
      let displaySec = liveSeconds % 30;
      let displayMin = Math.floor(liveSeconds / 30);
      playerTimer.innerHTML = "LIVE (" + (displayMin < 10 ? "0" : "") + displayMin + ":" + (displaySec < 10 ? "0" : "") + displaySec + ")";

      // Таймер отключения демо-режима через 60 секунд
      if (liveSeconds >= 30) {
        clearInterval(liveTimerInterval);
        
        audioLive.pause();
        audioLive.src = ""; 
        isPlaying = false;

        playBtn.innerHTML = "▶ ЗАПУСТИТЬ СНОВА";
        playBtn.classList.remove('playing');
        
        playerStatus.innerHTML = "🛑 ДЕМО-РЕЖИМ ЗАВЕРШЕН";
        playerStatus.className = "player-status"; 
        stationName.innerHTML = "ЗДОРОВО, ПРАВДА?!..";
        progressFill.style.width = "0%";
        playerTimer.innerHTML = "01:00 / 01:00";
      }
    }, 1000);
  });
}

// Функция сброса аудио
function stopAllAudio() {
  isPlaying = false;
  clearInterval(progressInterval);
  clearInterval(liveTimerInterval);
  
  if (audioAd) { audioAd.pause(); audioAd.currentTime = 0; }
  if (audioLive) { audioLive.pause(); audioLive.src = ""; }

  if (playBtn) { playBtn.innerHTML = "▶ ИГРАТЬ ЭФИР"; playBtn.classList.remove('playing'); }
  if (playerStatus) { playerStatus.innerHTML = "Плеер остановлен"; playerStatus.className = "player-status"; }
  if (stationName) { stationName.innerHTML = "ONLINE RADIO"; }
  if (progressFill) { progressFill.style.width = "0%"; }
  if (playerTimer) { playerTimer.innerHTML = "00:00"; }
}


