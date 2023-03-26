//จัดการ Routing
const { error } = require('console')
const express = require('express')
const router = express.Router()

const path = require('path')

const createTime = require('../dist/3createTime_in.js')
const readAssetByID = require('../dist/4readAssetByID')
const trans = require('../dist/5transferTime_out.js')

const indexPage = path.join(__dirname, '../dist/attendance.html')
const report = path.join(__dirname, '../dist/menu_Report.html')
const menuHome = path.join(__dirname, '../dist/first.html')
const create_in = path.join(__dirname, '../dist/create_in.ejs')
const insert = path.join(__dirname, '../dist/insertTimein.ejs')


router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(express.static('dist'));


router.get('/', (req, res) => {
    res.status(200);
    res.type('text/html');
    res.sendFile(indexPage);
});


router.post('/time', (req, res) => {
    const id = req.body.EmployeeID

    if (req.body.button1 === 'submit1') {
        const resultString = "สวัสดี"
        createTime.CreateAsset(id, resultString)
            .then((data) => {
                // res.send("Success")
                const n = JSON.stringify(data);
                const name = "Success, Time In " + n;
                console.log(name)
                res.render(insert, { name: name });
            })
            .catch((err) => {
                console.log('Error Time In')
                ms = 'Error Time In' 
                res.render(insert, { name: ms });
            });
    }

    else if (req.body.button2 === 'submit2') {
        // ดำเนินการสำหรับ Submit 2
        trans.transferAssetAsync(id)
            .then((data) => {
                // res.send("success")
                const n = JSON.stringify(data);
                const name = "Succes, Time Out " + n;
                console.log(name)
                res.render(insert, { name: name });
            })
            .catch((err) => {
                console.log('Error Time Out')
                ms = 'Error Time Out'
                res.render(insert, { name: ms });
            })
    }
});

// router.post('/time', (req, res) => {
//     const id = req.body.EmployeeID
//     console.log(typeof (id))
//     if (req.body.button1 === 'submit1') {
//         // ดำเนินการสำหรับ Submit 1
//         readAssetByID.readAssetByID(id)
//             .then((data) => {
//                 let resultString = JSON.stringify(data);
//                 console.log(resultString);

//                 createTime.CreateAsset(id, resultString)
//                     .then((data) => {
//                         res.send("Success")
//                         res.render(create_in, { users: data })
//                     })
//                     .catch((err) => {
//                         res.send('Error')
//                     })
//             })
//             .catch((err) => {
//                 console.log('ErrorTime In')
//             });
//         // res.send("succes1")
//     }

//     if (req.body.button2 === 'submit2') {
//         // ดำเนินการสำหรับ Submit 2
//         res.send("succes2")
//     }
// });

router.get('/report', (req, res) => {
    res.status(200);
    res.type('text/html');
    // res.send('Success')
    res.sendFile(report);
});
module.exports = router