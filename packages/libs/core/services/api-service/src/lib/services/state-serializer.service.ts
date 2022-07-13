import { Injectable } from "@angular/core";
import { Product, ProductOrder } from "@ngrx-orders-workshop/libs/core/model";

@Injectable()
export class StateSerializerService {

  stateKey = "stateKey";

  state: SavedProducts = {
    cartProducts: [],
    favoriteProducts: []
  };

  constructor() {
  }

  public saveFavoriteProducts(favoriteProducts: Product[]) {
    this.state = { ...this.state, favoriteProducts: favoriteProducts };
    window.localStorage.setItem(this.stateKey, JSON.stringify(this.state));
  }

  public saveCartProducts(cartProducts: ProductOrder[]) {
    this.state = { ...this.state, cartProducts: cartProducts };
    window.localStorage.setItem(this.stateKey, JSON.stringify(this.state));
  }

  public clearState() {
    this.state = { cartProducts: [], favoriteProducts: [] };
    window.localStorage.setItem(this.stateKey, JSON.stringify(this.state));
  }

  restoreState(): SavedProducts {
    const state = window.localStorage.getItem(this.stateKey);
    if (state) {
      this.state = JSON.parse(state);
    }
    return this.state;
  }

}

export interface SavedProducts {
  favoriteProducts: Product[];
  cartProducts: ProductOrder[];
}
