#!/Users/minhhien1996/.nvm/versions/node/v12.22.4/bin/node
const cheerio = require('cheerio');
const url = require('url');
const axios = require('axios');
const {exec} = require("child_process");

const main = async () => {
  console.log(`CHECK FPT AT ${new Date()}`)
  // HCM
  const url = "https://fptshop.com.vn/may-doi-tra/Ajax/Product/AjaxGetAllProductByNameAscii?nameascii=iphone-12-pro-max-128gb&currentPage=0&OrderBy=1&FromPrice=&ToPrice=&CityID=23"
  // HN
  // const url = "https://fptshop.com.vn/may-doi-tra/Ajax/Product/AjaxGetAllProductByNameAscii?nameascii=iphone-12-pro-max-128gb&currentPage=0&OrderBy=1&FromPrice=&ToPrice=&CityID=26"
  const host = "https://fptshop.com.vn/";
  const response = await axios.get(url);
  if (!response) {
    console.log('NO RESPONSE');
    return
  }
  const html = response.data;
  const $ = cheerio.load(html)
  const links = $('.mc-lpcol')
  links.each(function () {
    const href = $(this).find('a').attr('href');
    const text = $(this).find('a').text().replace(/\s\s+/g, ' ').trim();
    const fullUrl = new URL(href, host).href
    console.log(text, fullUrl)
    exec(`open ${fullUrl}`)
  });
}


main()
