"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  const handleClick = () => {};

  return (
    <div className="max-w-xl space-y-3">
      <h1>New Issue</h1>
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description…" />
      <Button onClick={handleClick}>Create Issue</Button>
    </div>
  );
};

export default NewIssuePage;
