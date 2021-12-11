<template>
  <div class="lock-screen-clock">
    <span class="timer" v-html="nowTime.timer" />
    <span v-html="nowTime.day" />
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import dayjs from 'dayjs'

export default {
  setup() {
    const nowDate = ref(new Date())

    const nowTime = computed(() => {
      const date = dayjs(nowDate.value)

      return {
        timer: date.format('HH:mm'),
        day: date.format('dddd, D MMM'),
      }
    })

    const interval = ref(null)

    onMounted(() => {
      interval.value = setInterval(() => {
        nowDate.value = new Date()
      }, 1000)
    })

    onUnmounted(() => {
      clearInterval(interval.value)
    })

    return {
      nowTime,
    }
  },
}
</script>

<style lang="scss" scoped>
.lock-screen-clock {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  margin: 80px 0 0;
  color: var(--gs-88);
  background-color: var(--white-20);
  border: 1px solid var(--white-18);
  border-radius: 10px;
  padding: 20px 40px;

  .timer {
    font-size: 40px;
  }
}
</style>