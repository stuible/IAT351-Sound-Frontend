import Vuex from 'vuex'

const playerStore = () => {
  return new Vuex.Store({
    state: () => ({
      song: undefined,
      playing: false,
      currentTime: 0,
    }),
    mutations: {
      play (state) {
        state.playing = true;
      },
      pause (state) {
        state.playing = false;
      },
    },
    getters: {
        getPlayingStatus: state => () => state.playing
      }
  })
}

export default playerStore