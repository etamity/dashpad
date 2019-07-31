export default  [
    {
        name: 'Dashboard',
        url: '/mdxviewerplugin',
        icon: 'icon-speedometer',
        badge: {
            variant: 'info',
            text: 'NEW',
        },
    },
    {
        title: true,
        name: 'Theme',
        wrapper: {
            // optional wrapper object
            element: '', // required valid HTML5 element tag
            attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: '', // optional class names space delimited list for title item ex: "text-center"
    },
    {
        name: 'Colors',
        url: '/theme/colors',
        icon: 'icon-drop',
    },
    {
        name: 'Typography',
        url: '/theme/typography',
        icon: 'icon-pencil',
    },
];