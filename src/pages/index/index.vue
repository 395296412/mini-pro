<template>
  <view class="container">
    <!-- 内容区域 -->
    <scroll-view scroll-y class="content-area">
      <!-- 头部区域 - 使用flex-between确保天气和角色切换按钮在两侧 -->
      <view class="header-content flex justify-between align-center">
        <!-- 天气信息 -->
        <view class="weather-info">
          <text class="text-md text-bold">{{ userStore.currentWeather }}</text>
        </view>
        
        <!-- 角色切换 - 放在右侧 -->
        <van-icon 
          v-if="userStore.hasBothRoles" 
          class="role-switch-icon"
          @click="switchUserType"
          :name="userStore.isCoach ? 'user-o' : 'manager-o'"
          size="24px"
        />
      </view>
      
      <!-- 直接渲染组件，不添加额外包装 -->
      <coach-view v-if="userStore.isCoach" />
      <student-view v-else />
      
      <!-- 底部安全区域，防止内容被底部导航栏遮挡 -->
      <view class="safe-bottom"></view>
    </scroll-view>
    
    <!-- 底部导航栏 -->
    <tab-bar :active="activeTab" @change="handleTabChange" />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import TabBar from '@/components/TabBar.vue';
import CoachView from '@/components/CoachView.vue';
import StudentView from '@/components/StudentView.vue';

// 获取用户状态
const userStore = useUserStore();
const activeTab = ref(0);

// 处理底部导航切换
const handleTabChange = (index) => {
  activeTab.value = index;
  // 这里可以根据索引执行相应的导航逻辑
};

// 切换用户身份类型
const switchUserType = () => {
  userStore.switchUserType();
};

// 页面加载时获取天气信息（这里使用模拟数据）
onMounted(() => {
  // 实际项目中，这里应该调用天气API获取实时天气
  // 模拟获取天气数据
  setTimeout(() => {
    userStore.setWeather('晴 26°C');
  }, 500);
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  background-color: styles.$background-color-cream;
}

.content-area {
  flex: 1;
  height: calc(100vh - 56px); /* 减去底部导航栏的高度 */
  padding: 0 styles.$spacing-md;
}

.header-content {
  padding: styles.$spacing-md;
}

.role-switch-icon {
  color: styles.$dark-color;
  padding: 8px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
}

.weather-info {
  display: flex;
  align-items: center;
}

.safe-bottom {
  height: 56px; /* 与底部导航栏高度保持一致 */
}
</style>
