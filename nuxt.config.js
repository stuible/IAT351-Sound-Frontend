const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Sovnd',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FF3D00' },

  /*
  ** Global CSS
  */
  css: [
    'normalize.css/normalize.css',
    'flexboxgrid/css/flexboxgrid.min.css'
  ],
  /*
  ** Environment Variables
  */
  env: {
    api: {
      baseUrl: 'https://soundbackend.stuible.com/',
      apiUrl: 'https://soundbackend.stuible.com/_/',
      token: 'access_token=gonefisching'
    },
    user: {
      name: 'Brian'
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'nuxt-sass-resources-loader'
    // ['nuxt-sass-resources-loader', '@/assets/scss/base.scss'],
  ],
  sassResources: [
    '@/assets/scss/base.scss'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    credentials: false
  },
  plugins: [
    '~plugins/filters.js',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes: function () {
      //   const {
      //     data
      // } = await app.$axios.get(env.api.apiUrl + 'items/users?fields=*.*.*.*.*.*.*&single=1&filter[name]=' + env.user.name,
      //     JSON.stringify({
      //         // filter: { published: true },
      //         // sort: {_created:-1},
      //         // populate: 1
      //     }), {
      //         headers: {
      //             'Content-Type': 'application/json'
      //         }
      //     })

      // let followerPosts = [];

      // Object.entries(data.data.follows).forEach(([key, val]) => {
      //   Object.entries(val.is_following.reposts).forEach(([key, repost]) => {
      //     let song = {
      //       user: val.is_following,
      //       song: repost.song,
      //       timestamp: repost.timestamp
      //     }
      //     followerPosts.push(song)
      //   });
      // });
      return axios.get(env.api.apiUrl + 'items/users?fields=*.*.*.*.*.*.*&single=1&filter[name]=' + env.user.name,
        JSON.stringify({
          // filter: { published: true },
          // sort: {_created:-1},
          // populate: 1
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          let followerPosts = [];

          Object.entries(res.data.follows).forEach(([key, val]) => {
            Object.entries(val.is_following.reposts).forEach(([key, repost]) => {
              let song = {
                user: val.is_following,
                song: repost.song,
                timestamp: repost.timestamp
              }
              followerPosts.push(song)
            });
          });

          return followerPosts.data.map((page) => {
            let route = '/track/' + page.title
          })
        })
    }
  }
}
