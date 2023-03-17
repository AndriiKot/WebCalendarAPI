
arg = ARGV
p arg         # []


# app.rb 1 2
p arg  #["1","2"]

a,b = ARGV[0],ARGV[1]
print a,' ', b ,"\n"              # "1" "2"
p (if a > b then  a else b end)   # "2"
p a > b ? a : b                   # "2"


# app.rb 8 44444
a,b = ARGV[0],ARGV[1]
print a,' ', b ,"\n"              # "8" "44444"
p (if a > b then  a else b end)   # !!! "8" !!!
p a > b ? a : b                   # !!! "8" !!!
p a.class    # String
p b.class    # String


# app.rb 8 44444
a,b = ARGV[0].to_i,ARGV[1].to_i
print a,' ', b ,"\n"              # 8 44444
p a.class                         #Integer
p b.class                         #Integer
p a > b ? a : b                   # 44444
















