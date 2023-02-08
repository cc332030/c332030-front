import React from "react";

import '../css/body.scss';

/**
 * <p>
 *   Description: CBody
 * </p>
 * @author c332030
 * @since 2023-2-8
 */
export function CBody(children) {
  return (
    <div className={ 'body' } >
      { children }
    </div>
  );
}
