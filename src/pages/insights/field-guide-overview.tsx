import Head from "next/head";
import FieldGuideOverviewPage from "@/components/insights/FieldGuideOverviewPage";

export default function FieldGuideOverview() {
  return (
    <>
      <Head>
        <title>Field Guide Overview | BMR</title>
        <meta name="description" content="An executive orientation to trust, governance, and system behavior in AI." />
      </Head>
      <FieldGuideOverviewPage />
    </>
  );
}
