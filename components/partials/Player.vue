<template>
<div id="player">
    <div class="name">{{song.song.title}}</div>
    <div class="controls">
        <i class="material-icons">skip_previous</i>
        <i class="material-icons play" @click="togglePlay()">{{playIcon}}</i>
        <i class="material-icons">skip_next</i>
    </div>
        <div>{{currentTime | HHMMSS}}</div>
    </div>
</template>

<script>
import {
    playerStore
} from 'vuex'
export default {
    data: () => ({
        audio: undefined,
        currentSeconds: 0,
        durationSeconds: 0,
        innerLoop: false,
        loaded: false,
        likeTimestamp: 0,
        likes: {}
    }),
    computed: {
        song() {
            if (this.$store.state.song != undefined) {
                return this.$store.state.song
            } else return {
                song: {
                    title: 'No Song Loaded',
                    file: {
                        data: {
                            full_url: ''
                        }
                    }
                }
            }

        },
        playing() {
            return this.$store.state.playing
        },
        currentTime() {
            return this.$store.state.currentTime
        },
        seekTime() {
            return this.$store.state.seekTime
        },
        playIcon(){
            if(this.playing) return 'pause'
            else return 'play_arrow'
        }

    },
    watch: {
        song(newState, oldState) {
            if (oldState.song.id != newState.song.id) {
                console.log('song is different')
                this.$store.state.playing = false;
                this.audio.src = this.song.song.file.data.full_url;
                this.audio.addEventListener('timeupdate', this.update);
                this.audio.addEventListener('ended', this.resetTime);
                this.audio.play();
                // this.$store.state.playing = true;
                console.log('song changed')
                this.$store.state.playing = true;
            } else console.log('song is the same')

            // this.$refs.audiofile.addEventListener('loadeddata', console.log('song loaded'));
        },
        playing(newState, oldState) {
            // Our fancy notification (2).
            console.log(`Playing: ${newState}`)
            if (newState) {
                this.audio.play();
            } else {
                this.audio.pause();
            }

        },
        seekTime(newTime, oldTime) {
            if (newTime != undefined) {
                this.audio.currentTime = newTime
                this.$store.state.seekTime = undefined
            }
        }
    },
    methods: {
        update() {
            this.$store.state.currentTime = this.audio.currentTime
            // console.log(this.audio.currentTime)
        },
        togglePlay() {
            this.$store.state.playing = !this.$store.state.playing
        },
        resetTime() {
            this.$store.state.currentTime = 0;
            // this.$store.state.playing = false;
            this.$store.commit('pause')
        }
    },
    mounted() {
        this.audio = new Audio()
        this.audio.volume = 0.1
    }

}
</script>

<style lang="scss" scoped>
#player {
    position: fixed;
    bottom: 0;
    background: #f1f1f1;
    width: 100%;
    padding: 2em;

    >div {
        display: inline-block;
    }

    .name {
        display: inline-block;
    }
}

.controls {
    display: inline-block;

    i {
        cursor: pointer;
        font-size: 2em;
    }

    // >div,
    // >img {
    //     display: inline-block;
    // }

    // >img {
    //     width: 3em;
    // }

}
</style>
