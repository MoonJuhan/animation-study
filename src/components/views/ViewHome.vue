<template>
  <div class="view-home">
    <h1>JavaScript Animation Library List</h1>
    <ul class="library-line-wrapper">
      <li class="title">
        <span class="name">Library Name</span>
        <span class="star">Github Star</span>
        <span class="downloads">NPM Monthly Downloads</span>
      </li>
      <li class="library-line" v-for="item in libraryList" :key="item.route" @click="onClickLibraryPage(item.route)">
        <span class="name">
          <img class="logo" v-if="item.logoUrl" :src="`/logo/${item.logoUrl}`" alt="" />{{ item.name }}</span
        >
        <span class="star">{{ item.star }}</span>
        <span class="downloads">{{ item.downloads }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const router = useRouter()

    const libraryList = ref([
      {
        name: 'Lottie',
        route: 'lottie',
        githubUrl: 'airbnb/lottie-web',
        npmUrl: 'lottie-web',
        star: 0,
        downloads: 0,
      },
      {
        name: 'anime.js',
        route: 'animejs',
        githubUrl: 'juliangarnier/anime',
        npmUrl: 'animejs',
        star: 0,
        downloads: 0,
      },
      {
        name: 'GSAP',
        route: 'gsap',
        githubUrl: 'greensock/GSAP',
        npmUrl: 'gsap',
        star: 0,
        downloads: 0,
      },
      {
        name: 'mo.js',
        route: 'mojs',
        githubUrl: 'mojs/mojs',
        npmUrl: '@mojs/core',
        star: 0,
        downloads: 0,
      },
    ])

    const onClickLibraryPage = (route) => {
      router.push(route)
    }

    const getLibraryInfo = async () => {
      libraryList.value.forEach(async (lib) => {
        lib.star = await getStars(lib.githubUrl)
        lib.downloads = await getDownloads(lib.npmUrl)
      })
    }

    const getStars = async (githubUrl) => {
      const { data } = await axios.get(`https://api.github.com/repos/${githubUrl}`)
      return data.stargazers_count
    }

    const getDownloads = async (npmUrl) => {
      const { data } = await axios.get(`https://api.npmjs.org/downloads/point/last-month/${npmUrl}`)
      return data.downloads
    }

    onMounted(() => {
      getLibraryInfo()
    })

    return {
      libraryList,
      onClickLibraryPage,
    }
  },
}
</script>

<style lang="scss" scoped>
.view-home {
  width: 100%;
  max-width: 1040px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .library-line-wrapper {
    width: 100%;

    li {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      margin: 0 0 4px;

      span {
        width: 30%;
      }
    }
  }

  .title {
    border-bottom: 2px solid #b8bec5;
    margin: 0 0 4px;

    span {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .library-line {
    transition: all 0.6s;
    border-radius: 4px;

    &:hover {
      background-color: #b8bec5;
      cursor: pointer;
    }

    .name {
      display: flex;
      justify-content: center;
      align-items: center;

      .logo {
        width: 20px;
        margin: 0 8px 0 0;
      }
    }
  }
}
</style>
