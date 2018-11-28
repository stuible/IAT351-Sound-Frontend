import Vuex from 'vuex'

const playerStore = () => {
  return new Vuex.Store({
    state: () => ({
      song: undefined,
      playing: false,
      currentTime: 0,
      seekTime: undefined
    }),
    mutations: {
      play (state) {
        state.playing = true;
      },
      pause (state) {
        state.playing = false;
      },
      seek(state, n) {

        console.log(state.song.song.length)
        console.log(n)

        var hoursMinutes = state.song.song.length.split(/[.:]/);
        // console.log('hoursminutes: ' + hoursMinutes)
        var hours = parseInt(hoursMinutes[0], 10);
        // console.log('hours: ' + hours)
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        // console.log('minutes: ' + minutes)
        var seconds = hoursMinutes[1] ? parseInt(hoursMinutes[2], 10) : 0;
        // console.log('seconds: ' + seconds)
        var seektime =  (minutes * 60) + seconds

        
        state.seekTime = parseInt(seektime * n);
      }
    },
    getters: {
        getPlayingStatus: state => () => state.playing
      },
  })
}

export default playerStore