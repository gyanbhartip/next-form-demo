import type { DealSchema } from "_/schemas/deal";
import type { z } from "zod";

export type DealFormState<T> = {
  errors?: StringMap;
  successMessage?: string;
  data?: T;
  blurs?: StringToBooleanMap;
};

export type StringMap = Record<string, string>;

export type StringToBooleanMap = Record<string, boolean>;

export type Deal = z.infer<typeof DealSchema>;
