"use client";

import dynamic from "next/dynamic";
const IssueChart = dynamic(() => import("../IssueChart"), { ssr: false });

const IssueChartWrapper = (props: {
  open: number;
  inProgress: number;
  closed: number;
}) => {
  return <IssueChart {...props} />;
};

export default IssueChartWrapper;
