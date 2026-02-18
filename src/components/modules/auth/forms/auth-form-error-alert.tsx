import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface AuthFormErrorAlertProps {
  title: string;
  messages: string[];
  className?: string;
}

export const AuthFormErrorAlert = ({
  title,
  messages,
  className,
}: AuthFormErrorAlertProps) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <Alert
      variant="destructive"
      className={cn("border-destructive/50 py-2.5", className)}
    >
      <AlertCircle />
      <AlertTitle className="leading-5">{title}</AlertTitle>
      <AlertDescription className="gap-0.5">
        <ul className="list-disc space-y-0.5 pl-5">
          {messages.map((message, index) => (
            <li key={`${index}-${message}`}>{message}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default AuthFormErrorAlert;
