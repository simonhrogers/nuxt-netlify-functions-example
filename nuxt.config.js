export default {
  /*
   ** Headers of the page
   */
  head: {
    title: 'nuxt-netlify-functions-example',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Lucid – wearelucid.ch' }
    ],
    script: [
      { src: 'https://js.braintreegateway.com/web/dropin/1.20.4/js/dropin.min.js' },
      { src: 'http://code.jquery.com/jquery-3.2.1.min.js' }
    ],
  },

  /*
   ** CSS
   */
  css: [
    'normalize.css',
    '@/assets/css/main.scss',
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
   ** Plugins
   */
  plugins: [
    { src: '~/plugins/element-ui.js' },
    { src: '~plugins/vueBraintree', ssr: false },
    { src: '~plugins/braintreeWebDropIn', ssr: false },
  ],

  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],

  /*
   ** Modules
   */
  modules: ['@nuxtjs/axios'],

  /*
   ** Axios config
   */
  axios: {
    baseURL: '/'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
