/**
 * 路由常量定义
 * 集中管理应用中的所有路由路径
 */

// 路由分组
export const ROUTES = {
  // 认证相关路由
  AUTH: {
    WELCOME: '/pages/welcome/welcome',
    LOGIN: '/pages/auth/login',
    REGISTER: '/pages/auth/register',
    FORGOT_PASSWORD: '/pages/auth/forgot-password',
  },
  
  // 主要页面路由
  MAIN: {
    HOME: '/pages/index/index',
    DISCOVER: '/pages/discover/discover',
    COMMUNITY: '/pages/community/community',
    PROFILE: '/pages/profile/profile',
  },
  
  // 训练相关路由
  TRAINING: {
    START: '/pages/training/start',
    DETAIL: '/pages/training/detail',
    HISTORY: '/pages/training/history',
  },
  
  // 数据相关路由
  DATA: {
    RECORDS: '/pages/records/list',
    BODY_STATS: '/pages/body/stats',
    DIET_PLAN: '/pages/diet/plan',
  },
  
  // 设置相关路由
  SETTINGS: {
    INDEX: '/pages/settings/index',
    ACCOUNT: '/pages/settings/account',
    NOTIFICATION: '/pages/settings/notification',
  },
};

// API URL常量
export const API_URLS = {
  // 用户相关API
  USER: {
    LOGIN: '/api/user/login',
    REGISTER: '/api/user/register',
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/update-profile',
  },
  
  // 内容相关API
  CONTENT: {
    TRAINING_PLANS: '/api/content/training-plans',
    DIET_PLANS: '/api/content/diet-plans',
    EXERCISES: '/api/content/exercises',
  },
  
  // 数据相关API
  DATA: {
    TRAINING_RECORDS: '/api/data/training-records',
    BODY_STATS: '/api/data/body-stats',
    DIET_RECORDS: '/api/data/diet-records',
  },
  
  // 系统相关API
  SYSTEM: {
    CONFIG: '/api/system/config',
    VERSION: '/api/system/version',
  },
};

export default {
  ROUTES,
  API_URLS,
};
