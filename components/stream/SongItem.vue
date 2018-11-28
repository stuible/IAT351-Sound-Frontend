<template>
<div class="player">
    <nuxt-link :to="'/track/' + song.song.title" class="title">{{ song.user.name }} [REPOSTED] {{ song.song.title }} [BY] {{ song.song.artist.name }}</nuxt-link>
    <p>REPOST TIMESTAMP: {{song.timestamp}}</p>
    <div class="player-controls">
        <!-- <div>
            <a v-on:click.prevent="stop" title="Stop" href="#">		<svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">

<path fill="currentColor" d="M16,4.995v9.808C16,15.464,15.464,16,14.804,16H4.997C4.446,16,4,15.554,4,15.003V5.196C4,4.536,4.536,4,5.196,4h9.808C15.554,4,16,4.446,16,4.995z"/>		</svg>		</a>
        </div> -->
        <div>
            <a v-on:click.prevent="playing = !playing" title="Play/Pause" href="#">		<svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">		<path v-if="!playing" fill="currentColor" d="M15,10.001c0,0.299-0.305,0.514-0.305,0.514l-8.561,5.303C5.51,16.227,5,15.924,5,15.149V4.852c0-0.777,0.51-1.078,1.135-0.67l8.561,5.305C14.695,9.487,15,9.702,15,10.001z"/>		<path v-else fill="currentColor" d="M15,3h-2c-0.553,0-1,0.048-1,0.6v12.8c0,0.552,0.447,0.6,1,0.6h2c0.553,0,1-0.048,1-0.6V3.6C16,3.048,15.553,3,15,3z M7,3H5C4.447,3,4,3.048,4,3.6v12.8C4,16.952,4.447,17,5,17h2c0.553,0,1-0.048,1-0.6V3.6C8,3.048,7.553,3,7,3z"/>		</svg>		</a>
        </div>
        <div class="progress-container">
            <div v-on:click="seek" class="player-progress" title="Time played : Total time">
                <div :style="{ width: this.percentComplete + '%' }" class="player-seeker"></div>
                <div :style="{ width: likePosition(like.song_timestamp) + '%' }" class="player-time-like" v-for="like in song.song.likes" :key="like.id">&nbsp;</div>
            </div>
            <div class="player-time">
                <div class="player-time-current">{{ currentTime }}</div>
                <div class="player-time-total">{{ durationTime }}</div>

            </div>
        </div>
        <div>
            <a href="#" v-on:click.prevent="like" class="likes" v-bind:class="{ active: this.liked }">
                <div class="likeCount">{{likeCount}}</div>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492.719 492.719" style="enable-background:new 0 0 492.719 492.719;" xml:space="preserve"> <g> <g id="Icons_18_"> <path d="M492.719,166.008c0-73.486-59.573-133.056-133.059-133.056c-47.985,0-89.891,25.484-113.302,63.569		c-23.408-38.085-65.332-63.569-113.316-63.569C59.556,32.952,0,92.522,0,166.008c0,40.009,17.729,75.803,45.671,100.178		l188.545,188.553c3.22,3.22,7.587,5.029,12.142,5.029c4.555,0,8.922-1.809,12.142-5.029l188.545-188.553		C474.988,241.811,492.719,206.017,492.719,166.008z"/></g></g></svg></a>
        </div>
        <!-- <div>
            <a v-on:click.prevent="download" href="#">		<svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">		<path fill="currentColor" d="M15,7h-3V1H8v6H5l5,5L15,7z M19.338,13.532c-0.21-0.224-1.611-1.723-2.011-2.114C17.062,11.159,16.683,11,16.285,11h-1.757l3.064,2.994h-3.544c-0.102,0-0.194,0.052-0.24,0.133L12.992,16H7.008l-0.816-1.873c-0.046-0.081-0.139-0.133-0.24-0.133H2.408L5.471,11H3.715c-0.397,0-0.776,0.159-1.042,0.418c-0.4,0.392-1.801,1.891-2.011,2.114c-0.489,0.521-0.758,0.936-0.63,1.449l0.561,3.074c0.128,0.514,0.691,0.936,1.252,0.936h16.312c0.561,0,1.124-0.422,1.252-0.936l0.561-3.074C20.096,14.468,19.828,14.053,19.338,13.532z"/>		</svg>		</a>
        </div> -->
        <!-- <div>
            <a v-on:click.prevent="innerLoop = !innerLoop" href="#">		<svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">		<path v-if="!innerLoop" fill="currentColor" d="M1,12V5h3v6h10V8l5,4.5L14,17v-3H3C1.895,14,1,13.104,1,12z"/>		<path v-else fill="currentColor" d="M20,7v7c0,1.103-0.896,2-2,2H2c-1.104,0-2-0.897-2-2V7c0-1.104,0.896-2,2-2h7V3l4,3.5L9,10V8H3v5h14V8h-3V5h4C19.104,5,20,5.896,20,7z"/>		</svg>		</a>
        </div> -->
        <!-- <div>
            <a v-on:click.prevent="mute" title="Mute" href="#">		<svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">		<path v-if="!muted" fill="currentColor" d="M5.312,4.566C4.19,5.685-0.715,12.681,3.523,16.918c4.236,4.238,11.23-0.668,12.354-1.789c1.121-1.119-0.335-4.395-3.252-7.312C9.706,4.898,6.434,3.441,5.312,4.566z M14.576,14.156c-0.332,0.328-2.895-0.457-5.364-2.928C6.745,8.759,5.956,6.195,6.288,5.865c0.328-0.332,2.894,0.457,5.36,2.926C14.119,11.258,14.906,13.824,14.576,14.156zM15.434,5.982l1.904-1.906c0.391-0.391,0.391-1.023,0-1.414c-0.39-0.391-1.023-0.391-1.414,0L14.02,4.568c-0.391,0.391-0.391,1.024,0,1.414C14.41,6.372,15.043,6.372,15.434,5.982z M11.124,3.8c0.483,0.268,1.091,0.095,1.36-0.388l1.087-1.926c0.268-0.483,0.095-1.091-0.388-1.36c-0.482-0.269-1.091-0.095-1.36,0.388L10.736,2.44C10.468,2.924,10.642,3.533,11.124,3.8z M19.872,6.816c-0.267-0.483-0.877-0.657-1.36-0.388l-1.94,1.061c-0.483,0.268-0.657,0.878-0.388,1.36c0.268,0.483,0.877,0.657,1.36,0.388l1.94-1.061C19.967,7.907,20.141,7.299,19.872,6.816z"/>		<path v-else fill="currentColor" d="M14.201,9.194c1.389,1.883,1.818,3.517,1.559,3.777c-0.26,0.258-1.893-0.17-3.778-1.559l-5.526,5.527c4.186,1.838,9.627-2.018,10.605-2.996c0.925-0.922,0.097-3.309-1.856-5.754L14.201,9.194z M8.667,7.941c-1.099-1.658-1.431-3.023-1.194-3.26c0.233-0.234,1.6,0.096,3.257,1.197l1.023-1.025C9.489,3.179,7.358,2.519,6.496,3.384C5.568,4.31,2.048,9.261,3.265,13.341L8.667,7.941z M18.521,1.478c-0.39-0.391-1.023-0.391-1.414,0L1.478,17.108c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.023,0.391,1.414,0l15.629-15.63C18.912,2.501,18.912,1.868,18.521,1.478z"/>		</svg>		</a>
        </div> -->
        <!-- <div>
            <a v-on:click.prevent="" v-on:mouseenter="showVolume = true" title="Volume" href="#">		<svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">		<path fill="currentColor" d="M19,13.805C19,14.462,18.462,15,17.805,15H1.533c-0.88,0-0.982-0.371-0.229-0.822l16.323-9.055C18.382,4.67,19,5.019,19,5.9V13.805z"/>		</svg>		<input v-model.lazy.number="volume" v-show="showVolume" type="range" min="0" max="100"/>		</a>
        </div> -->
    </div>
    <!-- <audio :loop="innerLoop" ref="audiofile" :src="song.song.file.data.full_url" preload="auto" style="display: none;"></audio> -->
</div>
</template>

<script>
// import axios from 'axios'
import {
    playerStore
} from 'vuex'
const convertTimeHHMMSS = (val) => {
    let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);

    return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
};
export default {
    props: {
        song: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
        autoPlay: {
            type: Boolean,
            default: false
        },
        loop: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        likeClicked: function () {
            console.log('clicked')
        }
    },
    data: () => ({
        audio: undefined,
        currentSeconds: 0,
        durationSeconds: 0,
        innerLoop: false,
        loaded: false,
        playing: false,
        previousVolume: 35,
        showVolume: false,
        volume: 30,
        // env: process.env,
        // liked: false,
        likeTimestamp: 0,
        likes: {}
    }),
    computed: {
        likeCount() {
            // console.log(this.song.song.likes)
            let count = 0;
            for (var like in this.song.song.likes) {
                count = count + 1;
            }
            return count
        },
        currentTime() {
            return convertTimeHHMMSS(this.currentSeconds);
        },
        durationTime() {
            return convertTimeHHMMSS(this.durationSeconds);
        },
        percentComplete() {
            return parseInt(this.currentSeconds / this.durationSeconds * 100);
        },
        // playing() {
        //     if (this.$store.state.song) {
        //         return this.$store.state.song.song.id == this.song.song.id
        //     }
        //     else {
        //         return false
        //     }

        // },
        playingSong(){
            return this.$store.state.song;
        },
        // likePosition() {
        // 	// console.log(this.likes.song_timestamp)
        // 	return this.likes;
        // },

        // getLikeTimestamp(){
        // 	if(this.likes.length >= 1)return this.likes[0].song_timestamp
        // 	else  return false
        // },
        liked() {

            // for (var like in this.song.song.likes) {
            //     // if (this.song.song.likes.hasOwnProperty('user')) {
            //        console.log(like)
            //     // }
            // }
            // if(this.likes.user)
            const values = Object.values(this.song.song.likes)
            for (const value of values) {
                console.log(value.user.name)
                if (value.user.name == this.user.name) return true
            }
            return false;
        },
        likedID() {
            if (this.liked) {
                const values = Object.values(this.song.song.likes)
                for (const value of values) {
                    console.log(value.user.name)
                    if (value.user.name == this.user.name) {
                        return value.id
                    }
                }
            }
            return false;
        },
        muted() {
            return this.volume / 100 === 0;
        }
    },
    watch: {
        playing(value) {

            if (value) {
                console.log('play')
                this.$store.state.song = this.song;
                this.$store.state.playing = value;
                // this.$store.commit('play')
                return "";
            }
            console.log('pause')
            this.$store.state.playing = value;
            // this.$store.commit('pause')
            return ""
        },
        volume(value) {
            this.showVolume = false;
            this.audio.volume = this.volume / 100;
        },
        playingSong(value){
            if(value == this.song) this.playing = true
            else this.playing = false
        }
    },
    methods: {

        download() {
            this.stop();
            window.open(this.file, 'download');
        },
        // load() {
        //     if (this.audio.readyState >= 2) {
        //         this.loaded = true;
        //         this.durationSeconds = parseInt(this.audio.duration);
        //         this.likes = this.song.song.likes;
        //         // console.log(this.song.song.likes[0].song_timestamp)
        //         // this.likeTimestamp = this.likes[0].song_timestamp;

        //         return this.playing = this.autoPlay;
        //     }

        //     throw new Error('Failed to load sound file.');
        // },
        mute() {
            if (this.muted) {
                return this.volume = this.previousVolume;
            }

            this.previousVolume = this.volume;
            this.volume = 0;
        },
        seek(e) {
            if (e.target.tagName === 'SPAN') {
                return;
            }

            const el = e.target.getBoundingClientRect();
            const seekPos = (e.clientX - el.left) / el.width;

            this.audio.currentTime = parseInt(this.audio.duration * seekPos);
        },
        stop() {
            this.playing = false;
            this.audio.currentTime = 0;
        },
        update(e) {
            this.currentSeconds = parseInt(this.audio.currentTime);
        },
        like() {
            // console.log('liked:')

            this.updateLike();

            // Object.assign(this.song.song.likes, {
            // 	user: this.user, 
            // 	song: this.song.song,
            // 	song_timestamp: timeString
            // 	});

        },
        async updateLike() {

            if (!this.liked) {
                var date = new Date(null);
                date.setSeconds(this.audio.currentTime); // specify value for SECONDS here
                var timeString = date.toISOString().substr(11, 8);

                const addLikeReq = await this.$axios.post(process.env.api.apiUrl + 'items/likes?access_token=gonefisching', {
                    'user': this.user.id,
                    'song': this.song.song.id,
                    'song_timestamp': timeString
                }, {
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',

                    },
                })

                this.$emit('likedTrack', {
                    id: this.song.song.id,
                    liked: true
                })
            } else {
                const addLikeReq = await this.$axios.delete(process.env.api.apiUrl + 'items/likes/' + this.likedID + '?access_token=gonefisching', {

                }, {
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',

                    },
                })

                this.$emit('likedTrack', {
                    id: this.song.song.id,
                    liked: false
                })
            }

        },
        timeStringToFloat(time) {
            var hoursMinutes = time.split(/[.:]/);
            // console.log('hoursminutes: ' + hoursMinutes)
            var hours = parseInt(hoursMinutes[0], 10);
            // console.log('hours: ' + hours)
            var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
            // console.log('minutes: ' + minutes)
            var seconds = hoursMinutes[1] ? parseInt(hoursMinutes[2], 10) : 0;
            // console.log('seconds: ' + seconds)
            return (minutes * 60) + seconds
        },
        likePosition(liketimestamp) {
            if (this.likes.length >= 1) {
                // console.log('Timestamp: ' + this.likes[0].song_timestamp)
                // console.log('Timestamp to float: ' + this.timeStringToFloat(this.likes[0].song_timestamp))
                // console.log('duration in seconds: ' + this.durationSeconds)
                // console.log((this.timeStringToFloat(this.likes[0].song_timestamp) / this.durationSeconds) * 100)
            }
            if (this.likes.length >= 1) return (this.timeStringToFloat(liketimestamp) / this.durationSeconds) * 100
            else return '0'
        },
    },
    created() {
        this.innerLoop = this.loop;
    },
    mounted() {
        this.durationSeconds = this.timeStringToFloat(this.song.song.length)
        // this.audio = this.$el.querySelectorAll('audio')[0];
        // this.audio.addEventListener('timeupdate', this.update);
        // this.audio.addEventListener('loadeddata', this.load);
        // this.audio.addEventListener('pause', () => {
        //     this.playing = false;
        // });
        // this.audio.addEventListener('play', () => {
        //     this.playing = true;
        //     this.$store.state.song = this.song;
        //     console.log(this.$store.state.song)
        // });
    }
}
</script>

<style lang="scss" scoped>
$player-bg: #fff;
$player-border-color: darken($player-bg, 12%);
$player-link-color: darken($player-bg, 75%);
$player-progress-color: $player-border-color;
$player-seeker-color: $player-link-color;
$player-text-color: $player-link-color;

.player {
    background-color: $player-bg;
    border: 1px solid $player-border-color;
    border-radius: 5px;
    // box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
    color: $player-text-color;
    // display: inline-block;
    margin-bottom: 1em;
    padding-top: 0.5em;
    line-height: 1.5625;

    .title {
        padding-left: 1em;
        text-decoration: none;
        color: black;
    }
}

.progress-container {
    display: flex;
    flex: 1;
}

.player-controls {
    display: flex;
    border-top: 1px solid $player-border-color;
    margin-top: 1em;

    >div {
        border-right: 1px solid $player-border-color;

        &:last-child {
            border-right: none;
        }

        a {
            color: $player-link-color;
            display: block;
            line-height: 0;
            padding: 1em;
            text-decoration: none;
        }
    }

    .active {
        background-color: $orangeColour;
    }

    .likes {

        // display: block;
        .likeCount {
            display: inline-block;
            padding-top: 5px;
        }

        svg {
            display: inline-block;
            margin-left: 15px;

        }
    }
}

.player-progress {
    background-color: $player-progress-color;
    cursor: pointer;
    height: 50%;
    width: 100%;
    // min-width: 200px;
    // display: flex;
    // flex: 1;
    position: relative;

    .player-seeker {
        background-color: $player-seeker-color;
        bottom: 0;
        left: 0;
        position: absolute;
        top: 0;
    }

    .player-time-like {
        opacity: 0.5;
        padding-right: 5px;
        position: absolute;
        left: 0;
        border-right: solid orange 2px;
    }
}

.player-time {
    display: flex;
    justify-content: space-between;

    .player-time-current {
        font-weight: 700;
        padding-left: 5px;
    }

    .player-time-total {
        opacity: 0.5;
        padding-right: 5px;
    }

}
</style>
