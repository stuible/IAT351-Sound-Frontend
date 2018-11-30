<template>
    <div class="filters">
            <span @click="togglePlaySkim()">{{playOrSkimText}}</span>
            <!-- the latest -->
            <span @click="toggleAllUnseen()">{{allOrUnseenText}}</span>
            <span @click="togglePostsReposts()">{{postsOrRepostsText}}</span>
            from the people you follow:
        </div>
</template>

<script>
export default {
    data(){
        return {
            playOrSkim: true,
            allOrUnseen: true,
            postsOrReposts: false,

        }
    },
    computed: {
        playOrSkimText(){
            if(this.playOrSkim) return 'Play'
            else return 'Skim'
        },
        allOrUnseenText(){
            if(this.allOrUnseen) return 'All'
            else return 'Unseen'
        },
        postsOrRepostsText(){
            if(this.postsOrReposts) return 'Posts'
            else return 'Reposts'
        }
    },
    methods: {
        togglePlaySkim(){
            console.log('clicked')
            this.playOrSkim = !this.playOrSkim
        },
        toggleAllUnseen(){
            console.log('clicked')
            this.allOrUnseen = !this.allOrUnseen
        },
        togglePostsReposts(){
            console.log('clicked')
            this.postsOrReposts = !this.postsOrReposts
        }
    }
    

}
</script>

<style lang="scss" scoped>
.filters {
    font-size: 3em;
    text-transform: lowercase;
    padding-bottom: 1em; 

    span {
        border: 2px dashed grey;
        padding: 0 0.25em;
        font-weight: 900;
        cursor: pointer;

        &:hover{
            border-color: $orangeColour;
        }
    }
}

</style>

