<template>
<nav>
    <div class="container">
        <div class="logo">SOUND</div>
        <input type="text" name="search">
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
        border-bottom: 6px solid orange;
        width: 100%;
        position: absolute;
        right: 0;
        top: calc(50% - 3px);
    }
}

.user {
    float: right;
}
</style>
