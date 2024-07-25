import { ContentLayout } from "@/components/layout/content-layout";
import React from "react";
import { CameraProvider } from "@/components/ui/camera/camera-provider";
import QuestionsUploader from "@/components/QuestionsUploader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function page() {
  const userId = (await getServerSession(authOptions))?.user.id as string;
  return (
    <ContentLayout title="SME">
      <CameraProvider>
        <QuestionsUploader userId={userId} />
      </CameraProvider>
    </ContentLayout>
  );
}
