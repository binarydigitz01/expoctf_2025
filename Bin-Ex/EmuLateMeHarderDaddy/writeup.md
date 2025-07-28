

## 🍰 **EmuLateMeHarderDaddy**

**Author:** *muffin*
**Difficulty:**  **Hard**
**Tags:** `emulation`, `binary exploitation`

---

###  **Description**

Alright, **chef**. Think you can handle the heat?

The notorious **Muffin Men** have baked the mythical **Glitch Cake**, and they're hoarding the recipe. We need it.

Luckily, we've stolen the firmware for their **digital oven** — some kind of *"core"?* It’s a **custom virtual machine**, but the **master recipe** is locked behind a secret protocol.

---

###  **Your Mission**

*  Find the **secret baking mode**
*  Discover the **secret ingredient**
*  Write a **custom ROM** to unlock the recipe

If you succeed, the recipe will be loaded into the oven’s memory. **Extract it to claim your glory.**

---

###  **Hint**

CHIP-8 might not be cake, but it’s a good starting point:
[CHIP-8 Interpreters – Emulation Wiki](https://emulation.gametechwiki.com/index.php/CHIP-8_interpreters)




Solution : 
The initial analysis shows that it's a Chip-8 virtual machine. Running standard ROMs like PONG confirms it functions as a basic emulator. However, the challenge prompt implies a hidden functionality—a secret protocol that must be discovered to reveal a flag.
<img width="1015" height="812" alt="screenshot-1753296749" src="https://github.com/user-attachments/assets/54d95456-35c2-4ba4-993b-76b3336f5960" />


The objective is to perform a deep analysis of the executable, reverse-engineer its custom features, and then write a specific Chip-8 ROM to trigger the hidden mechanism and extract the flag.


Part 1: Static Analysis with Ghidra

The first and most critical step is to analyze the executable without running it (static analysis). We use a decompiler to translate the compiled machine code back into a more human-readable, C-like format. For this task, we'll use the open-source tool Ghidra.
```c

/* chip8_core::main */

void __rustcall chip8_core::main(void)

{
  undefined4 *puVar1;
  undefined1 uVar2;
  byte bVar3;
  code cVar4;
  code cVar5;
  code cVar6;
  undefined8 uVar7;
  ushort uVar8;
  undefined4 uVar9;
  undefined4 uVar10;
  undefined4 uVar11;
  undefined8 uVar12;
  uint uVar13;
  long lVar14;
  code *pcVar15;
  long lVar16;
  ulong uVar17;
  ulong uVar18;
  undefined8 *puVar19;
  undefined1 *puVar20;
  undefined1 auVar21 [16];
  undefined **local_2990;
  code *local_2988;
  code *local_2980;
  undefined8 local_2978;
  code *local_2970;
  code *local_2968;
  code **local_2948;
  code *local_2940;
  long local_2938;
  ulong local_2930;
  long local_2928;
  long local_2920;
  long local_2918;
  undefined1 local_28f0 [32];
  undefined **local_28d0;
  undefined8 local_28c8;
  undefined8 local_28c0;
  undefined8 local_28b8;
  undefined8 uStack_28b0;
  undefined4 auStack_26c0 [4];
  undefined8 auStack_26b0 [30];
  char local_25c0 [8];
  char acStack_25b8 [8];
  undefined8 uStack_25b0;
  undefined7 uStack_25a8;
  char local_25a1;
  undefined7 uStack_25a0;
  undefined8 uStack_2599;
  undefined8 local_2030;
  char local_18c0;
  undefined4 local_18b0;
  undefined1 local_18ac [2080];
  undefined1 local_108c [3];
  char cStack_1089;
  char local_1088;
  char local_1087 [32];
  undefined7 local_1067;
  undefined1 uStack_1060;
  undefined4 local_105f;
  undefined2 local_105b;
  undefined1 local_1059;
  undefined **local_1058;
  undefined1 *puStack_1050;
  code ***local_1048;
  undefined8 uStack_1040;
  undefined8 local_1038;
  undefined8 uStack_1030;
  undefined8 local_1028;
  undefined8 uStack_1020;
  undefined8 local_1018;
  undefined8 uStack_1010;
  undefined8 local_1008;
  undefined8 uStack_1000;
  undefined1 local_ff8 [4016];
  undefined8 local_48;
  undefined8 uStack_40;
  
  uStack_1030 = 0;
  local_2030 = 0;
  std::env::args(local_28f0);
  _<>::from_iter(&local_2928,local_28f0,&PTR_s_/build/rustc-1.86.0-src/library/_00164698);
  if (local_2918 == 2) {
    local_48 = 0;
    uStack_40 = 0;
    memset(local_18ac,0,0x820);
    local_1058 = (undefined **)0x0;
    puStack_1050 = (undefined1 *)0x0;
    memset(local_ff8,0,0xfb0);
    local_1048 = (code ***)0x206020f0909090f0;
    uStack_1040 = 0xf0f080f010f07020;
    local_1038 = 0x10f09090f010f010;
    uStack_1030 = 0x80f0f010f080f010;
    local_1028 = 0x40402010f0f090f0;
    uStack_1020 = 0xf090f0f090f090f0;
    local_1018 = 0xe09090f090f0f010;
    uStack_1010 = 0x808080f0e090e090;
    local_1008 = 0x80f0e0909090e0f0;
    uStack_1000 = 0x8080f080f0f080f0;
    memcpy(&local_28d0,&local_1058,0x1020);
    local_18b0 = 0x2000000;
    _local_108c = 0;
    local_1088 = '\0';
    builtin_strncpy(local_1087,"expoctf{g1tch3d_thru_vmpr0t0_in_",0x20);
    local_1067 = 0x78305f7473316d;
    uStack_1060 = 100;
    local_105f = 0x7d646165;
    local_105b = 0;
    local_1059 = 0;
    local_2938 = local_2920;
    local_1058 = (undefined **)0x1b600000000;
    uVar18 = (ulong)puStack_1050 >> 8;
    puStack_1050 = (undefined1 *)CONCAT71((uint7)uVar18 & 0xffff0000000000,1);
                    /* try { // try from 00109637 to 0010969d has its CatchHandler @ 0010a9ab */
    std::fs::OpenOptions::_open(&local_2978,&local_1058,*(undefined8 *)(local_2920 + 0x20));
    pcVar15 = local_2970;
    if (((ulong)local_2978 & 1) == 0) {
      local_2988 = (code *)CONCAT44(local_2988._4_4_,local_2978._4_4_);
      local_1058 = (undefined **)0x0;
      puStack_1050 = &DAT_00000001;
      local_1048 = (code ***)0x0;
                    /* try { // try from 001096dd to 001096f2 has its CatchHandler @ 0010a9c2 */
      auVar21 = _<>::read_to_end(&local_2988,&local_1058);
      if (auVar21._0_8_ == 0) {
        if (local_1048 != (code ***)0x0) {
          if (local_1048 < 0x21) {
            lVar14 = 0;
            puVar20 = puStack_1050;
          }
          else {
            uVar18 = 0xe00;
            if ((long)local_1048 - 1U < 0xe00) {
              uVar18 = (long)local_1048 - 1U;
            }
            uVar18 = uVar18 + 1;
            uVar17 = 0x20;
            if ((uVar18 & 0x1f) != 0) {
              uVar17 = (ulong)((uint)uVar18 & 0x1f);
            }
            lVar14 = uVar18 - uVar17;
            puVar20 = puStack_1050 + lVar14;
            lVar16 = 0;
            do {
              puVar1 = (undefined4 *)(puStack_1050 + lVar16);
              uVar9 = puVar1[1];
              uVar10 = puVar1[2];
              uVar11 = puVar1[3];
              uVar7 = *(undefined8 *)(puStack_1050 + lVar16 + 0x10);
              uVar12 = *(undefined8 *)((long)(puStack_1050 + lVar16 + 0x10) + 8);
              *(undefined4 *)((long)auStack_26c0 + lVar16) = *puVar1;
              *(undefined4 *)((long)auStack_26c0 + lVar16 + 4) = uVar9;
              *(undefined4 *)((long)auStack_26c0 + lVar16 + 8) = uVar10;
              *(undefined4 *)((long)auStack_26c0 + lVar16 + 0xc) = uVar11;
              *(undefined8 *)((long)auStack_26b0 + lVar16) = uVar7;
              *(undefined8 *)((long)auStack_26b0 + lVar16 + 8) = uVar12;
              lVar16 = lVar16 + 0x20;
            } while (lVar14 != lVar16);
          }
          do {
            if (lVar14 == 0xe00) {
                    /* try { // try from 0010a872 to 0010a88a has its CatchHandler @ 0010a9c2 */
              std::panicking::begin_panic(&DAT_001535a3,0x23,&PTR_DAT_001644c0);
                    /* WARNING: Does not return */
              pcVar15 = (code *)invalidInstructionException();
              (*pcVar15)();
            }
            uVar2 = *puVar20;
            puVar20 = puVar20 + 1;
            *(undefined1 *)((long)auStack_26c0 + lVar14) = uVar2;
            lVar14 = lVar14 + 1;
          } while (puVar20 != puStack_1050 + (long)local_1048);
        }
        if (local_1058 != (undefined **)0x0) {
          __rust_dealloc(puStack_1050,local_1058,1);
        }
        close((int)local_2988);
LAB_00109935:
        local_2930 = 0;
        local_2990 = &PTR_DAT_001644d8;
        do {
          uVar18 = (ulong)local_18b0._2_2_;
          if (0xfff < uVar18) {
LAB_0010a8ae:
                    /* try { // try from 0010a8ae to 0010a8b8 has its CatchHandler @ 0010a9ab */
                    /* WARNING: Subroutine does not return */
            core::panicking::panic_bounds_check(uVar18,0x1000,local_2990);
          }
          if (local_18b0._2_2_ == 0xfff) {
            uVar18 = 0x1000;
            local_2990 = &PTR_DAT_001644f0;
            goto LAB_0010a8ae;
          }
          bVar3 = *(byte *)((long)&local_28c0 + uVar18 + 1);
          uVar8 = CONCAT11(*(byte *)((long)&local_28c0 + uVar18),bVar3);
          if (uVar8 != 0xfff) {
            local_18b0 = CONCAT22(local_18b0._2_2_ + 2,(undefined2)local_18b0);
                    /* WARNING: Could not recover jumptable at 0x00109bff. Too many branches */
                    /* WARNING: Treating indirect jump as call */
            (*(code *)(&DAT_00153390 +
                      *(int *)(&DAT_00153390 +
                              (ulong)(*(byte *)((long)&local_28c0 + uVar18) >> 4 ^ 8) * 4)))
                      (uVar18,0x1000,bVar3 >> 4,uVar8,
                       &DAT_00153390 +
                       *(int *)(&DAT_00153390 +
                               (ulong)(*(byte *)((long)&local_28c0 + uVar18) >> 4 ^ 8) * 4),
                       uVar8 & 0xfff);
            return;
          }
          if (local_18c0 == 'B') {
            uStack_25b0 = CONCAT44(local_1087._20_4_,local_1087._16_4_);
            uStack_2599 = CONCAT17(local_1059,CONCAT25(local_105b,CONCAT41(local_105f,uStack_1060)))
            ;
            uStack_25a0 = local_1067;
            uStack_25a8 = (undefined7)CONCAT44(local_1087._28_4_,local_1087._24_4_);
            local_25a1 = SUB41(local_1087._28_4_,3);
            local_25c0[0] = local_1087[0];
            local_25c0[1] = local_1087[1];
            local_25c0[2] = local_1087[2];
            local_25c0[3] = local_1087[3];
            local_25c0[4] = local_1087[4];
            local_25c0[5] = local_1087[5];
            local_25c0[6] = local_1087[6];
            local_25c0[7] = local_1087[7];
            acStack_25b8[0] = local_1087[8];
            acStack_25b8[1] = local_1087[9];
            acStack_25b8[2] = local_1087[10];
            acStack_25b8[3] = local_1087[0xb];
            acStack_25b8[4] = local_1087[0xc];
            acStack_25b8[5] = local_1087[0xd];
            acStack_25b8[6] = local_1087[0xe];
            acStack_25b8[7] = local_1087[0xf];
          }
          local_18b0 = CONCAT22(local_18b0._2_2_ + 2,(undefined2)local_18b0);
          if (cStack_1089 != '\0') {
            _local_108c = CONCAT13(cStack_1089 + -1,local_108c);
          }
          if (local_1088 != '\0') {
            if (local_1088 == '\x01') {
              local_1058 = &PTR_DAT_00164508;
              puStack_1050 = &DAT_00000001;
              local_1048 = (code ***)0x8;
              uStack_1040 = 0;
              local_1038 = 0;
                    /* try { // try from 00109a42 to 00109a9e has its CatchHandler @ 0010a9a9 */
              std::io::stdio::_print(&local_1058);
            }
            local_1088 = local_1088 + -1;
          }
          if (local_108c[2] != '\0') {
            local_1058 = &PTR_DAT_00164658;
            puStack_1050 = (undefined1 *)0x1;
            local_1048 = (code ***)0x8;
            uStack_1040 = 0;
            local_1038 = 0;
            std::io::stdio::_print(&local_1058);
            puVar20 = local_18ac;
            lVar14 = 0;
            do {
              lVar16 = 0;
              do {
                if (puVar20[lVar16] == '\x01') {
                  local_1058 = &PTR_DAT_00164678;
                  puStack_1050 = (undefined1 *)0x1;
                  local_1048 = (code ***)0x8;
                  uStack_1040 = 0;
                  local_1038 = 0;
                  std::io::stdio::_print(&local_1058);
                }
                else {
                  local_1058 = &PTR_s__00164688;
                  puStack_1050 = (undefined1 *)0x1;
                  local_1048 = (code ***)0x8;
                  uStack_1040 = 0;
                  local_1038 = 0;
                    /* try { // try from 00109aeb to 00109b38 has its CatchHandler @ 0010aa01 */
                  std::io::stdio::_print(&local_1058);
                }
                lVar16 = lVar16 + 1;
              } while (lVar16 != 0x40);
              local_1058 = &PTR_DAT_00164668;
              puStack_1050 = &DAT_00000001;
              local_1048 = (code ***)0x8;
              uStack_1040 = 0;
              local_1038 = 0;
                    /* try { // try from 00109b72 to 00109b77 has its CatchHandler @ 0010a9ad */
              std::io::stdio::_print(&local_1058);
              lVar14 = lVar14 + 1;
              puVar20 = puVar20 + 0x40;
            } while (lVar14 != 0x20);
            local_108c = (undefined1  [3])CONCAT12(0,local_108c._0_2_);
          }
          uVar13 = (int)local_2930 + 1;
          local_2930 = (ulong)uVar13;
          if (uVar13 == 10) {
            local_1058 = &PTR_s_---_RAM_DUMP_AT_ADDRESS_0x300_--_001646d0;
            puStack_1050 = (undefined1 *)0x1;
            local_1048 = (code ***)0x8;
            uStack_1040 = 0;
            local_1038 = 0;
                    /* try { // try from 0010a65d to 0010a804 has its CatchHandler @ 0010a9ab */
            std::io::stdio::_print(&local_1058);
            core::str::converts::from_utf8(&local_2978,local_25c0,0x2f);
            if (((ulong)local_2978 & 1) == 0) goto LAB_0010a6ea;
            local_1058 = &PTR_s_Could_not_decode_flag_from_memor_00164700;
            puStack_1050 = (undefined1 *)0x1;
            local_1048 = (code ***)0x8;
            uStack_1040 = 0;
            local_1038 = 0;
            std::io::stdio::_print(&local_1058);
            goto LAB_0010a7c5;
          }
                    /* try { // try from 00109ba6 to 00109cb5 has its CatchHandler @ 0010a9a9 */
          std::thread::sleep(0,2000000);
        } while( true );
      }
      if (local_1058 != (undefined **)0x0) {
        __rust_dealloc(puStack_1050,local_1058,1);
      }
      close((int)local_2988);
      pcVar15 = auVar21._8_8_;
      if (auVar21._8_8_ == (code *)0x0) goto LAB_00109935;
    }
    local_2978 = &local_2988;
    local_2970 = _<>::fmt;
    local_1058 = &PTR_s_Error_loading_ROM:_001646b0;
    puStack_1050 = (undefined1 *)0x2;
    local_1038 = 0;
    uStack_1040 = 1;
                    /* try { // try from 00109788 to 00109795 has its CatchHandler @ 0010a994 */
    local_2988 = pcVar15;
    local_1048 = (code ***)&local_2978;
    std::io::stdio::_eprint(&local_1058);
    lVar14 = local_2938;
    if (((uint)local_2988 & 3) == 1) {
      pcVar15 = local_2988 + -1;
      uVar7 = *(undefined8 *)(local_2988 + -1);
      puVar19 = *(undefined8 **)(local_2988 + 7);
      if ((code *)*puVar19 != (code *)0x0) {
                    /* try { // try from 001097bf to 001097c3 has its CatchHandler @ 0010a954 */
        (*(code *)*puVar19)(uVar7);
      }
      if (puVar19[1] != 0) {
        __rust_dealloc(uVar7,puVar19[1],puVar19[2]);
      }
      __rust_dealloc(pcVar15,0x18,8);
    }
  }
  else {
    local_28d0 = &PTR_s_Usage:_cargo_run_--_<path_to_rom_00164720;
    local_28c8 = 1;
    local_28c0 = 8;
    local_28b8 = 0;
    uStack_28b0 = 0;
    std::io::stdio::_eprint(&local_28d0);
    lVar14 = local_2920;
  }
  if (local_2918 != 0) {
    puVar19 = (undefined8 *)(lVar14 + 8);
    do {
      if (puVar19[-1] != 0) {
        __rust_dealloc(*puVar19,puVar19[-1],1);
      }
      puVar19 = puVar19 + 3;
      local_2918 = local_2918 + -1;
    } while (local_2918 != 0);
  }
  goto joined_r0x0010a857;
  while( true ) {
    cVar5 = local_2970[(long)(local_2980 + -2)];
    if ((char)cVar5 < -0x40) {
      cVar6 = local_2970[(long)(local_2980 + -3)];
      if ((char)cVar6 < -0x40) {
        pcVar15 = local_2980 + -4;
        uVar13 = (byte)cVar6 & 0x3f | ((byte)local_2970[(long)(local_2980 + -4)] & 7) << 6;
      }
      else {
        pcVar15 = local_2980 + -3;
        uVar13 = (byte)cVar6 & 0xf;
      }
      uVar13 = (byte)cVar5 & 0x3f | uVar13 << 6;
    }
    else {
      pcVar15 = local_2980 + -2;
      uVar13 = (byte)cVar5 & 0x1f;
    }
    local_2968 = local_2970 + (long)pcVar15 + -(long)local_2970;
    if (((byte)cVar4 & 0x3f) != 0 || uVar13 != 0) break;
LAB_0010a6ea:
    local_2980 = local_2968;
    if (local_2980 == (code *)0x0) break;
    cVar4 = local_2970[(long)(local_2980 + -1)];
    if (-1 < (char)cVar4) {
      local_2968 = local_2980 + -1;
      if (cVar4 != (code)0x0) break;
      goto LAB_0010a6ea;
    }
  }
  local_2988 = local_2970;
  local_2948 = &local_2988;
  local_2940 = _<>::fmt;
  local_1058 = &PTR_s_FLAG:_001646e0;
  puStack_1050 = (undefined1 *)0x2;
  local_1038 = 0;
  local_1048 = &local_2948;
  uStack_1040 = 1;
  std::io::stdio::_print(&local_1058);
LAB_0010a7c5:
  local_1058 = &PTR_s_--------------------------------_00164710;
  puStack_1050 = (undefined1 *)0x1;
  local_1048 = (code ***)&DAT_00000008;
  uStack_1040 = 0;
  local_1038 = 0;
  std::io::stdio::_print(&local_1058);
  lVar14 = local_2938;
  if (local_2918 != 0) {
    puVar19 = (undefined8 *)(local_2938 + 8);
    lVar16 = local_2918;
    do {
      if (puVar19[-1] != 0) {
        __rust_dealloc(*puVar19,puVar19[-1],1);
      }
      puVar19 = puVar19 + 3;
      lVar16 = lVar16 + -1;
    } while (lVar16 != 0);
  }
joined_r0x0010a857:
  if (local_2928 != 0) {
    __rust_dealloc(lVar14,local_2928 * 0x18,8);
  }
  return;
}

```

<img width="349" height="72" alt="screenshot-1753297859" src="https://github.com/user-attachments/assets/fea36942-9333-46a4-9bfe-da4b778e6be4" />
<img width="539" height="99" alt="screenshot-1753297893" src="https://github.com/user-attachments/assets/e67a326d-1398-4cd8-83e4-1451a1dff356" />
<img width="667" height="388" alt="screenshot-1753297973" src="https://github.com/user-attachments/assets/f41d9563-eee3-4def-9af3-c952c29c6a38" />



 The Secret Opcode: There is a custom, non-standard opcode: 0x0FFF. Standard Chip-8 emulators would ignore this, but this one has a special handler for it.

The Password: The opcode only triggers its effect if a specific condition is met. The line if (local_18c0 == 'B') tells us that the value in register V0 must be equal to the ASCII character 'B'. The hexadecimal value for 'B' is 0x42. This is our password.

The Action: If the password is correct, a memcpy operation is triggered. By tracing the source of this copy (local_1087), we can see the flag string being loaded from the executable's data section. The destination is a fixed address within the Chip-8's virtual RAM. Analysis of the memcpy destination argument shows this address is 0x300.





We have now successfully reverse-engineered the secret protocol. The challenge is no longer a black box.



Part 2: Crafting the Exploit (The Solution ROM)

With the knowledge gained from static analysis, we can now write the custom Chip-8 ROM that will act as the "key" to unlock the flag. The ROM's logic is straightforward:

    Put the password (0x42) into the V0 register.

    Execute the secret opcode (0x0FFF).

    Halt execution to prevent the emulator from crashing.

We use the Octo assembler for this. After some trial and error with the online compiler (which incorrectly flagged main as a missing label), we settled on a minimalist, direct approach.

Here is the final, working solution in Octo assembly:

 The Solution ROM
```
# The Solution ROM

# The main label marks the program's entry point.
:main
    # 1. Load the secret value (the password) into register V0.
    v0 := 0x42

    # 2. Call the secret opcode you discovered.
    0FFF

# 3. The emulator will now copy the flag into its RAM.
#    The ROM's job is done. Loop forever to halt execution.
:freeze
    jump freeze

```

  The emulator will now copy the flag into its RAM.
  The ROM's job is done. Loop forever to halt execution.
:freeze
    jump freeze

We compile this using the online Octo tool, which produces our solution.ch8 file.



Part 3: Getting the Flag

The final step is to run our custom ROM with the challenge executable. When we execute the command challenge.exe solution.ch8, the emulator loads our ROM, executes the two instructions, and copies the flag into its internal memory at address 0x300.

Because the flag is a raw text string, it is not displayed on the Chip-8's graphical screen. To read it, we must dump the emulator's memory. A player would typically do this with a debugger (gdb on Linux, x64dbg on Windows) by attaching it to the running process, pausing execution, and inspecting the memory region corresponding to the Chip-8's RAM.

For verification, we can also modify the emulator's source code to print the memory for us. After running the solution.ch8 ROM for a few cycles, we dump the 47 bytes starting at address 0x300 and convert them from ASCII bytes to a readable string.

The result is the flag.
```Flag: expoctf{g1tch3d_thru_vmpr0t0_in_m1st_0xdead}```
<img width="932" height="250" alt="screenshot-1753298302" src="https://github.com/user-attachments/assets/9ed25589-f2e7-4090-9bd9-6f20b42b18af" />





