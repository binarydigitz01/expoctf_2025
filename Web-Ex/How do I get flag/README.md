# How do I get flag?

**Author: hadakoi**


## Description

You’re somehow stuck inside your home router (don’t ask how). The only way out? A strange, futuristic ship that can sail the seas of the internet. Its console, however, doesn’t talk — it only shows a silent, static screen. To navigate, you’ll need to **learn how this ship communicates** and speak its language. The site you’ve started on has all the clues, but only if you know how to talk to it the right way…

Can you figure out the correct commands to send and chart your way to the flag?

## Solution 

When you visit a website, your browser sends an HTTP request to the server, which includes **HTTP headers**. These headers carry details like your browser type, operating system, the page you came from (referer), and other data the server may require to identify or validate your connection. Websites often use these headers to enforce rules, such as only allowing certain browsers, checking where you came from, or verifying tokens for access.

By **spoofing or editing these headers**, you can make your requests appear as if they meet the server’s requirements. Tools like `curl`, browser extensions, or intercepting proxies allow you to manually set headers like `User-Agent` or `Referer`, tricking the server into thinking your connection is valid, even if it normally wouldn’t be.

You can use **Burpsuite** or **curl**


```
curl -H "Referer: https://www.wearemist.in/" \
     -H "Accept-Language: kn-IN" \
     -H "DNT: 1" \
     -H "Age: 18" \
     -H "Cookie: flavor=Peanut-Butter" \
     -H "Date: 2016-01-01" \
     -H "Cache-Control: no-cache" \
     -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64; Arch Linux) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
     WEBSITELINK
```

**P.S:** List of accepted Lanuage codes for Accept-Language: [coolwebsite](https://learn.microsoft.com/en-us/graph/search-concept-acceptlanguage-header)

Also the ``User-Agent`` for the last step just needs to have arch linux or Arch Linux even archlinux works.

## Flag

> expoctf{h3ad3r_m4n1pul4t10n_m4st3r_69}mist