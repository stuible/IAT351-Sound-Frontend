<template>
  <section class="section">
    <p>THIS IS THE STREAM PAGE</p>

    <audio-player-widget v-for="post in posts" :key="post.id" :song="post"/>
  </section>
</template>

<script>
import AudioPlayerWidget from '~/components/AudioPlayerWidget.vue'


export default {
  components: {
        AudioPlayerWidget
    },
  async asyncData ({ app, env }) {
    const { data } = await app.$axios.get(env.api.apiUrl + 'items/reposts?fields=*.*.*',
    JSON.stringify({
        // filter: { published: true },
        // sort: {_created:-1},
        // populate: 1
      }),
    {
      headers: { 'Content-Type': 'application/json' }
    })
    return { 
      posts: data.data 

      }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
