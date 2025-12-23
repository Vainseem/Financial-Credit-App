<template>
  <IonPage>
    <ion-header class="ion-no-border">
      <ion-toolbar class="chat-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/user"></ion-back-button>
        </ion-buttons>
        <ion-title>智能助手</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="chat-content" ref="contentRef">
      <div class="chat-list">
        <div
          v-for="(msg, index) in chatHistory"
          :key="index"
          class="chat-item"
          :class="msg.from"
        >
          <div class="avatar">
            <img
              :src="msg.from === 'bot' ? botAvatar : userAvatar"
              alt="avatar"
            />
          </div>
          <div class="bubble-container">
            <div class="chat-bubble">
              {{ msg.text }}
            </div>
          </div>
        </div>
      </div>

      <!-- 常见问题快捷选择 -->
      <div class="quick-questions" v-if="showSuggestions">
        <p class="suggest-title">您可以这样问我：</p>
        <div class="question-tags">
          <div
            v-for="(q, i) in commonQuestions"
            :key="i"
            class="q-tag"
            @click="selectQuestion(q)"
          >
            {{ q }}
          </div>
        </div>
      </div>
    </ion-content>

    <!-- 输入区 -->
    <div class="chat-input-area">
      <div class="input-wrapper">
        <ion-input
          v-model="userInput"
          placeholder="有什么可以帮您？"
          @keyup.enter="sendMessage"
          class="main-input"
          :clear-input="true"
        ></ion-input>
        <ion-button
          @click="sendMessage"
          fill="clear"
          class="send-btn"
          :disabled="!userInput.trim()"
        >
          <ion-icon slot="icon-only" :icon="sendOutline"></ion-icon>
        </ion-button>
      </div>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonButtons,
  IonBackButton,
  IonIcon,
} from "@ionic/vue";
import { sendOutline } from "ionicons/icons";
import { ref, reactive, nextTick, onMounted } from "vue";

const userInput = ref("");
const chatHistory = ref<any[]>([]);
const contentRef = ref<any>(null);
const showSuggestions = ref(true);

const userAvatar =
  "https://ui-avatars.com/api/?name=User&background=1d72ff&color=ffffff&size=40";
const botAvatar =
  "https://ui-avatars.com/api/?name=AI&background=00a2ff&color=ffffff&size=40";

const commonQuestions = [
  "如何申请贷款？",
  "贷款利率是多少？",
  "最快多久可以放款？",
  "还款逾期了怎么办？",
  "如何提高信用分数？",
];

const mockReplies: Record<string, string> = {
  "如何申请贷款？":
    "申请贷款非常简单。您只需在首页点击“我要借款”按钮，填写金额和期限，提交申请后等待系统审核即可。",
  "贷款利率是多少？":
    "我们的贷款年化利率根据您的信用评分动态调整。目前通常在 5.8% - 7.2% 之间。",
  "最快多久可以放款？": "审核通过后，资金最快可在 5 分钟内拨付至您的绑定账户。",
  "还款逾期了怎么办？":
    "如果您无法按时还款，请尽快通过 App 联系客服说明情况。逾期会产生罚息并影响您的个人征信。",
  "如何提高信用分数？":
    "按时足额还款、完善个人真实信息、以及保持活跃的使用习惯都有助于提高您的信用评分。",
};

const scrollToBottom = async () => {
  await nextTick();
  if (contentRef.value) {
    const el = await contentRef.value.$el.getScrollElement();
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }
};

const selectQuestion = (q: string) => {
  userInput.value = q;
  sendMessage();
};

const sendMessage = async () => {
  const question = userInput.value.trim();
  if (!question) return;

  showSuggestions.value = false;
  chatHistory.value.push({ from: "user", text: question });
  userInput.value = "";

  const aiMsg = reactive({ from: "bot", text: "正在思考..." });
  chatHistory.value.push(aiMsg);

  scrollToBottom();

  // 模拟 AI 回复逻辑
  setTimeout(async () => {
    const fullText =
      mockReplies[question] ||
      "感谢您的提问！关于这个问题，建议您咨询我们的在线人工客服以获取更详细的解答。";

    aiMsg.text = "";
    for (let i = 0; i < fullText.length; i++) {
      await new Promise((r) => setTimeout(r, 20));
      aiMsg.text += fullText[i];
      if (i % 5 === 0) scrollToBottom();
    }
    scrollToBottom();
  }, 500);
};

onMounted(() => {
  chatHistory.value.push({
    from: "bot",
    text: "您好！我是您的智能金融助手，您可以问我关于贷款流程、利息计算或还款相关的问题。",
  });
});
</script>

<style scoped>
.chat-toolbar {
  --background: #fff;
  --color: #333;
}

.chat-content {
  --background: #f4f7f9;
}

.chat-list {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chat-item {
  display: flex;
  gap: 10px;
  max-width: 85%;
}

.chat-item.user {
  flex-direction: row-reverse;
  align-self: flex-end;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
}

.bubble-container {
  display: flex;
  flex-direction: column;
}

.chat-bubble {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.chat-item.bot .chat-bubble {
  background: white;
  color: #333;
  border-top-left-radius: 2px;
}

.chat-item.user .chat-bubble {
  background: #1d72ff;
  color: white;
  border-top-right-radius: 2px;
}

.quick-questions {
  padding: 0 15px 20px;
}

.suggest-title {
  font-size: 13px;
  color: #999;
  margin-bottom: 10px;
  margin-left: 5px;
}

.question-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.q-tag {
  background: white;
  color: #1d72ff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  border: 1px solid rgba(29, 114, 255, 0.2);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.q-tag:active {
  background: #f0f5ff;
}

.chat-input-area {
  padding: 12px 16px 30px;
  background: white;
  border-top: 1px solid #eee;
}

.input-wrapper {
  background: #f4f7f9;
  border-radius: 25px;
  display: flex;
  align-items: center;
  padding-left: 15px;
}

.main-input {
  --background: transparent !important;
  font-size: 15px;
}

.send-btn {
  --color: #1d72ff;
}
</style>
