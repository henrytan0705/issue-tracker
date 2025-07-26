import React from "react";
import { Grid } from "@radix-ui/themes";

interface Props {
  params: { id: string };
}

const IssuePage = async ({ params }: Props) => {
  return <Grid>Issue Page</Grid>;
};

export default IssuePage;
