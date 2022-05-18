import Cookies from "universal-cookie";

const cookies = new Cookies();

export function setCookie(
    cookieName: string,
    cookieValue: string,
    expriedAt: Date = new Date(new Date().setDate(new Date().getDate() + 1)),
) {
    cookies.set(cookieName, cookieValue, {
        path: "/",
        expires: expriedAt,
    });
}

export function removeCookie(cookieName: string) {
    cookies.remove(cookieName, {
        path: "/",
    });
}

export function getCookie(cookieName: string) {
    return cookies.get(cookieName);
}
