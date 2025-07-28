\# Cha Cha Real Smooth



Firstly, you have to try and intuit what the hell dance() does. It's pretty obvious. Every "slide to the left" is a left bitshift, every "slide to the right" is a right bitshift and "Cha Cha Real Smooth" is nothing. "Reverse, Reverse" at the start tells you that dance() also reverses the string



Once you reverse the effects of dance() you'll find the second half of the flag. Now, the flag's length is exactly 26 characters long and since the format is 13 characters long, you can use both "expoctf{" and "}mist" to XOR parts of the binary and recover the flag. Though do remember that after XORing with the first half, the result needs to be reversed before converting to a string 



Similarly, the second half should be reversed before XORing it



Flag: expoctf{h0wL0W\_c4nUgo}mist

