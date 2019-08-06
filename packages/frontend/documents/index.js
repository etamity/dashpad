import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import '../dashpad/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import App from './App';
import * as serviceWorker from '../dashpad/serviceWorker';
import 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-yaml';

process.env.APPTYPE = 'docs';
const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl);
if (module.hot) {
    module.hot.accept("./App", () => {
        const NextApp = require('./App').default;
        ReactDOM.render(<NextApp />, rootEl);
    });

}
serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA