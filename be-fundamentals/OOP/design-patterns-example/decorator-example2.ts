// https://frontstack.pl/decorator-design-pattern/

interface KebabComponent {
  ingredients: string[];
  price: number;
  getSetItems(): string[];
  getPrice(): number;
}

export class KebabSet implements KebabComponent {
  ingredients = ['kebab'];
  price = 15;

  constructor() {}

  getSetItems() {
    return this.ingredients;
  }

  getPrice() {
    return this.price;
  }
}

export class SetAddOn implements KebabComponent {
  ingredients: string[] = [];
  price: number = 0;

  constructor(public kebabSet: KebabComponent) {}

  getSetItems() {
    return [...this.kebabSet.getSetItems(), ...this.ingredients];
  }

  getPrice() {
    return this.kebabSet.getPrice() + this.price;
  }
}

export class Fries extends SetAddOn {
  ingredients = ['fries'];
  price = 5;

  constructor(public kebabSet: KebabComponent) {
    super(kebabSet);
  }
}

export class Coke extends SetAddOn {
  ingredients = ['coke'];
  price = 7;

  constructor(public kebabSet: KebabComponent) {
    super(kebabSet);
  }
}

console.log('1. Kebab only:');
const kebabSet = new KebabSet();
console.log(kebabSet.getSetItems());
console.log('Price:', kebabSet.getPrice());

console.log('2. Kebab set with fries');
const withFries = new Fries(kebabSet);
console.log(withFries.getSetItems());
console.log('Price:', withFries.getPrice());

console.log('3. Kebab set with fries and coke');
const withFriesAndCoke = new Coke(new Fries(kebabSet));
console.log(withFriesAndCoke.getSetItems());
console.log('Price:', withFriesAndCoke.getPrice());

console.log('4. Kebab set with coke');
const withCoke = new Coke(kebabSet);
console.log(withCoke.getSetItems());
console.log('Price:', withCoke.getPrice());
