# FitPro 健身应用

FitPro是一款基于uni-app + Vue 3 + Vant Weapp开发的健身教练与学员互动应用。

## 项目特点

- 双角色系统：支持教练和学员两种角色，可以快速切换
- 响应式设计：适配各种移动设备屏幕尺寸
- 组件化开发：基于Vant组件库，保持一致的UI风格
- 状态管理：使用Pinia进行集中状态管理

## 开发规范

本项目遵循严格的开发规范，确保代码质量和一致性。详细规范请参考：

- [项目总体规范](./STANDARDS.md)
- [响应式设计规范](./docs/responsive-design.md)
- [Vant组件使用指南](./docs/vant-component-guide.md)

## 目录结构

```
mini-pro/
├── src/
│   ├── assets/           # 静态资源
│   │   └── styles/       # 样式文件
│   ├── components/       # 公共组件
│   ├── pages/            # 页面
│   ├── store/            # Pinia状态管理
│   ├── utils/            # 工具函数
│   └── constants/        # 常量定义
├── docs/                 # 项目文档
└── STANDARDS.md          # 项目规范
```

## 开发指南

### 环境准备

1. 安装依赖
```bash
npm install
```

2. 开发模式
```bash
npm run dev:mp-weixin
```

3. 构建生产版本
```bash
npm run build:mp-weixin
```

### 开发注意事项

1. 遵循"Vant组件优先"原则，优先使用Vant组件库中的组件
2. 遵循响应式设计规范，避免使用固定像素值
3. 使用相对单位（vw, vh, em, rem）和弹性布局
4. 组件开发遵循原子化原则，一个组件只负责一个功能
5. 使用Pinia进行状态管理，避免组件间直接传递复杂数据

## 常见问题

### 如何切换角色？

在应用顶部右侧有角色切换按钮，点击即可在教练和学员角色间切换。

### 如何自定义Vant组件样式？

使用`custom-class`属性和`:deep()`选择器，详见[Vant组件使用指南](./docs/vant-component-guide.md)。

### 如何确保响应式布局？

遵循[响应式设计规范](./docs/responsive-design.md)，使用相对单位和弹性布局。
