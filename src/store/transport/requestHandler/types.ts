import type { RequestStatus } from "../../../common/enums/appEnums";
import type { AppRequest } from "./appRequest/AppRequest";

export type TransferRequests = Record<string, AppRequest>;

export type ProcessError = (error: unknown, defaultErrorMessage?: string) => void;

export type InitRequest = (requestName: string) => AppRequest;
export type GetRequestStatus = (requestName: string) => RequestStatus | undefined;
export type CheckRequestStatus = (requestName: string, status: RequestStatus) => boolean;
export type IsProcessingRequest = (requestName: string) => boolean;
export type IsSuccessfulRequest = (requestName: string) => boolean;
export type IsFailedRequest = (requestName: string) => boolean;
export type ResetRequest = (requestName: string) => void;

export interface IRequestHandler {
  readonly initRequest: InitRequest;
  readonly getRequestStatus: GetRequestStatus;
  readonly checkRequestStatus: CheckRequestStatus;
  readonly isProcessingRequest: IsProcessingRequest;
  readonly isSuccessfulRequest: IsSuccessfulRequest;
  readonly isFailedRequest: IsFailedRequest;
  readonly resetRequest: ResetRequest;
}
