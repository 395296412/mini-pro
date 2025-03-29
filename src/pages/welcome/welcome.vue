<template>
  <view class="welcome-container">
    <view class="logo-container">
      <van-icon name="circle" size="80px" custom-class="logo-icon" />
      <text class="app-title">FitPro</text>
    </view>
    <van-button type="primary" custom-class="start-button" @click="handleStart">开始使用</van-button>
  </view>
</template>

<script setup>
import { onMounted } from 'vue';
import { ROUTES } from '@/constants/routes';

// 处理开始按钮点击事件
const handleStart = () => {
  uni.navigateTo({
    url: ROUTES.MAIN.HOME
  });
};

onMounted(() => {
  console.log('欢迎页面已加载');
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as variables;

.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: variables.$background-color-cream;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
}

.logo-icon {
  margin-bottom: 20px;
}

.app-title {
  font-size: 36px;
  font-weight: bold;
  color: variables.$text-color-primary;
}

.start-button {
  width: 240px !important;
  height: 48px !important;
  border-radius: 24px !important;
  font-size: 16px !important;
  background-color: variables.$primary-color !important;
  border: none !important;
  color: variables.$dark-color !important;
  box-shadow: variables.$shadow-button !important;
}
</style>
