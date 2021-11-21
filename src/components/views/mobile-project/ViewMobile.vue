<template>
  <div class="view-mobile">
    <div class="background" />
    <LockScreen @unlock="unlock" v-if="locked" />
    <div class="contents-wrapper">
      <div class="widget-wrapper"></div>
      <div class="icon-wrapper"></div>
      <!-- <div class="under-bar">
        <div>ICON</div>
        <div>ICON</div>
        <div>ICON</div>
        <div>ICON</div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import LockScreen from './LockScreen'

export default {
  components: {
    LockScreen,
  },
  setup() {
    const locked = ref(true)

    const unlock = () => {
      locked.value = false
    }

    return {
      locked,
      unlock,
    }
  },
}
</script>

<style lang="scss" scoped>
@mixin background-gradient {
  background-image: #ff0000;
  background-image: radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0, transparent 50%),
    radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0, transparent 50%),
    radial-gradient(at 0% 50%, hsla(355, 85%, 93%, 1) 0, transparent 50%),
    radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0, transparent 50%),
    radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 1) 0, transparent 50%),
    radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 1) 0, transparent 50%),
    radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0, transparent 50%);
}

.view-mobile {
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  z-index: 0;
  @include background-gradient;

  .background {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    @include background-gradient;
  }

  .contents-wrapper {
    z-index: 1;
    position: relative;

    .under-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      margin: 10px;
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }
  }
}
</style>
