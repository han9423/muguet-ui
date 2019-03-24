import React from 'react';
import Flexible from '../font/flexible';
import classNames from 'classnames';
// import './'

interface MuguetInterface extends React.Props<any>{
    default?: boolean;
    style?: React.CSSProperties;
}


/**
 * @example
 * <Muguet
 *  default=true
 * 
 * ></Muguet>
 */

let defaultStyleSetting = function(props: MuguetInterface){
    let d = props.default;
    if(Object.is(d, undefined ) || Object.is(d, false) ){
        document.body.style.margin = "0px";
        document.body.style.padding = "0px";   
    }
}

class Muguet extends React.Component<MuguetInterface>{
    componentWillMount(){
        // font auto adapt default font size 0.20rem
        Flexible();
        // setting default
        defaultStyleSetting(this.props);        
    }

    render(){
        return (
            <div
            { ...this.props }
            >
                { this.props.children }
            </div>
        );
    }
}

export default Muguet;