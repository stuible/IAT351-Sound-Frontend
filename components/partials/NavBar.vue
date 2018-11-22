<template>
<nav>
    <div class="container">
        <nuxt-link class="logo" to="/">&nbsp;SOUND&nbsp;</nuxt-link>
        <input type="text" name="search" class="search">
        <div class="user">{{user.name}}</div>
    </div>
</nav>
</template>

<script>
export default {
    data() {
        return {
            user: process.env.user
        }
    }
}
</script>

<style lang="scss" scoped>
$NavHeight: 75px;
nav {
    background: #fff;
    height: $NavHeight;
    position: sticky;
    width: 100%;
    margin-bottom: 50px;
    top: 0;
    z-index: 2;

    a {
        text-decoration: none;
    }

}

.search {
    margin: 0 auto;
}

.logo {
    font-size: 2.5em;
    color: black;
    // text-decoration: line-through orange;
    position: relative;
    display: inline-block;
    font-weight: 900;

    &:before {
        content: '';
        border-bottom: 8px solid $orangeColour;
        width: 100%;
        position: absolute;
        right: 0;
        top: calc(50% - 4px);
        z-index: -1;
    }
}

.user {
    float: right;
}
</style>
