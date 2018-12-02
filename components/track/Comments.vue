<template>
    <div class="comments">
        <div class="comment" v-for="comment in comments" v-bind:key="comment.id">
            <div class="voting"><i class="material-icons">expand_less</i><i class="material-icons">expand_more</i></div>
            <div class="info">
                <div class="profileimage"></div>
                <div class="name">{{comment.user.name}}</div>
                <div class="message">{{comment.comment}}</div>
            </div>
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
.comments {
    margin-top: 3em;
}
.comment {
    margin-bottom: 2em;
    display: flex;
    align-items: center;
}
.profileimage {
    width: 1em;
    height: 1em;
    display: inline-block;
    border-radius: 50%;
    background-color: lightgray;
}
.name {
    display: inline-block;
    font-weight: 900;
}
.message {
    display: inline-block;
}
.voting {
    width: 10%;
    display: inline-block;
    i {
        display: block;
        cursor: pointer;

        &:hover{
            color: $orangeColour;
        }
    }
}
.info {
    width: 89%;
    display: inline-block;
}
</style>

