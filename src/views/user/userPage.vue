<template>
  <IonPage>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>首页</ion-title>
      </ion-toolbar>
    </ion-header>
    <IonContent class="ion-padding">
      <my-header />

      <IonCard class="welcome-card">
        <IonCardContent>
          <IonGrid>
            <IonRow class="ion-justify-content-around">
              <IonCol size="5" class="action-box" @click="goTo('takeLoan')">
                <ion-icon name="cash-outline" size="large"></ion-icon>
                <div>我要借款</div>
              </IonCol>
              <IonCol size="5" class="action-box" @click="goTo('repay')">
                <ion-icon name="card-outline" size="large"></ion-icon>
                <div>我要还款</div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>

      <IonCard class="info-card">
        <IonCardHeader>
          <IonCardTitle>今日提示</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>{{ greeting }}</p>
          <p>信用良好，暂无逾期记录。</p>
        </IonCardContent>
      </IonCard>

      <IonCard class="notice-card">
        <IonCardHeader>
          <IonCardTitle>系统公告</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <ul>
            <li>【系统升级】4月15日凌晨1:00将进行服务器维护。</li>
            <li>【温馨提示】请勿透露个人验证码、登录信息。</li>
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
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
  IonToolbar,
  IonHeader,
  IonTitle,
} from "@ionic/vue";
import MyFooter from "@/components/MyFooter.vue";
import MyHeader from "@/components/MyHeader.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const now = new Date();
const hour = now.getHours();
const nickname = localStorage.getItem("nickname");
const greeting =
  hour < 12
    ? "上午好，" + nickname + "，祝您顺利！"
    : hour < 18
    ? "下午好，" + nickname + "，注意休息！"
    : "晚上好，" + nickname + "，放松一下吧！";
const goTo = (route) => {
  router.push(route);
};
</script>

<style scoped>
.welcome-card {
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.action-box {
  text-align: center;
  padding: 1.2rem;
  background: #f4f5f8;
  border-radius: 10px;
  transition: 0.2s;
}
.action-box:hover {
  background-color: #dbeafe;
  cursor: pointer;
}
.info-card,
.notice-card {
  margin-top: 1rem;
  border-radius: 10px;
  background-color: #fefefe;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.notice-card ul {
  padding-left: 1.2rem;
  margin: 0;
}
.notice-card li {
  font-size: 14px;
  margin-bottom: 6px;
}
</style>
