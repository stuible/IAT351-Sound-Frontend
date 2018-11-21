<template>
<div>
    <div v-for="like in likes" v-bind:key="like.id">
        {{like.song.title}}
        <br>
    </div>
    
</div>
</template>

<script>
export default {
props: {
        likes: {
            type: Object,
            required: true
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
