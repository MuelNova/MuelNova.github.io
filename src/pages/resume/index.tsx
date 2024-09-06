import React, { useEffect } from "react";
import Resume from "@site/static/file/resume.pdf";

const ViewFile = () => {
  useEffect(() => {
    const fileUrl = Resume;
    window.open(fileUrl, "_blank");
    setTimeout(() => {
      window.location.href = "/";
    }, 1);
  }, []);

  return null;
};

export default ViewFile;
