<template>
<section class="stream">
    <div class="container">
        <!-- <p>THIS IS THE STREAM PAGE</p> -->
        <filters v-on:filterClicked="filterClicked"/>
        <div class="row">
            <div class="col-sm-10">
                <song-item v-for="post in seenOrUnseen" :key="post.id" :song="post" :user="user" :postsOrReposts="postsOrReposts" v-on:likedTrack="likedTrack($event)" :skim="!playOrSkim"/>
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

        let followerReposts = [];
        let followerPosts = [];

        Object.entries(data.data.follows).forEach(([key, val]) => {
            Object.entries(val.is_following.reposts).forEach(([key, repost]) => {
                let song = {
                    user: val.is_following,
                    song: repost.song,
                    timestamp: repost.timestamp
                }
                followerReposts.push(song)
            });

            Object.entries(val.is_following.posts).forEach(([key, repost]) => {
                let song = {
                    user: val.is_following,
                    song: repost.song,
                    timestamp: repost.timestamp
                }
                followerPosts.push(song)
            });
        });

        return {
            reposts: followerReposts,
            posts: followerPosts,
            userlikes: data.data.likes,
            user: {
                name: data.data.name,
                id: data.data.id
            },
            // feedType: 'reposts',
            allOrUnseen: true,
            playOrSkim: true,
            postsOrReposts: false,

        }
    },
    methods: {
        likedTrack(event) {
            this.updateLikes(event.id, event)
        },
        filterClicked(value){
            console.log(value)
            switch (value.name) {
                case 'playSkim':
                    this.playOrSkim = value.value
                    break;
                case 'allUnseen':
                    this.allOrUnseen = value.value
                    break;
                case 'postsReposts':
                    this.postsOrReposts = value.value
                    break;
                default:
                    break;
            }
        },
        async updateLikes(songID, song) {

            const {
                data
            } = await this.$axios.get(process.env.api.apiUrl + 'items/songs?fields=*.*.*.*.*.*.*&single=1&single=1&filter[id]=' + songID,
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
                if (val.song.id == song.id) {
                    console.log(val.song.likes)
                    val.song.likes = data.data.likes
                }
            });

        },
        // songBeenPlayed(song) {
        //     if (this.alreadyPlayedTracks.isArray(song)) return true;
        //     else return false
        // }
    },
    computed: {
        feed() {
            if (this.postsOrReposts == false) return this.reposts
            else if (this.postsOrReposts == true) return this.posts
        },
        alreadyPlayedTracks() {
            return this.$store.state.seenTracks;
        },
        unplayedPosts() {
            let that = this
            return this.feed.filter(function (u) {
                
                console.log(that.alreadyPlayedTracks)
                return !that.alreadyPlayedTracks.includes(u)
            })
        },
        seenOrUnseen(){
            if(this.allOrUnseen == true) return this.feed
            else return this.unplayedPosts
        }

    },
    watch: {
        // alreadyPlayedTracks(){
        //     if
        // }
    }
}
</script>

<style lang="scss">
section.stream {
    margin-bottom: 100px;
}
</style>
