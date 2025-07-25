import React, { PropsWithChildren } from "react";
import { Text, TextField } from "@radix-ui/themes";
import { MdError } from "react-icons/md";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <Text color="red" as="p" className="flex items-center gap-2">
      <MdError />
      {children}
    </Text>
  );
};

export default ErrorMessage;
