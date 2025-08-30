import type { ControlPayload } from "../../common/types/appTypes";

export function toVisibleControl({
  visible = true,
  ...rest
}: ControlPayload): ControlPayload | null {
  return visible ? rest : null;
}
