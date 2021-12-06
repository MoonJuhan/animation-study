<template>
  <div class="lock-screen">
    {{ count }}

    <button
      :class="{ active: interval }"
      @mousedown="start"
      @mouseleave="stop"
      @mouseup="stop"
      @touchstart="start"
      @touchend="stop"
      @touchcancel="stop"
    >
      <i class="fas fa-fingerprint" />
      <div id="progress-circle" />
    </button>
  </div>
</template>

<script>
import mojs from '@mojs/core'
import { onMounted, ref } from 'vue'

export default {
  setup(props, { emit }) {
    const interval = ref(false)
    const count = ref(0)

    const start = () => {
      if (!interval.value) {
        interval.value = setInterval(() => {
          count.value++

          if (count.value === 1) {
            progressCircle.value.play()
          }

          if (count.value > 30) {
            emit('unlock')
          }
        }, 100)
      }
    }

    const stop = () => {
      clearInterval(interval.value)

      progressCircle.value.setProgress(0)
      count.value = 0
      interval.value = false
    }

    const progressCircle = ref(null)

    const setProgressCircle = () => {
      progressCircle.value = new mojs.Shape({
        parent: '#progress-circle',
        shape: 'circle',
        stroke: '#FC46AD',
        strokeDasharray: '100%',
        strokeDashoffset: '100%',
        strokeWidth: 6,
        fill: 'none',
        left: '50%',
        top: '50%',
        rotate: '-90',
        radius: 34,
        onComplete(isForward, isYoyo) {
          console.log('onComplete')
          console.log(isForward, isYoyo)
          //...
        },
        onRefresh(isBefore) {
          console.log('onRefresh')
          //...
        },

        onUpdate(ep, p, isForward, isYoyo) {
          console.log('onUpdate')
        },
      }).then({
        strokeDashoffset: '0%',
        duration: 3000,
      })
    }

    onMounted(() => {
      setProgressCircle()
    })

    return {
      start,
      stop,
      interval,
      count,
    }
  },
}
</script>

<style lang="scss" scoped>
.lock-screen {
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  button {
    border: none;
    background-color: transparent;
    user-select: none;
    margin: 0 0 80px;
    position: relative;
  }

  .fa-fingerprint {
    font-size: 40px;
    color: var(--gs-88);
    background-color: var(--white-20);
    border: 1px solid var(--white-18);
    padding: 6px;
    border-radius: 50%;
    user-select: none;
  }
}
</style>