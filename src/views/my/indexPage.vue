<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>个人中心</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- 个人信息 -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>账户信息</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label>账号</ion-label>
            <ion-text>{{ user.username }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>昵称</ion-label>
            <ion-text>{{ user.nickname }}</ion-text>
          </ion-item>
        </ion-card-content>
        <ion-button
          style="
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            margin: 5px;
          "
          color="danger"
          @click="logout"
          >退出登录</ion-button
        >
      </ion-card>

      <!-- 贷款记录 -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>贷款记录</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item v-for="(loan, index) in tableData" :key="index">
              <ion-label>
                <h2>订单号：{{ loan.LoanId }}</h2>
                <p>金额：{{ loan.LoanAmount }} 元</p>
                <p>期限：{{ loan.PayMonth }} 年</p>
                <p>申请时间：{{ loan.CreatAt }}</p>
                <ion-button
                  style="position: absolute; right: 0; top: 0"
                  color="primary"
                  @click="goToDetail(loan.LoanId)"
                  >查看详情</ion-button
                >
              </ion-label>
            </ion-item>
            <ion-item v-if="tableData.length === 0">
              <ion-label>暂无贷款记录</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <MyFooter />
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonText,
  IonList,
  IonButton,
  IonToast,
  IonInput,
} from "@ionic/vue";
//@ts-ignore
import MyFooter from "@/components/MyFooter.vue";
import { useRouter } from "vue-router";

import { reactive, onMounted, ref } from "vue";
//@ts-ignore
import { getLoanOrder } from "@/apis/loan.ts";
const router = useRouter();
const tableData: Array<any> = reactive([]);
const user = ref({
  username: localStorage.getItem("username"),
  nickname: localStorage.getItem("nickname"),
});

const logout = () => {
  localStorage.clear();
  router.push("/login");
};

function goToDetail(item: any) {
  // 示例：路由跳转
  router.push(`/detail?id=${item.id}`);
}

onMounted(async () => {
  // const res = await getLoanOrder({ id });
  const { data } = await getLoanOrder();
  tableData.push(...data.data);
});
</script>

<style scoped>
ion-card {
  margin-bottom: 20px;
}

ion-label h2 {
  font-size: 16px;
  margin-bottom: 4px;
}
</style>