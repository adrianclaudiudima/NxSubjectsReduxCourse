import { Component, Inject, TemplateRef, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Product } from "@ngrx-orders-workshop/libs/core/model";
import { MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { ProductsState, ProductsStateService } from "../../services/products-state.service";
import { Observable, of, take } from "rxjs";
import { CategorySummary } from "@ngrx-orders-workshop/libs/core/components/category-cards";
import { CartStateService } from "../../services/cart-state.service";
import { FavoriteStateService } from "../../services/favorite-state.service";

@Component({
  selector: "app-shop",
  templateUrl: "shop.component.html"
})
export class ShopComponent {

  shopState: Observable<ProductsState>;

  matSnackbarRef: MatSnackBarRef<any> | undefined;
  @ViewChild("templatePortalContent") templatePortalContent!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog, private snackBar: MatSnackBar,
    private productsStateService: ProductsStateService,
    private cartStateService: CartStateService
  ) {
    productsStateService.loadAllProducts();
    productsStateService.loadAllCategories();
    this.shopState = this.productsStateService.productsState$;

  }

  showProductDetails(product: Product): void {
    this.dialog.open(OverlayProductDetailsDialog, {
      width: "100%",
      maxWidth: "584px",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
      data: {
        product,
        numberOfServings: 1
      }
    });
  }

  handleAddToBag(product: Product) {
    this.cartStateService.addProductToCart({ product, quantity: 1 });
    this.matSnackbarRef = this.snackBar.openFromTemplate(this.templatePortalContent,
      {
        horizontalPosition: "end",
        verticalPosition: "top",
        data: product,
        duration: 4000,
        panelClass: "custom-snackbar"
      });
  }

  filterProducts(categorySummary: CategorySummary | undefined) {
    this.productsStateService.filterProducts(categorySummary);
  }

}

@Component({
  selector: "app-overlay-product-details",
  template: `
    <ng-container *ngIf="{value: isFavoriteProduct$ | async} as favorite">
      <app-product-details
        [product]="product"
        [favorite]="favorite.value"
        [quantity]="numberOfServing"
        (closeEvent)="closeDialog()"
        (addToBagEvent)="handleAddToBag($event)"
        (favoriteChanged)="handleFavoriteChanged($event)"
      >
      </app-product-details>
    </ng-container>


    <ng-template #templatePortalContent>
      <div class="flex flex-row items-center">
        <div>Product <span class="font-medium text-orange-500">{{product.name}}</span> was added to cart.</div>
        <ng-container *ngIf="matSnackbarRef">
          <button class="ml-2" mat-icon-button (click)="matSnackbarRef.dismiss()">
            <mat-icon svgIcon="close"></mat-icon>
          </button>
        </ng-container>
      </div>
    </ng-template>
  `
})
export class OverlayProductDetailsDialog {

  product: Product;
  isFavoriteProduct$: Observable<boolean>;
  numberOfServing: number;
  matSnackbarRef: MatSnackBarRef<any> | undefined;

  @ViewChild("templatePortalContent") templatePortalContent!: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<OverlayProductDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product; numberOfServings: number },
    private snackBar: MatSnackBar,
    private cartStateService: CartStateService,
    private favoriteStateService: FavoriteStateService
  ) {
    this.product = data.product;
    this.numberOfServing = data.numberOfServings;
    this.isFavoriteProduct$ = favoriteStateService.isFavoriteProduct(this.product).pipe(
      take(1)
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }


  handleAddToBag(item: { product: Product; quantity: number }) {
    this.cartStateService.addProductToCart(item);
    this.dialogRef.close();
    this.matSnackbarRef = this.snackBar.openFromTemplate(this.templatePortalContent,
      {
        horizontalPosition: "end",
        verticalPosition: "top",
        data: item.product,
        duration: 4000,
        panelClass: "custom-snackbar"
      });
  }

  handleFavoriteChanged(payload: { product: Product; favorite: boolean }) {
    this.favoriteStateService.updateFavoriteState(payload);
  }
}



