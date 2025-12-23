<template>
  <IonPage>
    <ion-content :fullscreen="true" class="login-content">
      <div class="login-header">
        <div class="header-content">
          <h1 class="title">智汇贷</h1>
          <p class="subtitle">安全 · 便捷 · 专业的金融服务平台</p>
        </div>
      </div>

      <div class="login-container">
        <div class="form-card">
          <h2 class="form-title">欢迎登录</h2>

          <ion-list lines="full">
            <ion-item>
              <ion-label position="stacked">账号</ion-label>
              <ion-input
                v-model="username"
                type="text"
                placeholder="请输入手机号或邮箱"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">密码</ion-label>
              <ion-input
                v-model="password"
                type="password"
                placeholder="请输入登录密码"
              ></ion-input>
            </ion-item>

            <ion-item class="captcha-item">
              <ion-label position="stacked">验证码</ion-label>
              <div class="captcha-wrapper">
                <ion-input
                  v-model="verification"
                  type="text"
                  placeholder="请输入验证码"
                ></ion-input>
                <div class="captcha-img-box" @click="showVerification">
                  <img v-if="picpath" :src="picpath" alt="验证码" />
                  <div v-else class="captcha-loading">加载中...</div>
                </div>
              </div>
            </ion-item>
          </ion-list>

          <div class="form-options">
            <span class="register-link" @click="goToRegister">立即注册</span>
            <span class="forget-link">忘记密码？</span>
          </div>

          <ion-button
            expand="block"
            class="login-button"
            @click="login"
            shape="round"
          >
            登 录
          </ion-button>
        </div>

        <div class="social-login">
          <div class="divider">
            <span>其他方式登录</span>
          </div>
          <div class="social-icons">
            <div class="icon-item">
              <img src="@/assets/weixin.jpg" alt="微信" />
              <span>微信</span>
            </div>
            <div class="icon-item">
              <img src="@/assets/qq.png" alt="QQ" />
              <span>QQ</span>
            </div>
            <div class="icon-item">
              <img src="@/assets/github.jpg" alt="GitHub" />
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonInput,
  IonButton,
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  toastController,
} from "@ionic/vue";
import {
  emailLogin,
  mobileLogin,
  ifHaveToken,
  getVerification,
} from "@/apis/login";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

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
    try {
      const res = await ifHaveToken(token);
      // 后端返回 key 为 NickName, ID 等
      if (res.data && res.data.ID) {
        nickname.value = res.data.NickName;
        localStorage.setItem("id", res.data.ID.toString());
        localStorage.setItem("nickname", res.data.NickName);
        router.push("/user");
        const toast = await toastController.create({
          message: "免登录成功",
          duration: 2000,
          position: "top",
          color: "success",
        });
        toast.present();
      }
    } catch (e) {
      console.error("Token verification failed", e);
    }
  }
};

const showVerification = async () => {
  try {
    const res = await getVerification();
    picpath.value = res.data.picpath;
    captchaid.value = res.data.captchaid;
  } catch (e) {
    console.error("Failed to get verification", e);
  }
};

const login = async () => {
  if (!username.value || !password.value) {
    const toast = await toastController.create({
      message: "请输入账号和密码",
      duration: 2000,
      position: "top",
      color: "warning",
    });
    toast.present();
    return;
  }

  if (!verification.value) {
    const toast = await toastController.create({
      message: "请输入验证码",
      duration: 2000,
      position: "top",
      color: "warning",
    });
    toast.present();
    return;
  }

  const regexEmail = /@/;
  const regexAdmin = /^admin/;

  try {
    let response;
    if (regexEmail.test(username.value)) {
      response = await emailLogin(
        username.value,
        password.value,
        captchaid.value,
        verification.value
      );
    } else if (regexAdmin.test(username.value)) {
      router.push("/admin");
      return;
    } else {
      response = await mobileLogin(
        username.value,
        password.value,
        captchaid.value,
        verification.value
      );
    }

    const { data } = response;
    // 登录成功时，后端返回包含 token, nickname, id 等
    if (data && data.token) {
      localStorage.setItem("username", username.value);
      localStorage.setItem("nickname", data.nickname || data.NickName);
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", (data.id || data.ID).toString());

      router.push("/user");
      const toast = await toastController.create({
        message: "登录成功",
        duration: 2000,
        position: "top",
        color: "success",
      });
      toast.present();
    } else {
      const toast = await toastController.create({
        message: data.message || data.msg || "登录失败",
        duration: 2000,
        position: "top",
        color: "danger",
      });
      toast.present();
      showVerification();
    }
  } catch (err) {
    console.error("Login error", err);
    showVerification();
    const toast = await toastController.create({
      message: "网络错误或服务器异常",
      duration: 2000,
      position: "top",
      color: "danger",
    });
    toast.present();
  }
};

const goToRegister = () => {
  router.push("/register");
};

onMounted(() => {
  showVerification();
  ifToken();
});
</script>

<style scoped>
.login-content {
  --background: #f4f7f9;
}
/* ... 保持原有样式 ... */
.login-header {
  height: 25vh;
  background: linear-gradient(135deg, #1d72ff 0%, #00a2ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.header-content {
  text-align: center;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 14px;
  opacity: 0.8;
  margin-top: 8px;
}

.login-container {
  padding: 0 24px;
  margin-top: -40px;
}

.form-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 12px;
}

ion-label {
  font-weight: 500 !important;
  color: #666 !important;
}

.captcha-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  width: 100%;
}

.captcha-img-box {
  width: 120px;
  height: 40px;
  background: #eee;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.captcha-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.captcha-loading {
  font-size: 12px;
  color: #999;
}

.form-options {
  display: flex;
  justify-content: space-between;
  margin: 16px 0 24px;
  font-size: 14px;
}

.register-link {
  color: #1d72ff;
  font-weight: 500;
}

.forget-link {
  color: #999;
}

.login-button {
  --background: #1d72ff;
  --box-shadow: 0 4px 12px rgba(29, 114, 255, 0.3);
  font-weight: 600;
  height: 48px;
  margin-top: 10px;
}

.social-login {
  margin-top: 40px;
  text-align: center;
}

.divider {
  position: relative;
  border-top: 1px solid #ddd;
  margin-bottom: 24px;
}

.divider span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f4f7f9;
  padding: 0 16px;
  color: #999;
  font-size: 12px;
}

.social-icons {
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.icon-item img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
}

.icon-item span {
  font-size: 12px;
  color: #666;
}
</style>
