import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLable="Opps! something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex flex-col justify-center items-center">
        <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
      </div>
    </CardWrapper>
  );
};
