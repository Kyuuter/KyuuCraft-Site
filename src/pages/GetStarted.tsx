import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <>
      <div className="page-content-holder">
        <h1>Getting Started</h1>
        <p>This is a general guidelines for the server and how to get setup in it.</p>
        <div className="pl-10 pr-10">
            <h2>Prerequisites</h2>
            <ul>
                <li>You must be a subscriber on my Twitch channel! Being a sub automatically grants you the special role that gives you access to the server!</li>
                <li>
                    Make sure you link your Discord account to your Twitch account! This is how you'll get the sub role and access to the server!
                    <li className="italic font-bold">If your sub runs out, you'll be automatically removed from the server's whitelist so make sure you have an active sub on Twitch!</li>
                </li>
                <li>
                    Have a valid installation of Minecraft (Java only), version 1.21.11
                    <li className="italic">If you want to use Proxy chat (We use <a href="https://modrinth.com/plugin/plasmo-voice">Plasmo</a> for this), you should use a Launcher that allows for mods</li>
                </li>
            </ul>
            <h2>Getting Access to the Server</h2>
            <ul>
                <li>
                    You must Whitelist yourself using your linked Discord account inside of Kyuu's Server. To do this
                    <li className="italic"> Go to any channel you can send messages in and type <span className="bg-secondary">/minecraft [YOUR_MINECRAFT_USERNAME]</span></li>
                    <li>would look like this:</li>
                    <img src="assets/kyuubot.png" alt="Image of Kyuubot prompt"/>
                </li>
                <li>
                    Then you should be able to add the server inside of Minecraft by going to multiplayer and adding a server. Server name could be anything, the address should be <span className="bg-secondary">mc.kyuuter.com</span>.
                </li>
            </ul>
            <h3>See Next</h3>
            <div className="flex flex row justify-center gap-25">
                <Link to="/rules">
                    <Button>
                        Server Rules
                    </Button>
                </Link>
                <Link to="/cmds">
                    <Button>
                        Server Custom Commands
                    </Button>
                </Link>
            </div>
        </div>
      </div>
    </>
  );
}

export default GetStarted;