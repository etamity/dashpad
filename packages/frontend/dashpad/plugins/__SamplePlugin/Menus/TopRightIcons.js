export default [
    {
        url: '#',
        icon: 'icon-bell',
        badge: {
            variant: 'danger',
            text: '5',
        },
    },
    {
        url: '#',
        icon: 'icon-list',
    },
    {
        url: '#',
        icon: 'icon-location-pin',
    },
    {
        type: 'dropdown',
        image: '../../assets/img/avatars/6.jpg',
        class: 'img-avatar',
        alt: 'etamity@gmail.com',
        children: [
            {
                name: 'Account',
                title: true,
            },
            {
                name: 'Updates',
                url: '#',
                icon: 'fa fa-bell-o',
                badge: {
                    variant: 'info',
                    text: '42',
                },
            },
            {
                name: 'Messages',
                url: '#',
                icon: 'fa fa-envelope-o',
                badge: {
                    variant: 'success',
                    text: '42',
                },
            },
        ],
    },
];
