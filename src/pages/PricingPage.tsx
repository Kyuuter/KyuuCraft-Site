import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import YAML from 'yaml';
import DefaultPageSkeleton from "@/utils/loading-objs/DefaultPageSkeleton";
import { Input } from "@/components/ui/input";


interface item {
    name:string;
    buy: number;
    sell: number;
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

async function handleLoad(option: string): Promise<item[]> {
    var result: item[] = [];
    var temp;
    option = option.toLowerCase();

    if (option == "all") {
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
    var result: item[] | null = null;
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
                    const values = {
                        name: temp.material,
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
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>("");
    const [data, setData] = useState<item[]>();
    const [showing, setShowing] = useState<item[]>();

    useEffect(() => {
        const fetchData = async () => {
            var loadData:item[] = [];
            try {
                if (pageOption)
                    loadData = await handleLoad(pageOption);
                else
                    loadData = await handleLoad("all");
            } catch (error) {
                console.error(error, data, showing);
            }
            finally{
                setData(loadData);
                setShowing(loadData);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(filter.length == 0){
            setShowing(data);
            return;
        }

        if (!data) {
            console.error("Attempted to filter before data loaded!!!!")
            return
        }
        setShowing(data.filter((value) => {
            const temp = value.name.toLowerCase();
            return temp.includes(filter.toLowerCase());
        }))
    }, [filter])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    return (<div>
        {loading ? <DefaultPageSkeleton/> : <div>
                {(!showing || !data) ? <h2>Data did not load properly!</h2> : (
                    <>
                        <Input placeholder="Filter by name"
                            value={filter}
                            onChange={handleChange}/>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Buy Price</th>
                                    <th>Sell Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showing.map((item) => (
                                    <tr key={item.name}>
                                        <td>{item.name}</td>
                                        <td>{item.buy}</td>
                                        <td>{item.sell}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
        </div>}
    </div>);
}

export default PricingPage;