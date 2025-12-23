<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/user"></ion-back-button>
        </ion-buttons>
        <ion-title>还款管理</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding repay-content">
      <!-- 借款订单选择 -->
      <div class="order-selector-card">
        <ion-item lines="none" class="selector-item">
          <ion-label position="stacked">选择借款订单</ion-label>
          <ion-select
            v-model="selectedOrder"
            placeholder="请选择需要还款的订单"
            @ionChange="handleOrderChange"
            interface="action-sheet"
          >
            <ion-select-option
              v-for="item in tableData"
              :key="item.LoanId"
              :value="item"
            >
              #{{ item.LoanId }} - {{ item.LoanAmount }}元 ({{
                item.Status === "approved" ? "已通过" : "审核中"
              }})
            </ion-select-option>
          </ion-select>
        </ion-item>
      </div>

      <!-- 订单详情显示 -->
      <transition name="fade">
        <div v-if="selectedOrder" class="detail-container">
          <div class="order-detail-card">
            <div class="detail-header">
              <span class="order-no">订单号: {{ selectedOrder.LoanId }}</span>
              <ion-badge
                :color="
                  selectedOrder.Status === 'approved' ? 'success' : 'warning'
                "
              >
                {{ selectedOrder.Status === "approved" ? "已放款" : "待审核" }}
              </ion-badge>
            </div>

            <div class="amount-summary">
              <div class="amount-box">
                <span class="label">本月应还 (元)</span>
                <h2 class="amount">{{ selectedOrder.MonthPay }}</h2>
              </div>
              <div class="divider-v"></div>
              <div class="amount-box">
                <span class="label">剩余总额 (元)</span>
                <h2 class="amount small">{{ selectedOrder.RestRepay }}</h2>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <span class="label">还款进度</span>
                <span class="value"
                  >{{ selectedOrder.paid_month }} /
                  {{ selectedOrder.PayMonth }} 期</span
                >
              </div>
              <div class="info-item">
                <span class="label">本月状态</span>
                <span
                  class="value"
                  :class="
                    selectedOrder.is_paid_this_month === 'paid'
                      ? 'text-success'
                      : 'text-danger'
                  "
                >
                  {{
                    selectedOrder.is_paid_this_month === "paid"
                      ? "本月已还"
                      : "本月待还"
                  }}
                </span>
              </div>
            </div>

            <div
              class="repay-input-box"
              v-if="selectedOrder.is_paid_this_month !== 'paid'"
            >
              <ion-label position="stacked">确认还款金额</ion-label>
              <div class="input-wrapper">
                <span class="currency">¥</span>
                <ion-input
                  type="number"
                  v-model="repayAmount"
                  placeholder="请输入还款金额"
                ></ion-input>
              </div>
              <p class="tip">建议按照本月应还金额进行还款</p>
            </div>

            <div class="paid-notice" v-else>
              <ion-icon
                :icon="checkmarkCircleOutline"
                color="success"
              ></ion-icon>
              <p>您本月已经完成还款，无需重复操作。</p>
            </div>
          </div>

          <!-- 还款记录 -->
          <div class="section-title">还款记录</div>
          <div class="history-list">
            <div v-if="payRecords.length > 0">
              <div
                v-for="(record, idx) in payRecords"
                :key="idx"
                class="history-item"
              >
                <div class="h-left">
                  <span class="h-month">第 {{ record.CurrentMonth }} 期</span>
                  <span class="h-time">{{ record.PayTime }}</span>
                </div>
                <div class="h-right">
                  <span class="h-amount">-{{ record.Payment }}</span>
                </div>
              </div>
            </div>
            <div v-else class="no-history">
              <p>暂无还款记录</p>
            </div>
          </div>
        </div>
      </transition>

      <!-- 无订单提示 -->
      <div v-if="tableData.length === 0" class="empty-box">
        <img src="@/assets/user-repay.png" alt="no-order" />
        <p>暂无借款记录</p>
        <ion-button fill="clear" @click="router.push('/takeLoan')"
          >去借款</ion-button
        >
      </div>

      <ion-button
        v-if="selectedOrder && selectedOrder.is_paid_this_month !== 'paid'"
        expand="block"
        class="repay-btn"
        @click="submitRepayment"
        shape="round"
      >
        立即还款
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
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonBadge,
  IonInput,
  IonButtons,
  IonBackButton,
  IonIcon,
  toastController,
} from "@ionic/vue";
import { checkmarkCircleOutline } from "ionicons/icons";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getLoanOrder } from "@/apis/loan";
import { payMyLoanOrder, getMyPayRecords } from "@/apis/repay";

const router = useRouter();
const tableData = ref<any[]>([]);
const selectedOrder = ref<any>(null);
const payRecords = ref<any[]>([]);
const repayAmount = ref<number | null>(null);

const handleOrderChange = async () => {
  if (selectedOrder.value) {
    repayAmount.value = selectedOrder.value.MonthPay;
    await fetchPayRecords();
  }
};

const fetchPayRecords = async () => {
  const userId = localStorage.getItem("id");
  if (userId && selectedOrder.value) {
    try {
      const res = await getMyPayRecords(
        Number(userId),
        selectedOrder.value.LoanId
      );
      // 根据示例返回：res.data.pay = [...]
      if (res.data && res.data.pay) {
        payRecords.value = res.data.pay;
      } else {
        payRecords.value = [];
      }
    } catch (e) {
      console.error("Fetch pay records error", e);
    }
  }
};

const showToast = async (message: string, color: string = "primary") => {
  const toast = await toastController.create({
    message,
    duration: 2000,
    position: "top",
    color,
  });
  toast.present();
};

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${mm}:${ss}`;
};

const submitRepayment = async () => {
  const userId = localStorage.getItem("id");
  if (!userId || !selectedOrder.value) return;

  if (!repayAmount.value || repayAmount.value <= 0) {
    return showToast("请输入有效的还款金额", "warning");
  }

  // 构造符合要求的 payload
  const payload = {
    borrower_id: Number(userId),
    loan_id: selectedOrder.value.LoanId,
    current_month: selectedOrder.value.paid_month + 1, // 当前应还期数
    payment: Number(repayAmount.value),
    time: formatDate(new Date()),
  };

  try {
    const res = await payMyLoanOrder(payload);
    if (res.data === "还款成功" || res.status === 200) {
      showToast("还款成功！", "success");
      repayAmount.value = null;
      const orderId = selectedOrder.value.LoanId;
      selectedOrder.value = null;
      await fetchOrders(); // 刷新订单列表
      // 尝试重新选中刷新后的订单以展示记录
      const newOrder = tableData.value.find((o) => o.LoanId === orderId);
      if (newOrder) {
        selectedOrder.value = newOrder;
        await fetchPayRecords();
      }
    } else {
      showToast(res.data || "还款失败，请重试", "danger");
    }
  } catch (e) {
    console.error("Repay error", e);
    showToast("还款异常，请检查网络", "danger");
  }
};

const fetchOrders = async () => {
  const id = localStorage.getItem("id");
  if (id) {
    try {
      const { data } = await getLoanOrder(Number(id));
      if (data) {
        tableData.value = data;
      }
    } catch (e) {
      console.error("Fetch orders error", e);
    }
  }
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.repay-content {
  --background: #f8fbff;
}

.order-selector-card {
  background: white;
  border-radius: 15px;
  padding: 5px 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.selector-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: transparent !important;
}

.order-detail-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.order-no {
  font-size: 14px;
  color: #999;
}

.amount-summary {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.amount-box {
  flex: 1;
  text-align: center;
}

.divider-v {
  width: 1px;
  height: 40px;
  background: #f0f0f0;
}

.amount-box .label {
  font-size: 12px;
  color: #888;
  display: block;
  margin-bottom: 8px;
}

.amount-box .amount {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.amount-box .amount.small {
  font-size: 20px;
  color: #666;
}

.info-grid {
  display: flex;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;
  margin-bottom: 25px;
}

.info-item {
  flex: 1;
  text-align: center;
}

.info-item:first-child {
  border-right: 1px solid #f0f0f0;
}

.info-item .label {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
}

.info-item .value {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.text-success {
  color: #2dd36f;
}
.text-danger {
  color: #eb445a;
}

.repay-input-box .input-wrapper {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #1d72ff;
  margin: 10px 0;
}

.currency {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.repay-input-box ion-input {
  font-size: 28px;
  font-weight: bold;
}

.repay-input-box .tip {
  font-size: 12px;
  color: #1d72ff;
  margin-top: 8px;
}

.paid-notice {
  text-align: center;
  padding: 10px 0;
}

.paid-notice ion-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.paid-notice p {
  font-size: 14px;
  color: #666;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 20px 0 12px 5px;
}

.history-list {
  background: white;
  border-radius: 15px;
  padding: 5px 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f8f8f8;
}

.history-item:last-child {
  border-bottom: none;
}

.h-left {
  display: flex;
  flex-direction: column;
}

.h-month {
  font-size: 15px;
  color: #333;
  font-weight: 500;
  margin-bottom: 4px;
}

.h-time {
  font-size: 12px;
  color: #999;
}

.h-amount {
  font-size: 16px;
  font-weight: 600;
  color: #eb445a;
}

.no-history {
  padding: 30px;
  text-align: center;
  color: #ccc;
}

.empty-box {
  text-align: center;
  padding: 60px 20px;
}

.empty-box img {
  width: 120px;
  opacity: 0.5;
  margin-bottom: 20px;
}

.empty-box p {
  color: #999;
}

.repay-btn {
  height: 50px;
  font-weight: 600;
  --background: #1d72ff;
  box-shadow: 0 6px 18px rgba(29, 114, 255, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
