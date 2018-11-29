<template>
<section class="stream">
    <div class="container">
        <!-- <p>THIS IS THE STREAM PAGE</p> -->
        <filters />
        <div class="row">
            <div class="col-sm-10">
                <song-item v-for="post in posts" :key="post.id" :song="post" :user="user" v-on:likedTrack="likedTrack($event)" />
            </div>
            <div class="col-sm-2">
                <h2>Who to follow</h2>
                <h2>Likes</h2>
                <likes :likes="userlikes" />

                <h2>Listening History</h2>
            </div>
        </div>

    </div>
</section>
</template>

<script>
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
import SongItem from '~/components/stream/SongItem.vue'
import Likes from '~/components/stream/Likes.vue'
import Filters from '~/components/stream/Filters.vue'

export default {
    components: {
        SongItem,
        Likes,
        Filters
    },
    async asyncData({
        app,
        env
    }) {
        const {
            data
        } = await app.$axios.get(env.api.apiUrl + 'items/users?fields=*.*.*.*.*.*.*&single=1&filter[name]=' + env.user.name,
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
                let song = {
                    user: val.is_following,
                    song: repost.song,
                    timestamp: repost.timestamp
                }
                followerPosts.push(song)
            });
        });

        return {
            posts: followerPosts,
            userlikes: data.data.likes,
            user: {
                name: data.data.name,
                id: data.data.id
            }
        }
    },
    methods: {
        likedTrack(event) {
            this.updateLikes(event.id, event)
        },
        async updateLikes(songID, song){

          const { data } = await this.$axios.get(process.env.api.apiUrl + 'items/songs?fields=*.*.*.*.*.*.*&single=1&single=1&filter[id]=' + songID,
            JSON.stringify({
                // filter: { published: true },
                // sort: {_created:-1},
                // populate: 1
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            Object.entries(this.posts).forEach(([key, val]) => {
              if(val.song.id == song.id){
                console.log(val.song.likes)
                val.song.likes = data.data.likes
              } 
            });

        }
    }
}
</script>

<style lang="scss">
section.stream{
    margin-bottom: 100px;
}

</style>
