"use client";

import { formHandlerAction } from "_/actions/formHandler";
import { DealSchema } from "_/schemas/deal";
import type {
  Deal,
  DealFormState,
  StringMap,
  StringToBooleanMap,
} from "_/types/deal";
import { convertZodErrors } from "_/utils/errors";
import { type ChangeEvent, type FocusEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";

const initialState: DealFormState<Deal> = {};
const initialData = {
  name: "",
  link: "",
  coupon: "",
  discount: 10,
};
const DealForm = () => {
  const [serverState, formAction] = useFormState(
    formHandlerAction,
    initialState,
  );

  const [errors, setErrors] = useState<StringMap>(serverState?.errors ?? {});
  const [blurs, setBlurs] = useState<StringToBooleanMap>(
    serverState?.blurs ?? {},
  );
  const [deal, setDeal] = useState<Deal>(serverState?.data ?? initialData);

  useEffect(() => {
    if (serverState.successMessage) {
      toast.success(serverState.successMessage);
      setBlurs({});
    }
    if (serverState?.data) {
      setDeal(serverState.data);
    }
  }, [serverState]);

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setBlurs((prev) => ({ ...prev, [name]: true }));
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeal((prev) => {
      const updatedDeal = { ...prev, [name]: value };

      const validated = DealSchema.safeParse(updatedDeal);

      if (validated.success) {
        setErrors({});
      } else {
        const errors = convertZodErrors(validated.error);
        setErrors(errors);
      }
      return updatedDeal;
    });
  };

  return (
    <>
      <form className="form-container" action={formAction}>
        <label htmlFor="name" className="input-group">
          Name
          <input
            type="text"
            className="input"
            id="name"
            name="name"
            defaultValue={serverState?.data?.name}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={deal.name}
            aria-required
          />
          <ErrorMessage error={blurs?.name ? errors?.name : ""} />
        </label>
        <label htmlFor="link" className="input-group">
          Link
          <input
            type="url"
            className="input"
            id="link"
            name="link"
            placeholder="must start with https://"
            defaultValue={serverState?.data?.link}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={deal.link}
            aria-required
          />
          <ErrorMessage error={blurs?.link ? errors?.link : ""} />
        </label>
        <label htmlFor="coupon" className="input-group">
          Coupon Code
          <input
            type="text"
            className="input"
            id="coupon"
            name="coupon"
            defaultValue={serverState?.data?.coupon}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={deal.coupon}
            aria-required
          />
          <ErrorMessage error={blurs?.coupon ? errors?.coupon : ""} />
        </label>
        <label htmlFor="discount" className="input-group">
          Discount (%)
          <input
            type="number"
            className="input no-controls"
            id="discount"
            name="discount"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={deal.discount}
            aria-required
          />
          <ErrorMessage error={blurs?.discount ? errors?.discount : ""} />
        </label>
        <SubmitButton />
      </form>
      <Toaster />
    </>
  );
};

export default DealForm;
