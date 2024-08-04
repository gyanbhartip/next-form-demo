import { z } from "zod";

export const DealSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(4, { message: "Name must be at least 4 characters long" }),
  link: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .url({ message: "Link must be a valid URL" }),
  coupon: z
    .string({
      required_error: "Coupon is required",
      invalid_type_error: "Coupon must be a string",
    })
    .min(5, { message: "Coupon must be at least 5 characters long" }),
  discount: z.coerce
    .number({
      required_error: "Discount is required",
      invalid_type_error: "Discount must be a number",
    })
    .min(1, { message: "Discount must be at least 1" })
    .max(100, { message: "Discount must be at most 100" }),
});
