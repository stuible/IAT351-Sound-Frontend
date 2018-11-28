import Vuex from 'vuex'

const playerStore = () => {
  return new Vuex.Store({
    state: () => ({
      song: undefined,
      playing: false
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