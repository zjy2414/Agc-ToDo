<template>
<div></div>
</template>

<script>
function gotoHome() {
    this.$router.push({ name: "home" });
}

export default {
    name: 'Index',
    components: {
    },
    mounted() {
        
        this.gotoHome();
    },
    methods: {
        gotoHome,
    }
}

</script>