#Ruby vs Node.js
____

##ARGV
____

###Creation ARGV
___

####Ruby

```ruby
arg = ARGV
p arg      # []
```
____

####Nodejs

```node                        
let arg = process.argv
console.log(arg)          // ['C:\\Program Files\\nodejs\\node.exe','C:\\Project\\NODE\\RubyVsNodeJs\\app']
```
____
____

###Get one argv

####Ruby

```ruby
ruby app.rb one 2 3 hi!
```
```ruby
p ARGV[0]             # "one"
```
```ruby
ruby app one 2 3 hi!   # not valid ... -- app (LoadError)
```
####Nodejs
                                   
```node
node app.js one 2 3 hi!  
```
or

```node
node app one 2 3 hi!             // valid
```
```node
console.log(process.argv[2])  // one 
```
____
____

###Operator if

####Ruby

```ruby
a,b = ARGV[0],ARGV[1]
```
```ruby
ruby app.rb 1 2
```                                 
```ruby
p (if a > b then  a else b end)   # "2"
```
or
```ruby
p a > b ? a : b     # "2"
```
____

####Nodejs
```node
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
```
___
###Operator if     
__!!!BANG!!!__
___

####Ruby

```ruby
#ruby app.rb 8 44444

a,b = ARGV[0],ARGV[1]

print a,' ', b ,"\n"              # "8" "44444"

p (if a > b then  a else b end)   # !!! "8" !!!
p a > b ? a : b                   # !!! "8" !!!
p a.class    # String
p b.class    # String

```

```ruby
#ruby app.rb 8 44444
a,b = ARGV[0].to_i,ARGV[1].to_i
print a,' ', b ,"\n"              # 8 44444
p a.class                         #Integer
p b.class                         #Integer
p a > b ? a : b                   # 44444

```

####Nodejs

```node
// node app.js 8 44444

a = arg[2]
b = arg[3]
console.log(out)             // 8 44444
c = (a > b) ? a  : b         // !!!!!!!! 
console.log(c)               // !!! 8 !!!
console.log(typeof a)        // string
console.log(typeof b)        // string
```

```node
// node app.js 8 44444
a = +arg[2]
b = +arg[3]
console.log(typeof a)       // number
console.log(typeof b)       // number
c = (a > b) ? a : b   
console.log(c)              // 44444
```





































