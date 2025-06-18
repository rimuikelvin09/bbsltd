"use client";
import { useParams } from "next/navigation";

const ProjectPage = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>Project: {slug}</h1>
      <p>This page will display details for project: {slug}</p>
      {/* You'll fetch and display project data here based on the slug */}
    </div>
  );
};

export default ProjectPage;
