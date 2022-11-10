
var defaultMails = [
        {
        id: 'e101',
        name: 'Momo',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551132931594,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        trashed: false,
        isStarred: false,
        },
        {
        id: 'e102',
        name: 'Rachel',
        subject: 'Call you!',
        body: 'How are you doing at work??',
        isRead: false,
        sentAt : 1551130930594,
        from: 'rachel@momo.com',
        to: 'user@appsus.com',
        trashed: false,
        isStarred: false,

        },
        {
        id: 'e103',
        name: 'Jimmy',
        subject: 'Catch you!',
        body: 'Its been a pleasure meeting up with you!',
        isRead: false,
        sentAt : 1551133930294,
        from: 'jimmy@momo.com',
        to: 'user@appsus.com',
        trashed: false,
        isStarred: false,

        }, 
        {
        id: 'e104',
        name: 'Ilan',
        subject: 'From me!',
        body: 'Its my first email, fun!',
        isRead: false,
        sentAt : 1551132930294,
        from: 'user@appsus.com',
        to: 'jimmy@momo.com',
        trashed: false,
        isStarred: false,

        }, 
    ]

    const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Ilan'
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
    getNewMail,
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
        name: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt : Date.now(),
        from: '',
        to: '',
        isStarred: false,

        }
        
    return email
}

function getNewMail(msg) {
    const email = {
        id:'' ,
        name: msg.name,
        subject: msg.subject,
        body: msg.body,
        isRead: false,
        sentAt : Date.now(),
        from: msg.from,
        to: msg.to,
        isStarred: false,

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