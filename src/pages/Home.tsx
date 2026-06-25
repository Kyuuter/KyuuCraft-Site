import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="page-content-holder">
        <h1>Kyuucraft Website Home Page</h1>
        <Separator/>
        <br/>
        <span className="text-xl">
            Welcome to the page for the Website for the KyuuCraft Minecraft Server. To get started and into the server, see our page on <Link to="/get-started">Getting Started</Link>.
            If you have questions about our custom server commands or want to see all available commands, see the <Link to="/cmds">Server Commands List</Link>.
        </span>
        <br/>
        <h2>Suggested Pages</h2>
        <div className="grid grid-cols-2 gap-2">
          <Link to="pricing" className="suggested-page-link">
            <h3 className="font-bold">Item Prices</h3>
            <span className="suggested-page-body">View the server's prices for selling and buying items</span>
          </Link>
          <Link to="get-started" className="suggested-page-link">
            <h3 className="font-bold">Getting Started</h3>
            <span className="suggested-page-body">See onboarding info for getting started with the server</span>
          </Link>
          <Link to="rules" className="suggested-page-link">
            <h3 className="font-bold">Server Rules</h3>
            <span className="suggested-page-body">View general server rules and etiquette</span>
          </Link>
          <Link to="cmds" className="suggested-page-link">
            <h3 className="font-bold">Server Commands</h3>
            <span className="suggested-page-body">Get a list of all custom commands you can use on the server</span>
          </Link>
        </div>
        <br/>
        <span className="text-xl">
          This site is an ongoing project and is currently in the early stages of development. If you have any issues, please let <span className="font-bold">Spide6667</span> know so he can
          get it fixed. <span className="italic font-bold">Thank you for stopping by!</span>
        </span>
      </div>
    </>
  );
}

export default Home;