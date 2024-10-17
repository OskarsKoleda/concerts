import type { Maybe } from "../../../common/types/appTypes";

export interface RequestPayload {
  filters: {
    city: Maybe<string>;
    eventTitle: Maybe<string>;
    eventType: Maybe<string>;
  };
}
