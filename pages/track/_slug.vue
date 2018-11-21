<template>
<section class="section">
    <div class="container">
        THIS IS A SONG: {{song.title}}
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
