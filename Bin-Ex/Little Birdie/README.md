\# Little Birdie #



The solution is relatively simple, there's a win() function which you need to get to, and a vulnerable gets() call

Using checksec you'll find that PIE is off, but stack-protection is turned on. Ie. the Stack Canary. Luckily, this function also has a vulnerable print call on a string buffer

This requires a little bit of management though since the buffer is modified before printing. Each of the options modify the buffer in a set way, for this example I use XOR since 6c3 translates neatly to "%p "



Once you identify the Stack Canary value(16 bits, ends in a 00), you can craft the payload to not corrupt the Stack Canary and overflow the buffer into the Return Address and call win()



Flag: expoctf{ch1rp\_CH1RP\_BIRDI3}mist



