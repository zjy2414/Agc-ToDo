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
                <label class="label">验证码</label>
                <el-form-item prop="code" class="input">
                    <el-row>
                        <el-col :span="18">
                            <el-input v-model="loginForm.code" size="large" placeholder="请输入验证码" />
                        </el-col>

                        <el-col :span="2">
                            <el-button type="success" style="margin-left: 15%;" size="large" :loading="SendBtnLoading" @click="sendCode">
                                {{ SendBtnText }}</el-button>
                        </el-col>
                    </el-row>

                </el-form-item>
            </div>

            <div class="button-group">
                <el-button type="primary" style="width:100%;min-height: 4vh;" @click="phoneLogin('loginForm')">
                    登录
                </el-button>
                <br />

                <el-button type="success" style="width:100%;margin-top: 4%;min-height: 4vh;" @click="gotoNormalLogin"
                    plain>
                    密码登录
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
import { useAgc } from '@/components/useAgc';
const { agc } = useAgc();

async function sendCode() {
    if (this.SendBtnText === '发 送') {
        agc.auth().requestPhoneVerifyCode("86",
            this.loginForm.phoneNumber,
            agc.auth.Action.ACTION_REGISTER_LOGIN,
            'zh_CN',//发送验证码的语言
            60)
            .then(ret => {
                //验证码申请成功
                console.log(ret);
                this.$message({
                    message: '验证码已发送，请注意查收',
                    type: 'success',
                })

                this.SendBtnText = '60s'
                this.SendBtnLoading = true;

                // 60秒倒计时
                for (let i = 59; i >= 0; i--) {
                    setTimeout(() => {
                        this.SendBtnText = i + 's'
                    }, (59 - i) * 1000)
                }

                setTimeout(() => {
                    this.SendBtnText = '发 送'
                    this.SendBtnLoading = false;
                }, 60000);
            }).catch(error => {
                //验证码申请失败   
                console.log(error);
                this.$message({
                    message: error,
                    type: 'warning',
                })
            });
    }
}

async function phoneLogin(formName) {

    await this.$refs[formName].validate((valid, fields) => {
        if (valid) {
            const credential = agc.auth.PhoneAuthProvider.credentialWithVerifyCode("86", this.loginForm.phoneNumber, "", this.loginForm.code);
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

function gotoNormalLogin() {
    this.$router.push({ name: "pwdLogin" });
}

function gotoRegister() {
    this.$router.push({ name: "register" });
}

export default {
    name: 'login',
    components: {

    },
    data() {
        return {
            SendBtnText: '发 送',
            SendBtnLoading: false,
            loginForm: {
                phoneNumber: "",
                code: ""
            },
            rules: {
                phoneNumber: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    { min: 11, max: 12, message: "长度应该为11位", trigger: "blur" }
                ],
                code: [
                    { required: true, message: "请输入验证码", trigger: "blur" },
                    { min: 5, max: 6, message: "长度为5个字符", trigger: "blur" }
                ]
            },
        }
    },
    mounted() {
        
    },
    methods: {
        sendCode,
        phoneLogin,
        gotoNormalLogin,
        gotoRegister,
    }
}
</script>

<style scoped>

</style>
