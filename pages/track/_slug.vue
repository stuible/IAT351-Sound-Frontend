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
                            <div class="followers">{{Math.floor((Math.random() * 500) + 50)}}</div>
                            <div class="sounds">{{Math.floor((Math.random() * 40) + 2)}}</div>
                        </div>
                    </div>
                    <div class="title">{{song.title}}</div>
                    <player :song="song" :user="{name: 'brian',id: '0' }" v-on:likedTrack="likedTrack($event)" />

                </div>

            </div>
        </div>
</section>
</template>

<script>
import axios from 'axios'
import Player from '~/components/track/Player.vue'

export default {
    components: {
        Player,
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
        console.log(data)

        return {
            song: data.data,
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
        .profilepic{
            display: inline-block;
            width: 3em;
            height: 3em;
            background-color: darkgray;
            border-radius: 50%;
        }
        .info {
            display: inline-block;

            div{
                display: inline-block;
            }
        }
    }
}
</style>
