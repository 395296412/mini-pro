import { defineStore } from 'pinia';

// 用户类型常量
export const USER_TYPES = {
  COACH: 1,    // 教练
  STUDENT: 2,  // 学员
  BOTH: 3      // 双重身份
};

// 定义用户状态管理
export const useUserStore = defineStore('user', {
  state: () => ({
    // 用户基本信息
    userInfo: {
      id: '1001',
      name: '张学员',
      avatar: '',
      type: USER_TYPES.BOTH, // 默认为双重身份
    },
    // 当前选择的身份类型
    currentType: USER_TYPES.STUDENT, // 默认为学员身份
    // 天气信息
    weather: {
      temperature: '23°C',
      condition: '晴',
      city: '北京'
    }
  }),
  
  getters: {
    // 获取用户姓名
    userName: (state) => state.userInfo.name,
    
    // 判断是否为教练身份
    isCoach: (state) => state.currentType === USER_TYPES.COACH,
    
    // 判断是否为学员身份
    isStudent: (state) => state.currentType === USER_TYPES.STUDENT,
    
    // 判断是否拥有双重身份
    hasBothRoles: (state) => state.userInfo.type === USER_TYPES.BOTH,
    
    // 获取当前天气信息
    currentWeather: (state) => `${state.weather.city} ${state.weather.condition} ${state.weather.temperature}`
  },
  
  actions: {
    // 切换用户身份
    switchUserType() {
      // 只有双重身份才能切换
      if (this.userInfo.type !== USER_TYPES.BOTH) return;
      
      // 在教练和学员身份间切换
      this.currentType = this.currentType === USER_TYPES.COACH 
        ? USER_TYPES.STUDENT 
        : USER_TYPES.COACH;
    },
    
    // 设置为教练身份
    setCoachType() {
      if (this.userInfo.type === USER_TYPES.STUDENT) return;
      this.currentType = USER_TYPES.COACH;
    },
    
    // 设置为学员身份
    setStudentType() {
      if (this.userInfo.type === USER_TYPES.COACH) return;
      this.currentType = USER_TYPES.STUDENT;
    },
    
    // 更新天气信息
    updateWeather(weatherData) {
      this.weather = { ...this.weather, ...weatherData };
    }
  }
});
