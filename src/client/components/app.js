/**
 * Created by Jaeeo on 2016. 10. 13..
 */
import React from 'react';
import Counter from './counter';
import Buttons from './buttons';
import Option from './option';

class App extends React.Component {
    render(){
        return (
            <div style={ {textAlign: 'center'} }>
                <Counter/>
                <Option/>
                <Buttons/>
            </div>
        );
    }
}

export default App;