import { prisma } from "@/lib/prisma";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { StatusBadge } from "./components";

const LatestIssues = async () => {
  let issues;

  try {
    issues = await prisma.issue.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        assignedToUser: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch issue latest issues:", error);
  }

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues?.map(({ id, title, status, assignedToUser }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="2">
                    <Link href={`/issues/${id}`}>{title}</Link>
                    <StatusBadge status={status} />
                  </Flex>
                  {assignedToUser && (
                    <Avatar
                      src={assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
