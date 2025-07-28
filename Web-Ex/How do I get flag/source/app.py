from flask import Flask, request, render_template

app = Flask(__name__)

REQUIRED_REFERER = "https://www.wearemist.in/"
SECRET_FLAG = "expoctf{h3ad3r_m4n1pul4t10n_m4st3r_69}mist"

def check_headers():
    """Check headers and return stage number (1-9 = failed stage, 10 = success)"""
    
    # Stage 1: Referer check
    referer = request.headers.get('Referer', '')
    if not referer.startswith(REQUIRED_REFERER):
        return 1
    
    # Stage 2: Accept-Language check
    language = request.headers.get('Accept-Language', '')
    if 'kn-IN' not in language:
        return 2
    
    # Stage 3: DNT header check
    dnt = request.headers.get('DNT', '')
    if dnt != '1':
        return 3
    
    # Stage 4: Age verification
    age = request.headers.get('Age', '')
    try:
        age_int = int(age)
        if age_int < 18:
            return 4
    except (ValueError, TypeError):
        return 5
    
    # Stage 5: Cookie check
    cookies = request.headers.get('Cookie', '')
    if 'Peanut-Butter' not in cookies:
        return 6
    
    # Stage 6: Date check
    date_header = request.headers.get('Date', '')
    if '2016' not in date_header:
        return 7
    
    # Stage 7: Cache-Control
    cache_control = request.headers.get('Cache-Control', '')
    if cache_control != 'no-cache':
        return 8
    
    # NEW Stage 8: Arch Linux check
    user_agent = request.headers.get('User-Agent', '')
    arch_indicators = ['arch linux', 'archlinux', 'manjaro', 'endeavouros', 'Arch Linux', 'ArchLinux']
    if not any(indicator in user_agent.lower() for indicator in arch_indicators):
        return 9
    
    # All stages passed!
    return 10  # Success case

@app.route('/')
def main_challenge():
    stage = check_headers()
    
    messages = {
        1: "I don't think you are coming to get the flag from our site? (be a nepo baby and get a 'referral' from us in the way websites speak)",
        2: "We don't allow people in that don't know kannadam, we need to 'Accept your Language' else it won't work", 
        3: "Your being tracked if you continue like this. Shake them off.",
        4: "To-yung u needa get outta here (don't talk to roonil)",
        5: "We need to verify your age.",
        6: "Gimme a cookie, preferablly a Peanut-Butter one, I do not want your stupid data just a simple Peanut-Butter cookie",
        7: "SECURITY QUESTION: What year was MIST founded?.",
        8: "It seems like you have data stored on you from traveling around the sea, I think clean yourself off else scram! (Unless u have 'cash' contact hadakoi on discord, then gpay him 100 :D)",
        9: "Why aren't You using Arch Linux like you normally do? This seems like some sorta scam ngl ;-; (Time to install Arch gng else this ain't working for you!!!!!! here is some help -> https://wiki.archlinux.org/title/Main_page)",
        10: f"CONGRATULATIONS! All stages completed!<br>Flag: {SECRET_FLAG}"
    }
    
    message = messages.get(stage, "Unknown error")
    
    if stage == 10:  # Success case
        return render_template('index.html', message=message)
    else:
        return render_template('index.html', message=message), 403

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)