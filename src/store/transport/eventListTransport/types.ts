import type { Maybe } from "../../../common/types/appTypes";

export interface RequestPayload {
  filters: {
    eventTitle: Maybe<string>;
    city: Maybe<string>;
    band: Maybe<string>;
    eventType: Maybe<string>;
  };
}
