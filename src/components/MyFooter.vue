<template>
  <div>
    <IonFooter class="footer-tabs">
      <IonToolbar>
        <IonGrid>
          <IonRow class="ion-justify-content-around ion-align-items-center">
            <IonCol class="footer-tab" @click="goTo('user')">
              <ion-icon name="home-outline"></ion-icon>
              <div>首页</div>
            </IonCol>
            <IonCol class="footer-tab" @click="goTo('risk')">
              <ion-icon name="person-circle-outline"></ion-icon>
              <div>风控</div>
            </IonCol>
            <IonCol class="footer-tab" @click="goTo('my')">
              <ion-icon name="settings-outline"></ion-icon>
              <div>我的</div>
            </IonCol>

            <IonCol class="footer-tab" @click="goTo('AIchat')">
              <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
              <div>AI客服</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  </div>
</template>

<script setup>
import {
  IonFooter,
  IonGrid,
  IonToolbar,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { useRouter } from "vue-router";
const router = useRouter();

const goTo = (page) => {
  // 页面跳转逻辑
  router.push(page);
};
</script>

<style scoped >
.footer-tabs {
  --background: #fff;
  border-top: 1px solid #ccc;
}
.footer-tab {
  text-align: center;
  font-size: 12px;
}
.footer-tab ion-icon {
  font-size: 22px;
}
</style>