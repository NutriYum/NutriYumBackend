/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */


const db = require('../server/db')
const {
  User,
  FoodLogs,
  Image
} = require('../server/db/models')

const FoodLogSeed = require('./foodLogs')
// console.log(FoodLogSeed);

async function seed() {
  await db.sync({
    force: true
  })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({
      "userName": "Frank",
      "email": "a@a.com",
      "profileImgUri": "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Bugs_Bunny.svg/1200px-Bugs_Bunny.svg.png",
      "height": 5,
      "weight": 178,
      "DOB": "06/01/1988",
      "password": "123"
    }),
    User.create({
      "userName": "Mickey",
      "email": "b@b.com",
      "profileImgUri": "https://upload.wikimedia.org/wikipedia/en/d/d4/Mickey_Mouse.png",
      "height": 6,
      "weight": 216,
      "DOB": "11/02/1986",
      "password": "123"
    }),
    User.create({
      "userName": "Tweety",
      "email": "tweety@lt.com",
      "profileImgUri": "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Tweety.svg/1200px-Tweety.svg.png",
      "height": 5.5,
      "weight": 220,
      "DOB": "2/23/1993",
      "password": '123'
    }),
    User.create({
      "userName": "ayexley1",
      "email": "rbazire1@blog.com",
      "profileImgUri": "https://tshaonline.org/sites/default/files/images/handbook/PP/popeye-sailor-man-cartoon.jpg",
      "height": 6.1,
      "weight": 180,
      "DOB": "7/26/1998",
      "password": '123'
    }),
    User.create({
      "userName": "ldobby2",
      "email": "vburgise2@archive.org",
      "profileImgUri": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Goofy.svg/1200px-Goofy.svg.png",
      "height": 5.9,
      "weight": 178,
      "DOB": "10/7/1997",
      "password": '123'
    }),
    User.create({
      "userName": "dshirt3",
      "email": "aeastbury3@ox.ac.uk",
      "profileImgUri": "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Donald_Duck.svg/1200px-Donald_Duck.svg.png",
      "height": 6.1,
      "weight": 181,
      "DOB": "5/27/1987",
      "password": '123'
    }),
    User.create({
      "userName": "hwarman4",
      "email": "ekerby4@marriott.com",
      "profileImgUri": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Daffy_Duck.svg/1200px-Daffy_Duck.svg.png",
      "height": 6.2,
      "weight": 213,
      "DOB": "2/2/1998",
      "password": '123'
    }),
    User.create({
      "userName": "jespinet5",
      "email": "tmelledy5@ftc.gov",
      "profileImgUri": "http://dummyimage.com/213x178.jpg/ff4444/ffffff",
      "height": 5.6,
      "weight": 162,
      "DOB": "10/27/1995",
      "password": '123'
    }),
    User.create({
      "userName": "kgabriely6",
      "email": "delam6@loc.gov",
      "profileImgUri": "http://dummyimage.com/190x120.png/ff4444/ffffff",
      "height": 5.7,
      "weight": 175,
      "DOB": "1/28/1997",
      "password": '123'
    }),
    User.create({
      "userName": "lcaesmans7",
      "email": "glounds7@census.gov",
      "profileImgUri": "http://dummyimage.com/103x239.png/ff4444/ffffff",
      "height": 5.7,
      "weight": 169,
      "DOB": "4/26/1996",
      "password": '123'

    }),
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)


  const Foodlogs = await Promise.all([
    FoodLogSeed.forEach(foodLog => {
        FoodLogs.create(foodLog)
      })
  ])

  // // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${Foodlogs.length} FoodLogs`)
  console.log(`seeded successfully`)

  const images = await Promise.all([
    Image.create({
      "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI1SURBVDjLY/j//z8DJZgsTV+9fAu+uHo8+GzvXECWAV+c3R//mTn9/ydLu4eka3ZyY/ts63T3k4Xt+4/GlqS74JONY+9Hc5tdH4wsmAmGgWv9xQKX2nMPnapOF4A1WzsEfjSzefLB0FwUHoi/szPX/05P/f0rOWk9ugHONWefzNl44X/B/L3/o7LXnn1h4fitN6i22Tx7W5tpxqYHxmnrChh+p6X+/rd10/+fsbF/f0REmiE0n7F3rDz5wb7s6Bu3gt3Vz80db69zTd1mlr11tUnGxt89Cw/8N0ha9YDhZ2LC+p8xMb9/hEdc+h4Ucu+br//JFXFNi5zKjz20KztiDzIMGFgzP+iZboQZbpSypsAgaeUjvfilqIEI9C9bf8rk3Wd8kz59sHV+BQysa8DA+vNe1+Tr8VD5hgO+fA/3OLH82+nK/AiIK1ACEehfCceqU8fsy48ttS05xAkMLANgYP39N23K/1t26n8vFlv8/L619/+/azv+f11R9P90tu6fXc4suQyudRcKgP59DvTvG6B/S5Fd9F7baP07Nb3f+xzZv3wDav4/yff//3LB///bFP+/7nL4v9OF+R6DU/WZB5PXXPwP9O9LXNEJcva/s+v+I4P39RL/QeIMDhXHC+xKDz+wKdpfgMsAoH8ff5mb/P8/UNOPMob/74D4YQbzf6D4E6JS3+FwqYaTKaq/n5Ur/n9Vyfr/bgrj/72+LH92uDJXEZ2Ej4TLVgBtvA+NhccgzSBxAIJCoGJnoURSAAAAAElFTkSuQmCC"
    }),
    Image.create({
      "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIaSURBVDjLhZFNaBNRFIWzFdy6EIrQhdCFLlyJ4KLgShFciOhGTbVVUFf+rNxYEFPtmPhDKWI3diP2DxJF22mfirQrMVpbRKUohJi0SUwySZvJzBhOz32dlCimHfh4897cc+67ZwInQuNtJEyiTXhGzpIdAAL/EuCH+69nk6pUcZVVZ2WNIlkqVtTo9IJi3Y1mBjERF1icX3bV77KrsmVHZUuOWrKq+jyRKYvBYFMD6SrijC9aLFZVqmCrZN7W+80MnpdsV+XYWYrTFL+dS72/8ng6f8qY9E4TWVnnkIJPktyS/MRgJEeh49W0WDpfG5gpMhdwNFh1VtZgLmAuYC6gdlQMOo2RuIovZJT7p6Y52Wt6Iub84GhgLmAuYC7gLfU5xxKD73oOvuwnQ5L4xIeEzOtJVxFnfBFzAW8H5qL3fxn4Jk/MuBaPkzJzAXPRxekGcSJXQZrvv3LLYvCzLt4iYZJXZCdZZC6oerV18fC7IVx9FMS58BF03DmE/thDMfhaN9hGukmrvw+Fxz5i9kcWzATRmafoHu7Ai/k+fEqZiExewPHIbrRfPvAm8L9/65scI5ZVcRC8fRDRuXuIfnkAeYypLkSmzmPvxe12UwPf5BtzweHre/ByfgCNT+xznxhsKN4qNyD2vkstTq95BiEzqMWhieDmN6CwhYyRXSy8edRow12zU3eWVfY8NzYcoREW95CSXNtfe+R8FZtm9C3KURomAAAAAElFTkSuQmCC"
    }),
    Image.create({
      "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKUSURBVBgZBcHda5V1AADg5/29Z/NMNzvW5qbhwmLpQkpbkqBFXvVBF0pXUXdddVMHu5Agsv6D8KbwppC6LRAqQWhdRKTmoAwvnJSOOsqmTmU7H+/H79fzZIN3tIanndDQBhAQABAAABU6PiuWfNoYnnbCzOG2yTnyIUKDLCNkZIGQETLkZMiQajoX28M/nNHQ0DY5xyBnaj85lq9we4EQyAMCObJASoyOs/VZtp5pN0A+RGiy7yjgKOU6i+e49j31GjJSQsbqLZqPEAkisgbdm1z+jr9/YX2FoU08dYRXT7L9ACCjLOmXVAUFDQEho3uTv74mZDQC43vZ+zYPTfP8+yyc4to5BhXFgLKmT0NAwNR+Xmxzb4nOAkvz/HScuXetjzTdjx2Tk3vki+cZVJQVBUGEnAxDm5iY5Zm3eOUkrZ3iwhfuXvlKs7XH6vgO0gb6JWVNnyAgw90/+PE9Lp1ifYWhjRz6yL2RUSOTB23ets/q9Xm9XYfoV5SRgiAgBFKgt8zSPPMfcuNnRf+uO1XP2HhL/eCM8dk3Ldf3pH5FUVMQRMjIEwc+4NDHbHuOhS+tXD7t4Zkj9BdcOP2N0VbP6vXf3J/YSlVTEEBITOxh+34mZtlx0NraqrLfNbalKw7+IUX12kU7Xzrm3w19dVlTEICM3gplF6TlRZ2ypzW9V+z+KcWeuTd2iUVHs3nV5tnXdbodKoICqULN2WOcPe72r59rzrxm49htqbpDlrv07VVEsX/VxJOP+e9BR3d0g/yTGS1TIwdsmWF4lJAsLt8wffi40MhlQzuE5m6P7ntBaO6WDT+hsWlGPva4653zi9ngZa3hKSdMaYuouDD5tDqSYpLqKMUoxSTFJMUoxSSlWKWUfv8fIbEaFyrl/WgAAAAASUVORK5CYII="
    })
  ])
  // // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${images.length} images`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
