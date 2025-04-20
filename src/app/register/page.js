import RegisterPage from "@/components/RegisterPage";
import React from "react";

const page = () => {
  return (
    <div
      style={{
        height: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RegisterPage />
    </div>
  );
};

export default page;
