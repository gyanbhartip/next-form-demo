"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { formHandlerAction } from "_/actions/formHandler";
import { DealSchema } from "_/schemas/deal";
import type { Deal } from "_/types/deal";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";

const DealForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Deal>({
    resolver: zodResolver(DealSchema),
    defaultValues: {
      name: "",
      link: "",
      coupon: "",
      discount: 10,
    },
    mode: "onBlur",
  });

  const onSubmit = async (deal: Deal) => {
    const { successMessage } = await formHandlerAction(deal);
    if (successMessage) {
      toast.success(successMessage);
      reset();
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="input-group">
          Name
          <input
            type="text"
            className="input"
            id="name"
            aria-required
            {...register("name")}
          />
          <ErrorMessage error={errors?.name?.message} />
        </label>
        <label htmlFor="link" className="input-group">
          Link
          <input
            type="url"
            className="input"
            id="link"
            placeholder="must start with https://"
            aria-required
            {...register("link")}
          />
          <ErrorMessage error={errors?.link?.message} />
        </label>
        <label htmlFor="coupon" className="input-group">
          Coupon Code
          <input
            type="text"
            className="input"
            id="coupon"
            aria-required
            {...register("coupon")}
          />
          <ErrorMessage error={errors?.coupon?.message} />
        </label>
        <label htmlFor="discount" className="input-group">
          Discount (%)
          <input
            type="number"
            className="input no-controls"
            id="discount"
            aria-required
            {...register("discount")}
          />
          <ErrorMessage error={errors?.discount?.message} />
        </label>
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
      <Toaster />
    </>
  );
};

export default DealForm;
