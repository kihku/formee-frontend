export default class CommonUtils {
  static setPageTitle(title: string) {
    document.title = title.toLowerCase().charAt(0).toUpperCase() + title.toLowerCase().slice(1);
  }
}
