<template>
  <div class="e-card playing">
    <div class="image"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>

    <div class="infotop">
      <div class="info">最高贷款额度（元）</div>
      <h1>200,000</h1>
      <div class="name">年化利率7.2%起（1万元借1天利息2元起）</div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* From Uiverse.io by MikeAndrewDesigner */
.e-card {
  background: transparent;
  box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
}

.wave {
  position: absolute;
  width: 540px;
  height: 700px;
  opacity: 0.6;
  left: 0;
  top: 0;
  margin-left: -50%;
  margin-top: -70%;
  background: linear-gradient(744deg, #3a1eb4, #42f3db 60%, #00ddeb);
}

.icon {
  width: 3em;
  margin-top: -1em;
  padding-bottom: 1em;
}

.infotop {
  text-align: left;
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  /* color: rgba(255, 255, 255, 0.856); */
  color: darkslategray;
}
.info,
h1 {
  margin-left: 20px;
}
.name {
  font-size: 14px;
  font-weight: 400;
  position: relative;
  text-align: center;
  top: 1em;
  text-transform: lowercase;
}

.wave:nth-child(2),
.wave:nth-child(3) {
  top: 210px;
}

.playing .wave {
  border-radius: 40%;
  animation: wave 3000ms infinite linear;
}

.wave {
  border-radius: 40%;
  animation: wave 55s infinite linear;
}

.playing .wave:nth-child(2) {
  animation-duration: 4000ms;
}

.wave:nth-child(2) {
  animation-duration: 50s;
}

.playing .wave:nth-child(3) {
  animation-duration: 5000ms;
}

.wave:nth-child(3) {
  animation-duration: 45s;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>