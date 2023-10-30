"use client";
import { IProductInCart } from "@/types/product";
import { createContext, useReducer, Dispatch } from "react";

interface InitialState {
  products: IProductInCart[];
}

interface IDispatch {
  action: string;
  payload?: { productId: string };
}

const initialState: InitialState = {
  products: [],
};

export const CartContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<IDispatch>;
}>({
  state: initialState,
  dispatch: () => {},
});

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    if (window.localStorage.getItem("cart"))
      initialState.products = JSON.parse(
        window.localStorage.getItem("cart") || "[]"
      );
    return initialState;
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function reducer(state: InitialState, dispatch: IDispatch) {
  let products: IProductInCart[] = [];

  switch (dispatch.action) {
    case "ADD_TO_CART":
      if (dispatch.payload) {
        const index = state.products.findIndex(
          (p) => p.productId === dispatch.payload?.productId
        );
        // if product exist in state
        if (index > -1) {
          const { productId, quantity } = state.products[index];
          state.products[index] = {
            productId,
            quantity: quantity ? quantity + 1 : quantity,
          };
          products = [...state.products];
        } else {
          products = [
            ...state.products,
            { productId: dispatch.payload.productId, quantity: 1 },
          ];
        }
      }
      localStorage.setItem("cart", JSON.stringify(products));
      return {
        products,
      };

    case "REMOVE_FROM_CART":
      if (dispatch.payload) {
      }
      (products = state.products.filter(
        (product) =>
          dispatch.payload && product.productId !== dispatch.payload.productId
      )),
        localStorage.setItem("cart", JSON.stringify(products));
      return {
        products,
      };

    case "CLEAR_CART":
      localStorage.setItem("cart", JSON.stringify([]));
      return {
        products: [],
      };

    case "INCREASE_QUANTITY":
      if (dispatch.payload)
        products = state.products.map((product) => {
          if (
            dispatch.payload &&
            product.productId === dispatch.payload.productId &&
            product.quantity
          ) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
      localStorage.setItem("cart", JSON.stringify(products));
      return {
        products,
      };

    case "DECREASE_QUANTITY":
      products = state.products.map((product) => {
        if (
          dispatch.payload &&
          product.productId === dispatch.payload.productId &&
          product.quantity
        ) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      return {
        products,
      };

    default:
      return state;
  }
}
