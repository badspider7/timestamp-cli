#!/usr/bin/env node

const { program } = require("commander");
const moment = require("moment-timezone");

// 设置命令行工具的基本信息
program
  .version("1.0.2")
  .description(
    "时间戳转换工具，支持微秒级别、时区，自动检测时间戳单位，默认到毫秒，默认使用系统时区"
  );

// 选项：控制精度（毫秒或微秒）和默认时区
program
  .option("-p, --precision <type>", "时间戳精度（ms 或 us，自动检测时可忽略）")
  .option(
    "-z, --default-timezone <timezone>",
    "默认时区（如 Asia/Shanghai）",
    moment.tz.guess()
  );

// 命令1：时间戳转换为格式化时间
program
  .command("to-time <timestamp>")
  .description("将时间戳转换为格式化时间")
  .option("-f, --format <format>", "输出时间格式")
  .option("-t, --timezone <timezone>", "输出时区（如 Asia/Shanghai）")
  .action((timestamp, options) => {
    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        console.error("错误：请输入有效的时间戳");
        return;
      }
      // 自动检测时间戳单位：>13 位为微秒，10-13 位为毫秒
      const isMicro = program.opts().precision
        ? program.opts().precision === "us"
        : timestamp.length > 13;
      // 根据精度选择默认格式
      const defaultFormat = isMicro
        ? "YYYY-MM-DD HH:mm:ss.SSSSSS"
        : "YYYY-MM-DD HH:mm:ss.SSS";
      const format = options.format || defaultFormat;
      // 使用指定的时区或默认时区
      const timezone = options.timezone || program.opts().defaultTimezone;
      if (!moment.tz.zone(timezone)) {
        console.error(
          `错误：无效的时区 '${timezone}'，请使用有效的时区名称（如 Asia/Shanghai）`
        );
        return;
      }
      // 处理时间戳
      const date = isMicro ? moment(Math.floor(ts / 1000)) : moment(ts);
      console.log(date.tz(timezone).format(format));
    } catch (error) {
      console.error("错误：", error.message);
    }
  });

// 命令2：获取当前时间的时间戳
program
  .command("now")
  .description("获取当前时间的时间戳")
  .option("-t, --timezone <timezone>", "输出时区（如 Asia/Shanghai）")
  .action((options) => {
    try {
      const isMicro = program.opts().precision === "us";
      const timezone = options.timezone || program.opts().defaultTimezone;
      if (!moment.tz.zone(timezone)) {
        console.error(
          `错误：无效的时区 '${timezone}'，请使用有效的时区名称（如 Asia/Shanghai）`
        );
        return;
      }
      const now = moment().tz(timezone);
      const ts = isMicro ? now.valueOf() * 1000 : now.valueOf();
      console.log(ts);
    } catch (error) {
      console.error("错误：", error.message);
    }
  });

// 命令3：指定时间转换为时间戳
program
  .command("to-ts <time>")
  .description("将指定时间转换为时间戳，支持自动解析常见格式")
  .option("-f, --format <format>", "输入时间格式（省略时尝试自动解析）")
  .option("-t, --timezone <timezone>", "输入时区（如 Asia/Shanghai）")
  .action((time, options) => {
    try {
      const isMicro = program.opts().precision === "us";
      const timezone = options.timezone || program.opts().defaultTimezone;
      if (!moment.tz.zone(timezone)) {
        console.error(
          `错误：无效的时区 '${timezone}'，请使用有效的时区名称（如 Asia/Shanghai）`
        );
        return;
      }
      // 尝试自动解析时间，或使用指定的格式
      const date = options.format
        ? moment.tz(time, options.format, timezone)
        : moment.tz(time, timezone);
      if (!date.isValid()) {
        console.error("错误：请输入有效的时间格式，支持 ISO 8601 或指定格式");
        return;
      }
      const ts = isMicro ? date.valueOf() * 1000 : date.valueOf();
      console.log(ts);
    } catch (error) {
      console.error("错误：", error.message);
    }
  });

// 解析命令行参数
program.parse(process.argv);
