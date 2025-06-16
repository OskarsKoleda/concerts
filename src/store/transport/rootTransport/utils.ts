import type { IRequestHandler } from "../requestHandler/types";

import type { RequestContext, RequestErrorMessages } from "./types";

export function getRequestContext<T extends string>(
  requestName: T,
  requestHandler: IRequestHandler,
  requestErrorMessages: RequestErrorMessages<T>,
): RequestContext {
  try {
    return {
      errorTexts: requestErrorMessages[requestName],
      request: requestHandler.initRequest(requestName),
    };
  } catch (error) {
    throw new Error("Unable to prepare request data");
  }
}
