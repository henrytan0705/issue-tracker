import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import React from "react";

const CommentInput = () => {
  return (
    <div>
      <Box className="mt-6">
        <TextField.Root
          placeholder="Add a comment..."
          className="w-full rounded-xl px-3 py-2"
        />
        <Flex justify="end" className="mt-2">
          <Button size="2">Post</Button>
        </Flex>
      </Box>
    </div>
  );
};

export default CommentInput;
