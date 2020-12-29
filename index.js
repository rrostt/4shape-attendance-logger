const { parse } = require('node-html-parser')
const fetch = require('node-fetch')

const extractNum = text => {
  return text.split(' ')[2]
}

const getNumPeople = () =>
  fetch('https://www.gymcontrol.se/user/3900/kundinloggning/index.php?byt=ja&year=&week=&year=&month=&date=&page=&valdanlaggning=1&submit=OK')
    .then(response => response.text())
    .then(html => {
      const dom = parse(html)
      const el = dom.querySelector('.link').childNodes[0]
      const text = el.rawText
      const num = extractNum(text)
      return num
    })

const logNum = () => {
  getNumPeople().then(num => console.log(new Date(), +num))
}

logNum()
setInterval(logNum, 1000*60*5)
