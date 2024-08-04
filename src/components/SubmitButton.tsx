"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="mt-4 w-full rounded-[4px] bg-purple-400 p-2 text-white hover:bg-purple-500 active:bg-purple-600"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
