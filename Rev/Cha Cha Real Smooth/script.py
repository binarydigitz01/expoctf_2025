from DJCasper import *

def string_to_binary(s):
    bin=""
    for i in s:
        ascii_decimal = ord(i)
        binary_ascii = format(ascii_decimal, '08b')
        bin+=str(binary_ascii)
    return bin

def bitwiseXOR(s1,s2):
    out=""
    while len(s1)<len(s2):
        s1="0"+s1
    while len(s2)<len(s1):
        s1="0"+s2
    for i in range(len(s1)):
        out+=str(int(s1[i])^int(s2[i]))
    return out

if __name__ == '__main__':
    #Bro who gave DJCasper the flag
    first_half=string_to_binary(first_half)
    second_half=string_to_binary(second_half)
    second_half=dance(second_half)
    enc=bitwiseXOR(first_half,second_half)
    print(enc)