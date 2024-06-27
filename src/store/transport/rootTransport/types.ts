import { ConcertTransport } from "../concertTransport/ConcertTransport";
import { AppRequest } from "../requestHandler/appRequest/AppRequest";
import { IRequestHandler } from "../requestHandler/types";

export interface ChildTransport {
  requestHandler: IRequestHandler;
}

export interface RootTransport {
  readonly concertTransport: ConcertTransport;
}

type ErrorTexts = {
  unexpectedError: string;
  incorrectResponse?: string;
} & Record<string, string>;

export type RequestErrorMessages<T extends string> = Record<T, ErrorTexts>;
export type RequestContext = { errorTexts: ErrorTexts; request: AppRequest };
