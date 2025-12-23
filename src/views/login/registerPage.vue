<template>
  <IonPage>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/login"></ion-back-button>
        </ion-buttons>
        <ion-title>注 册</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding register-content">
      <div class="register-header">
        <h2>创建新账户</h2>
        <p>加入智汇贷，开启您的专业金融之旅</p>
      </div>

      <div class="segment-wrapper">
        <ion-segment v-model="registerType" mode="ios">
          <ion-segment-button value="mobile">
            <ion-label>手机注册</ion-label>
          </ion-segment-button>
          <ion-segment-button value="email">
            <ion-label>邮箱注册</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>

      <div class="form-container">
        <ion-list lines="full">
          <!-- 手机号/邮箱输入 -->
          <ion-item v-if="registerType === 'mobile'">
            <ion-label position="stacked">手机号码</ion-label>
            <ion-input v-model="mobile" type="tel" placeholder="请输入11位手机号"></ion-input>
          </ion-item>
          <ion-item v-else>
            <ion-label position="stacked">邮箱地址</ion-label>
            <ion-input v-model="email" type="email" placeholder="请输入您的邮箱"></ion-input>
          </ion-item>

          <!-- 昵称 -->
          <ion-item>
            <ion-label position="stacked">用户昵称</ion-label>
            <ion-input v-model="nickname" type="text" placeholder="设置一个好听的名字"></ion-input>
          </ion-item>

          <!-- 密码 -->
          <ion-item>
            <ion-label position="stacked">登录密码</ion-label>
            <ion-input v-model="password" type="password" placeholder="6-16位字母或数字"></ion-input>
          </ion-item>

          <!-- 验证码 -->
          <ion-item>
            <ion-label position="stacked">验证码</ion-label>
            <div class="code-wrapper">
              <ion-input v-model="code" type="text" placeholder="请输入验证码"></ion-input>
              <ion-button 
                fill="clear" 
                :disabled="counting" 
                @click="sendCode"
                class="send-btn"
              >
                {{ counting ? `${count}s后重发` : '获取验证码' }}
              </ion-button>
            </div>
          </ion-item>
        </ion-list>

        <div class="agreement">
          <ion-checkbox v-model="agreed"></ion-checkbox>
          <ion-label>我已阅读并同意<span>《用户服务协议》</span>及<span>《隐私政策》</span></ion-label>
        </div>

        <ion-button 
          expand="block" 
          class="register-btn" 
          @click="handleRegister"
          shape="round"
        >
          立即注册
        </ion-button>

        <div class="footer-links">
          已有账号？<span @click="router.push('/login')">去登录</span>
        </div>
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonCheckbox,
  toastController
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { sendSms, sendEmail, mobileRegister, emailRegister } from '@/apis/login';

const router = useRouter();
const registerType = ref('mobile');
const mobile = ref('');
const email = ref('');
const nickname = ref('');
const password = ref('');
const code = ref('');
const agreed = ref(false);

// 倒计时逻辑
const counting = ref(false);
const count = ref(60);
let timer: any = null;

const startCount = () => {
  counting.value = true;
  timer = setInterval(() => {
    if (count.value > 1) {
      count.value--;
    } else {
      clearInterval(timer);
      counting.value = false;
      count.value = 60;
    }
  }, 1000);
};

const showToast = async (message: string, color: string = 'primary') => {
  const toast = await toastController.create({
    message,
    duration: 2000,
    position: 'top',
    color
  });
  toast.present();
};

const sendCode = async () => {
  try {
    if (registerType.value === 'mobile') {
      if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
        return showToast('请输入正确的手机号', 'warning');
      }
      const res = await sendSms(mobile.value, 1);
      if (res.data.code === 200) {
        showToast('短信验证码已发送', 'success');
        startCount();
      }
    } else {
      if (!/@/.test(email.value)) {
        return showToast('请输入正确的邮箱', 'warning');
      }
      const res = await sendEmail(email.value, 1);
      if (res.data.code === 200) {
        showToast('邮箱验证码已发送', 'success');
        startCount();
      }
    }
  } catch (e) {
    showToast('发送失败，请稍后重试', 'danger');
  }
};

const handleRegister = async () => {
  if (!agreed.value) return showToast('请阅读并同意协议', 'warning');
  if (!nickname.value || !password.value || !code.value) return showToast('请填写完整信息', 'warning');

  try {
    let res;
    if (registerType.value === 'mobile') {
      res = await mobileRegister(mobile.value, nickname.value, password.value, code.value);
    } else {
      res = await emailRegister(email.value, nickname.value, password.value, code.value);
    }

    if (res.data.code === 200) {
      showToast('注册成功，请登录', 'success');
      router.push('/login');
    } else {
      showToast(res.data.message || '注册失败', 'danger');
    }
  } catch (e) {
    showToast('注册异常，请检查网络', 'danger');
  }
};
</script>

<style scoped>
.register-content {
  --background: #fff;
}

.register-header {
  margin: 20px 0 30px;
  padding: 0 10px;
}

.register-header h2 {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.register-header p {
  color: #888;
  font-size: 14px;
}

.segment-wrapper {
  margin-bottom: 20px;
}

.code-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.send-btn {
  font-size: 13px;
  --color: #1d72ff;
  font-weight: 500;
  flex-shrink: 0;
}

.agreement {
  display: flex;
  align-items: center;
  margin: 20px 0;
  font-size: 12px;
  color: #666;
}

.agreement ion-checkbox {
  --size: 18px;
  margin-right: 10px;
}

.agreement span {
  color: #1d72ff;
}

.register-btn {
  height: 48px;
  margin-top: 10px;
  font-weight: 600;
  --background: #1d72ff;
  box-shadow: 0 4px 12px rgba(29, 114, 255, 0.2);
}

.footer-links {
  text-align: center;
  margin-top: 30px;
  color: #999;
  font-size: 14px;
}

.footer-links span {
  color: #1d72ff;
  font-weight: 500;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 10px;
}

ion-label {
  font-weight: 500 !important;
  color: #666 !important;
}
</style>

