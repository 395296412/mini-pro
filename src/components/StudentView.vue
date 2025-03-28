<template>
  <view class="student-view">
    <!-- 今日课程卡片 -->
    <view class="card">
      <text class="card-title">今日课程</text>
      <view class="course-content">
        <view>
          <text class="text-xl text-bold block">全身燃脂 HIIT</text>
          <text class="text-md">3个动作/约25分钟</text>
        </view>
        <view class="flex align-center">
          <van-icon name="clock-o" size="14px" class="mr-xs" />
          <text class="text-md">15:00 - 16:00</text>
        </view>
      </view>
    </view>
    
    <!-- 近期进度卡片 -->
    <view class="card mt-md">
      <text class="card-title">近期进度</text>
      <view class="stats-row">
        <view class="stat-item">
          <text class="text-lg text-bold">72.5 kg</text>
          <view class="flex align-center">
            <van-icon name="arrow-down" size="12px" class="mr-xs text-error" />
            <text class="text-sm text-error">-0.5kg</text>
          </view>
          <text class="text-sm text-light">体重</text>
        </view>
        <view class="stat-item">
          <text class="text-lg text-bold">腿部日</text>
          <text class="text-sm text-light">上次训练</text>
        </view>
        <view class="stat-item">
          <text class="text-lg text-bold">3次</text>
          <view class="flex align-center">
            <van-icon name="arrow-up" size="12px" class="mr-xs text-success" />
            <text class="text-sm text-success">+1次</text>
          </view>
          <text class="text-sm text-light">本周活动</text>
        </view>
      </view>
    </view>
    
    <!-- 当前训练计划卡片 -->
    <view class="card mt-md">
      <view class="plan-header">
        <text class="card-title">当前训练计划</text>
        <view class="flex align-center">
          <text class="text-md text-bold">增肌强化 · 第4周</text>
          <view class="progress-wrapper flex-1">
            <van-progress :percentage="65" :show-pivot="false" stroke-width="4px" />
          </view>
        </view>
      </view>
      
      <view class="stats-row">
        <view class="stat-item">
          <text class="text-lg text-bold">12节</text>
          <text class="text-sm text-light">完成课程</text>
        </view>
        <view class="stat-item">
          <text class="text-lg text-bold">+3.2kg</text>
          <text class="text-sm text-light">体重变化</text>
        </view>
        <view class="stat-item">
          <text class="text-lg text-bold">-1.8%</text>
          <text class="text-sm text-light">体脂率</text>
        </view>
      </view>
    </view>
    
    <!-- 我的教练卡片 -->
    <view class="card mt-md">
      <text class="card-title">我的教练</text>
      <view class="flex align-center">
        <image class="coach-avatar" src="/static/images/coach.jpg" mode="aspectFill"></image>
        <view class="ml-md">
          <text class="text-md text-bold block">王教练</text>
          <text class="text-sm text-light">私教 · 5年经验</text>
        </view>
        <view class="flex-1"></view>
        <van-button type="primary" size="small" round>联系</van-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;

.student-view {
  padding: 0; // 移除内边距，由外层容器统一控制
}

// 卡片基础样式
.card {
  background-color: styles.$background-color-card;
  border-radius: styles.$border-radius-lg;
  padding: styles.$spacing-lg;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: styles.$text-color-primary;
  margin-bottom: styles.$spacing-md;
  
  &:last-child {
    margin-bottom: 0;
  }
}

// 卡片标题
.card-title {
  font-size: styles.$font-size-lg;
  font-weight: bold;
  display: block;
  margin-bottom: styles.$spacing-md;
  color: styles.$text-color-primary;
}

// 课程内容布局
.course-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// 进度条包装
.progress-wrapper {
  margin: styles.$spacing-sm 0;
  flex: 1;
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
  margin-bottom: styles.$spacing-md;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  text-align: center;
  
  .text-lg {
    margin-bottom: styles.$spacing-xs;
  }
  
  .flex {
    margin-bottom: styles.$spacing-xs;
  }
}

// 教练头像
.coach-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

// 文本颜色类
.text-success {
  color: styles.$text-color-primary;
}

.text-error {
  color: styles.$text-color-primary;
}
</style>
