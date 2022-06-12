
import { AlertMessage } from "../reducers/notificationReducer";

export interface NotificationAction {
	type: "OPEN" | "CLOSE";
	alertMessage: AlertMessage;
}

export const openNotification = (alertMessage: AlertMessage): NotificationAction => {
	return {
		type: "OPEN",
		alertMessage,
	};
};

export const closeNotification = (): NotificationAction => {
	return {
		type: "CLOSE",
		alertMessage: {
			open: false,
			content : "",
			severity: "success",
		},
	};
};
