import React from 'react';
import SVG from 'react-svg';
import './style/icon.scss';


interface IconInterface {
    size?: string,
    className?: string,
    style?: React.CSSProperties;
    onClick?: React.EventHandler<any>;
    url?: string;
    cover?: boolean;
}

// //  handle icon image
// const handleIconImage = function(props: IconInterface){

// }
/**
 *
 * @example
 * <Icon
 * className="icon_test"
 *
 *
 * ></Icon>
 *
 */

class Icon extends React.Component<IconInterface> {
	render(){
        var props = this.props;

		return (
			<div
            { ...props }
            >
            {(function(){
                if(/\.svg$/gi.test(props.url)){
                    return <SVG src={ props.url } svgStyle={ props.style } ></SVG>
                }
            }())}
            </div>
		)
	}
}

export default  Icon;
