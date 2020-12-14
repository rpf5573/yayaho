const {__} = wp.i18n
const { Component } = wp.element
const { ToggleControl } = wp.components

class Toggle extends Component {

    setValue(val) {
        const { onChange, pro } = this.props
        if(pro){
            if(wp.ultp_pro){
                onChange(val)
            }
        }else{
            onChange(val)   
        }
    }

    render() {
        const { value, label, pro, customClass } = this.props
        return(
            <div className={`ultp-field-wrap ultp-field-toggle ${ (pro && !wp.ultp_pro) ? customClass: ''}`}>
                { label && 
                    <label>{label}</label>
                }
                <div className="ultp-sub-field">
                    <ToggleControl
                        checked={ value }
                        onChange={ (val) => this.setValue(val) } />
                </div>
                { (pro && !wp.ultp_pro) &&
                    <div className="ultp-field-pro-message">To Enable This Feature <a href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium" target="_blank">Upgrade Pro</a></div>
                }
            </div>
        )
    }
}
export default Toggle