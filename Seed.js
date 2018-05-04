/* eslint-disable */
const bluebird = require('bluebird')

const db = require('./server/db')
const User = require('./server/db/models/user')
const Foods = require('./server/db/models/foods')
const Images = require('./server/db/models/image')

const users = [{
  "email": "dogilvy0@homestead.com",
  "profileImgUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHXSURBVBgZpcE/S5VhGMfx7+8+T2VI0SDVKvYSrKE/0FsIwgZpCFqiISSiIcoigkIosWyrOR16AU2NETSGZUQoiNYgBJ1znufcz3VdeUvOIX4+igj2QhemFq6fPT/+ZLMXwxGAO+GOuREeeDhhhkcQZpg7h/fn7tLS2u23Tyfmq/Ez43P7hobTsSF2Y7jbszlgvurlSL3NP+xWP0diSxUWPJo8wW5dfbxCUUU4xaA1AggPzMEJ3ANzx9rA2sDCGVgwevwQ5kZREUGhJBRBJBEK5CIlISUkQ52g44mqDQpvjaIyN4oEhASCToAL3INOQFKHSmAKLDmFm1NU4cE2CSJIQEggkCAscMHsp4d4G9w4eY/C3SiSu7FDEkgUCUgSqhIzH+7SH3TpNr+ZfjdF4e4Uqc2ZbRKSKCSBhHnL/fc3yblhbGSM0aNj1LnLlVeT5NxQpDCn6AACJCFAwPOPM/zcXKeuG+p2QN02HNh/kNWNFX6lBYrk7uwQkIAk0ZG4dfoOry++YXn1G02uaXLN8vdlZi+/ZCRfoqjWfqwsXnuWJ9wMN8fMcHcsZ9wdj6B/pKbfNmTLbKxvMD37hS2LbFFE8D/nHpyKpsnkOjMYZD6/+Cr+UUSwF38B/pkb32XiUiUAAAAASUVORK5CYII=",
  "height": 5,
  "weight": 178,
  "DOB": "06/01/1988",
  "password": "7kIpEprYLYie"
}, {
  "email": "btaylor1@goo.gl",
  "profileImgUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJPSURBVDjLhZPNi1JRGMZv6PwBLQaiqBiIoEV7QQaiaZazrNm0qlkMRJugptpEBNJMtAmapK9lhZ8oKnq5FxQVv7qOX1dRzBxHU8eohc219OrTOVfGSZyxC4cL73nf3/O857yHEUURmUwGqVQKyWQSiUQC8XgcgiAgFovNAmCmLSadTqPf70+sarWqQMLh8FQIQ5VpQaVSUZTL5fIIQmPEBQKBwJEQhlqmyVSNBqLRqNBut9Hr9ZQ4BYZCIXi93kMhDFXdTyTFf4jlSqfTQaPdA78zdFIqleD3+8Hz/ASEocr7lmVZBi3e3etjY2uAJ58BrjLcKxaL1AU8Hs8YhCE9Sq1WS0nqdruoE+X1+ACbGeC1CDzbOoAUCgXqAk6ncwRhIpHIPOlRajabSlK61VOU9QTwPge8yY5D8vk8dQGbzaZAFEowGNSSHqVGo6EkZb/38FToQy8eQNbjALs9hORyOeoCFotldtSLz+fTkh6ler0+AXlLAB/1L8FevwBuYQb8tVNwP74Bk8l0duxESX9ajuOkWq02gugI5MOrTSTuzqPjfI5B1o29T3cQu3VRZhfUtyfulWVZrdvtlugkUohIII7lc5BIMV4sAWvHAd0cWhuX4LmiKh06XS6XS+twOCQ6iRRCbQ8EC/79fj46Ae6yenDkjNvtdg05aYkOGHf1JH69uwmQot/3GPwga3tVBc+iqjr1pVmtVo3ZbJZ43SoiK+flb2tz2H0wgy8rx8AvqWX3ouoh87/najQaNQaD4Uxg+fR9oviV2ib/HVpM9/8Cz3kffqwCPcsAAAAASUVORK5CYII=",
  "height": 6,
  "weight": 266,
  "DOB": "11/02/1986",
  "password": "VEPockBmj4e"
}, {
  "email": "memsden2@addthis.com",
  "profileImgUri": 'https://i.pinimg.com/originals/c9/87/c7/c987c719aa87985dc9d30f82c6be4d8b.jpg',
  "height": 6,
  "weight": 305,
  "DOB": "07/27/1988",
  "password": "Olq1FexZ6M8y"
}, {
  "email": "pcamplen3@eventbrite.com",
  "profileImgUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIMSURBVDjLpZLLaxpRFMZHCEIp/V/SfaGL/gXdZxMIpd0kgo6jINoH6iIIBd1kFRdmoZUOs4pVXDhKfJCA+AQfAz4QCQSf41tP77lwB2mTLtILZ2Zzft/3nXMvBwDcc0uW5XfPAtPptD4ej9skSeo/2lCpVF6VSiVXPp+/zWazEnF6s+f6+pqccDis+v3+v+FyufyCwLedTgcmkwn0+33I5XIQiUR+xWKx78RVqdVqkEqlwOPxXP3prC8WizetVgvw7HY7YKdarUIoFFJJAvB6vQ9ut/vUZrO9ZKCONHwoFAodRVFgvV7DdrulAljD4RBUVYVerwc+nw9cLteR2WzWI4uRdaR+ttttGhkBjI3Nq9UKME29XofpdEpFo9EoOJ1OnqXmyKI+s8gsNiZoNptAkkG324X5fE4LBXF+h8NxrQlkMpkURmRx0WWz2cBsNqNz4zIxPqZDYWIIVqs1rgkkEon75XKpgeiyWCyoIwojgH+EyZWCxWLZGI3Gt5pAUhTv0Q0bGMgcR6MRFWw0GiCKIgiCUCbw4f7NcbmLCxl3gO77ILqymcl13RH47LFHx9UF86V6fg6rZJIC4/GYFo6FQoFAAMiVvX/qWXOtk5ODxtnpzezbV7o0dB4MBkDeBASDQeB5/ovBYNA9KYAf5fj4oPjp46UkCPIVb3qw2+09sukfJpPp6F+wJvA/9RsZICZTCkof6AAAAABJRU5ErkJggg==",
  "height": 6,
  "weight": 389,
  "DOB": "09/27/1986",
  "password": "wW5gRjUA"
}, {
  "email": "mcurtoys4@google.co.uk",
  "profileImgUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJUSURBVDjLhZPPS1RRHMU/997nzDihTx0zFxrRxkqyQKNaBBGCWzetXUhYCUKLfrhtEdFGCqEWQf9AuK5FQouiokWrFoYuBioZ480o47x57/5q0cw4ReUXzvKce8/3fI/w3gMghBgCDgGK/08JKHrvHQDeexoi4/V6vaK1tsYY/zfU63W/vLz8EDgCSO894sKtF2Z4IKcS5XHG4qzHGEdeKDaKEasPpnDOkaYphUKBra0tVlZWHs3Pzy8BxSCXzzJ+cpC1qEaaGoy2OOMYKXSytl5CSon3HiEEAGEYMjMzsxAEAXNzc0vSGmsq2zFHuzpIYk1SN4z0dVKuxOAsSimklC2BTCZDLpdjdnZ2ARiQ1pibqx++plE55nghz4n+PFF5l1dvNrhx+TRSSpRSZDIZKpUKURRRKpVaGxX23VD4fnPs+bGe4uQBVcVZTznO8M1PcerSXVBdWGt/g3OOMAwJguBs4CyLZ0bHJkXfHZxLkGabXr1N1+ZL4s/3yY/dQynVjBohRDM1AKTTtWuifxqrK9i4iN1dx8YbyL4Jdj4+aRGbVpRSBEHQEgis0d3Sg7dVsDW8reF1BYQiKe/seW28rJT64wfG4X2Kt/Evsqvh7S7YOjrZO7RmlO1kAGl0uuP1DjjdEInBW7yponV361pbBCmRUrYJVPXj+MszhOxAZg8ic4MI1cOPT2/Jj179bXntaFn7/pQwiVisRVx3KV06BeN6Cc9d4fD0bYJ8+K9SuSAIzou2Nk4kSfJaKZUD5D6NdNbaWjabvdguMNyo837k5lig9BMTlFjmy9KhMwAAAABJRU5ErkJggg==",
  "height": 6,
  "weight": 308,
  "DOB": "04/30/1988",
  "password": "9XuBWW"
}, {
  "email": "mvarndell5@shop-pro.jp",
  "profileImgUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIpSURBVDjLddM9aFRBFIbh98zM3WyybnYVf4KSQjBJJVZBixhRixSaShtBMKUoWomgnaCxsJdgIQSstE4nEhNREgyoZYhpkogkuMa4/3fuHIu7gpLd00wz52POMzMydu/Dy958dMwYioomIIgqDa+VnWrzebNUejY/NV6nQ8nlR4ufXt0fzm2WgxUgqBInAWdhemGbpcWNN9/XN27PPb1QbRdgjEhPqap2ZUv5+iOwvJnweT1mT5djZKjI6Ej/udz+wt1OJzAKYgWyDjJWyFghmzFsbtcY2gsTJwv09/Vc7RTgAEQgsqAKaoWsM8wu/z7a8B7vA8cHD3Fr+ktFgspO3a+vrdVfNEulJ/NT4zWngCBYY1oqSghKI465fvYwW+VAatPX07IZmF7YfrC0uDE8emPmilOFkHYiBKxAxhmSRPlZVVa2FGOU2Ad2ap4zg92MDBXJZczFmdflx05VEcAZMGIIClZASdesS2cU/dcm4sTBArNzXTcNakiCb3/HLRsn4Fo2qyXh3WqDXzUlcgYnam3Dl4Hif82dbOiyiBGstSjg4majEpl8rpCNUQUjgkia0M5GVAlBEBFUwflEv12b/Hig6SmA1iDtzhcsE6eP7LIxAchAtwNVxc1MnhprN/+lh0txErxrPZVdFdRDEEzHT6LWpTbtq+HLSDDiOm2o1uqlyOT37bIhHdKaXoL6pqhq24Dzd96/tUYGwPSBVv7atFglaFIu5KLuPxeX/xsp7aR6AAAAAElFTkSuQmCC",
  "height": 6,
  "weight": 120,
  "DOB": "08/31/1986",
  "password": "TrUb6Mbm"
}, {
  "email": "gstiffkins6@webmd.com",
  "profileImgUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJMSURBVBgZpcFLiI1hGMDx//ed78yZ4RzTzGHcRpEZUpqajbsmaYpcdpRYYGEhbGwUG2VhMwslScnCwoZSChE2khW5LliImDFk3M4333nf93mfB6VsFDW/X2JmTETKBKVMUHb04kfjL0SVEBQnQghQiFE4wQWh8EYelKIQMn5a2tvGH4aoEaMhakg0ghhBlRCMIEqIihflzO1RMn77Ni5EBVFDouKjEUQJYnhRnER8MJwoPiid1YyiIaT8pGYM9tVwIbKhv8bW5R3sWNnJzoE6KxdWackStq2YSmtLwu41XTRcZNxFtAikToQgSiVLcEGplFNO3/xAksDQlRG662UWzKwwu7OFyS0pc6dVyJuRIiiaC1nuhKYolXLC9tV1sjQhd4KZ0XARVVjaW8WAZlAazci4j7iQYnkkaxSG80rhlRNXRzmwfjrjTcWAvBmJZjx5XfBm5DqjI9c4cvYLk0OTsU8DqOsn+1p4mr4NM8idYAYNJ5hB7iKqxrmb5+mZ84DBgSV0d/Zy59ll7j+9QH36C5K1x57bpv4O3o45fFCcKC4YXhQnihelXQ+yZeM6KKVsXrSfoVt7KJFy4dI10m/fhcJHaq0lapNKtLeV6KiWqFdLTKtmdE0p86UxSjmpsnnRfn45uPYM87v6SNJANlYETl59hwVDnWJesKCYi+AVi0rP4s88G77Ho+G7HBo8x/Ebu2gtVTAtk5gZ/7Js36xj3fPaD6/oW0XvjH5evn/Ivcd3efvq61BiZvyPZftmHQf2AjXgO3Dq/snhQz8A9uxhvZij7OIAAAAASUVORK5CYII=",
  "height": 5,
  "weight": 367,
  "DOB": "01/01/1986",
  "password": "FwAFRrT"
}, {
  "email": "cwringe7@epa.gov",
  "profileImgUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADwSURBVCjPpdGhSwNhHMbxX93f8WpRs/VAGXYF0SA4DgyGsaDBwdQfJoO23dzumsFgfoNcMEwss3gKr0G4uuzSC6dfy8KdDBHkU79PegT5nfw5SEiIiRnQp0dEJdCaBgmO4ZQjYi/YrU0DDXVyVVlHdDlhe7IRIqL1AU/kMww5YK0ummWM6cww5oHNd1FfUDDi44dHCgpaX3KMx3NLzqgk5xqPp4G0cTh6vHFf4rjE4QiQQ1JSLnjlruSFM1JSFpAWFksXRTmiSYN1VlmhicUyj+x/3mBRzitOWcISY5Cwv5NtVdbLLGIwzGGeTVv+/eY3onJlSlwTV9MAAAAASUVORK5CYII=",
  "height": 5,
  "weight": 265,
  "DOB": "04/20/1986",
  "password": "hPGGnudP1i"
}, {
  "email": "acubley8@rakuten.co.jp",
  "profileImgUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE3SURBVCjPfZHNSgJhFIa/C3AldD2ugraCF2E2OdX6c0ZtQAj7nUJoUxZtKn+mwE20CoRW4/hTTukg3xUIugmCp8UMYhs5u/M+L+fwvgKxegRCCSWUcOKO1XSb08as4dat+lq4XQBOsjXvEqBQBHg8z2upJcBJvDFmwhgfn28CRtyxvxEBzVhLjQjwGfLBgD59XrEpBoVYCBgeE4YLucste1xSplBACESjHTCKxB5dbthFx8Im/44QiPqv4jPyelTZQSeLRgWTBTCgF8k6OttobHGBEQK19hgfjw7XkVcjg8kxRnji0XAZ0+Fq4c2Q5pwSufDJh9iT+uKFbCRuksamjAxkLArqPlHllAp5NHRy2BxSRK4vRZ1PmrMDTrA544gSciZT/7pQwowbluHmfuRUutKSy2Wtnj+jSVcdCo7izAAAAABJRU5ErkJggg==",
  "height": 5,
  "weight": 133,
  "DOB": "05/20/1986",
  "password": "L7sn0ad"
}, {
  "email": "hferrar9@sourceforge.net",
  "profileImgUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIESURBVDjLpZM9S9ZhFIev/+Pz+BKGUBAZJUQEOqRCi6hDYAYtfQdXySki+wYubeHQEoHQWoRLYBGIOFhkJTg0tCShgfq83W/nPqfhH9SgIXTGM1zn+p3DKcyM/6nqUc3553uWVYkCOStRlCDKs9lLxYkAISqTg6cQVdRAsvFyo35yA5eUmJW9QyFlo6+ng6bTkwNaToii+KRINkK1QsPJ0QB7eL/coiqWBEtC+/IDQjR8MpIo3bVM3ed/GEzdBFWKnClyprGpBDFcyKQMPTWjflwES0IhAh/egyQYHqXpIj4p7VhG8J0F4tIxgBBLQPCQBJJwGIyQFBeUlI3eLkVbytzKjKUoxJhIPhFCoqI+gAj4AN5DjDRbio+Gi6WFT8ZQ/xqdXzO23UC29xnQAXzLU1X3e3IIECOIIC6VBlGJ2QjtZW5MbHB9aIyLZ67ydusF619WONgVKtoup+JcaZAS2lJ8LAEuKu3GC0YHR8iVzEj/NLlIjF0bJzYOqVjb/RWhjKNOcekPYL/5g1rRy52hOQDuTT3hyrlhMKOqbQcpwfgE5AwimBOiGOf7aojC928HbO2ssbmzyvz0UxZez9Dd0VVe4VHXLXRpFwuCpYyljPZmlpd2ICqWhbMDt1n/9Ibx4UlefV6ks6iy+vEd9Z9DFCd957G7FxaAWeA00AAW1x/vzP8Cqr99v3YC63EAAAAASUVORK5CYII=",
  "height": 5,
  "weight": 172,
  "DOB": "10/04/1988",
  "password": "LAn5xqQ"
}]

const foods = [{
            "name": "Apple",
            "calories": 120,
            "totalFat": 10
        },
        {
            "name": "Orange",
            "calories": 150,
            "totalFat": 13
        },
        {
            "name": "donut",
            "calories": 343,
            "totalFat": 45
        }]



const Images = [{
  "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI1SURBVDjLY/j//z8DJZgsTV+9fAu+uHo8+GzvXECWAV+c3R//mTn9/ydLu4eka3ZyY/ts63T3k4Xt+4/GlqS74JONY+9Hc5tdH4wsmAmGgWv9xQKX2nMPnapOF4A1WzsEfjSzefLB0FwUHoi/szPX/05P/f0rOWk9ugHONWefzNl44X/B/L3/o7LXnn1h4fitN6i22Tx7W5tpxqYHxmnrChh+p6X+/rd10/+fsbF/f0REmiE0n7F3rDz5wb7s6Bu3gt3Vz80db69zTd1mlr11tUnGxt89Cw/8N0ha9YDhZ2LC+p8xMb9/hEdc+h4Ucu+br//JFXFNi5zKjz20KztiDzIMGFgzP+iZboQZbpSypsAgaeUjvfilqIEI9C9bf8rk3Wd8kz59sHV+BQysa8DA+vNe1+Tr8VD5hgO+fA/3OLH82+nK/AiIK1ACEehfCceqU8fsy48ttS05xAkMLANgYP39N23K/1t26n8vFlv8/L619/+/azv+f11R9P90tu6fXc4suQyudRcKgP59DvTvG6B/S5Fd9F7baP07Nb3f+xzZv3wDav4/yff//3LB///bFP+/7nL4v9OF+R6DU/WZB5PXXPwP9O9LXNEJcva/s+v+I4P39RL/QeIMDhXHC+xKDz+wKdpfgMsAoH8ff5mb/P8/UNOPMob/74D4YQbzf6D4E6JS3+FwqYaTKaq/n5Ur/n9Vyfr/bgrj/72+LH92uDJXEZ2Ej4TLVgBtvA+NhccgzSBxAIJCoGJnoURSAAAAAElFTkSuQmCC"
}, {
  "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIaSURBVDjLhZFNaBNRFIWzFdy6EIrQhdCFLlyJ4KLgShFciOhGTbVVUFf+rNxYEFPtmPhDKWI3diP2DxJF22mfirQrMVpbRKUohJi0SUwySZvJzBhOz32dlCimHfh4897cc+67ZwInQuNtJEyiTXhGzpIdAAL/EuCH+69nk6pUcZVVZ2WNIlkqVtTo9IJi3Y1mBjERF1icX3bV77KrsmVHZUuOWrKq+jyRKYvBYFMD6SrijC9aLFZVqmCrZN7W+80MnpdsV+XYWYrTFL+dS72/8ng6f8qY9E4TWVnnkIJPktyS/MRgJEeh49W0WDpfG5gpMhdwNFh1VtZgLmAuYC6gdlQMOo2RuIovZJT7p6Y52Wt6Iub84GhgLmAuYC7gLfU5xxKD73oOvuwnQ5L4xIeEzOtJVxFnfBFzAW8H5qL3fxn4Jk/MuBaPkzJzAXPRxekGcSJXQZrvv3LLYvCzLt4iYZJXZCdZZC6oerV18fC7IVx9FMS58BF03DmE/thDMfhaN9hGukmrvw+Fxz5i9kcWzATRmafoHu7Ai/k+fEqZiExewPHIbrRfPvAm8L9/65scI5ZVcRC8fRDRuXuIfnkAeYypLkSmzmPvxe12UwPf5BtzweHre/ByfgCNT+xznxhsKN4qNyD2vkstTq95BiEzqMWhieDmN6CwhYyRXSy8edRow12zU3eWVfY8NzYcoREW95CSXNtfe+R8FZtm9C3KURomAAAAAElFTkSuQmCC"
}, {
  "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKUSURBVBgZBcHda5V1AADg5/29Z/NMNzvW5qbhwmLpQkpbkqBFXvVBF0pXUXdddVMHu5Agsv6D8KbwppC6LRAqQWhdRKTmoAwvnJSOOsqmTmU7H+/H79fzZIN3tIanndDQBhAQABAAABU6PiuWfNoYnnbCzOG2yTnyIUKDLCNkZIGQETLkZMiQajoX28M/nNHQ0DY5xyBnaj85lq9we4EQyAMCObJASoyOs/VZtp5pN0A+RGiy7yjgKOU6i+e49j31GjJSQsbqLZqPEAkisgbdm1z+jr9/YX2FoU08dYRXT7L9ACCjLOmXVAUFDQEho3uTv74mZDQC43vZ+zYPTfP8+yyc4to5BhXFgLKmT0NAwNR+Xmxzb4nOAkvz/HScuXetjzTdjx2Tk3vki+cZVJQVBUGEnAxDm5iY5Zm3eOUkrZ3iwhfuXvlKs7XH6vgO0gb6JWVNnyAgw90/+PE9Lp1ifYWhjRz6yL2RUSOTB23ets/q9Xm9XYfoV5SRgiAgBFKgt8zSPPMfcuNnRf+uO1XP2HhL/eCM8dk3Ldf3pH5FUVMQRMjIEwc+4NDHbHuOhS+tXD7t4Zkj9BdcOP2N0VbP6vXf3J/YSlVTEEBITOxh+34mZtlx0NraqrLfNbalKw7+IUX12kU7Xzrm3w19dVlTEICM3gplF6TlRZ2ypzW9V+z+KcWeuTd2iUVHs3nV5tnXdbodKoICqULN2WOcPe72r59rzrxm49htqbpDlrv07VVEsX/VxJOP+e9BR3d0g/yTGS1TIwdsmWF4lJAsLt8wffi40MhlQzuE5m6P7ntBaO6WDT+hsWlGPva4653zi9ngZa3hKSdMaYuouDD5tDqSYpLqKMUoxSTFJMUoxSSlWKWUfv8fIbEaFyrl/WgAAAAASUVORK5CYII="
}]



            db.sync()
              .then(()=>{
                return Foods.bulkCreate(foods)
              })
              .then(()=>{
                return User.bulkCreate(users)
              })
              .then(()=>{
                return Images.bulkCreate(images)
              })
              .catch(err=>{
                console.log('There was a problem', err)})
