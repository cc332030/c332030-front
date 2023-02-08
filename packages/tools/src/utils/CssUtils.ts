
class CssUtils {

  public static classList(...classes: Array<string>): string {
    return classes.join(' ');
  }

}

export default CssUtils

export const classList = CssUtils.classList
