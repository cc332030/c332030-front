import React from "react";

import '../css/body.scss';

/**
 * <p>
 *   Description: CBody
 * </p>
 * @author c332030
 * @since 2023-2-8
 */
export function CBody(props) {
  return (
    <div className={ 'body' } >
      { props.children }
    </div>
  );
}
