import { ContentLayout } from "@/components/layout/content-layout";
import { QCQuestionTable } from "@/components/QCQuestionTable";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  return (
    <ContentLayout title="QC">
      <QCQuestionTable reviewerId={session?.user.id!} />
    </ContentLayout>
  );
}
