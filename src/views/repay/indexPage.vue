<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-icon @click="goBack" name="chevron-back"></ion-icon>
        <ion-title>还款</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- 贷款信息 -->
      <ion-card>
        <ion-item>
          <ion-select
            label="贷款信息"
            placeholder="选择贷款订单"
            v-model="loan"
            @ionChange="selectChange"
          >
            <ion-select-option
              v-for="(item, index) in tableData"
              :key="index"
              :value="item"
              >{{ item.LoanId }}号订单</ion-select-option
            >
          </ion-select>
        </ion-item>
        <ion-card-content v-if="loan">
          <ion-item>
            <ion-label>订单号</ion-label>
            <ion-text>{{ loan.LoanId }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>贷款金额</ion-label>
            <ion-text>{{ loan.LoanAmount }} 元</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>期数</ion-label>
            <ion-text>{{ loan.PayMonth }} 年</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>申请时间</ion-label>
            <ion-text>{{ loan.CreatAt }} </ion-text>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <!-- 输入还款金额 -->
      <ion-item>
        <ion-label position="stacked">本次还款金额（元）</ion-label>
        <ion-input
          type="number"
          v-model.number="repayAmount"
          placeholder="请输入还款金额"
        />
      </ion-item>

      <!-- 结果提示 -->
      <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        duration="2000"
        @didDismiss="showToast = false"
        position="top"
      />
    </ion-content>

    <!-- 提交按钮 -->
    <ion-button expand="full" @click="submitRepayment"> 提交还款 </ion-button>
  </ion-page>
</template>

<script setup>
import { getLoanOrder } from "@/apis/loan";
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
  IonItem,
  IonIcon,
  IonLabel,
  IonText,
  IonButton,
  IonToast,
  IonInput,
  IonRow,
  IonCol,
  IonGrid,
  IonSelect,
} from "@ionic/vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const repayAmount = ref(null);
const showToast = ref(false);
const toastMessage = ref("");
const tableData = reactive([]);
const loan = ref("");

const goBack = () => {
  router.push("/user");
};

const selectChange = () => {
  repayAmount.value = (
    (loan.value.LoanAmount / 12 / loan.value.PayMonth) *
    0.03
  ).toFixed(2);
};

function submitRepayment() {
  if (!repayAmount.value || repayAmount.value <= 0) {
    toastMessage.value = "请输入有效的还款金额";
  } else {
    toastMessage.value = `成功还款 ${repayAmount.value} 元`;
    repayAmount.value = null; // 清空输入框
    // TODO: 你可以在这里加真实的接口请求
  }
  showToast.value = true;
}

onMounted(async () => {
  const { data } = await getLoanOrder();
  tableData.push(...data.data);
});
</script>

<style scoped>
ion-item {
  margin-bottom: 12px;
}
</style>
