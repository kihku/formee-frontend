import moment from "moment";
export default class DateUtils {
  static toDDMMYYYY_HH_MM_SS(date: Date): string {
    if (date !== null) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    } else {
      return "";
    }
  }

  static toDDMMYYYY(date: null | Date): string {
    if (date !== null) {
      return moment(date).format("DD/MM/YYYY");
    } else {
      return "";
    }
  }

  static checkValidDate(date: string) {
    return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date);
  }

  static getTimeDifference(date1: Date, date2: Date, language: string) {
    let duration = Math.abs(date2.getTime() - date1.getTime());
    const result: string[] = [];
    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    const msInDay = 1000 * 60 * 60 * 24;
    const msInHour = 1000 * 60 * 60;
    const msInMinute = 1000 * 60;

    // week
    const weeks = Math.trunc(duration / msInWeek);
    if (weeks > 4) {
      result.push(this.toDDMMYYYY(date2));
    } else if (weeks > 0) {
      result.push(weeks + ` ${language === "en" ? "week(s)" : "tuần"} `);
      result.push(language === "en" ? "ago" : "trước");
    } else {
      // day
      const days = Math.trunc(duration / msInDay);
      if (days > 0) {
        result.push(days + ` ${language === "en" ? "day(s)" : "ngày"} `);
        result.push(language === "en" ? "ago" : "trước");
      } else {
        // hour
        const hours = Math.trunc(duration / msInHour);
        if (hours > 0) {
          result.push(hours + ` ${language === "en" ? "hour(s)" : "giờ"} `);
          result.push(language === "en" ? "ago" : "trước");
        } else {
          // minute
          const minutes = Math.trunc(duration / msInMinute);
          if (minutes > 0) {
            result.push(minutes + ` ${language === "en" ? "minute(s)" : "phút"} `);
            result.push(language === "en" ? "ago" : "trước");
          } else {
            result.push(language === "en" ? "A few seconds ago" : "Vài giây trước");
          }
        }
      }
    }
    return result.join(" ");
  }
}
