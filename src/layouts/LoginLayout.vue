<template>
    <div class="page">
        <div class="display-logo" items-center>
            <img class="logo"
                src="https://7463-tcb-nkd87viq9wheg653bca0d-a8621b-1304207482.tcb.qcloud.la/SAS/SAS.svg" />
        </div>

        <!-- 登录窗 -->
        <div class="form-wrapper">
            <router-view />
        </div>

        <div class="copy-right">
            <p>Copyright © 2022 东南dnf All Rights Reserved.</p>
            <p>Powered by Huawei App Gallery Connect</p>
        </div>
    </div>
</template>

<script>
import { useAgc } from '@/components/useAgc';
const { agc } = useAgc();

async function CheckToken() {
    
    agc.auth().getCurrentUser().then(user => {
        //用户已登录
        if (user) {
            console.log(user);
            this.$router.push({ name: "home" });
        }

    });
}

export default {
    name: 'LoginLayout',
    components: {

    },
    mounted() {
        
        this.CheckToken();
    },
    methods: {
        CheckToken,
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
}

.page {
    padding-top: 60px;
    text-align: center;
    width: 100%;
    font-size: 16px;

    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    background-color: rgb(242, 245, 247);
    color: #4d5068;
    font-family: 'Open Sans', sans-serif;

    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-position-x: center;
    background-position-y: center;
    background-repeat: no-repeat;
    position: relative;
    background-size: 100%;
}

.display-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -2%;
}

.logo {
    max-height: 7rem;
}


.form-wrapper {
    width: 350px;
    margin: 0 auto;
    margin-top: 2vh;
}

@media screen and (max-width: 640px) {
    .display-logo {
        margin-top: -25%;
    }
}

@media screen and (max-width: 480px) {
    .form-wrapper {
        margin-top: 2vh;
    }
}

.copy-right {
    font-size: 0.9rem;
    color: #4d5068;
    text-align: center;
    margin-top: 2em;
}

.copy-right p {
    margin: 0;
}
</style>
