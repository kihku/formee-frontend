export default class StringUtils {
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

  static isNumeric(str: string) {
		if (/^[1-9]?[\d]+$/g.test(str)) {
			return true;
		}
		return false;
	}

}
