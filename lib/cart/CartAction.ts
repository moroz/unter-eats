import { CartState } from "./CartState";

export enum CartActionType {
  AddItem,
  ChangeItemQuantity,
  ResetState
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

export interface ResetStateAction {
  type: CartActionType.ResetState;
  state: CartState;
}

export type CartAction = AddItemAction | ChangeItemAction | ResetStateAction;
