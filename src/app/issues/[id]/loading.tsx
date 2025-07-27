import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const IssueDetailsLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />

      <Flex gap="3" className="mt-4">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>

      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailsLoadingPage;
