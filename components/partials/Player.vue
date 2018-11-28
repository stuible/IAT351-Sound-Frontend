<template>
<div id="player">
    <div class="name">{{song.song.title}}</div>
    <div class="controls">
        <div>PREV</div>
        <div @click="togglePlay()">PLAY</div>
        <div>NEXT</div>
    </div>
    <div>{{currentTime | HHMMSS}}</div>
    <!-- <audio :loop="innerLoop" ref="audiofile" :src="song.song.file.data.full_url" preload="auto" style="display: none;"></audio> -->
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
        // playing: false,
        // previousVolume: 35,
        // showVolume: false,
        // volume: 30,
        likeTimestamp: 0,
        likes: {}
    }),
    computed: {
        song() {
            // console.log(this.$store.state.song)
            if (this.$store.state.song != undefined) {
                // this.audio = this.$el.querySelectorAll('audio')[0];
                // this.$refs.audiofile.addEventListener('loadeddata', console.log('song loaded'));
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
        currentTime(){
            return this.$store.state.currentTime
        },
        seekTime(){
            return this.$store.state.seekTime
        }

    },
    watch: {
        song() {
            // this.audio.load();
            // this.audio.pause();
            // this.audio = new Audio(this.song.song.file.data.full_url);
            // if (this.audio && !this.audio.paused) this.audio.pause()
            this.$store.state.playing = false;
            this.audio.src = this.song.song.file.data.full_url;
            this.audio.addEventListener('timeupdate', this.update);
            this.audio.play();
            // this.$store.state.playing = true;
            console.log('song changed')
            this.$store.state.playing = true;
            // this.$refs.audiofile.addEventListener('loadeddata', console.log('song loaded'));
        },
        playing(newState, oldState) {
            // Our fancy notification (2).
            console.log(`Playing: ${newState}`)
            if (newState) {
                // this.audio.play();
                // if (this.audio) {
                //     this.audio.currentTime = 0
                //     if (!this.audio.paused) this.audio.pause()
                // }

                // this.audio = new Audio(this.song.song.file.data.full_url);
                // this.audio.
                this.audio.play();
            } else {
                this.audio.pause();
            }

        },
        seekTime(newTime, oldTime){
            if(newTime != undefined){
                this.audio.currentTime = newTime
                this.$store.state.seekTime = undefined
            }
        }
    },
    methods: {
        update(){
            this.$store.state.currentTime = this.audio.currentTime
            // console.log(this.audio.currentTime)
        },
        togglePlay(){
            this.$store.state.playing = !this.$store.state.playing
        }
    },
    mounted() {
        this.audio = new Audio()
        this.audio.volume = 0.1
        // this.audio = this.$el.querySelectorAll('audio')[0];
        // this.$store.watch(this.$store.getters.getPlayingStatus, n => {
        //     console.log('watched: ', n)
        // })
    }

}
</script>

<style lang="scss" scoped>
#player {
    position: fixed;
    bottom: 0;
    background-color: grey;
    // height: 25px;
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

    >div {
        display: inline-block;
    }
}
</style>
