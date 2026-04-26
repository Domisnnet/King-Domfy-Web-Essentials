import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import '@/vendor/fontawesome/css/all.min.css';
import '@/js/template-loader.js';
import '@/css/estilos-globais.css';

let indiceAtual = 1; 
const audio = new Audio();
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const playlist = [
  { titulo: "Capa do Álbum", caminho: "/assets/media/hino1.mp3", capa: "/assets/imagens/melodias-da-alma.jpeg"},
  { titulo: "Hino 1 - Hino da Jornada", caminho: "/assets/media/hino1.mp3", capa: "/assets/imagens/img1.jpeg" },
  { titulo: "Hino 2 - A estrada é longa, mas eu sigo", caminho: "/assets/media/hino2.mp3", capa: "/assets/imagens/img2.jpeg" },
  { titulo: "Hino 3 - Em Tua Vida, Deus", caminho: "/assets/media/hino3.mp3", capa: "/assets/imagens/img3.jpeg" },
  { titulo: "Hino 4 - Siga adiante, não desanima", caminho: "/assets/media/hino4.mp3", capa: "/assets/imagens/img4.jpeg" },
  { titulo: "Hino 5 - Eu só queria, Senhor!", caminho: "/assets/media/hino5.mp3", capa: "/assets/imagens/img5.jpeg" },
  { titulo: "Hino 6 - Às vezes eu me sinto assim", caminho: "/assets/media/hino6.mp3", capa: "/assets/imagens/img6.jpeg" },
  { titulo: "Hino 7 - O Sangue de Cristo Conhecido", caminho: "/assets/media/hino7.mp3", capa: "/assets/imagens/img7.jpeg" },
  { titulo: "Hino 8 - O Amor aqui, esfriando está", caminho: "/assets/media/hino8.mp3", capa: "/assets/imagens/img8.jpeg" },
  { titulo: "Hino 9 - Hoje é tão Difícil", caminho: "/assets/media/hino9.mp3", capa: "/assets/imagens/img9.jpeg" },
  { titulo: "Hino 10 - Pelo Sangue purificado", caminho: "/assets/media/hino10.mp3", capa: "/assets/imagens/img10.jpeg" }
];

const initPlayer = () => {
  const btnPlayPause = document.getElementById('btnPlayPause');
  if (!btnPlayPause) return;
  const btnNext = document.getElementById('btnNext');
  const btnPrev = document.getElementById('btnPrev');
  const btnShuffle = document.getElementById('btnShuffle');
  const btnRepeat = document.getElementById('btnRepeat');
  const svgPlay = document.getElementById('svgPlay');
  const svgPause = document.getElementById('svgPause');
  const progressContainer = document.querySelector('.progress-bar-custom');
  const progressFill = document.querySelector('.progress-fill');
  const displayTitulo = document.querySelector('.song-details h4');
  const displayCapa = document.querySelector('.album-art img');
  const timeCurrent = document.getElementById('currentTime');
  const timeTotal = document.getElementById('totalDuration');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeIcon = document.getElementById('volumeIcon');
  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
  };

  const carregarMusica = (indice) => {
    const musica = playlist[indice];
    audio.src = musica.caminho;
    displayTitulo.innerText = musica.titulo;
    if (displayCapa) displayCapa.src = musica.capa;
    audio.load();
  };

  const proximaMusica = () => {
    if (isRepeat) {
      audio.currentTime = 0;
    } else if (isShuffle) {
      let novoIndice;
      do {
        novoIndice = Math.floor(Math.random() * (playlist.length - 1)) + 1; 
      } while (novoIndice === indiceAtual && playlist.length > 2);
      indiceAtual = novoIndice;
    } else {
      indiceAtual++;
      if (indiceAtual >= playlist.length) {
        indiceAtual = 1; 
      }
    }
    carregarMusica(indiceAtual);
    if (isPlaying) audio.play();
  };

  const musicaAnterior = () => {
    indiceAtual--;
    if (indiceAtual < 1) {
      indiceAtual = playlist.length - 1; 
    }
    carregarMusica(indiceAtual);
    if (isPlaying) audio.play();
  };

  btnPlayPause.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      svgPlay.style.display = 'block';
      svgPause.style.display = 'none';
    } else {
      audio.play();
      svgPlay.style.display = 'none';
      svgPause.style.display = 'block';
    }
    isPlaying = !isPlaying;
  });

  btnShuffle.addEventListener('click', () => {
    isShuffle = !isShuffle;
    btnShuffle.classList.toggle('active-control', isShuffle);
  });

  btnRepeat.addEventListener('click', () => {
    isRepeat = !isRepeat;
    btnRepeat.classList.toggle('active-control', isRepeat);
  });
  btnNext.addEventListener('click', proximaMusica);
  btnPrev.addEventListener('click', musicaAnterior);
  audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (timeCurrent) timeCurrent.innerText = formatarTempo(audio.currentTime);
    if (timeTotal && !isNaN(audio.duration)) {
      timeTotal.innerText = formatarTempo(audio.duration);
    }
  });

  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      if (audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
      }
    });
  }
  audio.addEventListener('ended', proximaMusica);

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value;
      if (audio.volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
      } else if (audio.volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
      } else {
        volumeIcon.className = 'fas fa-volume-up';
      }
    });
  }

  if (volumeIcon) {
    volumeIcon.addEventListener('click', () => {
      audio.muted = !audio.muted;
      if (audio.muted) {
        volumeIcon.className = 'fas fa-volume-mute';
        volumeSlider.value = 0;
      } else {
        volumeIcon.className = 'fas fa-volume-up';
        volumeSlider.value = audio.volume;
      }
    });
  }
  carregarMusica(indiceAtual);
  if (volumeSlider) audio.volume = volumeSlider.value;
};

document.addEventListener('templatesReady', initPlayer);
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (!document.getElementById('btnPlayPause')) return;
    initPlayer();
  }, 500);
});