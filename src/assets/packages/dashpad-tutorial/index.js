module.exports = (params) => {
   let count = 0;
   const {username} = params;
    setInterval(() => {

        if (count < 100)
        {
            count = count + 1;
        } else {
            Dashpad.exit();
        }
        let date = new Date();
        Dashpad.setState([{
            keyPath: 'Tabs_1.Card_1.Header.title',
            value: username + ':' + date.getSeconds()
        },
        {
            keyPath: 'Tabs_1.Card_1.Progress.value',
            value: count
        }
    ]);
    } ,500);
}