// node app.js
let arg = process.argv
console.log(arg)
// [
//    'C:\\Program Files\\nodejs\\node.exe',
//    'C:\\Project\\NODE\\RubyVsNodeJs\\app'
// ]

// node app.js 1 2
arg = process.argv
console.log(arg)
// [
//    'C:\\Program Files\\nodejs\\node.exe',
//    'C:\\Project\\NODE\\RubyVsNodeJs\\app',
//     '1',
//     '2'
// ]



// node app.js 1 2
arg = process.argv
let a = arg[2] 
let b = arg[3]
let out = a + ' ' + b

console.log(out)           // 1 2

if (a > b) {
  console.log(a)
} else {
  console.log(b)
}                           // 2

let c = (a > b) ? a : b   
console.log(c)              // 2



// node app.js 8 44444

a = arg[2]
b = arg[3]
console.log(out)              // 8 44444
c = (a > b) ? a  : b          // !!!!!!!! 
console.log(c)               // !!! 8 !!!
console.log(typeof a)        // string
console.log(typeof b)        // string


// node app.js 8 44444
a = +arg[2]
b = +arg[3]
console.log(typeof a)       // number
console.log(typeof b)       // number
c = (a > b) ? a : b   
console.log(c)              // 44444


