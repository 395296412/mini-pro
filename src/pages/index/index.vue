<template>
  <view class="container">
    <!-- 头部区域 -->
    <view class="header flex-between p-lg">
      <view class="weather-info">
        <text class="text-lg text-bold text-white">{{ userStore.currentWeather }}</text>
      </view>
      <view class="user-actions flex align-center">
        <view v-if="userStore.hasBothRoles" class="role-switch mr-md" @click="switchUserType">
          <van-icon :name="userStore.isCoach ? 'user-o' : 'manager-o'" size="24px" color="#fff" />
        </view>
        <view class="user-avatar">
          <van-icon name="contact" size="40px" custom-class="avatar-icon" />
        </view>
      </view>
    </view>
    
    <!-- 内容区域 - 根据用户类型显示不同内容 -->
    <view class="content-area">
      <!-- 教练视图 -->
      <coach-view v-if="userStore.isCoach" />
      
      <!-- 学员视图 -->
      <student-view v-else />
    </view>
    
    <!-- 底部导航栏 -->
    <tab-bar :active="activeTab" @change="handleTabChange" />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore, USER_TYPES } from '@/store/user';
import TabBar from '@/components/TabBar.vue';
import CoachView from '@/components/CoachView.vue';
import StudentView from '@/components/StudentView.vue';

// 获取用户状态
const userStore = useUserStore();

// 底部导航栏激活状态
const activeTab = ref(0);

// 处理底部导航切换
const handleTabChange = (index) => {
  activeTab.value = index;
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
    userStore.updateWeather({
      temperature: '23°C',
      condition: '晴',
      city: '北京'
    });
  }, 500);
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as variables;

.container {
  min-height: 100vh;
  background-color: variables.$secondary-color;
}

.header {
  background-color: variables.$primary-color;
  color: variables.$white;
  border-radius: 0 0 20px 20px;
}

.avatar-icon {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 5px;
}

.role-switch {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.content-area {
  padding-bottom: 50px;
}
</style>
