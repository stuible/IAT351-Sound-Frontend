<template>
<section class="stream">
    <div class="container">
        <!-- <p>THIS IS THE STREAM PAGE</p> -->
        <filters v-on:filterClicked="filterClicked" />
        <div class="row">
            <div class="col-sm-10">
                <div class="slidecontainer">
                    <div class="title">LIKE THRESHOLD <span>{{threshold}}</span></div>
                    <input type="range" min="1" max="50" value="25" class="slider" v-model="threshold">
                </div>
                    <song-item v-for="post in seenOrUnseen" :key="post.id" :song="post" :user="user" :postsOrReposts="postsOrReposts" v-on:likedTrack="likedTrack($event)" :skim="!playOrSkim" />
                    <div class="allCaughtUp"><span class="line">&nbsp; &nbsp; &nbsp; &nbsp; </span>ALL CAUGHT UP<span class="line">&nbsp; &nbsp; &nbsp; &nbsp; </span></div>
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
            threshold: 5

        }
    },
    methods: {
        likedTrack(event) {
            console.log('giong to update likes ' + event.id)
            console.log(event)
            this.updateLikes(event.id, event)
        },
        filterClicked(value) {
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
            console.log(data)
            Object.entries(this.feed).forEach(([key, val]) => {
                console.log(val.song.id)
                console.log(song.id)
                if (val.song.id == song.id) {
                    console.log('found like to update:')
                    console.log(val.song.likes)
                    console.log(data.data.likes)
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
        seenOrUnseen() {
            if (this.allOrUnseen == true) return this.feed
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

.allCaughtUp {
    margin-top: 3em;
    text-align: center;
    font-weight: 900;
    color: $orangeColour;
    font-size: 1.75em;

    .line {
        text-decoration: line-through;
        padding: 0 0.5em;
    }
}

.slidecontainer {
    width: 100%;
    /* Width of the outside container */
    height: 25px;
    margin-bottom: 2em;

    .title {
        position: relative;
        top: 13px;
        font-size: 2em;
        // text-align: center;
        color: rgb(211, 211, 211);
        font-weight: 900;
        z-index: -1;

        span {
            color: black;
        }
    }
}

/* The slider itself */
.slider {
    -webkit-appearance: none;
    /* Override default CSS styles */
    appearance: none;
    width: 100%;
    /* Full-width */
    height: 8px;
    /* Specified height */
    background: $orangeColour;
    /* Grey background */
    outline: none;
}

/* Mouse-over effects */
.slider:hover {
    opacity: 1;
    /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Override default look */
    appearance: none;
    width: 25px;
    /* Set a specific slider handle width */
    height: 25px;
    /* Slider handle height */
    background: black;
    /* Green background */
    border-radius: 50%;
    cursor: pointer;
    /* Cursor on hover */
}
</style>
