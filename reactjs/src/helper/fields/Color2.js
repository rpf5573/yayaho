const { __ } = wp.i18n
import Color from "./Color"
import Gradient from './Gradient'
const { Component, Fragment } = wp.element
const { Dropdown } = wp.components

const defData = {
    openColor: 0,
    type: 'color',
    color: '#1740f5',
    gradient: {
        color1: '#16d03e',
        color2: '#1f91f3',
        type: 'linear',
        direction: '90',
        start: 5,
        stop: 80,
        radial: 'center',
        clip: false
    },
    clip:false
};

class Color2 extends Component {
    constructor(props) {
        super(props)
        this.state = { isColor:false, isGradient:false }
    }

    componentWillMount(){
        const { value, onChange, clip } = this.props
        onChange( Object.assign({}, defData, (clip?{clip:true}:{}), (value || {})));
	}

    _set(val, type){
        const {value, pro} = this.props
        if(pro && !wp.ultp_pro) {
            return ;
        }
        const def = type == 'type' ? val : type || 'color'
        let final = Object.assign({}, value, {openColor: 1}, {[type]: val}, {type: def});
        this.props.onChange(final);
    }

    render(){
        const { value, label, pro, customClass } = this.props;
        const { isGradient, isColor } = this.state
        const isActive = value && value.openTypography ? true : false

        return (
            <Fragment>
            <div className={`ultp-field-wrap ultp-field-color2 ${ (pro && !wp.ultp_pro) ? customClass: ''}`}>
                { label && 
                    <label>{label}</label>
                }
                <div className="ultp-sub-field">
                    <Dropdown
                        className="ultp-range-control"
                        position="top right"
                        renderToggle={({ onToggle, onClose }) => (
                            <div className="ultp-button-group">
                                <div className={ (isActive ? '' : 'active ')+'ultp-base-control-btn dashicons dashicons-image-rotate' } onClick={() => { 
                                    this._set(0,'openColor');
                                    this.setState({isColor:false,isGradient: false}) }} />
                                    <div onClick={()=>onToggle()}>
                                        <span className={(value.type == 'color' && value.openColor) ? 'active' : ''} onClick={()=>{ 
                                            this._set('color','type');
                                            this.setState({isColor: true,isGradient: false}); 
                                            }}><i class="dashicons dashicons-admin-customizer" /></span>
                                        <span className={(value.type == 'gradient' && value.openColor) ? 'active' : ''} onClick={()=>{ 
                                            this._set('gradient','type');
                                            this.setState({isColor:false, isGradient:true}); }}><svg width="14px" height="12px" viewBox="0 0 10 17" xmlns="http://www.w3.org/2000/svg"><g id="gradient" fill="none"><rect id="Rectangle" x="0" y="0" width="1.24545455" height="15"></rect><rect id="Rectangle-Copy-3" x="10.2" y="0" width="1.93333333" height="15"></rect><rect id="Rectangle-Copy" x="5.40909091" y="0" width="1.54545455" height="15"></rect><rect id="Rectangle-Copy-3" x="10.2" y="0" width="1.13333333" height="15"></rect><rect id="Rectangle-Copy-8" x="11.9" y="0" width="1.54545455" height="15"></rect><rect id="Rectangle-Copy-9" x="13.9090909" y="0" width="1.51818182" height="15"></rect><rect id="Rectangle-Copy" x="5.40909091" y="0" width="1.84545455" height="15"></rect><rect id="Rectangle-Copy-2" x="7.72727273" y="0" width="1.55757607" height="15"></rect><rect id="Rectangle-Copy-7" x="2.31818182" y="0" width="2.11818182" height="15"></rect><rect id="Rectangle-Copy-9" x="13.9090909" y="0" width="1.31818182" height="15"></rect></g></svg></span>
                                    </div>
                            </div>
                        )}
                        renderContent={() => (
                            <div className="ultp-popup-select">
                                { isColor &&
                                    <Color
                                        inline
                                        disableClear
                                        value={ value.color || '#16d03e' }
                                        onChange={val => { this._set(val,'color')}}/>
                                }
                                { isGradient &&
                                    <Gradient
                                        inset
                                        value={value.gradient||''}
                                        onChange={val => {this._set(val,'gradient')}}/>
                                }
                            </div>
                        )}
                    />
                </div>
                { (pro && !wp.ultp_pro) &&
                    <div className="ultp-field-pro-message">To Enable This Feature <a href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium" target="_blank">Upgrade Pro</a></div>
                }
            </div>
            </Fragment>
        )
    }
}
export default Color2