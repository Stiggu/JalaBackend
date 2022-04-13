// import express from "express";

// const app = express();
// const port = 8080;

// app.get('/', (req, res) => {
//     res.send('AHA');
// });

// app.listen(port, () => {
//     console.log(`Listening on https://127.0.0.1:${port}`);
// });


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
// const a = Symbol('a');
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



