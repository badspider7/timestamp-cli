# Timestamp CLI 🕒

一个强大的命令行时间戳工具，支持：

- ⚡ 微秒级别精度
- 🌍 多时区支持
- 🔍 自动检测时间戳单位
- 📅 多种时间格式转换

## ✨ 特性

- 默认输出到毫秒级别
- 自动使用系统时区
- 支持自定义输出格式
- 智能时间戳单位检测

## 📦 安装

```bash
npm install -g timestamp-cli
```

## ⚙️ 全局选项

| 选项                                | 说明                                |
| ----------------------------------- | ----------------------------------- |
| `-p, --precision <ms\|us>`          | 时间戳精度：ms（毫秒）或 us（微秒） |
| `-z, --default-timezone <timezone>` | 默认时区（如 Asia/Shanghai）        |

> 注意：若省略精度选项，`to-time` 会根据时间戳位数自动检测（>13 位为微秒，10-13 位为毫秒）

## 🚀 使用指南

### 1. 时间戳转格式化时间

```bash
ts to-time <timestamp> [-p <ms|us>] [-z <timezone>] [-t <timezone>] [-f <format>]
```

#### 选项说明

- `-t, --timezone`: 输出时区，覆盖默认时区
- `-f, --format`: 输出格式
  - 微秒默认：`YYYY-MM-DD HH:mm:ss.SSSSSS`
  - 毫秒默认：`YYYY-MM-DD HH:mm:ss.SSS`

#### 示例

```bash
# 基本使用
ts to-time 1748690886379
# 输出：2025-05-31 19:28:06.379（系统时区，如 Asia/Hong_Kong）

# 指定时区
ts to-time 1748690886379003 -t Asia/Shanghai
# 输出：2025-06-01 03:28:06.379003（自动检测为微秒）
```

### 2. 获取当前时间戳

```bash
ts now [-p <ms|us>] [-z <timezone>] [-t <timezone>]
```

#### 示例

```bash
# 获取当前毫秒时间戳
ts now
# 输出：1748690886379

# 获取当前微秒时间戳（指定时区）
ts now -p us -t America/New_York
# 输出：1748690886379003
```

### 3. 时间转时间戳

```bash
ts to-ts <time> [-p <ms|us>] [-z <timezone>] [-t <timezone>] [-f <format>]
```

#### 选项说明

- `-f, --format`: 输入时间格式，省略时自动解析（支持 ISO 8601）

#### 示例

```bash
# 转换指定时间（指定时区）
ts to-ts "2025-06-01 03:28:06.379" -t Asia/Shanghai
# 输出：1748690886379

# 转换 ISO 时间（微秒精度）
ts to-ts "2025-05-31T19:28:06.379003Z" -p us
# 输出：1748690886379003
```

## 🌍 常用时区参考

| 时区               | 说明             |
| ------------------ | ---------------- |
| `Asia/Shanghai`    | 中国标准时间     |
| `America/New_York` | 美国东部时间     |
| `Europe/London`    | 格林尼治标准时间 |
| `UTC`              | 协调世界时       |

> 查看更多时区：[Moment.js 时区列表](http://momentjs.com/timezone/)
