import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoadingCmdPage from "@/utils/loading-objs/CmdPage";
import {
  type CmdList,
  getCmdList,
} from "@/utils/parse-cmds";
import "./CmdPage.css";


const ProjectList = () => {
  const [data, setData] = useState<CmdList>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCmdList();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const title = loading ? "Loading..." : "Server Commands";

  const list = (
    <>
      {loading ? (
        <LoadingCmdPage />
      ) : (
        <div>
          {(data && data.data && data.data.size > 0) ?
          <ul>
            {
              Array.from(data.data.entries()).map(([key, list]) => (
                <div key = {key}>
                <h3>{key}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    {list.map((element) => (
                      <Card key={element.name} className="flex flex-col content-start gap-1">
                        <CardHeader>
                          <div>
                            <CardTitle><p className="cmd-header">{element.name}</p></CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="flex flex-col content-start p-y-0">
                          <p className="cmd-content">
                            {element.desc}
                          </p>
                          {(element.options && element.options.length > 0) && (
                            <div className="flex flex-col pt-2">
                              <p className="cmd-header">Options</p>
                              <ul className="pl-2" key={element.name}>
                                {
                                  element.options.map((optionArr) => (
                                    <li key={optionArr[0]} className="cmd-title"> {optionArr[0]} 
                                      <p className="cmd-content">{optionArr[1]}</p>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          )}
                          {(element.aka && element.aka.length > 0) && (
                            <div className="flex flex-col pt-2">
                              <p className="cmd-header">Shorthands</p>
                              <ul className="pl-2" key={element.name}>
                                {element.aka.map((value:string, index:number) => (
                                  <div key={index}>{value}</div>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}    
                  </div>
                </div>
                ))
            }
          </ul> : <p>ERROR: No Data Provided!!</p>
          }
        </div>
      )}
    </>
  );
  return (
    <div className="page-content-holder">
      {/*ClassName comes from index.css*/}
      <h2>{title}</h2>
      <Separator />
      {list}
    </div>
  );
};
export default ProjectList;