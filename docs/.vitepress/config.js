module.exports = {
  lang: 'en-US',

  title: 'Docs',
  description: 'Upcafe Docs',
  head: [['link', { rel: 'icon', href: `../assets/favicon.png` }]],

  themeConfig: {
    //logo: '/assets/logo.svg',
    nav: [
      { text: 'Conventions', link: '/conventions/' },
      { text: 'Installation', link: '/installation/' },
      { text: 'Guides', link: '/guides/' },
      {
        text: 'Links',
        ariaLabel: 'Links',
        items: [
          { text: 'Github', link: 'https://github.com/Upcafe/docs/' },
          { text: 'Upcafe.nl', link: 'https://www.upcafe.nl' }
        ]
      }
    ],
  },
}