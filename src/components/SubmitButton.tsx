"use client";

import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  isSubmitting: boolean;
};

const SubmitButton = ({ isSubmitting, ...props }: Props) => {
  return (
    <button
      type="submit"
      className="mt-4 w-full rounded-[4px] bg-purple-400 p-2 text-white hover:bg-purple-500 active:bg-purple-600"
      {...props}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
