const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
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
  loading: { color: '#ED9A01' },

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
      baseUrl: 'http://soundbackend.stuible.com/',
      apiUrl: 'http://soundbackend.stuible.com/_/',
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
  },

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
  }
}
