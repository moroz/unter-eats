export enum CartActionType {
  AddItem,
  ChangeItemQuantity,
  Reset
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

export interface ResetCartAction {
  type: CartActionType.Reset;
}

export type CartAction = AddItemAction | ChangeItemAction | ResetCartAction;
