import BlogServer from "@/components/serverComponents/BlogServer";
import React from "react";

export const revalidate = 60;

const Blogs = () => {
  return <BlogServer />;
};

export default Blogs;
