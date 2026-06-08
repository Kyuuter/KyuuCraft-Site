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
                <h1>{key}</h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {list.map((element) => (
                      <Card key={element.name} className="flex flex-col content-start">
                        <CardHeader>
                          <div>
                            <CardTitle><h2>{element.name}</h2></CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="flex flex-col content-start">
                          <p className="text-xs italic">
                            {element.desc}
                          </p>
                          {(element.options && element.options.length > 0) && (
                            <div className="flex flex-col">
                              <br />
                              <h3>Options</h3>
                              <ul className="pl-2" key={element.name}>
                                {
                                  element.options.map((optionArr) => (
                                    <li key={optionArr[0]} className="text-xs/5 font-bold"> {optionArr[0]} 
                                      <p className="italic font-normal">{optionArr[1]}</p>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          )}
                          {(element.aka && element.aka.length > 0) && (
                            <div className="flex">
                              <br />
                              <h3>Shorthand</h3>
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
      <h1>{title}</h1>
      <Separator />
      {list}
    </div>
  );
};
export default ProjectList;