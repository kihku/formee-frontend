import moment from "moment";
export default class DateUtil {
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
}
