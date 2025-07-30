"use client";

import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { MdError } from "react-icons/md";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <Text color="red" as="p" className="flex items-center gap-1">
      <MdError />
      {children}
    </Text>
  );
};

export default ErrorMessage;
