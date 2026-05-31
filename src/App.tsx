import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./utils/NotFound";
import { ThemeProvider } from "./utils/ThemeProvider";
import Home from "@/components/Home";
import Navbar from "@/components/NavBar";
import "./App.css";
import TestingStyling from "@/components/TestingStyling";

const App: React.FC = () => {
  return (
    <div className="site-holder">
      <ThemeProvider defaultTheme="Dark" storageKey="vite-ui-theme">
        <Router>
          <Navbar />
          <div className="page-holder">
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/test-styling" Component={TestingStyling} />
              <Route path="/404" Component={NotFound} />
              <Route path="*" Component={NotFound} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
