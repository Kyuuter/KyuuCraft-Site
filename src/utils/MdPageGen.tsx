import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  type State,
  Status,
} from "@/utils/CustomTypes";
import NotFound from "@/utils/NotFound";
import DefaultPageSkeleton from "@/utils/loading-objs/DefaultPageSkeleton";
import { getMarkdownPage } from "./CustomFunctions";

const ProjectDetails: React.FC = () => {
  const [state, setState] = useState<State>({status:Status.Loading});

  useEffect(() => {
    const fetchData = async () => {
      if (state.status != Status.Loading)
        return;

      try {
        const MdPath = await getMarkdownPage();
        if (MdPath === null) {
          setState({status:Status.Error, errorCode:"Could not find Md Data File!!"});
        }
        else{
          const pathSections = window.location.hash.split("/");
          const name = pathSections[1];
          console.debug("MD GEN PAGE: name = ", name);
          const filePath = MdPath.get(name);
          console.debug("MD GEN PAGE: filePath = ", filePath);
          if (filePath) {
            const temp = await (await fetch(filePath)).text();
            setState({status:Status.Loaded, content: temp});
          }
          else {
            setState({status:Status.Error, errorCode:"Filepath was not defined!!"});
          }
        }
      }catch (error: unknown) { 
        if (error instanceof Error) {
          setState({status:Status.Error, errorCode:error.message});
        } else {
          setState({status:Status.Error, errorCode:"An unexpected error occurred" + String(error)});
        }
        
      }
    }
    fetchData();
  }, [state]);

  switch (state.status) {
    case Status["Loaded"]:
      return (
        <div className="page-content-holder">
          <ReactMarkdown>
              {state.content}
            </ReactMarkdown>
        </div>
      );

    case Status.Loading:
      return <DefaultPageSkeleton />;

    default:
      console.log(state.errorCode);
      return <NotFound />;
  }
};

export default ProjectDetails;