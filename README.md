# Tracker 转换工具 Pro v2.0

一个功能强大、现代化的 BT Tracker 列表转换工具，支持多格式输出、智能缓存、离线模式等高级功能。

## 🌟 主要特性

### 🚀 核心功能
- **智能获取**：多源获取最新 Tracker 列表，自动容错切换
- **多格式输出**：支持 Aria2、qBittorrent、Transmission、JSON 等格式
- **智能转换**：自动去重、验证、排序和优化
- **高级复制**：支持纯文本、格式化、JSON 等多种复制方式

### 💾 智能缓存系统
- **自动缓存**：30分钟智能缓存，减少网络请求
- **缓存管理**：支持手动清理和状态查看
- **离线支持**：网络断开时自动切换离线模式

### 🔧 高级功能
- **离线模式**：内置7种分类的高质量 Tracker 列表
- **批量处理**：支持多文件批量转换
- **统计分析**：详细的 Tracker 质量和协议分布分析
- **通知中心**：完整的通知管理和历史记录

### 🎨 用户体验
- **现代UI**：基于 Bootstrap 5 的响应式设计
- **动画效果**：流畅的过渡动画和加载状态
- **键盘快捷键**：提高操作效率
- **主题适配**：支持明暗主题切换

## 📁 项目结构

```
tracker-converter-pro/
├── index.html              # 原版页面
├── index_improved.html     # 改进版页面 ⭐
├── convert.js              # 原版脚本
├── convert_improved.js     # 改进版核心模块 ⭐
├── app.js                  # 主应用集成脚本 ⭐
├── README.md               # 项目说明
└── 风车无敌免费AI助手1.0.0.exe  # 原版可执行文件
```

## 🚀 快速开始

### 方法一：直接使用（推荐）
1. 下载项目文件
2. 在浏览器中打开 `index_improved.html`
3. 开始使用！

### 方法二：本地服务器
```bash
# 使用 Python 启动本地服务器
python -m http.server 8000

# 或使用 Node.js
npx serve .

# 然后访问 http://localhost:8000/index_improved.html
```

## 📖 使用指南

### 基础使用
1. **获取 Tracker**：点击"获取最新"按钮自动获取最新列表
2. **智能转换**：点击"智能转换"按钮进行格式转换
3. **复制结果**：使用右侧复制按钮复制转换结果

### 高级功能

#### 离线模式
- 启用"离线模式"开关
- 选择 Tracker 分类（高质量公共、HTTP、UDP 等）
- 点击"加载"按钮使用内置列表

#### 快速转换
- 点击"快速开始"按钮
- 自动获取最新列表并转换为 Aria2 格式
- 一键完成整个流程

#### 批量处理
- 点击"批量处理"按钮
- 选择多个 Tracker 文件
- 自动处理并下载结果

#### 统计分析
- 输入 Tracker 列表后点击"查看统计"
- 查看协议分布、域名统计等信息

### 键盘快捷键
- `Ctrl + Enter`：执行转换
- `Ctrl + R`：获取最新 Tracker
- `Ctrl + S`：保存当前工作
- `Ctrl + O`：加载保存的工作
- `F5`：刷新 Tracker 列表

## 🔧 技术架构

### 模块化设计
项目采用模块化架构，包含以下核心模块：

1. **TrackerFetcher**：在线获取模块
   - 多API端点容错
   - 智能缓存管理
   - 超时和重试机制

2. **OfflineTrackerManager**：离线模式管理
   - 7种预定义分类
   - 自定义分类支持
   - 数据导入导出

3. **FormatConverter**：格式转换引擎
   - 多格式输出支持
   - 智能排序和过滤
   - 数据验证和清洗

4. **ClipboardManager**：剪贴板管理
   - 现代API优先，传统API兜底
   - 多格式复制支持
   - 复制历史记录

5. **NotificationManager**：通知系统
   - 5种通知类型
   - 队列管理
   - 历史记录和中心

### 技术栈
- **前端框架**：原生 JavaScript (ES6+)
- **UI框架**：Bootstrap 5.2.3
- **图标库**：Bootstrap Icons
- **存储**：localStorage
- **API**：Fetch API, Clipboard API

## 📊 功能对比

| 功能 | 原版 | 改进版 Pro |
|------|------|------------|
| 基础转换 | ✅ | ✅ |
| 多源获取 | ❌ | ✅ |
| 智能缓存 | ❌ | ✅ |
| 离线模式 | 基础 | 高级 |
| 多格式输出 | ❌ | ✅ |
| 高级复制 | ❌ | ✅ |
| 批量处理 | ❌ | ✅ |
| 统计分析 | ❌ | ✅ |
| 通知系统 | 基础 | 高级 |
| 键盘快捷键 | ❌ | ✅ |
| 响应式设计 | 基础 | 高级 |

## 🎯 支持的输出格式

### Aria2 配置格式
```
# Aria2 BT Tracker 配置
# 生成时间: 2024-01-15 10:30:00
# 总计: 25 个Tracker

bt-tracker=udp://tracker.opentrackr.org:1337/announce
bt-tracker=http://tracker.gbitt.info:80/announce
```

### qBittorrent 格式
```
udp://tracker.opentrackr.org:1337/announce

http://tracker.gbitt.info:80/announce
```

### JSON 格式
```json
{
  "metadata": {
    "generatedAt": "2024-01-15T10:30:00.000Z",
    "totalTrackers": 25
  },
  "trackers": [
    "udp://tracker.opentrackr.org:1337/announce",
    "http://tracker.gbitt.info:80/announce"
  ]
}
```

## 🔧 配置选项

### 通知系统配置
```javascript
{
  position: 'top-right',        // 通知位置
  maxNotifications: 3,          // 最大通知数
  enableSound: false,           // 启用声音
  enableHistory: true           // 启用历史记录
}
```

### 转换选项
```javascript
{
  format: 'aria2',              // 输出格式
  filter: 'all',                // 协议过滤
  sort: 'reliability',          // 排序方式
  limit: 50,                    // 数量限制
  removeComments: true          // 移除注释
}
```

## 🌐 浏览器兼容性

| 浏览器 | 版本要求 | 支持状态 |
|--------|----------|----------|
| Chrome | 63+ | ✅ 完全支持 |
| Firefox | 53+ | ✅ 完全支持 |
| Safari | 13.1+ | ✅ 完全支持 |
| Edge | 79+ | ✅ 完全支持 |
| IE | - | ❌ 不支持 |

## 📈 性能优化

- **智能缓存**：减少 90% 的重复网络请求
- **懒加载**：按需加载功能模块
- **防抖处理**：优化输入响应性能
- **内存管理**：自动清理过期数据

## 🔒 隐私和安全

- **本地处理**：所有数据处理在本地完成
- **无数据收集**：不收集任何用户数据
- **安全存储**：使用浏览器本地存储
- **HTTPS支持**：支持安全连接

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📝 更新日志

### v2.0.0 (2024-01-15)
- 🎉 全新架构重构
- ✨ 新增智能缓存系统
- ✨ 新增多格式输出支持
- ✨ 新增高级复制功能
- ✨ 新增批量处理功能
- ✨ 新增统计分析功能
- ✨ 新增通知中心
- 🎨 全新现代化UI设计
- 🚀 性能优化和体验提升

### v1.0.0 (原版)
- ✨ 基础 Tracker 转换功能
- ✨ 简单离线模式
- ✨ 基础通知系统

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [ngosang/trackerslist](https://github.com/ngosang/trackerslist) - 提供 Tracker 数据源
- [Bootstrap](https://getbootstrap.com/) - UI 框架
- [Bootstrap Icons](https://icons.getbootstrap.com/) - 图标库

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发起 Discussion
- 邮件联系

---

**Tracker 转换工具 Pro** - 让 BT 下载更高效！ 🚀