export default [
    {
        name: 'Dashboard',
        icon: 'icon-speedometer',
        url: '/dashboard',
        isOpen: true,
        badge: {
            variant: 'info',
            text: 'NEW',
        },
        children: [
            {
                name: 'Settings',
                url: '/dashboard/settingsview',
                icon: 'icon-settings',
            },
        ],
    }
];
