<template>
  <div class="lock-screen">
    <i class="fas fa-fingerprint" @touchstart="onTouchStart" />

    <button @click="onClickTouch(false)">Touch End</button>
    <button @click="onClickTouch(true)">Touch Start</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(props, { emit }) {
    const isClicked = ref(false)

    let timerFunc = null

    const onTouchStart = () => {
      isClicked.value = true

      timerFunc = setTimeout(() => {
        if (isClicked.value) {
          emit('unlock')
        }
      }, 3000)
    }

    const onTouchEnd = () => {
      isClicked.value = false

      clearTimeout(timerFunc)
    }

    const onClickTouch = params => {
      console.log(params)
      if (params) {
        onTouchStart()
      } else {
        onTouchEnd()
      }
    }

    return {
      isClicked,
      onTouchStart,
      onTouchEnd,
      onClickTouch,
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

  .fa-fingerprint {
    margin: 0 0 80px;
    font-size: 40px;
    color: var(--gs-88);
    background-color: var(--white-20);
    backdrop-filter: blur(6px);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid var(--white-18);
    padding: 6px;
    border-radius: 50%;
  }
}
</style>