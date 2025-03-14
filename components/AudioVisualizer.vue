<template>
    <div>
      <div id="waveform" ref="waveform"></div>
      <audio ref="audio" controls @play="onPlay" @pause="onPause"></audio>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import WaveSurfer from 'wavesurfer.js';
  
  const props = defineProps({
    audioUrl: {
      type: String,
      required: true,
    },
  });
  
  const waveform = ref(null);
  const audio = ref(null);
  let wavesurfer = null;
  
  onMounted(() => {
    // Initialize Wavesurfer
    wavesurfer = WaveSurfer.create({
      container: waveform.value,
      waveColor: '#4CAF50',
      progressColor: '#388E3C',
      cursorColor: '#FFFFFF',
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: 100,
      responsive: true,
    });
  
    // Load the audio URL from the server response
    wavesurfer.load(props.audioUrl);
  
    // Sync audio element with waveform
    wavesurfer.on('ready', () => {
      audio.value.src = props.audioUrl;
    });
  });
  
  const onPlay = () => {
    wavesurfer.play();
  };
  
  const onPause = () => {
    wavesurfer.pause();
  };
  
  onUnmounted(() => {
    if (wavesurfer) {
      wavesurfer.destroy();
    }
  });
  </script>
  
  <style scoped>
  #waveform {
    width: 100%;
    margin-bottom: 10px;
  }
  </style>