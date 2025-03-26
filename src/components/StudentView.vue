<template>
  <view class="student-view">
    <!-- 当前训练状态区域 -->
    <view class="training-status p-lg">
      <view class="section-title mb-md">
        <text class="text-lg text-bold">当前训练状态</text>
      </view>
      
      <view class="status-card bg-white p-md rounded-lg shadow-sm mb-md">
        <view class="training-plan mb-md">
          <text class="text-md text-bold">训练强化计划 第4周</text>
        </view>
        
        <view class="progress-section mb-md">
          <view class="progress-label flex-between mb-xs">
            <text class="text-sm">完成训练进度</text>
            <text class="text-sm">2/3节</text>
          </view>
          <view class="progress-bar">
            <view class="progress-bg">
              <view class="progress-fill" style="width: 66%"></view>
            </view>
          </view>
        </view>
        
        <view class="stats-grid">
          <view class="stat-item">
            <text class="stat-label text-sm text-light">体重变化</text>
            <text class="stat-value text-md text-success">+3.2kg</text>
          </view>
          <view class="stat-item">
            <text class="stat-label text-sm text-light">体脂率</text>
            <text class="stat-value text-md text-primary">-1.8%</text>
          </view>
          <view class="stat-item">
            <text class="stat-label text-sm text-light">肌肉量</text>
            <text class="stat-value text-md text-success">+0.8kg</text>
          </view>
        </view>
      </view>
      
      <!-- 今日训练区域 -->
      <view class="today-training bg-primary rounded-lg p-md mt-lg">
        <view class="training-time flex-between mb-sm">
          <text class="text-md text-white text-bold">今日训练</text>
          <text class="text-md text-white text-bold">14:00开始</text>
        </view>
        <view class="training-title mb-sm">
          <text class="text-lg text-white text-bold">核心强化训练</text>
        </view>
        <view class="training-info mb-md">
          <text class="text-sm text-white">60分钟 · 健身房A区</text>
        </view>
        <view class="action-button bg-white rounded-lg p-sm flex-center">
          <text class="text-primary text-md">查看训练详情</text>
        </view>
      </view>
    </view>
    
    <!-- 快捷功能区域 -->
    <view class="quick-actions p-lg mt-lg">
      <view class="action-grid">
        <view class="action-item flex-column-center" v-for="(item, index) in quickActions" :key="index">
          <view class="action-icon-wrapper flex-center" :class="`bg-${item.color}`">
            <van-icon :name="item.icon" size="24px" color="#fff" />
          </view>
          <text class="action-text mt-xs text-sm">{{ item.title }}</text>
        </view>
      </view>
    </view>
    
    <!-- 我的教练区域 -->
    <view class="my-coach p-lg mt-lg">
      <view class="section-title mb-md flex-between">
        <text class="text-lg text-bold">我的教练</text>
        <text class="text-sm text-primary">联系</text>
      </view>
      
      <view class="coach-card bg-white p-md rounded-lg shadow-sm flex">
        <view class="coach-avatar bg-primary rounded-circle flex-center mr-md">
          <text class="text-white text-xl">王</text>
        </view>
        <view class="coach-info">
          <view class="coach-name mb-xs">
            <text class="text-md text-bold">王教练</text>
          </view>
          <view class="coach-desc mb-xs">
            <text class="text-sm text-light">专业增肌教练 · 5年经验</text>
          </view>
          <view class="coach-rating flex align-center">
            <van-icon name="star" size="14px" color="#FFD700" class="mr-xs" />
            <text class="text-sm">4.9</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 快捷功能数据
const quickActions = ref([
  { title: '预约课程', icon: 'calendar-o', color: 'blue' },
  { title: '训练计划', icon: 'notes-o', color: 'primary' },
  { title: '数据分析', icon: 'chart-trending-o', color: 'purple' },
  { title: '联系教练', icon: 'chat-o', color: 'orange' }
]);
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as variables;

.student-view {
  padding-bottom: 60px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progress-bg {
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: variables.$primary-color;
  border-radius: 3px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg-primary {
  background-color: variables.$primary-color;
}

.text-primary {
  color: variables.$primary-color;
}

.text-success {
  color: variables.$success-color;
}

.rounded-circle {
  border-radius: 50%;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.action-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  margin-bottom: 8px;
}

.bg-blue {
  background-color: #4080ff;
}

.bg-primary {
  background-color: variables.$primary-color;
}

.bg-purple {
  background-color: #8a2be2;
}

.bg-orange {
  background-color: #ff9500;
}

.coach-avatar {
  width: 60px;
  height: 60px;
}
</style>
