import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useOutletContext, useParams } from "react-router-dom";
import DocViewer from "@cyntler/react-doc-viewer";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Loading from "../Loading";

import "@react-pdf-viewer/core/lib/styles/index.css";

const languageExtensions = {
  bash: "bash",
  basic: "basic",
  c: "c",
  cpp: "cpp",
  csp: "csp",
  css: "css",
  dart: "dart",
  go: "go",
  java: "java",
  js: "javascript",
  json: "json",
  latex: "latex",
  md: "markdown",
  nginx: "nginx",
  php: "php",
  txt: "plaintext",
  py: "python",
  r: "r",
  rb: "ruby",
  rs: "rust",
  scss: "scss",
  sh: "shell",
  sql: "sql",
  swift: "swift",
  ts: "typescript",
  vim: "vim",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
};

const Resource = () => {
  const { id, fileId } = useParams();
  const [project] = useOutletContext();
  const { token } = useSelector((store) => store.directory);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [resource, setResource] = useState({});
  const [codeContent, setCodeContent] = useState(null);
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    const fetchResource = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/resources/${fileId}?projectId=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResource(res.data.resource);
      const names = res.data.resource.name.split(".");
      const fileType = names[names.length - 1];
      if (["pdf", "pptx", "ppt", "doc", "docx"].includes(fileType)) {
        return;
      }
      if (Object.keys(languageExtensions).includes(fileType)) {
        setLanguage(languageExtensions[fileType]);
      } else {
        setLanguage("javascript");
      }
      const resourceUrl = res.data.resource.url;
      if (resourceUrl) {
        const response = await fetch(resourceUrl);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch code content");
        }
        const codeText = await response.text();
        setCodeContent(codeText);
      }
    };
    try {
      setIsLoading(true);
      fetchResource();
    } catch (error) {
      console.log("error");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [token, fileId, id]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="w-full h-full flex flex-col gap-1 items-center justify-center">
        <p className="text-xl">Something went wrong !</p>
        <p>Please try again later</p>
      </div>
    );
  }

  return (
    <div className="px-[60px] py-6 flex flex-col gap-8 h-[calc(100vh-64px)]">
      <div className="flex flex-col gap-1">
        <p className="text-cancelText text-sm">
          <Link to="/user/directory">Directory /</Link>
          <span className="cursor-pointer"> {project.name}</span>
        </p>
        <h1 className="text-2xl 2xl:text-3xl font-medium">{resource.name}</h1>
      </div>
      <div className="flex-[1_0_0] overflow-auto">
        {codeContent ? (
          <SyntaxHighlighter language={language} style={docco}>
            {codeContent}
          </SyntaxHighlighter>
        ) : resource.url && resource.name.endsWith(".pdf") ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div className="flex-1 overflow-y-auto">
              <Viewer fileUrl={resource?.url || ""} />
            </div>
          </Worker>
        ) : (
          <DocViewer prefetchMethod="GET" documents={[{ uri: resource.url }]} />
        )}
      </div>
    </div>
  );
};

export default Resource;
