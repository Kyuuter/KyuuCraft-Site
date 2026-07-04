export interface CmdList {
    categories:string[];
    data: Map<string, CmdObj[]>;
}

export interface CmdObj {
  name?: string;
  desc: string;
  options?: string[][];
  aka?: string[]; 
}

export async function getCmdList(): Promise<CmdList> {
  const response = await fetch("data/cmd.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // For testing loading page feature numOfSeconds * 1000
  //await new Promise((resolve) => setTimeout(resolve, 1000 * 1000));

  const json = await response.json();
  //console.debug("CMD JSON:", json);

  const categories: string[] = [];
  const data: Map<string, CmdObj[]> = new Map<string, CmdObj[]>();
  for (const category in json) {
    const value = json[category];
    categories.push(category);

    const temp: CmdObj[] = handleJsonObj(value);
    data.set(category, temp);
  }

  return {
    categories: categories,
    data: data
  };
};

function handleJsonObj(value: object): CmdObj[] {
  //console.debug("Print", value);
  const array:CmdObj[] = [];

  for (const [cmd, obj] of Object.entries(value)) {
    //console.debug(cmd, " = ", obj);
    let temp = {"name": cmd, "desc": ""}
    for (const [piece,val] of Object.entries(obj)) {
      temp = {...temp, [piece]:val};
    }
    const tete:CmdObj = temp;
    array.push(tete)
  }

  return array;
}