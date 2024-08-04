import type { StringMap } from "_/types/deal";
import type { ZodError } from "zod";

export const convertZodErrors = (error: ZodError): StringMap =>
  error.issues.reduce((acc: Record<string, string>, issue) => {
    if (issue.path[0]) {
      acc[issue.path[0]] = issue.message;
    }
    return acc;
  }, {});
