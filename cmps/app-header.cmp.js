export default {
  template: `
       <header class="app-header">
            <img class='site-logo' src='../assets/img/AppSus.png' alt="" />
            <h1>AppSus</h1>
            <nav>
                <router-link to="/">Home</router-link> 
                <router-link to="/keep">Keep</router-link> 
                <router-link to="/mail">Mail</router-link> 
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    `,
};
// import '../assets/img/AppSus.png'