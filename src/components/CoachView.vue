<template>
  <view class="coach-view">
    <!-- 今日课程卡片 -->
    <view class="card">
      <text class="card-title">今日课程</text>
      <view class="flex-between mb-sm">
        <text class="text-sm text-secondary">{{ todayClasses.length }}节课</text>
      </view>
      
      <!-- 课程列表 -->
      <view 
        v-for="(classItem, index) in todayClasses" 
        :key="index"
        class="class-item mb-md"
      >
        <view class="class-header flex-between mb-sm">
          <view class="class-title flex align-center">
            <text class="text-md text-bold">{{ classItem.studentName }} - {{ classItem.title }}</text>
          </view>
          <text class="text-sm" :class="classItem.status === '进行中' ? 'text-primary' : 'text-light'">{{ classItem.status }}</text>
        </view>
        <view class="class-time flex align-center">
          <text class="text-sm text-light">{{ classItem.time }}</text>
        </view>
        <view class="class-duration flex align-center mt-xs">
          <van-icon name="clock-o" size="14px" class="mr-xs" />
          <text class="text-sm text-light">剩余{{ classItem.duration }}分钟</text>
        </view>
      </view>
    </view>
    
    <!-- 学员进度卡片 -->
    <view class="card mt-md">
      <text class="card-title">学员进度</text>
      <view class="flex-between mb-md">
        <text class="text-sm text-secondary">查看全部</text>
      </view>
      
      <!-- 学员进度网格 -->
      <view class="progress-grid">
        <view 
          v-for="(student, index) in studentProgress" 
          :key="index"
          class="progress-item"
        >
          <view class="student-info flex align-center mb-sm">
            <view class="student-avatar flex-center mr-sm" :class="`bg-${student.color}`">
              <text class="text-white">{{ student.name.charAt(0) }}</text>
            </view>
            <text class="text-md">{{ student.name }}</text>
          </view>
          <van-progress 
            :percentage="student.progress" 
            :color="getProgressColor(student.color)" 
            stroke-width="6"
            custom-class="mb-xs"
          />
          <view class="progress-text flex-between">
            <text class="text-sm text-light">目标完成度</text>
            <text class="text-sm text-bold">{{ student.progress }}%</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 待办事项卡片 -->
    <view class="card mt-md">
      <text class="card-title">待办事项</text>
      <view class="todo-list">
        <view class="todo-item flex-between" v-for="(todo, index) in todoItems" :key="index">
          <view class="flex align-center">
            <view class="todo-checkbox mr-sm" :class="{'todo-checked': todo.completed}">
              <van-icon v-if="todo.completed" name="success" size="12px" color="#fff" />
            </view>
            <text class="text-md" :class="{'text-light': todo.completed}">{{ todo.content }}</text>
          </view>
          <text class="text-sm text-light">{{ todo.time }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 今日课程数据
const todayClasses = ref([
  { 
    studentName: '李学员', 
    title: '增肌训练', 
    time: '10:00 - 11:30', 
    status: '进行中',
    duration: 45
  },
  { 
    studentName: '王学员', 
    title: '减脂训练', 
    time: '14:00 - 15:30', 
    status: '待开始',
    duration: 90
  }
]);

// 学员进度数据
const studentProgress = ref([
  { name: '李学员', progress: 75, color: 'blue' },
  { name: '王学员', progress: 42, color: 'purple' },
  { name: '张学员', progress: 90, color: 'green' },
  { name: '赵学员', progress: 30, color: 'pink' }
]);

// 待办事项数据
const todoItems = ref([
  { content: '更新李学员的训练计划', completed: true, time: '09:30' },
  { content: '回复王学员的饮食咨询', completed: false, time: '13:00' },
  { content: '准备明天的团体课程', completed: false, time: '16:00' }
]);

// 获取进度条颜色
const getProgressColor = (color) => {
  const colorMap = {
    blue: '#B388FF', // 紫色
    purple: '#B388FF', // 紫色
    green: '#C5FF4F', // 亮绿色
    pink: '#1A1A1A' // 黑色
  };
  return colorMap[color] || colorMap.blue;
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;

.coach-view {
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

// 课程项样式
.class-item {
  padding: styles.$spacing-md;
  border-radius: styles.$border-radius-md;
  background-color: styles.$white;
  margin-bottom: styles.$spacing-sm;
  
  &:last-child {
    margin-bottom: 0;
  }
}

// 学员进度网格
.progress-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -#{styles.$spacing-xs};
}

.progress-item {
  width: calc(50% - #{styles.$spacing-sm});
  margin: 0 styles.$spacing-xs styles.$spacing-md;
  padding: styles.$spacing-md;
  background-color: styles.$white;
  border-radius: styles.$border-radius-md;
  
  &:nth-last-child(-n+2) {
    margin-bottom: 0;
  }
}

// 学员头像
.student-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: styles.$font-size-sm;
}

// 待办事项列表
.todo-list {
  margin-top: styles.$spacing-md;
}

.todo-item {
  padding: styles.$spacing-md;
  border-radius: styles.$border-radius-md;
  background-color: styles.$white;
  margin-bottom: styles.$spacing-sm;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &.completed {
    opacity: 0.7;
  }
}

// 颜色类
.bg-purple {
  background-color: styles.$secondary-color;
}

.bg-green {
  background-color: styles.$primary-color;
}

.bg-orange {
  background-color: styles.$warning-color;
}

.bg-black {
  background-color: styles.$black;
}

.text-primary {
  color: styles.$primary-color;
}

.text-secondary {
  color: styles.$text-color-secondary;
}

.text-light {
  color: styles.$text-color-light;
}

.text-white {
  color: styles.$white;
}

.text-success {
  color: styles.$success-color;
}

.text-error {
  color: styles.$error-color;
}
</style>
