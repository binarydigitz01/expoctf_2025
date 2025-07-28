# Break The Fourth Wall
The pauses in between the universe echo louder. It sounds like a beating heart. Repetitive, louder, faster, sharper. And all of a sudden, a familiar tone; the game over screen on an arcade machine. Atari Breakout: a game even machines of war play. Back and forth, hitting over and over and over. Your legs are drawn to it, your eyes can't be torn away. But could this really be the answer to the universe? 
### flag: MistCTF{8LX12ZP6HFG4WGHDQK8}

- formula file to be given
- atari file to be given

1. open atari file. seed is 42 from the question (the answer to the universe)
2. you can experiment around but the only way to get to the infinite lives is to read the source code. also realize that there's numbers behind the bricks
3. set lives to -99 or anything after that
4. get to the infinite lives level and you see that all the bricks are white. let the game run for a while until one brick is broken
5. from the alert that pops up, you can see that you have to use ascii and that you have to do something with the color red
6. from the formula file given, you can use vignere cipher and the key "divide" to decrypt the text at the bottom: figure out that you have to use brick like entities. put clues 5 and 6 together and you'll realize that you need to find out the numbers behind the red bricks
7. once you get the numbers by turning the bricks invisible, you can get out all the numbers behind the red bricks
8. you can see, according to the formula given, you have to divide all the numbers by 10. then the numbers will be two digits each
9. from the 'random numbers' given in the formula.py, you can find out that the ascii limits are basically just alphanumerics. 
10. figure out which red brick numbers fall between those limits and translate them from ascii to text. 
flag obtained
