export default class StringUtil {
  static isNullOrEmty(str: any): boolean {
    if (
      typeof str == "undefined" ||
      !str ||
      str.length === 0 ||
      str === "" ||
      !/[^\s]/.test(str) ||
      /^\s*$/.test(str) ||
      str.toString().replace(/\s/g, "") === ""
    )
      return true;
    else return false;
  }
}
