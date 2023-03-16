arg = ARGV
a,b = ARGV[0],ARGV[1]

p (if a > b then  a else b end)

puts

p a > b ? a : b

puts

p a > b ? a : b()