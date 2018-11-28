<template>
  <div>
    <nav-bar/>
    <section class="main-content columns">
      <div>
        <nuxt/>
      </div>
    </section>
    <player/>
  </div>
</template>

<script>
import NavBar from '~/components/partials/NavBar.vue'
import Player from '~/components/partials/Player.vue'

export default {
  components: {
        NavBar,
        Player
    },
    
}
</script>
