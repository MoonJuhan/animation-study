<template>
  <div class="view-mojs">
    <h1>Mojs</h1>
    <ul>
      <li v-for="item in componentList" :key="item.name">
        <div class="component-header">
          <span>{{ item.name }}</span>
          <button @click="playAllObject(item.objects)">Play</button>
        </div>

        <div class="component-wrapper" :id="item.id" />
      </li>
    </ul>
  </div>
</template>

<script>
import mojs from '@mojs/core'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const componentList = ref([
      {
        name: 'BouncyCircle',
        id: 'bouncyCircle',
        objects: [],
      },
      {
        name: 'Spinner',
        id: 'spinner',
        objects: [],
      },
      {
        name: 'Like Icon',
        id: 'likeIcon',
        objects: [],
      },
    ])

    const setShape = () => {
      componentList.value
        .find((c) => c.id === 'bouncyCircle')
        .objects.push(
          new mojs.Shape({
            parent: '#bouncyCircle',
            shape: 'circle',
            fill: { '#d7e6fc': '#0058ff' },
            left: '50%',
            top: '50%',
            radius: { 20: 80 },
            duration: 2000,
            isYoyo: true,
            isShowStart: true,
            easing: 'elastic.inout',
            repeat: 1,
          })
        )

      componentList.value
        .find((c) => c.id === 'spinner')
        .objects.push(
          new mojs.Shape({
            parent: '#spinner',
            shape: 'circle',
            stroke: '#d7e6fc',
            strokeDasharray: '125, 125',
            strokeDashoffset: { 0: '-125' },
            strokeWidth: 4,
            fill: 'none',
            left: '50%',
            top: '50%',
            rotate: { '-90': '270' },
            radius: 20,
            isShowStart: true,
            duration: 2000,
            easing: 'back.in',
          }).then({
            rotate: { '-90': '270' },
            strokeDashoffset: { '-125': '-250' },
            duration: 3000,
            easing: 'cubic.out',
          })
        )

      componentList.value
        .find((c) => c.id === 'likeIcon')
        .objects.push(
          new mojs.Shape({
            parent: '#likeIcon',
            shape: 'circle',
            fill: '#d7e6fc',
            top: '50%',
            left: '50%',
            scaleX: { 0.44: 0.5 },
            scaleY: { 0.44: 0.42 },
            duration: 220,
          })
            .then({
              scaleX: { 0.5: 0.42 },
              scaleY: { 0.42: 0.44 },
              duration: 180,
            })
            .then({
              scaleX: { 0.42: 0.48 },
              scaleY: { 0.44: 0.44 },
              duration: 160,
            })
            .then({
              scaleX: { 0.48: 0.44 },
              scaleY: { 0.44: 0.44 },
              duration: 160,
            })
            .then({
              scaleX: { 0.44: 0.44 },
              scaleY: { 0.44: 0.44 },
              duration: 160,
            })
        )

      class Heart extends mojs.CustomShape {
        getShape() {
          return '<path d="M92.6 7.4c-10-9.9-26-9.9-35.9 0l-4.4 4.3a3.4 3.4 0 0 1-4.7 0l-4.3-4.3c-10-9.9-26-9.9-35.9 0a25 25 0 0 0 0 35.5l22.4 22.2 13.5 13.4a9.5 9.5 0 0 0 13.4 0L70.2 65 92.6 43a25 25 0 0 0 0-35.5z"/>'
        }
      }

      mojs.addShape('heart', Heart)

      componentList.value
        .find((c) => c.id === 'likeIcon')
        .objects.push(
          new mojs.Shape({
            parent: '#likeIcon',
            shape: 'heart',
            fill: '#0058ff',
            scale: { 0.22: 0.24 },
            y: 3,
            duration: 220,
          }).then({
            scale: { 0.24: 0.22 },
            duration: 180,
          })
        )
    }

    const playAllObject = (objects) => {
      objects.forEach((o) => {
        o.play()
      })
    }

    onMounted(() => {
      setShape()

      componentList.value.forEach((c) => {
        playAllObject(c.objects)
      })
    })

    return {
      componentList,
      playAllObject,
    }
  },
}
</script>

<style lang="scss" scoped>
.view-mojs {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    padding: 0 20px;
  }

  ul {
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;

    li {
      display: flex;
      flex-direction: column;
      margin: 0 10px 0 0;

      .component-header {
        display: flex;
        justify-content: space-between;
        margin: 0 0 10px;
      }

      .component-wrapper {
        position: relative;
        display: flex;
        height: 280px;
        width: 280px;
        border: 1px solid black;
        border-radius: 4px;
      }
    }
  }
}
</style>
