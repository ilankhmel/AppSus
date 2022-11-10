import { mailService } from "../services/mail.service.js";
import { eventBus } from "../../../services/event-bus.service.js";
import mailFilter from '../cmps/mail-filter.cmp.js'
import folderFilter from '../cmps/folder.filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'

export default {
  template: `
      <section class="mail-app">
        <!-- <h1>MailApp</h1> -->
        <mail-filter @filter="setFilter"></mail-filter>
        <div class="mail-flex">
          <folder-filter @setfolder="setFolder"></folder-filter>
          <!-- <mail-list @opened="markRead" :mails="mailsToShow"  /> -->
          <router-view @opened="markRead" @trashed="trashMail" @untrashed="untrashMail" @deleted="deleteMail" :mails="mailsToShow"/>
        </div>
        <!-- <router-link v-if="mails" to="/mail/inbox" @opened="markRead" :mails="mailsToShow">Inbox</router-link> -->
        <!-- <router-view></router-view> -->
      </section>
    `,

    data(){
      return {
        mails: null,
        filterBy: {
          name: '',
          isRead: '',
          folder: '',
          sort: "",
        },
        isShown: false,
      }
    },

    created(){
        // mailService.query()
        //   .then(mails => {
        //     console.log(mails);
        //     this.mails = mails
        //     }).then(console.log(this.mails))
        this.loadMails()
        eventBus.on('msgSent', this.loadMails)
        eventBus.on('saveRefresh', this.saveAndRefresh)
    },
    methods:{
      saveAndRefresh(mail){
        mailService.save(mail)
          .then(a => {
            this.loadMails()
          }
        )
      },
      trashMail(mail){
        
        mail.trashed = true
        mailService.save(mail)
          .then(mail => {
            this.loadMails()
            this.$router.push('/mail')
          })
      },

      untrashMail(mail){
        mail.trashed = false
        mailService.save(mail)
          .then(mail => {
            this.loadMails()
            this.$router.push('/mail')
          })
      },

      loadMails(){
        mailService.query()
        .then(mails => {
          this.mails = mails
          })
      },
      setFilter(filter){
        this.filterBy.name = filter.name
        this.filterBy.isRead = filter.isRead
        this.filterBy.sort = filter.sort
      },

      markRead(mailId){
        mailService.get(mailId)
          .then(mail => {
            console.log(mail);
            mail.isRead = true
            mailService.save(mail)
            this.isShown = true
          })
      },

      setFolder(folder){
        this.filterBy.folder = folder
        // console.log(t);
      },


      deleteMail(mailId){
        mailService.remove(mailId)
        .then(mail => {
          this.loadMails()
            this.$router.push('/mail')
        })
      }
    },
    computed:{
        mailsToShow(){
          console.log(this.filterBy);
          const regex = new RegExp(this.filterBy.name, 'i')
          var mails = this.mails.filter(mail => regex.test(mail.subject))
          if(this.filterBy.isRead !== ''){
          mails = mails.filter(mail => mail.isRead === this.filterBy.isRead)
          }
          if(this.filterBy.folder !== ''){
            switch (this.filterBy.folder) {
              case 'trash':
                mails = mails.filter(mail => mail.trashed === true)
                break;
              case 'inbox':
                // return mailService.getUserDetails()
                //   .then(details => {
                //     console.log(details);
                //     console.log(mails);
                //     return mails = mails.filter(mail => mail.from === details.email)
                //   })

                mails = mails.filter(mail => mail.trashed === false)
                break;
              case 'draft':
                mails = mails.filter(mail => mail.draft === true)
                break;

              case 'star':
                mails = mails.filter(mail => mail.isStarred === true)
                break;

              case 'sent':
                var details = mailService.getUserDetails()
                  // .then(details => {
                    console.log(details);
                    console.log(mails);
                    mails = mails.filter(mail => mail.from === details.email)
                  // })
                break;
            
              default:
                break;
            }
          }
          if(this.filterBy.sort !== ''){
            console.log('isnt');
            console.log(this.filterBy.sort );
            switch (this.filterBy.sort) {
                case 'Subject':
                  mails = mails.sort((a,b)=> {return a.subject - b.subject})
                  break;
                case 'Date':
                  mails = mails.sort((a,b)=> {return a.sentAt - b.sentAt})
                  break;
            }
          }
          return mails
        }
    },
    components:{
        mailList,
        mailFilter,
        folderFilter,
    }
};


// export default {
//   template: `
//       <section>
//         <mail-filter />
//         <mail-list />
//         <h1>MailApp</h1>
//       </section>
//     `,
//     components: {
//         mailFilter,
//         mailList,
//     }

// };
