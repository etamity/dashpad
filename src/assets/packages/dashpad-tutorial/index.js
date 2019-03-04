module.exports = (params) => {
    console.log('here is from module:', Dashpad.loadJson('test.json'));
    let count = 0;
    setInterval(() => {

        if (count < 100)
        {
            count = count + 1;
        } else {
            Dashpad.exit();
        }
        Dashpad.setState([{
            keyPath: 'Tabs_1.Card_1.Header.title',
            value: new Date()
        },
        {
            keyPath: 'Tabs_1.Card_1.Progress.value',
            value: count
        }
    ]);
    } ,500);
}