import homePage from './views/app-home.cmp.js';
import aboutPage from './views/app-about.cmp.js';
import keepApp from './apps/keep/pages/keep-app.cmp.js';
import mailApp from './apps/mail/pages/mail-app.cmp.js';
import mailDetails from './apps/mail/pages/mail-details.cmp.js';
import mailList from './apps/mail/cmps/mail-list.cmp.js';

const { createRouter, createWebHashHistory } = VueRouter;

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: homePage,
    },
    {
      path: '/about',
      component: aboutPage,
    },
    {
      path: '/mail',
      component: mailApp,
      children: [
        {
          path: 'inbox',
          component: mailList,
        },
        {
          path: 'sent',
          // component: aboutTeam,
        },
        {
          path: 'trash',
          // component: aboutTeam,
        },
        {
          path: 'draft',
          // component: aboutTeam,
        },
        {
          path: '/mail/:id',
          component: mailDetails,
        },
      ],
    },
    {
      path: '/keep',
      component: keepApp,
    },
  ],
};

export const router = createRouter(routerOptions);
