import { Basket } from './Basket';
import { car } from './productExampleDB';
import { ShopSystem } from './Shop-system';

ShopSystem.getInstance();

const cart = new Basket();

cart.addProduct({ product: car, amount: 8 });

ShopSystem.finalizeOrder(cart);

console.log(ShopSystem.showFinalizedOrders());

ShopSystem.showUsedDiscountCodes();
