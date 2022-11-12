export default {
  template: `
<<<<<<< HEAD
        <header class="app-header flex flex-row justify-between align-center">
            <router-link to="/">
=======
        <header class="app-header">
            <img class='site-logo' src='../assets/img/AppSus.png' alt="" />
>>>>>>> 821fbbb22fba2d425801b22775f40eb240a9b0e9
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
// import '../assets/img/AppSus.png'