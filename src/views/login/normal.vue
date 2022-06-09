<template>
    <div>
        <el-form ref="loginForm" class="bg-white" :model="loginForm" :rules="rules">
            <h1 class="text-title">登录待办事项</h1>

            <div class="field-group">
                <label class="label">手机</label>
                <el-form-item prop="phoneNumber" class="input">
                    <el-input v-model="loginForm.phoneNumber" size="large" placeholder="请输入手机号" :autofocus="true" />
                </el-form-item>
            </div>

            <div class="field-group">
                <label class="label">密码</label>
                <el-form-item prop="pwd" class="input">
                    <el-input v-model="loginForm.pwd" size="large" placeholder="请输入密码" show-password />
                </el-form-item>
            </div>

            <div class="button-group">
                <el-button type="primary" style="width:100%;min-height: 4vh;" @click="pwdLogin('loginForm')">
                    登录
                </el-button>
                <br />

                <el-button type="success" style="width:100%;margin-top: 4%;min-height: 4vh;" @click="gotoCodeLogin"
                    plain>
                    验证码登录
                </el-button>
            </div>
        </el-form>

        <div class="bg-grey">
            <el-button class="buttom-btn" @click="gotoRegister"><div>注册</div></el-button>
        </div>
    </div>
</template>

<script>
import "../css/login.css";
import { useAgc } from '@/components/useAgc'
const { agc } = useAgc();

async function pwdLogin(formName) {
    await this.$refs[formName].validate((valid, fields) => {
        if (valid) {
            const credential = agc.auth.PhoneAuthProvider.credentialWithVerifyCode("86", this.loginForm.phoneNumber, this.loginForm.pwd, "");
            console.log(credential);

            agc.auth().signIn(credential)
                .then(user => {
                    console.log(user);
                    this.$message({
                        message: "登录成功",
                        type: 'success',
                    })

                    //跳转至todo
                    this.$router.push({ name: "home" });
                }).catch(error => {
                    console.log(error);
                    this.$message({
                        message: error,
                        type: 'warning',
                    })
                });
        } else {
            console.log('error submit!', fields)
            return
        }
    })
}

function gotoCodeLogin() {
    this.$router.push({ name: 'login' });
}

function gotoRegister() {
    console.log("注册");

    this.$router.push({ name: 'register' });
}

export default {
    name: 'pwdLogin',
    components: {

    },
    data() {
        return {
            SendBtnText: '发 送',
            SendBtnLoading: false,
            loginForm: {
                phoneNumber: "",
                pwd: ""
            },
            rules: {
                phoneNumber: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    { min: 11, max: 12, message: "长度应该为11位", trigger: "blur" }
                ],
                pwd: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 20, message: "长度为6-20个字符", trigger: "blur" }
                ]
            },
        }
    },
    mounted() {
        
    },
    methods: {
        pwdLogin,
        gotoCodeLogin,
        gotoRegister,
    }
}

</script>

<style scoped>

</style>
