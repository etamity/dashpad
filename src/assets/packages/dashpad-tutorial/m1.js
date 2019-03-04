
const obj = require('./m2');
module.exports = (p) => {
    console.log('here is from module:', Dashpad.settings.credential);
    setInterval(() => {
        Dashpad.setState({
            keyPath: 'Tabs_1.Card_1.Header.title',
            value: new Date()
        });
    
    } ,1000);
}