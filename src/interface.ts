interface Client {
  listName: string;
  data: [iList];
}

interface iList {
  name: string;
  quantity: string;
  price: number;
}

interface iClientID extends Client {
  id: number;
}

type listRequeridData = "listName" | "data";

export { Client, iList, iClientID, listRequeridData };
