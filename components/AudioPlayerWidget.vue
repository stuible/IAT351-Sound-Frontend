<template>
<div class="song">
    <p>{{ song.user.name }} [REsongED] {{ song.song.title }} [BY] {{ song.song.artist.name }}</p>
    <audio controls>
        <source :src="song.song.file.data.full_url" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    <button v-on:click="onLikeClicked">LIKE</button>
</div>
</template>

<script>
export default {
    props: {
        song: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
