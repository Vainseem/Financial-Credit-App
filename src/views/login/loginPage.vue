<template>
  <IonPage>
    <div class="background"><span>欢迎使用！</span></div>
    <div class="input-container">
      <input
        v-model="username"
        class="input"
        type="text"
        placeholder="请输入手机号/邮箱"
      />
      <input
        v-model="password"
        class="input"
        type="password"
        placeholder="请输入密码"
      />
      <!-- <input
        v-model="verification"
        class="input"
        type="text"
        placeholder="请输入验证码"
      />
      <div
        class="verification"
        style="
          position: absolute;
          width: 40%;
          top: 120px;
          right: 5%;
          height: 30px;
        "
      >
        <img
          :src="picpath"
          alt="验证码"
          style="width: 100%; height: 100%"
          @click="showVerification()"
        />
      </div>-->
    </div>
    <button class="login-button" @click="login">登陆</button>
    <div class="register">注册</div>
    <div class="forget-password">忘记密码</div>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonInput,
  IonButton,
  IonPage,
  toastController,
  IonToast,
  IonText,
} from "@ionic/vue";
import {
  emailLogin,
  mobileLogin,
  ifHaveToken,
  getVerification,
  userLogin,
} from "@/apis/login";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const username = ref("");
const password = ref("");
const verification = ref("");
const captchaid = ref("");
const picpath = ref("");
const nickname = ref("");

const ifToken = async () => {
  const token = localStorage.getItem("token") || null;
  if (token) {
    const res = await ifHaveToken(token);
    console.log(res);

    if (res.data.msg === "免登录成功") {
      nickname.value = res.data.NickName;
      localStorage.setItem("id", res.data.ID);
      localStorage.setItem("nickname", res.data.NickName);
      router.push("/user");
      const toast = await toastController.create({
        message: "免登录成功",
        duration: 2000,
        position: "top",
      });
      toast.present();
    }
  }
};

const showVerification = async () => {
  const res = await getVerification();
  picpath.value = res.data.picpath;
  captchaid.value = res.data.captchaid;
};

const login = async () => {
  const regex = /@/;
  const regex2 = /#/;
  const { data } = await userLogin(username.value, password.value);
  if (data.code === 200) {
    localStorage.setItem("username", username.value);
    localStorage.setItem("nickname", data.data.nickname);
    localStorage.setItem("token", data.data.token);
    router.push("/user");
    const toast = await toastController.create({
      message: "登录成功",
      duration: 2000,
      position: "top",
    });
    toast.present();
  } else {
    const toast = await toastController.create({
      message: "账号或密码错误",
      duration: 2000,
      position: "top",
    });
    toast.present();
  }

  // try {
  //   let response;
  //   // 输入邮箱时
  //   if (regex.test(username.value)) {
  //     response = await emailLogin(
  //       username.value,
  //       password.value,
  //       captchaid.value,
  //       verification.value
  //     );
  //   }
  //   // 输入管理员账号时
  //   else if (regex2.test(username.value)) {
  //     router.push("/admin");
  //     return;
  //   }
  //   // 输入手机号时
  //   else {
  //     response = await mobileLogin(
  //       username.value,
  //       password.value,
  //       captchaid.value,
  //       verification.value
  //     );
  //   }
  //   nickname.value = response.data.nickname;
  //   localStorage.setItem("nickname", nickname.value);
  //   localStorage.setItem("username", username.value);
  //   localStorage.setItem("id", response.data.id);
  //   localStorage.setItem("token", response.data.token);
  //   router.push("/user");
  //   const toast = await toastController.create({
  //     message: "登录成功",
  //     duration: 2000,
  //     position: "top",
  //   });
  //   toast.present();
  // } catch (err) {
  //   showVerification();
  //   // ElMessage.error(err.response.data.msg);
  // }
};

onMounted(() => {
  showVerification();
  ifToken();
});
</script>

<style scoped>
.background {
  width: 100%;
  height: 200px;
  background-image: url("@/assets/login-background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0 0 15px 15px;
}
.background span {
  font-size: 25px;
  font-weight: 0;
  color: #fff;
  position: absolute;
  top: 60px;
  left: 20px;
}
.input-container {
  position: absolute;
  top: 130px;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  height: 180px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px 0 rgba(29, 178, 255, 0.5);
}
.input {
  position: relative;
  width: 80%;
  height: 30px;
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid #ccc;
  left: 50%;
  transform: translateX(-50%);
}
.input:nth-child(3) {
  width: 40%;
  left: 10%;
  transform: translateX(0);
}
.input:focus {
  outline: none;
}
.login-button {
  position: absolute;
  top: 330px;
  width: 80%;
  height: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(29, 178, 255);
  color: #fff;
  border-radius: 15px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.register {
  position: absolute;
  top: 380px;
  left: 50px;
}
.forget-password {
  position: absolute;
  top: 380px;
  right: 50px;
}
</style>
