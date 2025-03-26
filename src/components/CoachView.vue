<template>
  <view class="coach-view">
    <!-- 今日课程区域 -->
    <view class="today-class p-lg">
      <view class="section-title mb-md flex-between">
        <text class="text-lg text-bold">今日课程</text>
        <text class="text-sm text-primary">{{ todayClasses.length }}节课</text>
      </view>
      
      <view 
        class="class-card bg-white p-md rounded-lg shadow-sm mb-md" 
        v-for="(classItem, index) in todayClasses" 
        :key="index"
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
    
    <!-- 学员进度区域 -->
    <view class="student-progress p-lg mt-lg">
      <view class="section-title mb-md flex-between">
        <text class="text-lg text-bold">学员进度</text>
        <text class="text-sm text-primary">查看全部</text>
      </view>
      
      <view class="progress-grid">
        <view 
          class="progress-card bg-white p-md rounded-lg" 
          v-for="(student, index) in studentProgress" 
          :key="index"
        >
          <view class="student-info flex align-center mb-sm">
            <view class="student-avatar flex-center mr-sm" :class="`bg-${student.color}`">
              <text class="text-white">{{ student.name.charAt(0) }}</text>
            </view>
            <text class="text-md">{{ student.name }}</text>
          </view>
          <view class="progress-bar mb-xs">
            <view class="progress-bg">
              <view 
                class="progress-fill" 
                :style="{ width: `${student.progress}%`, backgroundColor: getProgressColor(student.color) }"
              ></view>
            </view>
          </view>
          <view class="progress-text flex-between">
            <text class="text-sm text-light">目标完成度</text>
            <text class="text-sm text-bold">{{ student.progress }}%</text>
          </view>
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

// 获取进度条颜色
const getProgressColor = (color) => {
  const colorMap = {
    blue: '#4080ff',
    purple: '#8a2be2',
    green: '#00c389',
    pink: '#ff6b9a'
  };
  return colorMap[color] || colorMap.blue;
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as variables;

.coach-view {
  padding-bottom: 60px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.class-card {
  border-left: 4px solid variables.$primary-color;
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.student-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
}

.bg-blue {
  background-color: #4080ff;
}

.bg-purple {
  background-color: #8a2be2;
}

.bg-green {
  background-color: variables.$primary-color;
}

.bg-pink {
  background-color: #ff6b9a;
}

.progress-bg {
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
}
</style>
