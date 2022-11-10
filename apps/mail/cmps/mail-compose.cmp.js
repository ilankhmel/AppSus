import composeScreen from './compose-screen.cmp.js'
export default {
    template: `
        <section class="compose-cmp">
            <router-link to="/mail/list/send/" class="compose-btn"><i class="fa-solid fa-pen"></i> Compose</router-link>
            <!-- <compose-screen></compose-screen> -->
            <!-- <router-view></router-view> -->
        </section>
        
        `,

    components: {
        composeScreen,
    }
}