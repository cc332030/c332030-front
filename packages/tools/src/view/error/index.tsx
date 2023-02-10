import React from "react"
import {isRouteErrorResponse, useRouteError} from "react-router-dom"

/**
 * <p>
 *   Description: ErrorPage
 * </p>
 * @author c332030
 * @since 2023-2-9
 */
function ErrorPage() {

  const error = useRouteError()
  // console.error(error)

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      // ...
    }

    return (
      <div id="error-page">
        <h1>糟糕! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </div>
    )
  }

  const errorMsg = error instanceof Error ? error.message : '未知错误';
  return (
    <div id="error-page">
      <h1>糟糕! 意外发生错误</h1>
      <p>有什么问题发生了</p>
      <p>
        <i>{ errorMsg }</i>
      </p>
    </div>
  )
}

export default ErrorPage
