<template>
<nav>
    <div class="container">
        <div class="logo">&nbsp; SOUND &nbsp;</div>
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
nav {
    background: #fff;
    height: 50px;
}

.logo {
    font-size: 2em;
    color: black;
    text-decoration: line-through orange;
    display: inline-block;
}
.user {
    float: right;
}
</style>
