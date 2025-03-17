<!-- AudioVisualizer.vue -->
<template>
  <div class="audio-visualizer">
    <canvas ref="canvas" class="visualizer-canvas"></canvas>
    <audio ref="audioElement" @ended="onAudioEnded" ></audio>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";

export default {
  name: "AudioVisualizer",
  props: {
    audioData: {
      type: String,
      default: null,
    },
  },
  setup(props, { expose }) {
    const canvas = ref(null);
    const audioElement = ref(null);
    const isPlaying = ref(false);
    let audioContext = null;
    let analyser = null;
    let source = null;
    let animationFrameId = null;
    let playPromise = null;

    const setupCanvas = () => {
      const canvasEl = canvas.value;
      if (!canvasEl) return;

      const ctx = canvasEl.getContext("2d");
      canvasEl.width = canvasEl.offsetWidth;
      canvasEl.height = canvasEl.offsetHeight;
      return ctx;
    };

    const initAudio = () => {
      if (!audioElement.value) return;

      // Always clean up previous audio context and connections
      cleanup();

      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      // Create a new media element source
      if (!source) {
        source = audioContext.createMediaElementSource(audioElement.value);
        // source = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
      }
      /* source = audioContext.createMediaElementSource(audioElement.value);
      source.connect(analyser);
      analyser.connect(audioContext.destination); */
    };

    const drawDefaultWave = (ctx) => {
      if (!canvas.value) return;

      const width = canvas.value.width;
      const height = canvas.value.height;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.3;

      // Create a gradient for the default wave
      const gradient = ctx.createLinearGradient(
        centerX - baseRadius,
        centerY,
        centerX + baseRadius,
        centerY
      );
      gradient.addColorStop(0, "#ff00ff"); // Magenta
      gradient.addColorStop(0.5, "#00ffff"); // Cyan
      gradient.addColorStop(1, "#ff00ff"); // Back to Magenta

      // Draw a pulsing circular wave
      const time = Date.now() / 1000;
      const pulseSpeed = 0.5;

      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * 2 * Math.PI;
        // Create a gentle sine wave effect
        const amplitude = Math.sin(time * pulseSpeed) * 0.1;
        const radius = baseRadius + amplitude * 30;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle) * baseRadius,
          centerY + Math.sin(angle) * baseRadius
        );
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(() => drawDefaultWave(ctx));
    };

    const drawVisualizer = (ctx) => {
      if (!analyser || !canvas.value) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

      const centerX = canvas.value.width / 2;
      const centerY = canvas.value.height / 2;
      const baseRadius =
        Math.min(canvas.value.width, canvas.value.height) * 0.3;

      // Create a gradient for the wave
      const gradient = ctx.createLinearGradient(
        centerX - baseRadius,
        centerY,
        centerX + baseRadius,
        centerY
      );
      gradient.addColorStop(0, "#ff00ff"); // Magenta
      gradient.addColorStop(0.5, "#00ffff"); // Cyan
      gradient.addColorStop(1, "#ff00ff"); // Back to Magenta

      // Draw the circular wave
      for (let i = 0; i < bufferLength; i++) {
        const angle = (i / bufferLength) * 2 * Math.PI;
        const amplitude = (dataArray[i] - 128) / 128; // Normalize amplitude
        const radius = baseRadius + amplitude * 50; // Adjust radius based on amplitude

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle) * baseRadius,
          centerY + Math.sin(angle) * baseRadius
        );
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (isPlaying.value) {
        animationFrameId = requestAnimationFrame(() => drawVisualizer(ctx));
      } else {
        // Switch to default wave animation when playback stops
        drawDefaultWave(ctx);
      }
    };

    const play = async () => {
      if (!audioElement.value || !props.audioData) return;

      try {
        // Cancel any existing animation frame
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        // Reset audio element
        audioElement.value.src = props.audioData;
        audioElement.value.load(); // Explicitly reload the audio
        audioElement.value.currentTime = 0;

        // Handle existing play promise
        if (playPromise) {
          try {
            await playPromise;
            audioElement.value.pause();
          } catch (err) {
            console.log("Error handling previous play promise:", err);
          }
        }

        // Initialize audio context and connections if needed
        if (!audioContext) {
          initAudio();
        }

        // Start playback
        playPromise = audioElement.value.play();
        isPlaying.value = true;

        await playPromise;
        const ctx = setupCanvas();
        drawVisualizer(ctx);
      } catch (error) {
        console.error("Error playing audio:", error);
        isPlaying.value = false;
        playPromise = null;

        // Show default wave animation on error
        const ctx = setupCanvas();
        drawDefaultWave(ctx);
      }
    };

    const onAudioEnded = () => {
      isPlaying.value = false;

      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            audioElement.value.pause();
          })
          .catch((err) => {
            console.log("Error pausing audio:", err);
          });
      }

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Show default wave animation when audio ends
      const ctx = setupCanvas();
      drawDefaultWave(ctx);
    };

    const cleanup = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      if (source) {
        source.disconnect();
        // source = null;
        console.log("source: ", source);
      }

      if (analyser) {
        analyser.disconnect();
        // analyser = null;
        console.log("analyzer: ", analyser);
      }

      if (audioContext) {
        audioContext
          .close()
          .catch((err) => console.log("Error closing audio context:", err));
        audioContext = null;
      }

      if (audioElement.value) {
        audioElement.value.pause();
        audioElement.value.src = "";
      }

      playPromise = null;
    };

    onMounted(() => {
      const ctx = setupCanvas();
      if (ctx) {
        drawDefaultWave(ctx);
      }

      // Add resize event listener
      window.addEventListener("resize", () => {
        const ctx = setupCanvas();
        if (ctx && !isPlaying.value) {
          drawDefaultWave(ctx);
        }
      });
    });

    onUnmounted(() => {
      cleanup();
      window.removeEventListener("resize", setupCanvas);
    });

    watch(
      () => props.audioData,
      (newData) => {
        if (newData) {
          cleanup();
          isPlaying.value = false;

          // Ensure valid audio source before setting
          if (typeof newData === "string" && newData.trim() !== "") {
            audioElement.value.src = newData;
          } else {
            console.error("Invalid audio source:", newData);
            return;
          }

          const ctx = setupCanvas();
          if (ctx) {
            drawDefaultWave(ctx);
          }
        }
      }
    );

    expose({ play });

    return {
      canvas,
      audioElement,
      isPlaying,
      onAudioEnded,
    };
  },
};
</script>

<style scoped>
.audio-visualizer {
  width: 100%;
  height: 200px;
  position: relative;
}

.visualizer-canvas {
  width: 100%;
  height: 100%;
  background: transparent; /* Transparent background */
}
</style>
