<template>
<section class="section player">
    <div class="container">
        <div class="row">
            <div class="col-sm-4">
                <img class="albumart" :src="this.song.albumart.data.full_url" alt="">
            </div>
                <div class="col-sm-8">
                    <div class="artist">
                        <div class="profilepic">

                        </div>
                        <div class="info">
                            <div class="name">{{song.artist.name}}</div>
                            <div class="followers"><i class="material-icons">person</i>{{Math.floor((Math.random() * 500) + 50)}}</div>
                            <div class="sounds"><i class="material-icons">music_note</i>{{Math.floor((Math.random() * 40) + 2)}}</div>
                        </div>
                    </div>
                    <div class="title">{{song.title}}</div>
                    <player :song="song" :user="{name: 'brian',id: '0' }" v-on:likedTrack="likedTrack($event)" />
                    <top-comments :comments="commentData" />
                    <comments :comments="commentData" />
                </div>

            </div>
        </div>
</section>
</template>

<script>
import axios from 'axios'
import Player from '~/components/track/Player.vue'
import Comments from '~/components/track/Comments.vue'
import TopComments from '~/components/track/TopComments.vue'
export default {
    components: {
        Player,
        Comments,
        TopComments
    },
    props: {
        songName: String,
    },
    async asyncData({
        env,
        params
    }) {
        const {
            data
        } = await axios.get(env.api.apiUrl + 'items/songs?fields=*.*.*&single=1&filter[title]=' + params.slug,
            JSON.stringify({
                // filter: { published: true },
                // sort: {_created:-1},
                // populate: 1
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        // console.log(data)

        const comments = await axios.get(env.api.apiUrl + 'items/comments?fields=*.*.*',
            JSON.stringify({
                // filter: { published: true },
                // sort: {_created:-1},
                // populate: 1
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('about to print comments')
        console.log(comments.data.data)

        return {
            song: data.data,
            commentData: comments.data.data
        }

    }
}
</script>

<style lang="scss">
section.player {

    .albumart {
        width: 100%;
    }

    .title {
        font-size: 4em;
        text-transform: uppercase;
        font-weight: 900;
    }

    .artist {
        .profilepic {
            display: inline-block;
            width: 3em;
            height: 3em;
            background-color: rgb(235, 235, 235);
            border-radius: 50%;
        }

        .info {
            display: inline-block;

            .followers {
                display: inline-block;
            }

            i {
                font-size: 0.8em;
            }
        }
    }
}
</style>
