"use server";

import { DealSchema } from "_/schemas/deal";
import type { Deal, DealFormState } from "_/types/deal";
import { sleep } from "_/utils";
import { convertZodErrors } from "_/utils/errors";

export const formHandlerAction = async (
  prevState: DealFormState<Deal>,
  formData: FormData,
): Promise<DealFormState<Deal>> => {
  await sleep(1000);

  const dealData = {
    name: formData.get("name"),
    link: formData.get("link"),
    coupon: formData.get("coupon"),
    discount: Number.parseInt((formData.get("discount") as string) ?? "") || 10,
  } as Deal;

  const validated = DealSchema.safeParse(dealData);

  if (!validated.success) {
    console.error("formHandler ~ validated.error: ", validated.error);
    return {
      errors: convertZodErrors(validated.error),
      data: dealData,
      blurs: {
        name: true,
        link: true,
        coupon: true,
        discount: true,
      },
    };
  }
  return {
    successMessage: "Deal added successfully",
    errors: {},
    data: { name: "", link: "", coupon: "", discount: 10 },
  };
};
