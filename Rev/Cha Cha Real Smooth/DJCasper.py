import random as r
flag="expoctf{h0wL0W_c4nUgo}mist"
halflen=int(len(flag)/2)
first_half=flag[0:halflen]
second_half=flag[halflen:]

def circular_shift(s,shift):
    #pos for right, neg for left
    length=len(s)
    ns=""
    for i in range(len(s)):
        ns+=s[(i+shift)%length]
    return ns

def dance(s):
    s=s[::-1]
    print("Reverse, reverse")
    for i in range(r.randrange(10,100)):
        dancemove=r.randint(-1,1)
        circular_shift(s,dancemove)
        if dancemove == -1:
            print("Slide to the left!")
        if dancemove==1:
            print("Slide to the right!")
        if dancemove==0:
            print("Cha-cha real smooth")
    print("Oh, yeah, um-hm\nYeah, yeah\nDo that stuff, do it\nOh, yeah\nI'm out of here, y'all, peace")
    return s
