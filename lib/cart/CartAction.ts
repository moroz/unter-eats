import { CartState } from "./CartState";

export enum CartActionType {
  AddItem,
  ChangeItemQuantity
}

export interface AddItemAction {
  type: CartActionType.AddItem;
  id: string;
}

export interface ChangeItemAction {
  type: CartActionType.ChangeItemQuantity;
  id: string;
  quantity: number;
}

export type CartAction = AddItemAction | ChangeItemAction;
