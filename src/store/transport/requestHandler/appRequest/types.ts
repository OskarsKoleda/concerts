import { RequestStatus } from "../../../../common/enums/appEnums";
import { ArrowFunction, VoidArrowFunction } from "../../../../common/types/appTypes";
import { ProcessError } from "../types";

export interface RequestService {
    processError: ProcessError;
}

export type GetStatus = ArrowFunction<RequestStatus>;
export type Success = VoidArrowFunction;
export type InProgress = VoidArrowFunction;
export type Fail = (error: unknown, defaultErrorMessage?: string) => void;
export type Reset = VoidArrowFunction;
// export type Cancel = VoidArrowFunction;


export interface RequestController {
  getStatus: GetStatus;
  success: Success;
  inProgress: InProgress;
  fail: Fail;
  reset: Reset;
//   cancel: Cancel;
}
