use std::io::{self, BufRead, Write};

fn wait_for_enter() {
    print!("\n(Press Enter to continue...)");
    io::stdout().flush().unwrap();
    let mut discard = String::new();
    let _ = io::stdin().read_line(&mut discard);
    if cfg!(target_os = "windows") {
        std::process::Command::new("cmd").args(&["/C", "cls"]).status().unwrap();
    } else {
        std::process::Command::new("clear").status().unwrap();
    }
}

fn main() {
    println!("In the digital realm of Crumble-Top, where rivers of milk chocolate flowed past mountains of gingerbread, there lay a sacred place known only as the Secret Pantry.");
    println!("It was not a pantry of flour and sugar, but one of ancient, powerful code—recipes that could shape the very fabric of the digital world.");
    wait_for_enter();

    println!("Guarding the shimmering, wafer-thin door to this pantry was a creature of legend: the Muffin Guardian.");
    println!("It was a colossal being, its body a swirling vortex of perfectly baked dough, its fists studded with hardened sugar crystals. Its eyes, two giant blueberries, glowed with the soft, steady light of a thousand active processes.");
    wait_for_enter();
    
    println!("For centuries, the Guardian stood silent and still, a mountain of fluff and fury. Many had tried to bypass it, only to be met with a roar that could corrupt data blocks and a swing of its mighty arms that could shatter the strongest firewalls.");
    wait_for_enter();

    println!("One day, a young script named Kai sought the Pantry's knowledge. He learned that the First Coder had not intended the Guardian to be an impassable wall, but a lock. And every lock has a key.");
    println!("Kai discovered the key was not a password to be broken, but a name to be earned—a sign of trust. It was the name of the First Coder's most trusted companion: a mischievous but loyal data-sprite.");
    wait_for_enter();

    println!("[GUARDIAN PROTOCOL V1.337]");
    println!("[STATUS: AWAITING INPUT]");
    println!("The colossal Muffin Guardian blocks your path.");
    println!("Its blueberry-colored optical sensors analyze you. A synthesized voice resonates:");
    println!("\"Authentication required. Provide the decryption key to proceed.\"");
    println!();

    print!("Enter key: ");
    io::stdout().flush().unwrap();

    let mut user_input = String::new();
    io::stdin()
        .read_line(&mut user_input)
        .expect("...[TIMEOUT] Guardian protocol terminated.");

    let trimmed_input = user_input.trim();

    if check_key(trimmed_input) {
        println!("\n[AUTHENTICATION SUCCESSFUL]");
        println!("The Guardian's form shifts, becoming translucent. It steps aside.");
        println!("A data stream projects from the pantry door, revealing the payload:");
        println!("\n==================================================");
        println!("  ACCESS GRANTED: MIST{{pr0t0c0l_by9ass3d}}");
        println!("==================================================");
    } else {
        println!("\n[AUTHENTICATION FAILED]");
        println!("A surge of corrupted data flows from the Guardian, overwhelming your senses with the scent of burnt flour.");
        println!("\"INVALID KEY. CONNECTION TERMINATED.\"");
        println!("\n**************************************************");
        println!("           Incorrect key. Anomaly detected.");
        println!("**************************************************");
    }
}

fn check_key(input_key: &str) -> bool {
    let xor_key: [u8; 4] = [0xDE, 0xAD, 0xBE, 0xEF];
    let encrypted_correct_input: [u8; 5] = [0x93, 0xE4, 0xED, 0xBB, 0x87];
    let input_bytes = input_key.as_bytes();

    if input_bytes.len() != encrypted_correct_input.len() {
        return false;
    }

    let mut encrypted_input = Vec::with_capacity(input_bytes.len());
    for i in 0..input_bytes.len() {
        let encrypted_byte = input_bytes[i] ^ xor_key[i % xor_key.len()];
        encrypted_input.push(encrypted_byte);
    }

    encrypted_input == encrypted_correct_input
}

