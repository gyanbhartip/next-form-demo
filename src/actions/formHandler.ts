"use server";

import { DealSchema } from "_/schemas/deal";
import type { Deal, DealFormState } from "_/types/deal";
import { sleep } from "_/utils";
import { convertZodErrors } from "_/utils/errors";

export const formHandlerAction = async (
  deal: Deal,
): Promise<DealFormState<Deal>> => {
  await sleep(1000);

  const validated = DealSchema.safeParse(deal);

  if (!validated.success) {
    console.error("formHandler ~ validated.error: ", validated.error);

    return {
      errors: convertZodErrors(validated.error),
    };
  }
  return {
    successMessage: "Deal added successfully",
  };
};
