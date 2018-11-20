<template>
  <section class="section">
    <p>THIS IS THE STREAM PAGE</p>
    
    <div class="song" v-for="post in posts" :key="post.id">
      <p>{{ post.user.name }} [REPOSTED] {{ post.song.title }} [BY] {{ post.song.artist.name }}</p>
      <audio controls>
        <source :src="post.song.file.data.full_url" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
      <a v-on:click="clickLike">LIKE</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Stream',
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
    return { posts: data.data }
  },
  methods: {
    clickLike: function(){

    }
  }
}
</script>

<style lang="sass" scoped>

</style>
