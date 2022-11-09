export default {
    template: `
    <section class="folder-filter">
        <button @click="setFolder('trash')">Trash</button>
        <button @click="setFolder('inbox')">Inbox</button>
        <button @click="setFolder('draft')">Draft</button>
        <button @click="setFolder('sent')">Sent</button>
    </section>
    `,
    data(){
        return{
            folder: null,
        }
    },

    methods:{
        setFolder(str){
            this.folder = str
            console.log(this.folder);
            this.$emit('setfolder', this.folder)
        }
    }

}