import AboutSectionServer from "@/components/serverComponents/AboutServer";
import React from "react";

export const revalidate = 60;

const page = () => {
  return <AboutSectionServer />;
};

export default page;
