import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import App from './App';

const rootEl = document.getElementById('root')

ReactDOM.render(<App />, rootEl);
if (module.hot) {
    module.hot.accept("./App", () => {
        const NextApp = require('./App').default;
        ReactDOM.render(<NextApp />, rootEl);
    });

}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA