<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="my-toolbar">
        <ion-title>个人中心</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logout">
            <ion-icon :icon="exitOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding my-content">
      <!-- 个人信息头部卡片 -->
      <div class="user-profile-header">
        <div class="avatar-box">
          <img v-if="userInfo.Photo" :src="userInfo.Photo" alt="avatar" />
          <div v-else class="initials-avatar">
            {{ userInitials }}
          </div>
        </div>
        <div class="user-info-text">
          <h2>{{ userInfo.NickName || "未登录" }}</h2>
          <p>账号ID: {{ userId || "---" }}</p>
        </div>
        <ion-button
          fill="clear"
          color="light"
          class="edit-btn"
          @click="toggleEdit"
        >
          <ion-icon :icon="settingsOutline"></ion-icon>
        </ion-button>
      </div>

      <!-- 基本信息列表 -->
      <IonCard class="info-card">
        <IonCardHeader>
          <IonCardTitle>基本信息</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <ion-list lines="full">
            <ion-item>
              <ion-label>真实姓名</ion-label>
              <ion-text slot="end">{{ userInfo.Name || "未完善" }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>手机号码</ion-label>
              <ion-text slot="end">{{ userInfo.Mobile || "未绑定" }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>电子邮箱</ion-label>
              <ion-text slot="end">{{ userInfo.Email || "未绑定" }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>性别</ion-label>
              <ion-text slot="end">{{ userInfo.Gender || "未设置" }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>职业</ion-label>
              <ion-text slot="end">{{ userInfo.Career || "未设置" }}</ion-text>
            </ion-item>
          </ion-list>
        </IonCardContent>
      </IonCard>

      <!-- 贷款记录卡片 -->
      <IonCard class="loan-record-card">
        <IonCardHeader>
          <IonCardTitle>最近贷款记录</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <ion-list v-if="tableData.length > 0">
            <ion-item
              v-for="(loan, index) in tableData.slice(0, 3)"
              :key="index"
            >
              <ion-label>
                <h3>订单号: {{ loan.LoanId }}</h3>
                <p>金额: {{ loan.LoanAmount }} 元</p>
              </ion-label>
              <ion-badge slot="end" color="primary">详情</ion-badge>
            </ion-item>
          </ion-list>
          <div v-else class="no-data">
            <p>暂无贷款记录</p>
          </div>
        </IonCardContent>
      </IonCard>

      <!-- 退出登录 -->
      <div class="logout-wrapper">
        <ion-button
          expand="block"
          color="danger"
          fill="outline"
          @click="logout"
          shape="round"
        >
          退出登录
        </ion-button>
      </div>

      <div style="height: 60px"></div>
    </ion-content>
    <MyFooter />

    <!-- 修改个人信息弹窗 -->
    <ion-modal :is-open="showEditModal" @didDismiss="showEditModal = false">
      <ion-header>
        <ion-toolbar>
          <ion-title>编辑个人资料</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="showEditModal = false">关闭</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-label position="stacked">昵称</ion-label>
            <ion-input
              v-model="editData.NickName"
              placeholder="请输入昵称"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">真实姓名</ion-label>
            <ion-input
              v-model="editData.Name"
              placeholder="请输入真实姓名"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">联系电话</ion-label>
            <ion-input
              v-model="editData.Mobile"
              placeholder="请输入电话"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">职业</ion-label>
            <ion-input
              v-model="editData.Career"
              placeholder="请输入职业"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">联系地址</ion-label>
            <ion-input
              v-model="editData.Address"
              placeholder="请输入地址"
            ></ion-input>
          </ion-item>
        </ion-list>
        <ion-button
          expand="block"
          class="save-btn"
          @click="saveUserInfo"
          shape="round"
        >
          保存修改
        </ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
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
  IonItem,
  IonLabel,
  IonText,
  IonList,
  IonButton,
  IonIcon,
  IonButtons,
  IonBadge,
  IonModal,
  IonInput,
  toastController,
} from "@ionic/vue";
import { exitOutline, settingsOutline } from "ionicons/icons";
import MyFooter from "@/components/MyFooter.vue";
import { useRouter } from "vue-router";
import { reactive, onMounted, ref, computed } from "vue";
import { getLoanOrder } from "@/apis/loan";
import { getUserInfo, updateUserInfo } from "@/apis/user";

const router = useRouter();
const tableData = ref<any[]>([]);
const userInfo = ref<any>({});
const userId = ref(localStorage.getItem("id"));
const showEditModal = ref(false);
const editData = ref<any>({});

const userInitials = computed(() => {
  const name = userInfo.value.NickName || "";
  if (name.length >= 2) {
    return name.substring(0, 2).toUpperCase();
  }
  return name.toUpperCase() || "?";
});

const logout = () => {
  localStorage.clear();
  router.push("/login");
};

const fetchUserInfo = async () => {
  const id = localStorage.getItem("id");
  if (id) {
    try {
      const res = await getUserInfo(Number(id));
      if (res.data) {
        userInfo.value = res.data;
        editData.value = { ...res.data };
        // 同步更新 LocalStorage 中的一些关键信息
        if (res.data.NickName) localStorage.setItem("nickname", res.data.NickName);
      }
    } catch (e) {
      console.error("Fetch user info error", e);
    }
  }
};

const toggleEdit = () => {
  showEditModal.value = true;
};

const saveUserInfo = async () => {
  try {
    const res = await updateUserInfo(editData.value);
    if (res.data.code === 200 || res.status === 200) {
      const toast = await toastController.create({
        message: "个人资料已更新",
        duration: 2000,
        position: "top",
        color: "success",
      });
      toast.present();
      showEditModal.value = false;
      fetchUserInfo();
    }
  } catch (e) {
    console.error("Update user info error", e);
  }
};

onMounted(async () => {
  const id = localStorage.getItem("id");
  if (id) {
    fetchUserInfo();
    try {
      const { data } = await getLoanOrder(Number(id));
      if (data && data.data) {
        tableData.value = data.data;
      }
    } catch (e) {
      console.error("Fetch loan records error", e);
    }
  }
});
</script>

<style scoped>
.my-toolbar {
  --background: #fff;
  --color: #333;
}

.my-content {
  --background: #f8fbff;
}

.user-profile-header {
  background: linear-gradient(135deg, #1d72ff 0%, #00a2ff 100%);
  padding: 40px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  color: white;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(29, 114, 255, 0.2);
}

.avatar-box {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
}

.avatar-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initials-avatar {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
}

.user-info-text h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.user-info-text p {
  margin: 5px 0 0;
  font-size: 13px;
  opacity: 0.8;
}

.edit-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  --color: white;
}

.info-card,
.loan-record-card {
  margin: 0 0 20px;
  border-radius: 15px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

ion-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: transparent !important;
}

ion-label {
  color: #666 !important;
}

ion-text {
  color: #333;
  font-weight: 500;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #999;
}

.logout-wrapper {
  margin-top: 30px;
}

.save-btn {
  margin-top: 20px;
  height: 48px;
  font-weight: 600;
}
</style>
