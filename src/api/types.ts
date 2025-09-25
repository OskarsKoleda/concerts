import type { CommonEventData } from "../common/types/eventTypes";

export type EventFilters = Partial<Pick<CommonEventData, "title" | "city">>;
