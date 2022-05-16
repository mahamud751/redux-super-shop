import { CART_DELETE, ITEM_ADD, ITEM_REMOVE } from "../types";

export const item_add = (item) => {
  return {
    type: ITEM_ADD,
    payload: item,
  };
};
export const item_remove = (item) => {
  return {
    type: ITEM_REMOVE,
    payload: item,
  };
};
export const cart_delete = (id) => {
  return {
    type: CART_DELETE,
    payload: id,
  };
};
