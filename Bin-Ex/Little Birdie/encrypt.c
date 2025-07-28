#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

void win() {
    system("cat flag.txt");
}

void encrypt_rot13(char *data) {
    for (int i = 0; i < strlen(data); i++) {
        data[i] += 0x0D;
    }
    printf("ROT13 Encrypted: ");
    printf(data);
}

void encrypt_atbash(char *data) {
    for (int i = 0; i < strlen(data); i++) {
        data[i] = 0xFF-data[i];
    }
    printf("ROT13 Encrypted: ");
    printf(data);
}

void encrypt_xor(char *data) {

    for (int i = 0; i < strlen(data); i++) {
        data[i] ^= 0x13;
    }
    printf("XOR Encrypted: ");
    printf(data);
}

void encrypt() {
    int method;
    char input1[64];

    printf("What do you want to encrypt:\n");
    gets(input1);

    printf("Enter Encryption method:\n");
    printf("1) ROT13\n");
    printf("2) ATBASH\n");
    printf("3) XOR\n");
    scanf("%d", &method);
    getchar();
    printf("Encrypting...\n");
    switch (method) {
        case 1:
            encrypt_rot13(input1);
            break;
        case 2:
            encrypt_atbash(input1);
            break;
        case 3:
            encrypt_xor(input1);
            break;
        default:
            puts("ERROR UNRECOGNIZED ENCRYPTION");
            // simulate a crash
            char *ptr = NULL;
            *ptr = 'X';
    }

    puts("\nDone.\n");
}

int main() {
    while(1){
         encrypt();
    }
    return 0;
}
