import shortenUuid from "shorten-uuid";
export default class CommonUtils {
  static setPageTitle(title: string) {
    document.title = title.toLowerCase().charAt(0).toUpperCase() + title.toLowerCase().slice(1);
  }

  static encodeUUID(uuid: string) {
    const { encode } = shortenUuid();
    return encode(uuid);
  }

  static decodeUUID(encoded: string) {
    const { decode } = shortenUuid();
    return decode(encoded);
  }
}
