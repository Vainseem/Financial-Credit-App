<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-icon @click="goBack" name="chevron-back"></ion-icon>
        <ion-title>借款</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">贷款金额（元）</ion-label>
        <ion-input type="number" v-model="form.loanAmount" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">年利率（%）</ion-label>
        <ion-input
          type="number"
          v-model="interestRate"
          @ionChange="countInterestRate"
          disabled
        />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">贷款期限</ion-label>
        <ion-select
          v-model="form.loanTerm"
          placeholder="请选择期限"
          @ionChange="countInterestRate"
        >
          <ion-select-option :value="1">1 年</ion-select-option>
          <ion-select-option :value="3">3 年</ion-select-option>
          <ion-select-option :value="5">5 年</ion-select-option>
          <ion-select-option :value="10">10 年</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-list>
        <ion-item>
          <ion-label>月还款额：</ion-label>
          <ion-text color="primary">
            <p>{{ monthlyPayment.toFixed(2) }} 元</p>
          </ion-text>
        </ion-item>

        <ion-item>
          <ion-label>总还款：</ion-label>
          <ion-text color="primary">
            <p>{{ totalRepayment.toFixed(2) }} 元</p>
          </ion-text>
        </ion-item>

        <ion-item>
          <ion-label>总利息：</ion-label>
          <ion-text color="primary">
            <p>{{ totalInterest.toFixed(2) }} 元</p>
          </ion-text>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-button expand="full" @click="submit">提交申请</ion-button>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  toastController,
  IonInput,
  IonLabel,
  IonList,
  IonItem,
  IonText,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonTitle,
  IonContent,
  IonIcon,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { reactive, ref, watch, computed } from "vue";
//@ts-ignore
import circleContainer from "@/components/user/homepage/circleContainer.vue";
//@ts-ignore
import { submitLoanApplication } from "@/apis/loan.ts";

const router = useRouter();

interface LoanForm {
  loanAmount: number;
  loanTerm: string;
}

const form = reactive<LoanForm>({
  loanAmount: 100000,
  loanTerm: "1",
});

const countInterestRate = () => {
  switch (String(form.loanTerm)) {
    case "1":
      return 1.95;
    case "3":
      return 1.45;
    case "5":
      return 1.35;
    case "10":
      return 1.15;
    default:
      return 1.95;
  }
};

const totalRepayment = computed(() => {
  return monthlyPayment.value * Number(form.loanTerm) * 12;
});

const totalInterest = computed(() => {
  return totalRepayment.value - form.loanAmount;
});

const interestRate = computed(() => {
  return countInterestRate();
});

const monthlyPayment = computed(() => {
  const monthlyInterestRate = interestRate.value / 12 / 100;
  const totalPayments = Number(form.loanTerm) * 12;
  return (
    (form.loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalPayments)) /
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1)
  );
});

const paymentSchedule = computed(() => {
  let balance = form.loanAmount;
  const monthlyInterestRate = interestRate.value / 12 / 100;
  const totalPayments = Number(form.loanTerm) * 12;
  const payment = monthlyPayment.value;
  let schedule = [];

  for (let i = 1; i <= totalPayments; i++) {
    const interest = balance * monthlyInterestRate;
    const principal = payment - interest;
    balance -= principal;
    schedule.push({
      month: i,
      payment: payment.toFixed(2),
      principal: principal.toFixed(2),
      interest: interest.toFixed(2),
      balance: balance.toFixed(2),
    });
  }
  return schedule;
});

const submit = () => {
  submitLoanApplication(
    localStorage.getItem("id"),
    form,
    interestRate.value,
    totalRepayment.value,
    monthlyPayment.value
  ).then(async (res: any) => {
    console.log(res);
    const toast = await toastController.create({
      message: "申请成功",
      duration: 2000,
      position: "top",
    });
    toast.present();
  });
};

const goBack = () => {
  router.push("/user");
};
</script>

<style scoped lang='scss'>
</style>