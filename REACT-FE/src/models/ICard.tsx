export interface ICard {
    cardId:     number;
    userEmail: string;
    products:  Product[];
}

export interface Product {
    pid:        number;
    title:      string;
    detail:     string;
    thumbnail:  string;
    price:      number;
    images:     string[];
    categories: Category[];
}

export interface Category {
    cid:  number;
    name: string;
}
