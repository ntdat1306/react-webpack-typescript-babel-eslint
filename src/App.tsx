import { FC, useState } from 'react';

const App: FC = () => {
    const [state, setState] = useState('React');

    return (
        <div>
            <h1>{state}</h1>
            <h2>React with Webpack + Typescript + Babel + ESLint</h2>
        </div>
    );
};

export default App;
