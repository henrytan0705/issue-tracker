import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const NewIssueLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton></Skeleton>
      <Skeleton height="20rem"></Skeleton>
    </Box>
  );
};

export default NewIssueLoadingPage;
