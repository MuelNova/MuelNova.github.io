import React, { useEffect, useState } from "react";
import Resume from "@site/static/file/resume.pdf";
import { navigate } from "@docusaurus/router";

interface ViewFileProps {}

const ViewFile: React.FC<ViewFileProps> = () => {
  const [isOpening, setIsOpening] = useState(true);

  useEffect(() => {
    try {
      const fileUrl = Resume;
      const newWindow = window.open(fileUrl, "_blank");

      if (newWindow) {
        setIsOpening(false);
        navigate("/");
      } else {
        console.error("Failed to open resume in new window");
        setIsOpening(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error opening resume:", error);
      setIsOpening(false);
      navigate("/");
    }
  }, []);

  if (isOpening) {
    return <div>Opening resume...</div>;
  }

  return null;
};

export default ViewFile;
