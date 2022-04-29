/*import express from "express";
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('AHA');
});

app.listen(port, () => {
    console.log(`Listening on https://127.0.0.1:${port}`);
});*/

/* Types!!
// Any / Unknown
// const z: unknown = 30;
// const y = z === 123;
// if(typeof z === 'number'){
//     const x = z +10;
// }
// const a: any = 30;

// Bools
// const a = true;
//illegal
// var b = false;
// const c = true;
// Type Literal
// let d: boolean = true;
// let e: true = true;

// Number
// let a = 132;
// var b = Infinity * .1;
// const c = 5678;
// let d = a < c;
// let d2 = a / 0;
// Type Literal
// const pi: 3.14 = 3.14;
// const m = 1_000_000;
// const mx2 = 2_000_000;
// limit is 2 ** 53

// BigInt - Target ES2020+
// const a = 1234n;

// String
// const a = 't';
// const b = 't 2';
// const c = '!';
// const d = a + b + c;
// No need to use literal :string
// const e:string = 'uh oh';
// const f:'hello' = 'hello';

// Symbol - They are unique, only equal itself
// let a = Symbol('a');
// const b: symbol = Symbol('b');
// const c = a === b;
// Doenst work
// const d = a + 'b';
// const d: unique symbol = Symbol('d');

// Objects
// const a: object = {
//     b: 'b',
// };
// const b = {
//     c: {
//         d: 'e'
//     }
// };
// class Person {
//     constructor(public fN: string, public lN: string){
//     }
// }
// const f: {
//     b: number,
//     c?:string,
//     [key:number]:boolean,
// } = {
//     b: 12,
//     c: "c",
//     10: true
// };

// ALIASES
// type Age = number;
// type Person = {
//     name: string,
//     age: Age
// }
// const a: Age = 55;
// const driver: Person = {
//     name: "hello",
//     age: a
// };
// It has Scope
// type Cat = {
//     name: string,
//     purrs: boolean
// }
// type Dog = {
//     name: string,
//     barks: boolean
// }
// Both
// type CatOrDogOrBoth = Cat | Dog;
// const c: CatOrDogOrBoth = {
//     name: 'a',
//     purrs: true
// };
// Only one
// type CatAndDog = Cat & Dog;
// const b: CatAndDog = {
//     name: 'a',
//     purrs: true,
//     barks: false,
// };

// Read only array
// Const it's only for assignation
// const as: readonly number[] =  [1,2,3];
// const bc: number[] = [1,2,3];
// bc.push(4);
// const bs: readonly number[] = as.concat(4);


// void
// function f() {
//     const a = 1+3;
//     return;
// }
// f();

// Enum
// enum Language{
//     Spanish = 0,
//     English = 1
// }
// const t = Language.English.valueOf();
// console.log(t);
// enum Language{
//     French = 2
// }
// const b = Language['Spanish'];
*/

/* Functions

// Named
// function g0(n: string): string {
//     return 'hello ' + n;
// }
// Function expression
// const g2 = function(n:string): string{
//     return 'hello ' + n;
// };
// Arrow
// const g1 = (a: number, b:number): number => {
//     return a + b;
// };
// Shorthand Arrow
// const g3 = (a: number, b: number): number => a + b;
// Literally illegal
// const g4 = new Function('name', 'return "Hello "+ name;');

// function log(m: string, uid?: number){
//     console.log(m, uid || 'Not signed in');
// }
// Optional parameters go last
// function betterLog(m: string, t: string, uid?: number): string{
//     return m;
// }
// Rest Parameters
// function s(numbers: number[]): number{
//     return numbers.reduce((total, currentValue) => total + currentValue, 0);
// }
// console.log(s([1,2,3,4,5,6,7,8,9]));

// Illegal
// function s1(): number {
//     return Array.from(arguments)
//             .reduce((total, currentValue) => total + currentValue, 0);
// }

// Rest Parameters
// type SN = string | number;
// function s2(...args: number[]): number {
//     return args.reduce((total, currentValue) => total + currentValue);
// }

// function add(a: number, b: number): number {
//     return a + b;
// }
// add(10, 20);
// add.apply(null, [10,20]);
// add.call(null, 10, 20);
// add.bind(null, 10, 20)();*/

/* BIND HOMEWORK
// Server Info
const ana = {
    species: 'Human',
    name: 'Ana',
    lastname: 'White',
    gender: "Female"
};

const emma = {
    species: 'Human',
    name: 'Emma',
    lastname: 'Red',
    gender: "Female"
};

const tom = {
    species: 'Human',
    name: 'Tom',
    lastname: 'Brown',
    gender: "Male"
};

// Info inside the client
const michael = {
    species: 'Human',
    name: 'Michael',
    lastname: 'Black',
    gender: 'Male',
    getInfo: function(): string{
        return `${this.name} ${this.lastname} | ${this.species} ${this.gender}`;
    }
};

const tomInfo = michael.getInfo.bind(tom);
console.log(tomInfo());
tom.species = 'Dog';
console.log(tomInfo());*/

/* This */
// const x = {
//     a() {
//         return this;
//     }
// };

// console.log(x.a());

/* Generators
function* fibbonacciNumbers(): IterableIterator<number> {
    const fibbo = [0, 1];
    
    while(1){
        fibbo.push(fibbo.slice(-2).reduce((t,c) => t+c));
        fibbo.shift();
        yield fibbo.slice(-1)[0];
    } 
}

const numbers = fibbonacciNumbers();
console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);*/


/*
        Hex: 0xffffff
        Calculation: 15*16^5 + 15*16^4 + 15*16^3 + 15*16^2 + 15*16^1 + 15
        result: 16777215
*/
/*
function generateColour(colours: string[]): string{
    
    const n = '#' + (Math.random() * 0xffffff * 1000000).toString(16).slice(0, 6);
    if(colours.includes(n)){
        return generateColour(colours);
    }
    return n;
}

function* uniqueColourGenerator(): Generator<string, string[], string> {
    const uniqueColours:string[] = [];
    while(1){
        uniqueColours.push(generateColour(uniqueColours));
        if(yield uniqueColours.slice(-1)[0]){
            break;
        }
    }
    return uniqueColours;
}

const colours:Generator<string> = uniqueColourGenerator();
console.log(colours.next().value);
console.log(colours.next().value);
console.log(colours.next().value);
console.log(colours.next().value);
const allColors = colours.next(true).value;
console.log(allColors); */

/*/ Iterators
const numbers = {
    *[Symbol.iterator](){
        for(let x = 1; x <= 10; x++){
            yield x;
        }
    }
};

console.log(numbers);*/

/*/ Functions
function sum(a:number, b:number): number {
    return a+b;
}
type sumCoSignature = (a: number, b: number) => number;
type sumCoSignature1 = {
    (a: number, b: number): number;
};
type readCoSignature = (message:string, userId?: string) => void;*/

/*/ Overloads
class Reservation{
    constructor(public from:Date, public to:Date|string, public destination?:string){}
}

type Reserve = {
    (from: Date, to: Date, destination:string): Reservation;
    (from: Date, destination:string): Reservation;
}

const res1: Reserve = (from: Date, to:Date | string, destination?:string): Reservation => {
    return new Reservation(from, to, destination);
};
console.log(res1(new Date, new Date, 'no'));
console.log(res1(new Date, 'no'));*/

/* Classes */
// Never have more than one class in a single file!!

import King from './Entities/king';
import Position from './Entities/position';
import Rook from './Entities/rook';
import Pawn from './Entities/pawn';
import KingRepository from './Repository/KingRepository';

const k = new King('White', 'A', 1);
// initializing the repository
const kr = new KingRepository();
kr.create(k);


/* Interfaces */
/* type Food = {
    calories: number,
}

type Sushi = Food & {
    saty: boolean,
}

type Candy = Food & {
    tasty: boolean,
}

interface Food1 {
    calories: number,
}

interface Sushi1 extends Food1 {
    saty: boolean,
}
interface Candy1 extends Food1 {
    tasty: boolean,
}
interface  AA {
    good(x: number): string;
    bad(x: number): string;
}
interface  BB extends AA {
    good(x: number): string;
    bad(x: number): string;
}

interface Animal {
    readonly name: string;
    eat(food: string): void;
    sleep(hours: number): void;
}

interface Feline {
    meow(): void;
}

class Cat implements Animal, Feline {
    readonly name: string;

    constructor(){
        this.name = '';
    }
    meow(): void {
        throw new Error('Method not implemented.');
    }

    eat(food: string): void {
        throw new Error('Method not implemented.');
    }
    sleep(hours: number): void {
        throw new Error('Method not implemented.');
    }

} */

class Lamp implements ISwitchable{
    turnOn(): void {
        return;
    }

    turnOff(): void {
        return;
    }
}

interface ISwitchable {
    turnOn(): void,
    turnOff(): void,
}

class Button {
    constructor(private switchable: ISwitchable){
    }

    onHit(status: boolean){
        return status ? this.switchable.turnOn() : this.switchable.turnOff();
    }
}

const lamp: ISwitchable = new Lamp();
const b: Button = new Button(lamp);
b.onHit(false);