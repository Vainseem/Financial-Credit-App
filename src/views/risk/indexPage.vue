<template>
  <IonPage>
    <ion-header class="ion-no-border">
      <ion-toolbar class="risk-toolbar">
        <ion-title>信用评估</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding risk-content">
      <!-- 信用分仪表盘装饰 -->
      <div class="score-dashboard">
        <div class="dashboard-inner">
          <div class="score-main">
            <span class="score-val">{{ score }}</span>
            <span class="score-label">信用分</span>
          </div>
          <div class="score-status">{{ scoreLevel }}</div>
          <div class="update-time">评估时间：{{ today }}</div>
        </div>
      </div>

      <!-- 信用评估详情 -->
      <div class="section-title">信用报告</div>
      <IonCard class="detail-card">
        <IonCardContent>
          <div class="factor-item">
            <div class="factor-info">
              <span class="label">实名认证</span>
              <span class="status success">已完成</span>
            </div>
            <div class="progress-bar"><div class="fill" style="width: 100%"></div></div>
          </div>
          <div class="factor-item">
            <div class="factor-info">
              <span class="label">履约能力</span>
              <span class="status success">极好</span>
            </div>
            <div class="progress-bar"><div class="fill" style="width: 90%"></div></div>
          </div>
          <div class="factor-item">
            <div class="factor-info">
              <span class="label">历史还款</span>
              <span class="status">良好</span>
            </div>
            <div class="progress-bar"><div class="fill" style="width: 85%"></div></div>
          </div>
        </IonCardContent>
      </IonCard>

      <!-- 提升建议 -->
      <div class="section-title">提升建议</div>
      <div class="suggest-grid">
        <div class="suggest-item">
          <ion-icon :icon="shieldCheckmarkOutline" color="primary"></ion-icon>
          <p>完善个人资料</p>
        </div>
        <div class="suggest-item">
          <ion-icon :icon="calendarOutline" color="primary"></ion-icon>
          <p>保持按时还款</p>
        </div>
        <div class="suggest-item">
          <ion-icon :icon="walletOutline" color="primary"></ion-icon>
          <p>增加账户活跃</p>
        </div>
      </div>

      <div style="height: 60px"></div>
    </ion-content>
    <MyFooter />
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from "@ionic/vue";
import { shieldCheckmarkOutline, calendarOutline, walletOutline } from 'ionicons/icons';
import MyFooter from "@/components/MyFooter.vue";
import { ref } from 'vue';

const score = ref(780);
const scoreLevel = ref("信用卓越");
const today = new Date().toLocaleDateString();
</script>

<style scoped>
.risk-toolbar {
  --background: #fff;
  --color: #333;
}

.risk-content {
  --background: #f8fbff;
}

.score-dashboard {
  background: linear-gradient(135deg, #1d72ff 0%, #00a2ff 100%);
  padding: 40px 20px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  box-shadow: 0 10px 25px rgba(29, 114, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.score-dashboard::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  right: -50px;
  bottom: -50px;
}

.dashboard-inner {
  text-align: center;
  color: white;
  z-index: 1;
}

.score-main {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.score-val {
  font-size: 64px;
  font-weight: bold;
  line-height: 1;
}

.score-label {
  font-size: 14px;
  opacity: 0.8;
  letter-spacing: 2px;
}

.score-status {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 14px;
  display: inline-block;
  margin-bottom: 10px;
}

.update-time {
  font-size: 12px;
  opacity: 0.7;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 20px 0 12px 5px;
}

.detail-card {
  margin: 0;
  border-radius: 20px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.factor-item {
  margin-bottom: 20px;
}

.factor-item:last-child {
  margin-bottom: 0;
}

.factor-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.factor-info .label {
  color: #666;
}

.factor-info .status {
  font-weight: 500;
}

.factor-info .status.success {
  color: #2dd36f;
}

.progress-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar .fill {
  height: 100%;
  background: #1d72ff;
  border-radius: 3px;
}

.suggest-grid {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.suggest-item {
  flex: 1;
  background: white;
  padding: 15px 10px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.suggest-item ion-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.suggest-item p {
  margin: 0;
  font-size: 12px;
  color: #333;
  font-weight: 500;
}
</style>
