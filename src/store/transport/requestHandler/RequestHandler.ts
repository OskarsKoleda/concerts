import { makeAutoObservable } from "mobx";

import { getErrorMessage } from "../../../common/utils/appUtils";
import { RequestStatus } from "../../../common/enums/appEnums";

import type { AppStateHandler } from "../appState/types";
import { AppRequest } from "./appRequest/AppRequest";

import type {
  CheckRequestStatus,
  GetRequestStatus,
  InitRequest,
  IRequestHandler,
  IsFailedRequest,
  IsProcessingRequest,
  IsSuccessfulRequest,
  ProcessError,
  ResetRequest,
  TransferRequests,
} from "./types";

export class RequestHandler implements IRequestHandler {
  private readonly requests: TransferRequests = {};

  constructor(private readonly appStateHandler: AppStateHandler) {
    makeAutoObservable(this);
  }

  initRequest: InitRequest = (requestName) => {
    const request: AppRequest | undefined = this.getRequest(requestName);
    if (request) {
      request.reset();

      return request;
    } else {
      return this.createRequest(requestName);
    }
  };

  private createRequest = (name: string): AppRequest => {
    const request = new AppRequest(name, { processError: this.processError });
    this.requests[name] = request;

    return request;
  };

  private getRequest = (name: string): AppRequest | undefined => {
    return this.requests[name];
  };

  private processError: ProcessError = (error, defaultErrorMessage) => {
    try {
      const errorMessage = getErrorMessage(error, defaultErrorMessage);

      this.appStateHandler.setAppActiveError(errorMessage);
    } catch (error) {
      throw new Error("Unable to parse error. Invalid error format.");
    }
  };

  getRequestStatus: GetRequestStatus = (requestName) => {
    return this.requests[requestName]?.getStatus();
  };

  checkRequestStatus: CheckRequestStatus = (requestName, status) => {
    return this.getRequestStatus(requestName) === status;
  };

  isProcessingRequest: IsProcessingRequest = (requestName) => {
    return this.checkRequestStatus(requestName, RequestStatus.IN_PROGRESS);
  };

  isFailedRequest: IsFailedRequest = (requestName) => {
    return this.checkRequestStatus(requestName, RequestStatus.FAILED);
  };

  isSuccessfulRequest: IsSuccessfulRequest = (requestName) => {
    return this.checkRequestStatus(requestName, RequestStatus.SUCCESS);
  };

  resetRequest: ResetRequest = (requestName: string) => {
    const request: AppRequest | undefined = this.getRequest(requestName);
    if (request) {
      request.reset();
    }
  };
}
