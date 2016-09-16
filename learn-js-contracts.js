/**
 * Created by Richard Bouška on 16. 9. 2016.
 */



//Category theory for JavaScript programmers #1: contracts

/*
 Popisuje koncept contracu pomocí funkce která kontroluje že se jedná o uvedený datový typ
 v první lekci čistě str contract
 ukazuje proč je kontrak užitečný a že nás chrání před neočekávaných chováním programu
 */

//contract for string
const str = s => {
    if (typeof s !== "string") {
        throw new TypeError(`Expectes string!, got ${typeof s}`);
    }
    return s;
};

//here should come tests

/*
 console.log(str("OK: test string"));
 console.log(str(1));
 */

//not type safe repeat
let repeat;
repeat = (s) => s + s;
//console.log(repeat("joe"));

//I expect 55 but get 10
//console.log(repeat(5));
//I expect 55 but get 10
//console.log(repeat("5"));

repeat = (s) => {
    s = str(s);
    return s + s;
};

//console.log(repeat(5));
//console.log(repeat("5"));
//console.log(repeat("joe"));

//realistic example is for es zIndex from the DOM



//--------------------------------------------------------------------------------------
// Category theory for JavaScript programmers #2: guarded functions and categories

/*
 minule jsme ukázali contract a jak to pomůže zabránit programu aby proběhl ane choval se divně
 jakmile máme kontrakty můžeme psát guarger functions

 2 části: contract + guarded functions tvoří kategorii

 functors: functions that map between categories
 natural transformations: maps betweem functors

 contracts: in our case str
 guarded functions: in our case: repeat
 together they form category (objects & morphisms)

 objects: contracts
 morphisms: guarded functions

 for example repeat is a guardeed function from  string to string
 */

//simplest contract "ANY " - každá funkce je vlastně guarded přinejhorším  contractem ANY

const any = x => x;

// a functor for simplification of creation of basic contracts.
const typeOf = type => {
    type = str(type);
    return p => {
        if (typeof p !== type) {
            throw new TypeError(`Expects ${type}, got ${typeof p}`);
        }
        return p;
    };
};

//now we can create 5 other basic contracts:
const bool = typeOf("boolean");
const obj = typeOf("object");
const num = typeOf("number");
const undef = typeOf("undefined");
const func = typeOf("function");

//here should be tests for the individual contracts
/*
 console.log(num(3)); //it should pass OK
 console.log(num("3")); ////it should fail with TypeError OK
 console.log(func(x => x));//it should pass OK
 console.log(func("x => x"));//it should fail OK
 */

/* this was not part of the lesson - adding for completness*/
const int32 = n => {
    if (n | 0 !== n) {
        throw new TypeError(`Expects int32, got ${typeof n}`);
    }
    return n;
};

// test for contract for int32

//EXAMPLE: we can define inc as a guarded function
const inc = x => {
    x = num(x);
    return num(x + 1);
};
//console.log(inc(3));


//--------------------------------------------------------------------------------------
//Category theory for JavaScript programmers #3: the "array" contract
/*
 for our particular category objects are contracts
 objects: contracts taking a value they test it if they match expectation they throw type error if they dont. They dont need to return exactly the same value but they value must be *strongly* related
 morphisms: guarded functions rhat expects imput that passes a contract and returns a output that passes a contract (například funkce repeat or ins - guarded from num to num i.e. num -> num
 */

/*
 instanceof only checks if Array.prototype is on an object's [[Prototype]] chain. It fails when checking arrays across frames since the Array constructor used for the instance will likely be different to the one used for the test.
 if (Object.prototype.toString.call(obj) == '[object Array]')
 */

const arr = a => {
    if (!Array.isArray(a)) {
        throw new TypeError(`Expects array!, got ${typeof a}`);
    } else return a;
};

/*
 console.log(arr([3])); //it should pass OK
 console.log(arr(3)); //it should fail OK
 console.log(arr([1, 2, 3])); //it should pass OK
 console.log(arr("[1, 2, 3]")); //it should fail OK
 */


//--------------------------------------------------------------------------------------
//Category theory for JavaScript programmers #4: functors
/*
 je fajn že umíme definovat arr ale bylo by leště lepší umět definovat contract který bude typově bezpečný pro typy uvnitř pole
 bude tvořit functor který bude pracovat nad contracty i nad guarded functiuons:
 pokud dostane contract napr int32 tak vrátí kontract pro [int32] a pokud dostane guarded finction lets say str->bool vrátí pole funkcí str->bool souvisí to s map metodou na poili
 */

//functor for array of that works on bots  contracts and guarded functions and púroduces new objects and new morphisms!
const arrOf = c => a => arr(a).map(c);

/*
 console.log (arrOf(num)([1,2,3,"4"])); - should fail OK
 console.log (arrOf(num)([1,2,3,4])); - should pass OK

 */


//--------------------------------------------------------------------------------------
//Category theory for JavaScript programmers #5: the Maybe functor

class Maybe {
    getOrElse(x) {
        return this instanceof Some ? this.x : x;
    }

}
class None extends Maybe {
    toString() {
        return "None";
    }
}
const none = new None();

class Some extends Maybe {
    constructor(x) {
        super();
        this.x = x;
    }
    toString() {
        return `Some(${this.x}) `;
    }
}
const some = x => new Some(x);


const maybe = c => m => {
    if (m instanceof None) return m;
    if (m instanceof Some) return some(c(m.x));
    throw new TypeError(`Expected None or Some(${c}), got ${typeof m}`);
};


console.log("" + maybe(repeat)(none));
console.log(maybe(repeat)(some("joe")).getOrElse("jane"));
console.log(maybe(repeat)(none).getOrElse("jane"));

























//----------------------