import React, { useEffect } from "react";
import Resume from "@site/static/file/resume.pdf";

const DownloadFile = () => {
  useEffect(() => {
    // 文件 URL
    const fileUrl = Resume; // 替换为你的文件路径
    // 创建一个隐藏的链接元素
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "MiaoZhao(MuelNova).pdf"; // 替换为下载的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 下载完成后可以跳转到主页或其他页面，避免显示空白页面
    window.location.href = "/"; // 或者你可以重定向到你想要的页面
  }, []);

  return null; // 不返回任何 UI 元素
};

export default DownloadFile;
