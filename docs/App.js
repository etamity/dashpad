import React, { lazy, Component, Suspense } from 'react';
import Document, { frontMatter } from './pages/index.mdx';

class App extends Component {
    render() {
        return (
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <div>
                        <h1>{frontMatter.title}</h1>
                        <Document />
                    </div>
                </Suspense>
            </div>
        );
    }
}
export default App;
