# Expo-Bonanza

## Challenge Description

> *"Hope our interactive club expo site tickled your curiosity. And yeah, we saw that weird mess of characters above the countdown, it bugged us too. If only we could scratch that itch in our brain, right? But hey, life isn’t always perfect. What is perfect though? Joining MIST. We’re here for your sleepless nights, brain fog, and random 2 AM debugging crises. That’s just MIST 4 U."*

In the interactive website, a ciphered string was hidden in plain sight, embedded as part of the interface, but all decryptable using clues provided within the site itself. Each cipher had a role to play in unraveling the final flag.


## Solution

### 1. **Morse Code Layer**

```
..- -... --.. ....- ----. .--- ..-.{--. ..--.- --- --. .-}--.- .-.. ... -- ....- ....-__.-- -.-. --- .-.. .... -.-. ..... ..-
```

**Decrypted Morse Output:**

```
ubz49jf{g_oGa}qlsm44__wcolhc5u
```

This was the first visually odd string. Morse code letters were present above the countdown. Once decoded, it gave a Rail Fence cipher input.



### 2. **Rail Fence Cipher**

**Input:**

```
ubz49jf{g_oGa}qlsm44__wcolhc5u
```

**Method:** Rail Fence Cipher with **4 rows**

**Decryption Output:**

```
ujllsfb{mh4gz_4c_o4G_5wa9}cuoq
```

Now it resembled a Vigenère-encrypted string.



### 3. **Vigenère Cipher**

**Input:**

```
ujllsfb{mh4gz_4c_o4G_5wa9}cuoq
```

**Key:** `MIST`

**Decryption Output:**

```
ibtsgxj{tv4yh_4j_c4Y_5eh9}qmwx
```

This was clearly a Caesar cipher.


### 4. **Caesar Cipher**

**Input:**

```
ibtsgxj{tv4yh_4j_c4Y_5eh9}qmwx
```

**Shift:** 4 (same as the Rail Fence row count)

**Decryption Output:**

```
expoctf{pr0ud_0f_y0U_1ad5}mist
```



## Final Flag

```
expoctf{pr0ud_0f_y0U_1ad5}mist
```


## Thought Process Behind Challenge

* Every cipher used (Morse, Rail Fence, Vigenère, Caesar) was part of the club website.
* All transformations required recognizing formats and deducing the right method based on positioning and hints.
* The recurrence of the number **4** (both in Caesar shift and Rail Fence rows) was deliberate and clued through site elements.
* The Vigenère key, `MIST`, was hidden in plain sight, a nod to the club.

