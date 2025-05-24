<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>风控评分</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <div class="score-card">
        <h2>信用评分</h2>
        <div class="score-number">{{ score }}</div>
        <div class="score-level">{{ scoreLevel }}</div>
        <p class="score-tip">
          当前评分基于您的历史借款、还款记录与实名认证信息综合计算得出。
        </p>
      </div>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>信用构成</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <ul class="score-detail">
            <li>实名认证：已完成 ✅</li>
            <li>历史借款记录：良好 ✅</li>
            <li>还款按时率：95%</li>
            <li>银行卡绑定：已绑定 ✅</li>
            <li>当前借款逾期：无</li>
          </ul>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>提升建议</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <ul class="score-suggest">
            <li>保持良好还款习惯</li>
            <li>完善个人资料</li>
            <li>持续使用平台功能</li>
          </ul>
        </IonCardContent>
      </IonCard>
    </IonContent>
    <MyFooter />
  </IonPage>
</template>

<script setup>
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
} from "@ionic/vue";
import MyFooter from "@/components/MyFooter.vue";
const score = 780;
const scoreLevel = "信用优秀";
</script>

<style scoped>
.score-card {
  text-align: center;
  background: #f3f4f6;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.score-number {
  font-size: 48px;
  font-weight: bold;
  color: #2c7be5;
  margin: 10px 0;
}
.score-level {
  font-size: 18px;
  color: #4caf50;
}
.score-tip {
  font-size: 14px;
  color: #666;
}
.score-detail,
.score-suggest {
  list-style: none;
  padding: 0;
  font-size: 15px;
}
.score-detail li,
.score-suggest li {
  margin-bottom: 8px;
}
</style>
