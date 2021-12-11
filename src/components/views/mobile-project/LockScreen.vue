<template>
  <div class="lock-screen">
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
      <div class="circle_progress_wrap">
        <svg class="circle_progress" width="60" height="60" viewBox="0 0 60 60">
          <circle class="frame" cx="30" cy="30" r="27" stroke-width="6" />
          <circle class="bar" cx="30" cy="30" r="27" stroke-width="6" ref="refProgressCircle" />
        </svg>
      </div>
    </button>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  setup(props, { emit }) {
    const interval = ref(false)
    const count = ref(0)

    const start = () => {
      if (!interval.value) {
        interval.value = setInterval(() => {
          count.value++
          progress(count.value / 3)

          if (count.value > 300) {
            emit('unlock')
            stop()
          }
        }, 10)
      }
    }

    const stop = () => {
      clearInterval(interval.value)
      progress(0)
      count.value = 0
      interval.value = false
    }

    const refProgressCircle = ref(null)
    const RADIUS = 27
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS

    const progress = per => {
      var progress = per / 100
      var dashoffset = CIRCUMFERENCE * (1 - progress)

      refProgressCircle.value.style.strokeDashoffset = dashoffset
    }

    const initProgress = () => {
      refProgressCircle.value.style.strokeDasharray = CIRCUMFERENCE

      progress(0)
    }

    onMounted(() => {
      initProgress()
    })

    return {
      refProgressCircle,
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

  .circle_progress_wrap {
    position: absolute;
    width: 60px;
    height: 60px;
    top: calc(50% - 30px);
    left: calc(50% - 30px);
  }
  .circle_progress {
    transform: rotate(-90deg);
  }
  .frame,
  .bar {
    fill: none;
  }
  .frame {
    /* stroke: #e6e6e6; */
  }
  .bar {
    stroke: #03c75a;
    stroke-linecap: round;
  }
  .value {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    text-align: center;
    color: #888;
    font-size: 16px;
    line-height: 120px;
  }
}
</style>