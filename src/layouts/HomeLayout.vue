<template>
    <div class="main">
        <div class="container">
            <div class="content">
                <router-view />
            </div>

            <div class="bg-grey">
                <el-button type="warning" class="link-register" style="width:100%;min-height: 5vh;" @click="logout"
                    plain>注销
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { useAgc } from '@/components/useAgc';
const { agc } = useAgc();

async function CheckToken() {
    agc.auth().getCurrentUser().then(user => {
        //用户已登录
        if (!user) {
            console.log(user);
            this.$router.push({ name: "login" });
        }
    });
}

function logout() {
    this.$confirm('确定要注销吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        this.$router.push({ name: 'logout' });
    });
}

export default {
    name: 'HomeLayout',
    components: {

    },
    mounted() {
        
        this.CheckToken();
    },
    methods: {
        logout,
        CheckToken,
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
}

.main {
    width: 100vw;
    text-align: center;
    min-height: 100vh;
    display: grid;
    align-items: center;
    justify-content: center;
    background: rgb(203, 210, 240);
}

.container {
    width: 100%;
    max-width: 900px;
    /* min-height: 60%; */
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.15);
    border-radius: 24px;
    background-color: rgb(245, 246, 252);
    animation: fadenum 3s 1;
}

.content {
    padding: 48px 49px;
}

.bg-grey {
    width: 100%;
    background-color: #f8fafc;
    border: 2px solid #e5e7ec;
    border-top: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 1em;
    text-align: center;
}

@keyframes fadenum {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

h1 {
    /* margin: 24px; */
    font-size: 28px;
    color: #414873;
}

.copy-right {
    font-size: 0.9rem;
    color: #4d5068;
    text-align: center;
    margin-top: 2em;
}

.copy-right p {
    margin: 0;
    color: #4d5068;
}
</style>
