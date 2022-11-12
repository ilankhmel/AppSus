export default {
  template: `
        <header class="app-header flex flex-row justify-between align-center">
            <router-link to="/">
            <h1>AppSus</h1>
            </router-link> 
        
            <nav class="flex flex-row align-center">
                <router-link to="/keep"> 
                    <h4>Keep</h4></router-link> 
                <router-link to="/mail">
                    <h4>Mail</h4></router-link> 
                <!-- <router-link to="/about">About</router-link> -->
            </nav>
        </header>
    `,
};
