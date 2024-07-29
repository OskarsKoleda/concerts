import type { FormContent, FormSections } from "./types";

export function isFormSection(fields: FormContent): fields is FormSections {
  const [head] = fields;

  return typeof head === "object" && head !== null && "fields" in head;
}
