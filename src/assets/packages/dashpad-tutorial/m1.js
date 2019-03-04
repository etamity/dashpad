const obj = require('./m2');
module.exports = (p) => {
    setInterval(() => {
        obj(p);
    
    } ,2000);
}