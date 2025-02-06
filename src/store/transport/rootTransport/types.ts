import type { EventListTransport } from "../eventListTransport/EventListTransport.ts";
import type { AppRequest } from "../requestHandler/appRequest/AppRequest";
import type { IRequestHandler } from "../requestHandler/types";

export interface ChildTransport {
  requestHandler: IRequestHandler;
}

export interface RootTransport {
  readonly eventListTransport: EventListTransport;
}

type ErrorTexts = {
  unexpectedError: string;
  incorrectResponse?: string;
} & Record<string, string>;

export type RequestErrorMessages<T extends string> = Record<T, ErrorTexts>;
export type RequestContext = { errorTexts: ErrorTexts; request: AppRequest };
