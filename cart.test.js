const cart = require('./cart');
const cars = require('./data/cars');

describe('Cart Properties: ', () => {


    test('Cart should default to an empty array', () => {
        expect( Array.isArray(cart.cart )).toEqual(true);
    })

    test('Cart should have a default length of 0', () => {
        expect( cart.cart.length ).toEqual(0);
    })

    test('Total should be a number', () => {
        expect(typeof cart.total).toBe('number');
    })

    test('Total should be 0', () => {
        expect(cart.total).toBe(0);
    })


});

describe('Cart Methods: ', () => {

    afterEach(() => {
        cart.cart = [];
        cart.total = 0;
    })

    test('addToCart() should add a car to the object array', () => {
        //arrange
        //act
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);

        //assert
        expect(cart.cart.length).toEqual(2);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[1]);
    });

    test('addToCart() should increase the total property', () => {
        //arrange
        //act
        cart.addToCart(cars[0]);
        cart.addToCart(cars[8]);
        cart.addToCart(cars[2]);

        //assert
        expect(cart.total).toEqual(cars[0].price+cars[8].price+cars[2].price);
    });

    test('removeFromCart() should remove a car object from the cart array', () => {
        //arrange
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[2]);

        //act
        cart.removeFromCart(1, cars[1].price)

        //assert
        expect(cart.cart.length).toEqual(2);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[2]);
    });

    test('removeFromCart() should decrease the total property', () => {
        //arrange
        cart.addToCart(cars[0]);
        cart.addToCart(cars[8]);
        cart.addToCart(cars[2]);

        //act
        cart.removeFromCart(0, cars[0].price)
        cart.removeFromCart(1, cars[2].price)
        
        //assert
        expect(cart.total).toEqual(cars[8].price)
    });

    test('checkout() should empty the cart array and set the total to 0', () => {
        //arrange
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[2]);
        cart.addToCart(cars[3]);

        //act
        cart.checkout();

        //assert
        expect(cart.cart.length).toEqual(0);
        expect(cart.total).toEqual(0);
    })
});