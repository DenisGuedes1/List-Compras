interface Client {
  nome: string;
  valor: string;
  quantidade: string;
}
type ClienteRequiredKeys = "nome" | "valor" | "quantidade";
// interface IdClient extends Client {
//   id: number;
// }
interface Listnew extends Client {
  id: number;
  listName: string;
  data: Client[];
}
export { Client, Listnew, ClienteRequiredKeys };
