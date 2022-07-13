import { Product } from "./entities/product.model";
import { CategorySummary } from "@ngrx-orders-workshop/libs/core/components/category-cards";

/** Static data generator - using mockaroo */
export const getCategoriesNames = (): Array<CategorySummary> => {
  return [
    { name: "Pizza", image: "assets/food/category/pizza.jpg", type: "PIZZA" },
    { name: "Pasta", image: "assets/food/category/pasta.jpg", type: "PASTA" },
    { name: "Steak", image: "assets/food/category/steak.jpg", type: "STEAK" },
    { name: "Drinks", image: "assets/food/category/drinks.jpg", type: "DRINKS" }
  ];
};

export const getAllProducts = () => getPizzaProducts().concat(getSteakProducts()).concat(getPastaProducts()).concat(getDrinks());

export const getPizzaProducts = (): Product[] => {
  return pizza_products.map(p => {
    return {
      ...p,
      img: `assets/food/pizza/${p.img}.jpg`,
      size: `${p.size} g`,
      productType: "PIZZA"
    };
  });
};

export const getDrinks = (): Product[] => {
  return drinks.map(p => {
    return {
      ...p,
      img: `assets/food/drinks/${p.img}.jpg`,
      size: `${p.size} g`,
      productType: "DRINKS"
    };
  });
};


export const getSteakProducts = (): Product[] => {
  return steakProducts.map(p => {
    return {
      ...p,
      img: `assets/food/steak/${p.img}.jpg`,
      size: `${p.size} g`,
      productType: "STEAK"
    };
  });
};

export const getPastaProducts = (): Product[] => {
  return steakProducts.map(p => {
    return {
      ...p,
      img: `assets/food/pasta/${p.img}.jpg`,
      size: `${p.size} g`,
      productType: "PASTA"
    };
  });
};


const pasta_products = [{
  "id": 1,
  "img": 1,
  "ingredients": [
    "Eggs",
    "Onion",
    "Tomato",
    "Shrimp"
  ],
  "price": 6.56,
  "name": "Pasta al Pesto",
  "reviewNumber": 828,
  "reviewStar": 4.04,
  "size": 259
}, {
  "id": 2,
  "img": 2,
  "ingredients": [
    "Eggs",
    "Garlic"
  ],
  "price": 19.09,
  "name": "Ziti alla Norma",
  "reviewNumber": 583,
  "reviewStar": 1.23,
  "size": 296
}, {
  "id": 3,
  "img": 3,
  "ingredients": [
    "Onion",
    "Ton"
  ],
  "price": 13.31,
  "name": "Tagliatelle alla Bolognese",
  "reviewNumber": 1136,
  "reviewStar": 3.3,
  "size": 423
}, {
  "id": 4,
  "img": 4,
  "ingredients": [
    "Ton",
    "Garlic",
    "Cheese",
    "Eggs"
  ],
  "price": 19.43,
  "name": "Lo Spaghetto al Pomodoro",
  "reviewNumber": 752,
  "reviewStar": 1.77,
  "size": 556
}, {
  "id": 5,
  "img": 5,
  "ingredients": [
    "Cheese",
    "Mushrooms"
  ],
  "price": 14.66,
  "name": "Pappardelle ai Funghi",
  "reviewNumber": 388,
  "reviewStar": 4.94,
  "size": 219
}, {
  "id": 6,
  "img": 6,
  "ingredients": [
    "Ton",
    "Tomato"
  ],
  "price": 9.32,
  "name": "Pasta all'Arrabbiata",
  "reviewNumber": 949,
  "reviewStar": 3.1,
  "size": 486
}, {
  "id": 7,
  "img": 7,
  "ingredients": [
    "Cheese"
  ],
  "price": 5.54,
  "name": "Lasagne alla Bolognese",
  "reviewNumber": 1064,
  "reviewStar": 4.23,
  "size": 312
}, {
  "id": 8,
  "img": 8,
  "ingredients": [
    "Shrimp"
  ],
  "price": 19.47,
  "name": "Spaghetti alle Vongole",
  "reviewNumber": 121,
  "reviewStar": 4.07,
  "size": 203
}, {
  "id": 9,
  "img": 9,
  "ingredients": [
    "Ton",
    "Eggs",
    "Cheese"
  ],
  "price": 17.37,
  "name": "Tagliatelle al Tartufo",
  "reviewNumber": 785,
  "reviewStar": 2.06,
  "size": 469
}, {
  "id": 10,
  "img": 10,
  "ingredients": [
    "Cheese",
    "Tomato",
    "Ton"
  ],
  "price": 8.38,
  "name": "Pasta al Tonno",
  "reviewNumber": 567,
  "reviewStar": 2.82,
  "size": 398
}];


const pizza_products = [{
  "id": 1,
  "img": 1,
  "ingredients": [
    "Basil",
    "Fresh Tomato"
  ],
  "price": 17.84,
  "name": "Cheese Pizza",
  "reviewNumber": 860,
  "reviewStar": 3.89,
  "size": 403
}, {
  "id": 2,
  "img": 2,
  "ingredients": [
    "Chicken",
    "Cream Sauce",
    "Sweet Corn",
    "Fresh Tomato",
    "Baby Spinach"
  ],
  "price": 5.88,
  "name": "Veggie Pizza",
  "reviewNumber": 148,
  "reviewStar": 3.55,
  "size": 302
}, {
  "id": 3,
  "img": 3,
  "ingredients": [
    "Baby Spinach",
    "Basil",
    "Cream Sauce",
    "Fresh Tomato",
    "Chicken"
  ],
  "price": 9.98,
  "name": "Pepperoni Pizza",
  "reviewNumber": 994,
  "reviewStar": 3.76,
  "size": 486
}, {
  "id": 4,
  "img": 4,
  "ingredients": [
    "Baby Spinach",
    "Sweet Corn",
    "Chicken"
  ],
  "price": 5.14,
  "name": "Meat Pizza",
  "reviewNumber": 881,
  "reviewStar": 2.79,
  "size": 238
}, {
  "id": 5,
  "img": 5,
  "ingredients": [
    "100% Mozzarella",
    "Cream Sauce",
    "Cheddar",
    "Chicken",
    "Sweet Corn"
  ],
  "price": 18.9,
  "name": "Margherita Pizza",
  "reviewNumber": 644,
  "reviewStar": 4.11,
  "size": 180
}, {
  "id": 6,
  "img": 6,
  "ingredients": [
    "100% Mozzarella",
    "Baby Spinach",
    "Basil",
    "Sweet Corn"
  ],
  "price": 12.43,
  "name": "BBQ Chicken Pizza",
  "reviewNumber": 1128,
  "reviewStar": 1.18,
  "size": 557
}, {
  "id": 7,
  "img": 7,
  "ingredients": [
    "Cream Sauce",
    "Baby Spinach",
    "Cheddar",
    "Fresh Tomato",
    "Basil"
  ],
  "price": 6.65,
  "name": "Hawaiian Pizza",
  "reviewNumber": 736,
  "reviewStar": 1.92,
  "size": 192
}, {
  "id": 8,
  "img": 8,
  "ingredients": [
    "Sweet Corn",
    "100% Mozzarella"
  ],
  "price": 14.86,
  "name": "Buffalo Pizza",
  "reviewNumber": 554,
  "reviewStar": 2.41,
  "size": 309
}, {
  "id": 9,
  "img": 9,
  "ingredients": [
    "Cheddar",
    "100% Mozzarella",
    "Sweet Corn"
  ],
  "price": 15.05,
  "name": "Supreme Pizza",
  "reviewNumber": 868,
  "reviewStar": 3.15,
  "size": 209
}, {
  "id": 10,
  "img": 10,
  "ingredients": [
    "100% Mozzarella",
    "Fresh Tomato"
  ],
  "price": 7.38,
  "name": "The Works Pizza",
  "reviewNumber": 331,
  "reviewStar": 3.76,
  "size": 223
}];

const steakProducts = [{
  "id": 1,
  "img": 1,
  "ingredients": [
    "Butter",
    "Tomatoes"
  ],
  "price": 9.65,
  "name": "Ribeye Steak",
  "reviewNumber": 996,
  "reviewStar": 3.59,
  "size": 234
}, {
  "id": 2,
  "img": 2,
  "ingredients": [
    "Marinade"
  ],
  "price": 16.59,
  "name": "Tenderloin Steak",
  "reviewNumber": 516,
  "reviewStar": 3.72,
  "size": 350
}, {
  "id": 3,
  "img": 3,
  "ingredients": [
    "Smoked paprika",
    "Potato",
    "Butter",
    "Mushrooms",
    "Pepper"
  ],
  "price": 19.47,
  "name": "Strip Steak",
  "reviewNumber": 269,
  "reviewStar": 3.2,
  "size": 558
}, {
  "id": 4,
  "img": 4,
  "ingredients": [
    "Marinade",
    "Mushrooms"
  ],
  "price": 11.7,
  "name": "Hanger Steak",
  "reviewNumber": 282,
  "reviewStar": 0.96,
  "size": 375
}, {
  "id": 5,
  "img": 5,
  "ingredients": [
    "Rosemary",
    "Garlic",
    "Butter",
    "Pepper",
    "Smoked paprika"
  ],
  "price": 16.08,
  "name": "T-Bone Steak",
  "reviewNumber": 637,
  "reviewStar": 4.52,
  "size": 282
}, {
  "id": 6,
  "img": 6,
  "ingredients": [
    "Mushrooms",
    "Pepper",
    "Smoked paprika",
    "Tomatoes"
  ],
  "price": 13.97,
  "name": "Flank Steak",
  "reviewNumber": 836,
  "reviewStar": 4.95,
  "size": 184
}, {
  "id": 7,
  "img": 7,
  "ingredients": [
    "Pepper",
    "Potato",
    "Tomatoes",
    "Rosemary"
  ],
  "price": 17.57,
  "name": "Skirt Steak",
  "reviewNumber": 612,
  "reviewStar": 4.19,
  "size": 335
}, {
  "id": 8,
  "img": 8,
  "ingredients": [
    "Marinade",
    "Potato"
  ],
  "price": 13.55,
  "name": "Flat Iron Steak",
  "reviewNumber": 69,
  "reviewStar": 2.09,
  "size": 303
}, {
  "id": 9,
  "img": 9,
  "ingredients": [
    "Rosemary",
    "Pepper",
    "Garlic",
    "Smoked paprika"
  ],
  "price": 17.8,
  "name": "Short Ribs",
  "reviewNumber": 1083,
  "reviewStar": 4.78,
  "size": 248
}, {
  "id": 10,
  "img": 10,
  "ingredients": [
    "Butter",
    "Rosemary",
    "Marinade",
    "Pepper"
  ],
  "price": 10.05,
  "name": "Sirloin Steak",
  "reviewNumber": 626,
  "reviewStar": 1.51,
  "size": 193
}];


const drinks = [{
  "id": 1,
  "img": 1,
  "ingredients": [
    "Pineapple juice",
    "Mint",
    "Apple juice",
    "Tequila"
  ],
  "price": 9.7,
  "name": "Old Fashioned",
  "reviewNumber": 222,
  "reviewStar": 4.92,
  "size": 273
}, {
  "id": 2,
  "img": 2,
  "ingredients": [
    "White Rum",
    "Pineapple juice"
  ],
  "price": 17.68,
  "name": "Negroni",
  "reviewNumber": 119,
  "reviewStar": 0.05,
  "size": 419
}, {
  "id": 3,
  "img": 3,
  "ingredients": [
    "Apple juice",
    "Pineapple juice",
    "Tequila",
    "Orange juice"
  ],
  "price": 7.13,
  "name": "Daiquiri",
  "reviewNumber": 974,
  "reviewStar": 3.61,
  "size": 365
}, {
  "id": 4,
  "img": 4,
  "ingredients": [
    "Vodka",
    "Limes",
    "Syrup",
    "Mint",
    "Pineapple juice"
  ],
  "price": 11.65,
  "name": "Dry Martini",
  "reviewNumber": 848,
  "reviewStar": 3.41,
  "size": 195
}, {
  "id": 5,
  "img": 5,
  "ingredients": [
    "Vodka",
    "White Rum",
    "Tequila",
    "Limes",
    "Pineapple juice"
  ],
  "price": 19.28,
  "name": "Margarita",
  "reviewNumber": 841,
  "reviewStar": 4.95,
  "size": 273
}, {
  "id": 6,
  "img": 6,
  "ingredients": [
    "Whiskey",
    "Orange juice",
    "Vodka",
    "Pineapple juice",
    "Apple juice"
  ],
  "price": 18.57,
  "name": "Espresso Martini",
  "reviewNumber": 321,
  "reviewStar": 4.91,
  "size": 355
}, {
  "id": 7,
  "img": 7,
  "ingredients": [
    "Whiskey"
  ],
  "price": 12.97,
  "name": "Whiskey Sour",
  "reviewNumber": 706,
  "reviewStar": 0.71,
  "size": 355
}, {
  "id": 8,
  "img": 8,
  "ingredients": [
    "White Rum",
    "Limes",
    "Orange juice"
  ],
  "price": 16.05,
  "name": "Manhattan",
  "reviewNumber": 173,
  "reviewStar": 4.42,
  "size": 515
}, {
  "id": 9,
  "img": 9,
  "ingredients": [
    "Limes",
    "Vodka",
    "Apple juice"
  ],
  "price": 11.73,
  "name": "Aperol Spritz",
  "reviewNumber": 582,
  "reviewStar": 2.45,
  "size": 341
}, {
  "id": 10,
  "img": 10,
  "ingredients": [
    "Whiskey",
    "Mint",
    "Syrup",
    "Limes"
  ],
  "price": 12.93,
  "name": "Mojito",
  "reviewNumber": 936,
  "reviewStar": 3.1,
  "size": 396
}];
