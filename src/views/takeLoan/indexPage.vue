<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/user"></ion-back-button>
        </ion-buttons>
        <ion-title>申请贷款</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding loan-content">
      <!-- 顶部装饰 -->
      <div class="loan-banner">
        <div class="banner-text">
          <h2>为您定制专属额度</h2>
          <p>快至5分钟放款 · 纯线上申请</p>
        </div>
        <img
          src="@/assets/user-takeloan.png"
          alt="loan-icon"
          class="banner-img"
        />
      </div>

      <!-- 借款表单 -->
      <div class="form-card">
        <ion-list lines="none">
          <ion-item class="input-item">
            <ion-label position="stacked">借款金额 (元)</ion-label>
            <ion-input
              type="number"
              v-model="form.loanAmount"
              placeholder="请输入借款金额"
              class="amount-input"
            ></ion-input>
            <div class="amount-tip">建议借款范围: 1,000 - 200,000 元</div>
          </ion-item>

          <ion-item class="input-item">
            <ion-label position="stacked">借款期限</ion-label>
            <ion-select
              v-model="form.loanTerm"
              placeholder="选择借款时长"
              interface="action-sheet"
              class="custom-select"
            >
              <ion-select-option :value="12">12 个月 (1年)</ion-select-option>
              <ion-select-option :value="24">24 个月 (2年)</ion-select-option>
              <ion-select-option :value="36">36 个月 (3年)</ion-select-option>
              <ion-select-option :value="60">60 个月 (5年)</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="input-item">
            <ion-label position="stacked">年化利率 (%)</ion-label>
            <ion-input
              type="number"
              v-model="interestRate"
              disabled
              class="readonly-input"
            ></ion-input>
          </ion-item>
        </ion-list>

        <!-- 试算结果 -->
        <div class="calc-results">
          <div class="res-item">
            <span class="label">月供金额</span>
            <span class="value main"
              >{{ monthlyPayment.toFixed(2) }}<small>元</small></span
            >
          </div>
          <div class="res-grid">
            <div class="res-sub-item">
              <span class="label">总利息</span>
              <span class="value">{{ totalInterest.toFixed(2) }} 元</span>
            </div>
            <div class="res-sub-item">
              <span class="label">总还款额</span>
              <span class="value">{{ totalRepayment.toFixed(2) }} 元</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 提醒事项 -->
      <div class="tips-box">
        <h3>温馨提示</h3>
        <ul>
          <li>请确保您的个人信息真实有效，以免影响审核结果。</li>
          <li>借款成功后请按时还款，保持良好信用记录。</li>
          <li>借款利率将根据您的个人综合资质进行动态调整。</li>
        </ul>
      </div>

      <ion-button
        expand="block"
        class="submit-btn"
        @click="submit"
        shape="round"
      >
        立即提交申请
      </ion-button>

      <div style="height: 40px"></div>
    </ion-content>
  </ion-page>
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
  IonSelect,
  IonSelectOption,
  IonButton,
  toastController,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import { submitLoanApplication } from "@/apis/loan";

const router = useRouter();

const form = reactive({
  loanAmount: 50000,
  loanTerm: 12,
});

const interestRate = computed(() => {
  const term = Number(form.loanTerm);
  if (term <= 12) return 5.8;
  if (term <= 36) return 6.5;
  return 7.2;
});

const monthlyPayment = computed(() => {
  const annualRate = interestRate.value / 100;
  const monthlyRate = annualRate / 12;
  const terms = Number(form.loanTerm);
  const amount = Number(form.loanAmount);

  if (monthlyRate === 0) return amount / terms;

  return (
    (amount * monthlyRate * Math.pow(1 + monthlyRate, terms)) /
    (Math.pow(1 + monthlyRate, terms) - 1)
  );
});

const totalRepayment = computed(() => {
  return monthlyPayment.value * Number(form.loanTerm);
});

const totalInterest = computed(() => {
  return totalRepayment.value - Number(form.loanAmount);
});

const submit = async () => {
  const id = localStorage.getItem("id");
  if (!id) {
    const toast = await toastController.create({
      message: "请先登录",
      duration: 2000,
      position: "top",
      color: "warning",
    });
    toast.present();
    router.push("/login");
    return;
  }

  if (form.loanAmount < 1000) {
    const toast = await toastController.create({
      message: "最低借款金额为1,000元",
      duration: 2000,
      position: "top",
      color: "warning",
    });
    toast.present();
    return;
  }

  try {
    // 根据用户提供的函数签名进行调用：(id, form, interestRate, totalRepayAmount, monthPay)
    const res = await submitLoanApplication(
      id,
      form,
      interestRate.value,
      totalRepayment.value,
      monthlyPayment.value
    );
    
    // 返回结果处理
    if (res.data && (res.data.msg === "贷款订单提交成功" || res.status === 200)) {
      const toast = await toastController.create({
        message: res.data.msg || "申请提交成功",
        duration: 2500,
        position: "top",
        color: "success",
      });
      toast.present();
      router.push("/user");
    }
  } catch (e) {
    console.error("Submit application error", e);
    const toast = await toastController.create({
      message: "提交失败，请重试",
      duration: 2000,
      position: "top",
      color: "danger",
    });
    toast.present();
  }
};
</script>

<style scoped>
.loan-content {
  --background: #f8fbff;
}

.loan-banner {
  background: linear-gradient(135deg, #1d72ff 0%, #00a2ff 100%);
  padding: 30px 20px;
  border-radius: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  box-shadow: 0 8px 20px rgba(29, 114, 255, 0.2);
}

.banner-text h2 {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}

.banner-text p {
  font-size: 13px;
  opacity: 0.8;
  margin: 8px 0 0;
}

.banner-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.form-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.input-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: transparent !important;
  margin-bottom: 15px;
}

.amount-input {
  font-size: 24px;
  font-weight: bold;
  --placeholder-font-weight: normal;
  --placeholder-font-size: 16px;
}

.amount-tip {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.custom-select {
  --placeholder-color: #333;
  --placeholder-opacity: 1;
}

.calc-results {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px dashed #eee;
}

.res-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.res-item .label {
  font-size: 13px;
  color: #888;
  margin-bottom: 5px;
}

.res-item .value.main {
  font-size: 32px;
  font-weight: bold;
  color: #1d72ff;
}

.res-item .value.main small {
  font-size: 16px;
  font-weight: normal;
  margin-left: 4px;
}

.res-grid {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.res-sub-item .label {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.res-sub-item .value {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.tips-box {
  margin: 25px 0;
  padding: 15px;
  background: rgba(29, 114, 255, 0.05);
  border-radius: 12px;
}

.tips-box h3 {
  font-size: 15px;
  font-weight: 600;
  color: #1d72ff;
  margin: 0 0 10px;
}

.tips-box ul {
  margin: 0;
  padding-left: 18px;
}

.tips-box li {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
  line-height: 1.4;
}

.submit-btn {
  height: 50px;
  font-weight: 600;
  font-size: 16px;
  --background: #1d72ff;
  box-shadow: 0 6px 18px rgba(29, 114, 255, 0.3);
}
</style>
