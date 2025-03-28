<template>
  <view class="coach-view">
    <!-- 今日课程区域 -->
    <view class="section">
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

        <!-- 课程进度 -->
        <view class="mt-sm">
          <van-progress 
            :percentage="classItem.progress" 
            :show-pivot="false" 
            stroke-width="4px"
          />
          <view class="progress-text flex-between mt-xs">
            <text class="text-sm text-light">剩余课时</text>
            <text class="text-sm text-bold">{{ classItem.remainingLessons }}节课</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 待办事项区域 -->
    <view class="section">
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
    duration: 45,
    progress: 75,
    remainingLessons: 8
  },
  { 
    studentName: '王学员', 
    title: '减脂训练', 
    time: '14:00 - 15:30', 
    status: '待开始',
    duration: 90,
    progress: 42,
    remainingLessons: 12
  }
]);

// 待办事项数据
const todoItems = ref([
  { content: '更新李学员的训练计划', completed: true, time: '09:30' },
  { content: '回复王学员的饮食咨询', completed: false, time: '13:00' },
  { content: '准备明天的团体课程', completed: false, time: '16:00' }
]);
</script>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;

.coach-view {
  padding: 0; // 移除内边距，由外层容器统一控制
}

// 区域基础样式（替代原来的card类）
.section {
  background-color: styles.$primary-color;
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
  background-color: styles.$BC;
  margin-bottom: styles.$spacing-sm;
  
  &:last-child {
    margin-bottom: 0;
  }
}

// 待办事项列表
.todo-list {
  margin-top: styles.$spacing-md;
}

.todo-item {
  padding: styles.$spacing-md;
  border-radius: styles.$border-radius-md;
  background-color: styles.$primary-color;
  margin-bottom: styles.$spacing-sm;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &.completed {
    opacity: 0.7;
  }
}

// 颜色类
.text-primary {
  color: styles.$primary-color;
}

.text-secondary {
  color: styles.$text-color-primary;
}

.text-light {
  color: styles.$text-color-primary;
}

.text-white {
  color: styles.$white;
}

.text-success {
  color: styles.$text-color-primary;
}

.text-error {
  color: styles.$text-color-primary;
}
</style>
