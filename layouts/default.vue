<template>
  <div>
    <nav>
        <a class="navbar-item" href="/">
        </a>

        <div class="navbar-burger">
        </div>
    </nav>

    <section class="main-content columns">
      <div>
        <nuxt/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items: [{
                    title: 'Home',
                    icon: 'home',
                    to: {
                        name: 'index'
                    }
                },
                {
                    title: 'Song',
                    icon: 'lightbulb',
                    to: {
                        name: 'song'
                    }
                }
            ]
        }
    }
}
</script>
