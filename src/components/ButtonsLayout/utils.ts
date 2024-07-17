import { ControlPayload } from "./types";

export function toVisibleControl({ visible = true, ...rest }: ControlPayload): ControlPayload[] {
  return visible ? [rest] : [];
}
