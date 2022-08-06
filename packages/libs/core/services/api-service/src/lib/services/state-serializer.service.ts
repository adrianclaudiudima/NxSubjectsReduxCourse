import { Injectable } from "@angular/core";
import { Product, ProductOrder } from "@ngrx-orders-workshop/libs/core/model";
import * as uuid from "uuid";


@Injectable()
export class StateSerializerService {

  stateKey = "stateKey";
  userKey = "userKey";

  private productsState: SavedProducts = {
    cartProducts: [],
    favoriteProducts: []
  };

  private userState: {
    id: string;
  } | undefined;


  constructor() {
    const userState = window.localStorage.getItem(this.userKey);
    if (userState) {
      this.userState = JSON.parse(userState);
    } else {
      window.localStorage.setItem(this.userKey, JSON.stringify({ id: uuid.v4() }));
    }
  }

  public saveFavoriteProducts(favoriteProducts: Product[]) {
    this.productsState = { ...this.productsState, favoriteProducts: favoriteProducts };
    window.localStorage.setItem(this.stateKey, JSON.stringify(this.productsState));
  }

  public saveCartProducts(cartProducts: ProductOrder[]) {
    this.productsState = { ...this.productsState, cartProducts: cartProducts };
    window.localStorage.setItem(this.stateKey, JSON.stringify(this.productsState));
  }

  public clearState() {
    this.productsState = { cartProducts: [], favoriteProducts: [] };
    window.localStorage.setItem(this.stateKey, JSON.stringify(this.productsState));
  }

  restoreState(): SavedProducts {
    const state = window.localStorage.getItem(this.stateKey);
    if (state) {
      this.productsState = JSON.parse(state);
    }
    return this.productsState;
  }

  getUserState() {
    return this.userState;
  }

}

export interface SavedProducts {
  favoriteProducts: Product[];
  cartProducts: ProductOrder[];
}
