<template>
<nav>
    <div class="container">
        <div class="items">
            <nuxt-link class="logo" to="/">&nbsp;SOVND&nbsp;</nuxt-link>
            <input type="text" name="search" class="search" placeholder="search...">
            <div class="user">{{user.name}} ∨</div>
        </div>
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

.container {
    height: 100%;
}

nav {
    background: #f1f1f1;
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

.items {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

}

.search {
    margin: 0 auto;
    padding: 0.75em;
    border: 2px $orangeColour solid;
    border-radius: 5px;
    background: none;

    &:focus {
        outline: none;
    }
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
    font-weight: 900;
    text-transform: uppercase;
}
</style>
