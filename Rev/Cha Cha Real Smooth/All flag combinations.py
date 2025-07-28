from DJCasper import *

'''
This question was also scuffed in the making since it was made in lab, still didn't have my laptop after the Expo
I wish I saved the seed since it was conviniently completely useless, making this the hardest iteration of this question
Since both known parts of the flag overlap perfectly

This is the script I used to test shit and prove that the question was solvable without bruteforce
'''

def string_to_binary(s):
    bin=""
    for i in s:
        ascii_decimal = ord(i)
        binary_ascii = format(ascii_decimal, '08b')
        bin+=str(binary_ascii)
    return bin

def binary_to_string(s):
    byte=0
    bit_count=8
    out=""
    for i in s:
        bit_count -= 1
        if i=="1":
            byte+=(2**bit_count)
        if bit_count==0:
            out=chr(byte)+out
            byte=0
            bit_count=8
    return out[::-1]

def bitwiseXOR(s1,s2):
    out=""
    while len(s1)<len(s2):
        s1="0"+s1
    while len(s2)<len(s1):
        s1="0"+s2
    for i in range(len(s1)):
        out+=str(int(s1[i])^int(s2[i]))
    return out

l=len(flag)
l=int((l-26)/2)
first_half=string_to_binary(first_half)
second_half=string_to_binary(second_half)
enc=bitwiseXOR(first_half,second_half)
print(l)
print(flag)
brute_flag=flag[8:8+l]+flag[-l-5:-5]
print((" "*8)+brute_flag[:l]+(" "*13)+brute_flag[l:]+(" "*5))
l=l*8
brute_enc=enc[64:64+l]+enc[-l-40:-40]
#expoctf{another_sample_flag}mist
#expoctf{another_
#sample_flag}mist
#expoctf{+(ano)+ther+sample+(lag)+}mist
print(binary_to_string(first_half))
print(binary_to_string(second_half))
print(first_half)
print(second_half)
print(enc)
print((" "*64)+brute_enc[:l]+(" "*114)+brute_enc[l:]+(" "*40))
print(f"Expected combinations {2**(len(brute_enc))}")
dec_firsthalf=binary_to_string(bitwiseXOR(string_to_binary("expoctf{"), enc[:64]))
dec_secondhalf=binary_to_string(bitwiseXOR(string_to_binary("}mist"), enc[-40:]))
print("Calculated Manual Dec")
print(dec_firsthalf)
print(dec_secondhalf)
'''for i in range(2**(len(brute_enc))):
    bits=str(format(i, '08b'))
    dec=binary_to_string(bitwiseXOR(bits, brute_enc))
    if dec.isalnum():
        print(dec)
print("end")
'''
