import React from "react";
import { useRouter } from "next/router";
import CardEditor from "../../components/CardEditor";

const EditCardPage: React.FC = () => {
  const router = useRouter();
  // Extract the "a" part from a URL like /a/b
  const pathParts = Array.isArray(router.query.routeName)
    ? router.query.routeName
    : typeof router.query.routeName === "string"
      ? [router.query.routeName]
      : [];
  const routeName = pathParts[0] || "";

  // CardEditor will fetch the real data in editMode
  return (
    <CardEditor initialData={{} as any} editMode={true} routeName={routeName as string} />
  );
};

export default EditCardPage; 