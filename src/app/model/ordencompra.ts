import {Item} from './item';
export class Ordencompra {
  id: number;
  usuario: string;
  total: string;
  items: Item[] = [];
  status = 'ENVIADA';
}
