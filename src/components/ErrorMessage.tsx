import type { ComponentProps } from "react";

type Props = ComponentProps<"small"> & {
  containerProps?: ComponentProps<"div">;
  error?: string;
};

const ErrorMessage = ({ containerProps, error, ...props }: Props) => {
  return (
    <div className="min-h-8" {...containerProps}>
      {error ? (
        <small className="text-red-400" {...props}>
          {error}
        </small>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
