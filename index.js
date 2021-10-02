//Dependencies
const Puppeteer = require("puppeteer")

//Variables
const Self_Args = process.argv.slice(2)

//Functions
async function Hide(){
    const browser = await Puppeteer.launch({ headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    const page = await browser.newPage()

    await page.goto("https://neatnik.net/steganographr/", { waitUntil: "domcontentloaded" })
    await page.type("#public", Self_Args[1])
    await page.type("#private", Self_Args.slice(2).join(" "))
    await page.click("body > main > form:nth-of-type(1) > fieldset > p:nth-of-type(4) > button")
    await page.waitForSelector("#results > textarea")
    
    const result = await page.$eval("#results > textarea", element => element.textContent)

    console.log(`Result: ${result}`)
    await browser.close()
}

async function Show(){
    const browser = await Puppeteer.launch({ headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    const page = await browser.newPage()

    await page.goto("https://neatnik.net/steganographr/", { waitUntil: "domcontentloaded" })
    await page.type("#encoded", Self_Args[1])
    await page.click("body > main > form:nth-of-type(2) > fieldset > p:nth-of-type(3) > button")
    await page.waitForSelector("body > main > div > div.message-text")
    
    const result = await page.$eval("body > main > div > div.message-text", element => element.textContent)

    console.log(`Result: ${result}`)
    await browser.close()
}

//Main
if(!Self_Args.length){
    console.log(`node index.js <show/hide> <public_message> <private_message>
Example hide: node index.js hide nice! Nice try!
Example show: node index.js show resultofthehide`)
    process.exit()
}

if(Self_Args[0] == "show"){
    Show()
}else if(Self_Args[0] == "hide"){
    Hide()
}else{
    console.log("Invalid show/hide option.")
    process.exit()
}
