"use strict";

// Dependencies
const puppeteer = require("puppeteer")

// Variables
const args = process.argv.slice(2)

// Functions
async function hide(){
    const browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
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

async function show(){
    const browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
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
if(!args.length) return console.log("node index.js <show/hide> <publicMessage> <privateMessage>")

if(args[0] === "show"){
    show()
}else if(args[0] === "hide"){
    hide()
}else{
    console.log("Invalid show/hide option.")
}
