<template>
  <div>
    <nav-bar/>
    <section class="main-content columns">
      <div>
        <nuxt/>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '~/components/partials/NavBar.vue'

export default {
  components: {
        NavBar
    },
    
}
</script>
