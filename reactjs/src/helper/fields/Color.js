const { Component, Fragment } = wp.element
const { ColorPicker, Dropdown } = wp.components

class Color extends Component {
	constructor(props){
		super(props)
		this.state = {
            isOpen: false,
            colorOpen: false
		}
    }
    _setColor(color){
        const { onChange, pro } = this.props;
        if(pro && !wp.ultp_pro) {
            return ;
        }
        onChange( 'rgba('+color.rgb.r+','+color.rgb.g+','+color.rgb.b+','+color.rgb.a+')' )
    }
    renderColorInset(){
        const { value, onChange } = this.props;
        return (
            <Fragment>
                <div className={ 'ultp-control-button' } onClick={()=>this.setState({colorOpen: !this.state.colorOpen})} style={{background:value}}/>
                { this.state.colorOpen &&
                    <div className={'ultp-color-popup'}>
                        <ColorPicker
                            color={value?value:''}
                            onChangeComplete={color => this._setColor(color)}/>
                    </div>
                }
            </Fragment>
        )
    }
    renderColor(){
        const { value, onChange } = this.props;
        return (
            <div className={'ultp-common-popup'}>
                <ColorPicker
                    color={value?value:''}
                    onChangeComplete={color => this._setColor(color)}/>
            </div>
        )
    }
    render(){
        const { label, value, onChange, inline, disableClear, inset, pro, customClass } = this.props;
        return(
            <div className={`ultp-field-wrap ultp-field-color ${ (pro && !wp.ultp_pro) ? customClass: ''}`}>
                { label &&
                    <label>{label}</label>
                }
                { inline ?
                    this.renderColor()
                    :
                    inset ?
                    this.renderColorInset()
                    :
                    <Dropdown
                        className="ultp-range-control"
                        position="top right"
                        renderToggle={({ onToggle, onClose }) => (
                            <Fragment>
                                {(value || disableClear) && 
                                    <div className={'ultp-clear dashicons dashicons-image-rotate'} onClick={() => {onClose(); onChange('') }} /> 
                                }
                                <div className={ 'ultp-control-button' } onClick={() => onToggle()} style={{background:value}} />
                            </Fragment>
                        )}
                        renderContent={() => this.renderColor()}
                    />
                }
                { (pro && !wp.ultp_pro) &&
                    <div className="ultp-field-pro-message">To Enable This Feature <a href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium" target="_blank">Upgrade Pro</a></div>
                }
            </div>
        )
    }
}
export default Color