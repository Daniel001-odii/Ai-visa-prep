<!-- AudioVisualizer.vue -->
<template>
  <div class="audio-visualizer">
    <canvas ref="canvas" class="visualizer-canvas"></canvas>
    <button @click="togglePlay" class="control-button">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'AudioVisualizer',
  props: {
    audioBase64: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      isPlaying: false,
      audio: null,
      audioContext: null,
      analyser: null,
      dataArray: null,
      animationFrameId: null
    }
  },
  mounted() {
    this.initializeAudio()
  },
  beforeUnmount() {
    this.cleanup()
  },
  methods: {
    initializeAudio() {
      // Create audio element from base64
      this.audio = new Audio(this.audioBase64)
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Create analyser node
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 256
      
      // Connect audio source to analyser
      const source = this.audioContext.createMediaElementSource(this.audio)
      source.connect(this.analyser)
      this.analyser.connect(this.audioContext.destination)
      
      // Setup data array for visualization
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    },
    togglePlay() {
      if (!this.audioContext) return

      if (this.isPlaying) {
        this.audio.pause()
        cancelAnimationFrame(this.animationFrameId)
      } else {
        this.audio.play()
        this.drawVisualizer()
      }
      this.isPlaying = !this.isPlaying
    },
    drawVisualizer() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      
      // Set canvas size
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      const draw = () => {
        this.analyser.getByteFrequencyData(this.dataArray)
        
        // Clear canvas
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Draw bars
        const barWidth = (canvas.width / this.dataArray.length) * 2.5
        let x = 0
        
        for (let i = 0; i < this.dataArray.length; i++) {
          const barHeight = (this.dataArray[i] / 255) * canvas.height
          ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight)
          x += barWidth
        }
        
        this.animationFrameId = requestAnimationFrame(draw)
      }
      
      draw()
    },
    cleanup() {
      if (this.audio) {
        this.audio.pause()
      }
      if (this.audioContext) {
        this.audioContext.close()
      }
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
      }
    }
  },
  watch: {
    audioBase64(newVal) {
      this.cleanup()
      this.initializeAudio()
      this.isPlaying = false
    }
  }
}
</script>

<style scoped>
.audio-visualizer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.visualizer-canvas {
  width: 100%;
  height: 200px;
  background: #000;
}

.control-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
}

.control-button:hover {
  background-color: #45a049;
}
</style>