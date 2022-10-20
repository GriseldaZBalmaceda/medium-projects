// make your first server using https://nodejs.org/en/docs/guides/getting-started-guide/
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
});

server.listen(port, hostname, () => {
  console.log(`Server is running!`);
});

// Easy puppeteer scrape
const puppeteer = require("puppeteer");

const TestPage = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const response = await page.goto(url).then((response)=>{
        let message = '';
        if(response){
            if (response.status() === 404) {
                message = 'oh uh we got a 404!';
            } else if(response.status() === 200){
                message = 'huzza this page is not broken!';
            } else {
                message = 'hmmm dont know but something is not correct';
            }
        }
        return message;
    }).catch((error)=>console.log(error));

    await browser.close();
    return response;
}
//add the link you want to test!
TestPage('https://medium.com/').then((response)=> {
    console.log(response)
    server.close(() => {
        console.log('Done');
        process.exit(0);
    });
});
