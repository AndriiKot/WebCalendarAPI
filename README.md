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





















