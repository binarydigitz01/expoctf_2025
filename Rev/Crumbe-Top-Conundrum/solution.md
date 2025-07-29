## 🧁 **Crumble-Top Conundrum**

**Author:** *muffin*
**Difficulty:**  Medium
**Tags:** `pwn`, `reverse engineering`

---

You've reached the **legendary Secret Pantry** in *Crumble-Top*, but its entrance is blocked by the **colossal Muffin Guardian** — a being of dough and fury, baked in the ancient ovens of Pwnsylvania.

Legends say **brute force is useless**, for the Guardian is not a wall... but a **lock**.

---

### **Hint**

Time to introduce the **Three-Headed Dragon**:

















Cargo compile flags uhm (.trim),  which Ghidra doesn’t natively recognize. As a result, it interpreted the contents as raw bytes, displaying an unstructured and messy disassembly view.(No it's not a VM ) 

![Raw Byte Disassembly](https://github.com/user-attachments/assets/246717cd-0fd2-4a99-a0b2-1dcf03191fa7)

After letting Ghidra analyze the file,  navigate to the `main` function through the Symbol Tree.

![Symbol Tree Navigation](https://github.com/user-attachments/assets/53bff425-09ee-4ddb-8e91-f897b937c525)

Inside `main`,  find a call to `rustcall::main`, where the actual logic was located.

![rustcall::main view](https://github.com/user-attachments/assets/38821a82-01ea-4acf-98c9-e06b43aecb9f)

Within this function, two critical arrays were hardcoded:

* **XOR Key**: `0xefbeadde`
  This corresponds to `[0xDE, 0xAD, 0xBE, 0xEF]`, which is the hexspeak value `0xDEADBEEF`.

* **Encrypted Data**:
  `[0x93, 0xE4, 0xED, 0xBB, 0x87]`

![Key and Encrypted Data](https://github.com/user-attachments/assets/81660ea1-8f7d-422f-aad1-f0c30dab4391)

 decrypt the data using the XOR key, cycling over its bytes:

```python
key = [0xDE, 0xAD, 0xBE, 0xEF]
enc = [0x93, 0xE4, 0xED, 0xBB, 0x87]
flag = bytes([b ^ key[i % 4] for i, b in enumerate(enc)])
print(flag.decode())  # Output: MISTY
```

The result was the plaintext: `MISTY`.

![Decryption Result](https://github.com/user-attachments/assets/8afbd6eb-9318-4a2f-af85-5e82ba822942)


```Flag : expoctf{pr0t0c0l_by9ass3d}mist ``` 
