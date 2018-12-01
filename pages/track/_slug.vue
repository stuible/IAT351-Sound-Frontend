<template>
<section class="section player">
    <div class="container">
        <div class="row">
            <div class="col-sm-4">
                <img class="albumart" :src="this.song.albumart.data.full_url" alt="">
            </div>
                <div class="col-sm-8">
                    <div class="artist"></div>
                    <div class="title">{{song.title}}</div>
                </div>

            </div>
        </div>
</section>
</template>

<script>
import axios from 'axios'

export default {
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
}
</style>
