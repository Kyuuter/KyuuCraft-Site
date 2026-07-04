import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import "./Features.css"


const Features = () => {
  const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        // console.debug(`[DEBUG FEATURES PAGE] location is ${hash}`);

        var element = document.getElementById("page-top");
        if (hash) {
        const elementId = hash.replace('#', '');
        element = document.getElementById(elementId);
        // console.debug(`[DEBUG FEATURES PAGE]\n elementID is ${elementId}\nelement is ${element}`);
        }

        if (element) {
            setTimeout(() => {
                element?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [location]);

    return (
        <div className="page-content-holder">
            <h1>Custom Server Features</h1>
            <p>This is a page to list off all custom physical interactions the server has added to Minecraft. To see a list of custom commands {" "}
                <Link to="/cmds" className='text-accent italic'>click here for the commands page</Link>.</p>
            <section id='toc' className='py-5'>
                <div className='flex flex-col items-center text-accent'>
                    <h2 className='text-foreground no-underline'>Table of contents</h2>
                    <Link to="/features#mob-spawner">Mob Spawners</Link>
                    <Link to="/features#farming">Farming</Link>
                    <Link to="/features#mods">Optional Mods Used</Link>
                </div>
            </section>
            <section id='mob-spawner' className='section-container'>
                <h2>Mob Spawners</h2>
                <p>
                    Mob Spawners can be harvested by using a pickaxe with Silk Touch. When harvested, it will give you a 
                    special block that will pasively harvest the corresponding mob. Spawners can be combined within the GUI
                    accessible by clicking on the block.  
                </p>
                <div className='feature-img-holder'>
                    <div className='flex flex-col items-center'>
                        <img src='assets/spawn-gui.png'/>
                        <span className='img-caption'>
                            Spawner Interface. Options from left to right is see items, sell items and get exp, and collect exp.
                        </span>
                    </div>
                    <div className='flex flex-col items-center max-w-88%'>
                        <img src='assets/spawn-details.png'/>
                        <span className='img-caption'>
                            Hovering the skull gives you detailed look on spawner stats.
                        </span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src='assets/spawn-stack.png'/>
                        <span className='img-caption'>
                            Interface for stacking spawners. Multiple spawners improve XP and item returns.
                        </span>
                    </div>
                </div>
            </section>
            <section id='farming' className='section-container'>
                <h2>Farming</h2>
                <p>
                    You can right click mature crops to harvest them without having to break them and replant the seeds.
                    This means that if you are using bonemeal, you can just hold right click to use all of it on one crop.
                </p>
                <div className='feature-img-holder'>
                    <div className='flex flex-col items-center'>
                        <img src='assets/farm-ready.png'/>
                        <span className='img-caption'>
                            Crops ready to be harvested.
                        </span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src='assets/farm-harvested.png'/>
                        <span className='img-caption'>
                            Crops after being harvested by right clicking.
                        </span>
                    </div>
                </div>
            </section>
            <section id='mods' className='section-container'>
                <h2>Optional Mods</h2>
                <p>
                    We currently only have one mod set up for proximity chat, which is <a href='https://modrinth.com/plugin/plasmo-voice'>Plasmo Voice</a>.
                    To get this set up you have two options: manual setup and using Seb's Modpack.
                </p>
                <div className='flex flex-row gap-10'>
                    <div className='flex flex-col w-1/2'>
                        <h3>Manual Way</h3>
                        <ul>
                            <li>Download the <a href='https://modrinth.com/plugin/plasmo-voice'>Plasmo Voice Mod</a></li>
                            <li>Add it to your mods folder or use a Minecraft Launcher like Prism or CursedForge</li>
                            <li>Log in and connect to the multiplayer server (<Link to="/get-started">See details for the Server here</Link>)</li>
                        </ul>
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <h3>Seb's Modpack</h3>
                        <ul>
                            <li>Download the modpack <a href='https://www.curseforge.com/minecraft/modpacks/kyuucraft' className='text-accent'>here</a>{" "} 
                            or using a launcher (project id is "1584466")</li>
                            <li>Log in and connect to the multiplayer server (<Link to="/get-started">See details for the Server here</Link>)</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Features;