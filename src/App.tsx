import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "@/pages/Home";
import TestThemes from "@/pages/TestThemes";
import CmdPage from "@/pages/CmdPage";
import GetStarted from "@/pages/GetStarted";
import PricingPage from "@/pages/PricingPage";
import Features from "@/pages/Features";
import Navbar from "@/components/Navbar";
import NotFound from "@/utils/NotFound";
import MdPageGen from "@/utils/MdPageGen";
import { getMarkdownPage } from "@/utils/CustomFunctions";
import "@/App.css";

export function App() {
  const [data, setData] = useState<Map<string,string>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const MdMap = await getMarkdownPage();
      if (MdMap === null) {
        console.error("Could not get Markdown File Map from public files");
      }
      else {
        setData(MdMap);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const list = (
    <>
      {(!loading && data && data.size > 0) && 
        <>
        {
          Array.from(data.entries()).map((name) => (
            <Route path={"/" + name[0]} Component={MdPageGen} />
            ))
        }
        </>
      }
    </>
  );

  return (
    <div className="shell-container" id='page-top'>
        <Router>
          <Navbar/>
          <div className="bg-gradient-to-r from-secondary via-background to-secondary main-holder">
              <div className="bg-background main-container">
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="/get-started" Component={GetStarted} />
                <Route path="/test/test-themes" Component={TestThemes} />
                <Route path="/cmds" Component={CmdPage} />
                <Route path="/pricing" Component={PricingPage}/>
                <Route path="/pricing/:pageOption" Component={PricingPage}/>
                <Route path="/features" Component={Features}/>
                <Route path="*" Component={NotFound} />
                {list}
              </Routes>
          </div>
          </div>
        </Router>
    </div>
  )
}

export default App
