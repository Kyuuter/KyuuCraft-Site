import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

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
        <span className="text-xl">
          This site is an ongoing project and is currently in the early stages of development. If you have any issues, please let <span className="font-bold">Spide6667</span> know so he can
          get it fixed. <span className="italic font-bold">Thank you for stopping by!</span>
        </span>
      </div>
    </>
  );
}

export default Home;