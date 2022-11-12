export default {
  template: `
        <section class="home-page flex flex-row">
            <section class="mail-section flex flex-column">
                <div class="logo flex flex-row">
                    <img src="https://1000logos.net/wp-content/uploads/2021/05/Gmail-logo.png" alt="" />
                    <h1>Mail</h1> 
                </div>
                <div class="about-app">
                    <p>
                    Communicate was never more easy</p>
                </div>
                <div>
                <router-link to="/mail">
                    <img src="../assets/imgs/mail.png" alt="" />
                    </router-link> 
                </div>
            </section>
            <section class="keep-section flex flex-column">
            <div class="logo flex flex-row">
                    <img src="../assets/imgs/keep.png" alt="" />
                    <h1>Keep</h1> 
                </div>
                <div class="about-app">
                    <p> Playful way to keep organized</p>
                </div>
                <div>
                    <router-link to="/keep">
                    <img src="../assets/imgs/keepapp.png" alt="" />
                    </router-link> 
                </div>
            </section>
        </section>
    `,
};
