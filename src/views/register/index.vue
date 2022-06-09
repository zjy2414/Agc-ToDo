<template>
    <div>
        <el-form ref="loginForm" class="bg-white" :model="loginForm" :rules="rules">
            <h1 class="text-title">注册新用户</h1>

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
                <el-button type="primary" style="width:100%;min-height: 4vh;" @click="register('loginForm')">
                    完成注册
                </el-button>
            </div>
        </el-form>

        <div class="bg-grey">
            <el-button class="buttom-btn" @click="gotoLogin">返回登录</el-button>
        </div>
    </div>
</template>

<script>
import "../css/login.css";
import { useAgc } from '@/components/useAgc'
const { agc } = useAgc();

// 发送验证码
function sendCode() {
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

async function register(formName) {
    // if (!formEl) return
    await this.$refs[formName].validate((valid, fields) => {
        if (valid) {
            let phoneUser = new agc.auth.PhoneUser('86', this.loginForm.phoneNumber, this.loginForm.pwd, this.loginForm.code);
            agc.auth().createPhoneUser(phoneUser)
                .then(user => {
                    //创建用户成功
                    console.log(user);
                     this.$message({
                        message: "注册成功",
                        type: 'success',
                    })

                    this.$router.push('/home')
                }).catch(error => {
                    //创建用户失败
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

function gotoLogin() {
    this.$router.push({name:'login'});
}

export default {
    name: 'register',
    components: {

    },
    data() {
        return {
            SendBtnText: '发 送',
            SendBtnLoading: false,
            loginForm: {
                phoneNumber: "",
                pwd: "",
                code: ""
            },
            rules: {
                phoneNumber: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    { min: 11, max: 12, message: "长度应该为11位", trigger: "blur" }
                ],
                pwd: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 20, message: "长度为6-20个字符", trigger: "blur" }
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
        register,
        gotoLogin,
    }
}

</script>

<style scoped>

</style>
