import { makeAutoObservable } from "mobx";
import { RequestStatus } from "../../../../common/enums/appEnums";
import type {
  GetStatus,
  InProgress,
  RequestController,
  RequestService,
  Success,
  Fail,
  Reset,
} from "./types";

export class AppRequest implements RequestController {
  private status = RequestStatus.NOT_EXECUTED;

  constructor(private readonly name: string, private readonly requestService: RequestService) {
    makeAutoObservable(this);
  }

  getStatus: GetStatus = () => {
    return this.status;
  };

  success: Success = () => {
    this.status = RequestStatus.SUCCESS;
  };

  inProgress: InProgress = () => {
    this.status = RequestStatus.IN_PROGRESS;
  };

  fail: Fail = (error, defaultErrorMessage) => {
    this.status = RequestStatus.FAILED;
    this.requestService.processError(error, defaultErrorMessage);
  };

  reset: Reset = () => {
    this.status = RequestStatus.NOT_EXECUTED;
  };
}
