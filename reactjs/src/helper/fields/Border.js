const { Component } = wp.element
const { Dropdown, SelectControl } = wp.components
import Dimension from './Dimension'
import Color from "./Color"

const defaultData = {
    width:{ top:0, right:0, bottom:0, left:0 },
    type:'solid',
    color:'#555d66',
};

class Border extends Component {
    componentWillMount(){
        const { value } = this.props
        this.props.onChange( Object.assign( {}, defaultData, ( value || {} ) ));
	}
    setSettings( type , value ) {
        this.props.onChange( Object.assign( {}, this.props.value, {openBorder:1} , {[type]:value} ) )
    }
    render() {
        const { value } = this.props
        const isActive = value && value.openBorder ? true : false;

        let widthType = 'width'
        let styleType = 'type'
        let colorType = 'color'
        const borderOptions = [
			{ value: 'solid', label: 'Solid' },
            { value: 'dotted', label: 'Dotted' },
            { value: 'dashed', label: 'Dashed' },
            { value: 'double', label: 'Double' },
            { value: 'ridge', label: 'Ridge' },
            { value: 'groove', label: 'Groove' },
		];
        return (
            <div className="ultp-field-wrap ultp-popup-control">
                { this.props.label &&
                    <label>{this.props.label}</label>
                }
                <Dropdown
                    className="ultp-range-control"
                    position="top right"
                    renderToggle={({ isOpen, onToggle }) => (
                        <div className="ultp-edit-btn">
                            <div className={(isActive ? '' : 'active ') + "ultp-base-control-btn dashicons dashicons-image-rotate"} onClick={() => { if(isOpen){ onToggle(); } this.setSettings( 'openBorder', 0 );}}></div>
                            <div className={(isActive ? 'active ' : ' ') + "ultp-base-control-btn dashicons dashicons-edit"} onClick={() => { onToggle(); this.setSettings( 'openBorder', 1 ); }} aria-expanded={isOpen}></div>
                        </div>
                    )}
                    renderContent={() => (
                        <div className={this.props.inline ? "ultp-range-control" : "ultp-common-popup" }>
                            <Dimension 
                                min={0}
                                step={1}
                                max={100}
                                label={'Border Width'}
                                value={ value&&value[ widthType ] || '' }
                                onChange={ val => this.setSettings( widthType, val ) }
                            />
                            <SelectControl
                                label={'Border Style'}
                                value={ value&&value[ styleType ] || '' }
                                options={ borderOptions }
                                onChange={ val => this.setSettings( styleType, val ) }
                            />
                            <Color 
                                inset
                                label={'Color'}
                                value={ value&&value[ colorType ] || '' } 
                                onChange={ val => this.setSettings( colorType, val ) } 
                            />
                        </div>
                    )}
                />
            </div>
        )
    }
}
export default Border
