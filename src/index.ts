// function myDecorator(
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
// ) {
//     console.log(target, propertyKey, descriptor);
// }

// class ExampleClass {
//     @myDecorator
//     method() {}
// }

// const obj = new ExampleClass();

// obj.method();

// в консолі
//  method: [Function (anonymous)] -target - об'єкт класу,
//до якого прикріплюється декоратор

//method - це propertyKey

//value: [Function (anonymous)],-значення
//до якого прикріплюється декоратор
// writable: true,
// enumerable: true,
// configurable: true
// це descriptor

// більш продвинутий

// function myDecorator(value: string) {
//     return (
//         target: any,
//         propertyKey: string,
//         descriptor: PropertyDescriptor
//     ) => {
//         console.log(value);
//     };
// }

// class ExampleClass {
//     @myDecorator("HEllo")
//     method() {}
// }

// const obj = new ExampleClass();

// obj.method();

// декоратор для мемоізації результатів функції(не працює -
// не подобається value)
function memoize(
    target: any,
    propertyKey: string,
    descriptor: PropertyDecorator
) {
    // зберігаємо початкове значення
    const originalMethod = descriptor.value;
    //створює словник
    const cache = new Map();

    //перезаписує значення функції
    descriptor.value = function (...args: any[]) {
        // створюємо ключ на основі аргументів
        const key = args.toString();

        if (cache.has(key)) {
            console.log(`Знайдено в кеші: ${key}`);
            return cache.get(key);
        } else {
            const result = originalMethod.apply(this, args);
            cache.set(key, result);
            console.log(`Збережено в кеші: ${key}`);
            return result;
        }
    };
    return descriptor;
}

class MathOperations {
    @memoize
    factorial(n: number): number {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * this.factorial(n - 1);
        }
    }
}

const mathOps = new MathOperations();

//обчислюється і зберігається в кеші результат для 5
console.log(mathOps.factorial(5));
//використ результат з кешу результат для 5
console.log(mathOps.factorial(5));

//обчислюється і зберігається в кеші результат для 3
console.log(mathOps.factorial(3));
//використ результат з кешу результат для 3
console.log(mathOps.factorial(3));
