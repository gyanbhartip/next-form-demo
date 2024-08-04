import type { ComponentProps } from "react";

type Props = ComponentProps<"small"> & {
  error?: string;
};

const ErrorMessage = ({ error }: Props) => {
  return (
    <div className="min-h-8">
      {error ? <small className="text-red-400">{error}</small> : null}
    </div>
  );
};

export default ErrorMessage;
