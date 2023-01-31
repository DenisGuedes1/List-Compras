interface Client {
  listName: string;
  data: iList[];
}

interface iList {
  id: number;
  name: string;
  quantity: string;
}

interface iClientID extends Client {
  id: number;
}

type listRequeridData = "listName" | "data";

export { Client, iList, iClientID, listRequeridData };
