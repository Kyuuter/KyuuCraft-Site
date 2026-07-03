import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import YAML from 'yaml';
import DefaultPageSkeleton from "@/utils/loading-objs/DefaultPageSkeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


interface item {
    name:string;
    buy: number;
    sell: number;
    spawnertype?: string;
}

/* page options 
   ------------
   * Blocks
   * Decorations
   * Dyes
   * Enchanting
   * Farming
   * Food
   * Misc
   * Mobs
   * Music
   * Ores
   * Potions
   * Redstone
   * SpawnEggs
   * Spawners
   * Workstation
   * All others
*/

const itemSections = ["Blocks.yml","Decoration.yml","Dyes.yml","Enchanting.yml","Farming.yml","Food.yml","Mobs.yml","Music.yml",
    "Ores.yml","Potions.yml","Redstone.yml","SpawnEggs.yml","Spawners.yml","Workstations.yml","Z_EverythingElse.yml","Miscellaneous.yml"];

const itemExtension = new Map<string,string>([["Blocks","blocks"],["Decoration","decor"],["Dyes","dyes"],["Enchanted Books","enchant"],["Farm Items","farm"],["Food","food"],
    ["Mob Drops","mobs"],["Music Items","music"],["Ores","ores"],["Potions","potion"],["Redstone Items","redstone"],["Mob Eggs","eggs"],["Mob Spawners","spawners"],
    ["WorkStations","workstation"],["Misc Items","misc"],["All Items","all"]]);

async function handleLoad(option: string): Promise<item[]> {
    const result: item[] = [];
    let temp;
    option = option.toLowerCase();
    console.debug(`Hit load function\nOption is ${option}`);

    if (option == "all") {
        console.debug("Hit load all request");
        for (const item in itemSections) {
            temp = await pullData("data/itemPrices/" + itemSections[item]);
            if (temp) {
                result.push(...temp);
            }
        }
    }
    else if (option == "misc") {
        // "Z_EverythingElse.yml","Miscellaneous.yml"
        temp = await pullData("data/itemPrices/Z_EverythingElse.yml");
        if (temp) {
            result.push(...temp);
        }
        temp = await pullData("data/itemPrices/Miscellaneous.yml");
        if (temp) {
            result.push(...temp);
        }
    }
    else {
        const file = {
            blocks:"Blocks.yml",
            decor:"Decoration.yml",
            dyes:"Dyes.yml",
            enchant:"Enchanting.yml",
            farm:"Farming.yml",
            food:"Food.yml",
            mobs:"Mobs.yml",
            music:"Music.yml",
            ores:"Ores.yml",
            potion:"Potions.yml",
            redstone:"Redstone.yml",
            eggs:"SpawnEggs.yml",
            spawners:"Spawners.yml",
            workstation:"Workstations.yml"
        }[option] ?? null;

        if (file) {
            temp = await pullData("data/itemPrices/" + file);
            if (temp) {
                result.push(...temp);
            }
        }
    }
    return result;
}

async function pullData(filepath:string): Promise<item[] | null> {
    console.log("Pulling data for group: ", filepath);
    let result: item[] | null = null;
    const data = await fetch(filepath);

    if (data) {
        const parse = YAML.parse(await data.text())['pages'];
        for (const page in parse) {
            const items = parse[page]["items"];
            if (items) {
                result = result ? result : [];
                for (const item in items)
                {
                    const temp = items[item];
                    let itemName = temp.material.replaceAll("_", " ");

                    if (temp.spawnertype) {
                        itemName = temp.spawnertype.replaceAll("_", " ") + " " +  itemName;
                    }
                    else if (temp.potiontypes && temp.potiontypes[0]){
                        itemName = itemName + " OF " + temp.potiontypes[0].replaceAll("_", " ").toUpperCase();
                    }
                    else if (temp.enchantments && temp.enchantments[0]) {
                        itemName = itemName + " OF " + temp.enchantments[0].replaceAll("_", " ").toUpperCase().split(":")[0];
                    }
                    else if (temp.instrument) {
                        itemName = itemName + " OF " + temp.instrument.toUpperCase();
                    }

                    const values = {
                        name: itemName,
                        buy: temp.buy,
                        sell: temp.sell
                    };
                    result.push(values);
                }
            }
            else {
                console.error("Could not parse items\nparse:",parse,"\nitems:",items);
            }
        }
    }

    return result;
}

function PricingPage() {
    const { pageOption } = useParams();
    const [currOption, setCurrOption] = useState<string>(pageOption ? pageOption.toString() : "all");
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");
    const [data, setData] = useState<item[]>();
    const [optionDiv, setOptionDiv] = useState(<div/>);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const showing = useMemo(() => {
        return data?.filter((value) => {
                const temp = value.name.toLowerCase();
                return temp.includes(filter.toLowerCase());
            });
    }, [data, filter]);

    const fetchData = useCallback(async () => {
        let loadData:item[] = [];
        try {
            loadData = await handleLoad(currOption);
        } catch (error) {
            console.error(error);
        }
        finally{
            setData(loadData);
            setLoading(false);
            setOptionDiv(<div className="grid grid-cols-5 place-items-center pt-5">
                    {
                    Array.from([...itemExtension.entries()].filter(([, value]) => value != pageOption)).map((temp) => (
                            <Link className="flex pb-5" to={"/pricing/" + temp[1]} onClick={() => setCurrOption(temp[1])}>
                                <p>{temp[0]}</p>
                            </Link>
                    ))
                    }
                </div>
            );
            setIsMenuOpen(false);
            setLoading(false);
        }
    },[currOption, pageOption]);

    // For loading data
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            console.debug("Loading pricing data.");
            await fetchData();
        }
        load();
    }, [fetchData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    return (<div className="w-4/5">
        {loading ? <DefaultPageSkeleton/> : <div>
                {(!showing || !data) ? <h2>Data did not load properly!</h2> : (
                    <>
                    {isMenuOpen ? optionDiv : <div className="flex flex-row p-2">
                        <Input placeholder="Filter by name"
                            value={filter}
                            onChange={handleChange}/>
                        <Button
                            className="ml-2"
                            onClick={()=>setIsMenuOpen(true)}>
                                Change Category
                        </Button>
                        </div>
                    }
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-bold">Name</TableHead>
                                    <TableHead className="font-bold">Buy Price</TableHead>
                                    <TableHead className="font-bold">Sell Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {showing.map((item, count) => (
                                    <TableRow key={item.name} className={count % 2 == 0 ? "bg-secondary" : ""}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>$ {item.buy}</TableCell>
                                        <TableCell>$ {item.sell}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                )}
        </div>}
    </div>);
}

export default PricingPage;