<template>
<section class="section">
    <div class="container">
        <p>THIS IS THE STREAM PAGE</p>
        <div class="row">
            <div class="col-lg-10">
                <audio-player-widget v-for="post in posts" :key="post.id" :song="post" />
            </div>
            <div class="col-lg-2">
                <h2>Who to follow</h2>
                <h2>Likes</h2>
                <likes :likes="userlikes"/>
                
                <h2>Listening History</h2>
            </div>
        </div>

    </div>
</section>
</template>

<script>
import AudioPlayerWidget from '~/components/widgets/AudioPlayer.vue'
import Likes from '~/components/stream/Likes.vue'

export default {
    components: {
        AudioPlayerWidget,
        Likes
    },
    async asyncData({
        app,
        env
    }) {
        const { data } = await app.$axios.get(env.api.apiUrl + 'items/users?fields=*.*.*.*.*.*&single=1&filter[name]=' + env.user.name,
            JSON.stringify({
                // filter: { published: true },
                // sort: {_created:-1},
                // populate: 1
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let followerPosts = [];

            Object.entries(data.data.follows).forEach(([key, val]) => {
              Object.entries(val.is_following.reposts).forEach(([key, repost]) => {
                let song = {user: val.is_following, song: repost.song, timestamp: repost.timestamp}
                followerPosts.push(song)
              });
            });
            console.log(followerPosts);

        return {
            posts: followerPosts,
            userlikes: data.data.likes,
            user: env.user
        }
    },
    methods: {

    }
}
</script>

<style lang="scss">

</style>
