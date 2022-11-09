
var defaultMails = [
        {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133931594,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        trashed: false,
        },
        {
        id: 'e102',
        subject: 'Call you!',
        body: 'How are you doing at work??',
        isRead: false,
        sentAt : 1551133930594,
        from: 'rachel@momo.com',
        to: 'user@appsus.com',
        trashed: false,

        },
        {
        id: 'e103',
        subject: 'Catch you!',
        body: 'Its been a pleasure meeting up with you!',
        isRead: false,
        sentAt : 1551133930294,
        from: 'jimmy@momo.com',
        to: 'user@appsus.com',
        trashed: false,

        }, 
        {
        id: 'e104',
        subject: 'From me!',
        body: 'Its my first email, fun!',
        isRead: false,
        sentAt : 1551132930294,
        from: 'user@appsus.com',
        to: 'jimmy@momo.com',
        trashed: false,

        }, 
    ]

    const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
       }


import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getUserDetails,
}

function getUserDetails(){
    // return new Promise(resolve => setTimeout(() => resolve(loggedinUser), 200))
    return loggedinUser
}

function query() {
    return storageService.query(MAIL_KEY)
}

function get(mailId){
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if(mail.id){
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    const email = {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt : 0,
        from: '',
        to: ''
        }
        
    return email
}


// function getNextCarId(carId) {
//     return storageService.query(MAIL_KEY)
//         .then(mails =>{
//             var idx  = mails.findIndex(car => car.id === carId)
//             if (idx === mails.length-1) idx = -1
//             return mails[idx+1].id
//         })
// }

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = defaultMails
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    return mails
}

function _createMail() {
    const mail = getEmptyMail()
    mail.id = utilService.makeId() 
    return mail
}