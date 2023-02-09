import React from "react";

class ReactUtils {

  public static getHtmlElement(ref: React.MutableRefObject<any>): HTMLElement | null {
    if (!ref) {
      return null;
    }
    return ref.current;
  }

  public static doHtmlElement(
    ref: React.MutableRefObject<null>,
    option: {

      action: (e: HTMLElement) => void,

      before?: (e: HTMLElement) => void,

      after?: (e: HTMLElement) => void

    }
  ) {

    const element = this.getHtmlElement(ref);


    console.log('option', option)
    if(element) {

      const { action, before , after } = option;

      console.log('action', action)

      before && before(element);
      action(element);
      after && after(element);
    }
  }

}

export default ReactUtils
