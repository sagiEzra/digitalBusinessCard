import React from "react";
import { useRouter } from "next/router";
import CardEditor from "../../components/CardEditor";

const EditCardPage: React.FC = () => {
  const router = useRouter();
  const { routeName } = router.query;

  // CardEditor will fetch the real data in editMode
  return (
    <CardEditor initialData={{} as any} editMode={true} routeName={routeName as string} />
  );
};

export default EditCardPage; 