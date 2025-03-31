<template>
  <view class="student-view">

    <!-- 训练计划卡片 -->
    <view class="card mt-md">
      <view class="plan-header">
        <text class="card-title">ti</text>
        <view class="flex align-center">
          <text class="text-md text-bold">{{ trainingPlan.title }}</text>
          <view class="progress-wrapper flex-1">
            <van-progress :percentage="trainingPlan.progress" :show-pivot="false" stroke-width="4px" />
          </view>
        </view>
      </view>
      
      <view class="stats-row">
        <view class="stat-item" v-for="(stat, index) in trainingPlan.stats" :key="index">
          <text class="text-lg text-bold">{{ stat.value }}</text>
          <text class="text-sm text-light">{{ stat.label }}</text>
        </view>
      </view>
    </view>

    <!-- 训练计划 -->
    <view class="card mt-md">
      <view class="flex align-center">
        <image class="coach-avatar" :src="coach.avatar" mode="aspectFill"></image>
        <view class="ml-md">
          <text class="text-md text-bold block">{{ coach.name }}</text>
          <text class="text-sm text-light">{{ coach.description }}</text>
        </view>
        <view class="flex-1"></view>
        <view class="add-button button-scale-animation" @click="navigateToBooking">
          <van-icon name="plus" size="24px" color="var(--primary-color)" />
        </view>
      </view>


    <!-- 课程列表 - 使用Card组件 -->
    <view class="courses-container">
      <transition-group name="card-list" tag="view" class="card-container">
        <card
          v-for="course in courses" 
          :key="course.id"
          :title="course.title"
          :student-name="course.description"
          :start-time="course.timeRange"
          :duration="course.duration || 60"
          :location="course.location || '训练区'"
          :show-status-button="false"
          :show-progress="course.showProgress"
          :style="{ opacity: course.opacity !== undefined ? course.opacity : 1 }"
        />
      </transition-group>
    </view>
    
    <!-- 教练卡片 -->
    <view class="card mt-md">
      <view class="flex align-center">
        <image class="coach-avatar" :src="coach.avatar" mode="aspectFill"></image>
        <view class="ml-md">
          <text class="text-md text-bold block">{{ coach.name }}</text>
          <text class="text-sm text-light">{{ coach.description }}</text>
        </view>
        <view class="flex-1"></view>
        <view class="add-button button-scale-animation" @click="navigateToBooking">
          <van-icon name="plus" size="24px" color="var(--primary-color)" />
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script setup>
import { ref } from 'vue';
import Card from './Card.vue';

// 生成唯一ID的函数
const generateId = (() => {
  let id = 0;
  return () => id++;
})();

// 课程数据
const courses = ref([
  {
    id: generateId(),
    title: '全身燃脂 HIIT',
    timeRange: '15:00 - 16:00',
    description: '3个动作/约25分钟',
    location: '健身区A',
    showProgress: false
  },
  {
    id: generateId(),
    title: '增肌训练',
    timeRange: '10:00 - 11:30',
    description: '5个动作/约90分钟',
    location: '私教区域',
    showProgress: false
  }
]);

// 训练计划数据
const trainingPlan = ref({
  title: '增肌强化 · 第4周',
  progress: 65,
  stats: [
    { label: '完成课程', value: '12节' },
    { label: '体重变化', value: '+3.2kg' },
    { label: '体脂率', value: '-1.8%' }
  ]
});

// 教练信息
const coach = ref({
  name: '王教练',
  description: '私教 · 5年经验',
  avatar: '/static/images/coach.jpg'
});

// 跳转到约课页面
const navigateToBooking = () => {
  uni.navigateTo({
    url: '/pages/booking/index'
  });
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;

.student-view {
  padding: 0 16px; // 添加水平内边距
}

// 卡片基础样式
.card {
  background-color: styles.$background-color-card;
  border-radius: styles.$border-radius-lg;
  padding: styles.$spacing-lg;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: styles.$text-color-primary;
  margin-bottom: styles.$spacing-md;
}

// 卡片标题
.card-title {
  font-size: styles.$font-size-lg;
  font-weight: bold;
  display: block;
  margin-bottom: styles.$spacing-md;
  color: styles.$text-color-primary;
}

// 进度条包装
.progress-wrapper {
  margin: 0 styles.$spacing-md;
}

// 计划头部
.plan-header {
  margin-bottom: styles.$spacing-lg;
}

// 统计数据横向布局
.stats-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  text-align: center;
}

// 教练头像
.coach-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

// 添加按钮
.add-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(var(--primary-color-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
