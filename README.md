# Timestamp CLI

一个支持微秒级别、时区、自动检测时间戳单位和多时间格式的命令行工具，默认到毫秒级别，默认使用系统时区。

## 安装

```bash
npm install -g timestamp-cli
```

全局选项

-p, --precision <ms|us>：时间戳精度，ms（毫秒）或 us（微秒）。若省略，to-time 会根据时间戳位数自动检测（>13 位为微秒，10-13 位为毫秒）。
-z, --default-timezone <timezone>：默认时区（如 Asia/Shanghai），默认为系统时区（如 Asia/Hong_Kong）。

使用

1. 将时间戳转换为格式化时间
   ts to-time <timestamp> [-p <ms|us>] [-z <timezone>] [-t <timezone>] [-f <format>]

-t, --timezone: 输出时区，覆盖默认时区。
-f, --format: 输出格式，微秒默认 YYYY-MM-DD HH:mm:ss.SSSSSS，毫秒默认 YYYY-MM-DD HH:mm:ss.SSS。
示例：ts to-time 1748690886379

# 输出：2025-05-31 19:28:06.379（系统时区，如 Asia/Hong_Kong）

ts to-time 1748690886379003 -t Asia/Shanghai

# 输出：2025-06-01 03:28:06.379003（自动检测为微秒）

2. 获取当前时间的时间戳
   ts now [-p <ms|us>] [-z <timezone>] [-t <timezone>]

示例：ts now

# 输出：当前毫秒时间戳，如 1748690886379

ts now -p us -t America/New_York

# 输出：当前微秒时间戳，如 1748690886379003

3. 将指定时间转换为时间戳
   ts to-ts <time> [-p <ms|us>] [-z <timezone>] [-t <timezone>] [-f <format>]

-f, --format: 输入时间格式，省略时尝试自动解析（如 ISO 8601）。
示例：ts to-ts "2025-06-01 03:28:06.379" -t Asia/Shanghai

# 输出：1748690886379

ts to-ts "2025-05-31T19:28:06.379003Z" -p us

# 输出：1748690886379003（自动解析 ISO 8601）

常见时区

Asia/Shanghai（中国标准时间）
America/New_York（东部时间）
Europe/London（格林尼治标准时间）
UTC

查看更多时区：http://momentjs.com/timezone/
