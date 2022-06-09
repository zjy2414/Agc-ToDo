<template>
    <div>

    </div>
</template>

<script>
import { useAgc } from '@/components/useAgc'
const { agc } = useAgc();

async function openLoading() {
    const loading = this.$loading({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0)',
    })
    setTimeout(() => {
        loading.close()
    }, 300);
}

async function gotoLogin() {
    agc.auth().getCurrentUser().then(user => {
        //用户已登录的话退出登录
        if (user) {
            agc.auth().signOut();
            console.log("signout");

            this.$message({
                message: "注销成功",
                type: 'success',
            })
        }

        this.$router.push({
            path: "/login",
        })
    });
}

export default {
    name: 'logout',
    components: {

    },
    mounted() {
        
        setTimeout(() => {
            this.gotoLogin();
        }, 300);
        this.openLoading();
    },
    methods: {
        openLoading,
        gotoLogin,
    }
};
</script>

<style scoped>
</style>
