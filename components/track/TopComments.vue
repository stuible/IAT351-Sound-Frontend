<template>
    <div class="comments">
        <div class="comment" v-for="comment in comments.slice(0, 10)" v-bind:key="comment.id">
            <!-- <div class="name">{{comment.user.name}}</div>
            <div class="message">{{comment.comment}}</div> -->
            <div class="profileimage"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        comments: {
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
.comment {
    display: inline-block;
    margin-right: 5%;
}
.profileimage {
    width: 1em;
    height: 1em;
    display: inline-block;
    background-color: grey;
}
.name {
    display: inline-block;
    font-weight: 900;
}
.message {
    display: inline-block;
}
</style>

