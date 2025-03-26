<template>
  <view class="container">
    <!-- 主要内容区域 -->
    <view class="content-area">
      <view class="header flex-between p-lg">
        <view class="welcome-text">
          <text class="text-lg text-bold">你好，健身达人</text>
          <text class="text-sm text-light mt-xs block">今天是健身的好日子</text>
        </view>
        <view class="user-avatar">
          <van-icon name="contact" size="40px" custom-class="avatar-icon" />
        </view>
      </view>
      
      <!-- 快速操作区域 -->
      <view class="quick-actions p-lg">
        <view class="section-title mb-md">
          <text class="text-lg text-bold">快速操作</text>
        </view>
        <view class="action-grid flex-wrap">
          <view class="action-item flex-column-center" v-for="(item, index) in quickActions" :key="index" @click="handleActionClick(item)">
            <view class="action-icon-wrapper flex-center">
              <van-icon :name="item.icon" size="24px" custom-class="action-icon" />
            </view>
            <text class="action-text mt-xs text-sm">{{ item.title }}</text>
          </view>
        </view>
      </view>
      
      <!-- 今日计划区域 -->
      <view class="today-plan p-lg mt-lg">
        <view class="section-title mb-md flex-between">
          <text class="text-lg text-bold">今日计划</text>
          <text class="text-sm text-primary">查看全部</text>
        </view>
        <view class="plan-card bg-white p-md rounded-lg shadow-sm mb-md" v-for="(plan, index) in todayPlans" :key="index">
          <view class="plan-header flex-between mb-sm">
            <text class="text-md text-bold">{{ plan.title }}</text>
            <text class="text-sm" :class="plan.status === '已完成' ? 'text-success' : 'text-warning'">{{ plan.status }}</text>
          </view>
          <view class="plan-time flex align-center">
            <van-icon name="clock-o" size="14px" class="mr-xs" />
            <text class="text-sm text-light">{{ plan.time }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <van-tabbar :active="activeTab" @change="onTabChange" fixed placeholder safe-area-inset-bottom>
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">发现</van-tabbar-item>
      <van-tabbar-item icon="friends-o">社区</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { ROUTES } from '@/constants/routes';

// 底部导航栏激活状态
const activeTab = ref(0);

// 快速操作数据
const quickActions = ref([
  { title: '开始训练', icon: 'fire-o', path: ROUTES.TRAINING.START },
  { title: '健身记录', icon: 'notes-o', path: ROUTES.DATA.RECORDS },
  { title: '身体数据', icon: 'chart-trending-o', path: ROUTES.DATA.BODY_STATS },
  { title: '饮食计划', icon: 'shopping-cart-o', path: ROUTES.DATA.DIET_PLAN }
]);

// 今日计划数据
const todayPlans = ref([
  { title: '晨间有氧训练', time: '07:00 - 07:30', status: '已完成' },
  { title: '力量训练 - 胸部和背部', time: '18:00 - 19:00', status: '待完成' }
]);

// 处理底部导航切换
const onTabChange = (event) => {
  activeTab.value = event.detail;
};

// 处理快速操作点击
const handleActionClick = (item) => {
  uni.navigateTo({
    url: item.path
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $secondary-color;
}

.content-area {
  padding-bottom: 50px;
}

.header {
  background-color: $primary-color;
  color: $white;
  border-radius: 0 0 20px 20px;
}

.avatar-icon {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 5px;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.action-item {
  cursor: pointer;
}

.action-icon-wrapper {
  width: 50px;
  height: 50px;
  background-color: $white;
  border-radius: 12px;
  box-shadow: $shadow-sm;
}

.action-icon {
  color: $primary-color;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.plan-card {
  border-left: 4px solid $primary-color;
}
</style>
