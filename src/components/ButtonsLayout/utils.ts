import type { ControlPayload } from "./types";

export function toVisibleControl({
  visible = true,
  ...rest
}: ControlPayload): ControlPayload | null {
  return visible ? rest : null;
}
