
import { memo } from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = memo(({ message }: ErrorMessageProps) => {
  return (
    <div className="min-h-[300px] flex items-center justify-center p-4">
      <p className="text-red-500" role="alert">
        {message}
      </p>
    </div>
  );
});

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
