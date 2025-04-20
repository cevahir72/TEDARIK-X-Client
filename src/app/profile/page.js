import React from "react";
import ProfilePage from "@/components/ProfilePage";

const page = ({params}) => {
  const {id} = params;

  return (
    <div>
      <ProfilePage id={id} />
    </div>
  );
};

export default page;
