<template>
  <IonPage>
    <ion-header class="ion-no-border">
      <ion-toolbar class="home-toolbar">
        <ion-title>智汇金服</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goTo('my')">
            <ion-icon :icon="personCircleOutline" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <IonContent class="ion-padding home-content">
      <!-- 顶部额度展示组件 -->
      <my-header />

      <!-- 快捷操作区 -->
      <div class="quick-actions">
        <div class="action-item" @click="goTo('takeLoan')">
          <div class="icon-wrapper loan">
            <ion-icon :icon="cashOutline"></ion-icon>
          </div>
          <span>我要借款</span>
        </div>
        <div class="action-item" @click="goTo('repay')">
          <div class="icon-wrapper repay">
            <ion-icon :icon="cardOutline"></ion-icon>
          </div>
          <span>我要还款</span>
        </div>
        <div class="action-item" @click="goTo('AIchat')">
          <div class="icon-wrapper ai">
            <ion-icon :icon="chatbubbleEllipsesOutline"></ion-icon>
          </div>
          <span>智能助手</span>
        </div>
      </div>

      <!-- 用户欢迎信息 -->
      <IonCard class="welcome-banner">
        <IonCardContent>
          <div class="greeting-box">
            <h3>{{ greeting }}</h3>
            <p>您的信用评分：<span class="score">750</span> (优)</p>
          </div>
        </IonCardContent>
      </IonCard>

      <!-- 系统公告 -->
      <div class="section-title">
        <span>系统公告</span>
        <ion-text color="primary" class="more">查看更多</ion-text>
      </div>
      <IonCard class="notice-card">
        <IonCardContent>
          <div class="notice-item">
            <div class="dot"></div>
            <p>【安全提示】请勿向他人透露您的支付密码或验证码。</p>
          </div>
          <div class="notice-item">
            <div class="dot red"></div>
            <p>【维护公告】4月15日凌晨将进行数据库优化升级。</p>
          </div>
        </IonCardContent>
      </IonCard>

      <!-- 底部留白 -->
      <div style="height: 60px"></div>
    </IonContent>

    <MyFooter />
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonIcon,
  IonButtons,
  IonButton,
  IonText,
} from "@ionic/vue";
import { 
  cashOutline, 
  cardOutline, 
  personCircleOutline, 
  chatbubbleEllipsesOutline 
} from 'ionicons/icons';
import MyFooter from "@/components/MyFooter.vue";
import MyHeader from "@/components/MyHeader.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const router = useRouter();

const getGreeting = () => {
  const hour = new Date().getHours();
  const nickname = localStorage.getItem("nickname") || '尊敬的用户';
  if (hour < 12) return `上午好，${nickname}`;
  if (hour < 18) return `下午好，${nickname}`;
  return `晚上好，${nickname}`;
};

const greeting = ref(getGreeting());

const goTo = (route: string) => {
  router.push(`/${route}`);
};

onMounted(() => {
  greeting.value = getGreeting();
});
</script>

<style scoped>
.home-toolbar {
  --background: #fff;
  --color: #333;
  --border-width: 0;
}

.home-content {
  --background: #f8fbff;
}

/* 快捷操作区 */
.quick-actions {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  padding: 0 10px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.icon-wrapper {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.icon-wrapper.loan { background: linear-gradient(135deg, #ff9a44 0%, #ff6b6b 100%); }
.icon-wrapper.repay { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.icon-wrapper.ai { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }

.action-item span {
  font-size: 13px;
  color: #555;
  font-weight: 500;
}

/* 欢迎 Banner */
.welcome-banner {
  margin: 15px 0;
  border-radius: 15px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.greeting-box h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
}

.greeting-box p {
  margin: 8px 0 0;
  font-size: 14px;
  color: #888;
}

.score {
  color: #1d72ff;
  font-weight: bold;
}

/* 公告部分 */
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  margin: 20px 0 10px;
}

.section-title span {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.section-title .more {
  font-size: 13px;
}

.notice-card {
  margin: 0;
  border-radius: 15px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.notice-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.notice-item:last-child {
  margin-bottom: 0;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1d72ff;
  margin-top: 6px;
  flex-shrink: 0;
}

.dot.red { background: #ff4d4f; }

.notice-item p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>
