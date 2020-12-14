const {__} = wp.i18n
const { Component } = wp.element
const { CheckboxControl, Tooltip, Icon } = wp.components

class Link extends Component {

    componentWillMount(){
        const { value, onChange } = this.props
		onChange( Object.assign( {target:0, follow:0, url:''}, ( value || {} ) ));
    }

    setSettings( type , value ){
        this.props.onChange(
            Object.assign( {}, this.props.value , {[type]:value} )
        )
    }

    render() {
        const { value, label, placeholder } = this.props
        return(
            <div className="ultp-field-wrap ultp-field-link">
                { label && 
                    <label>{label}</label>
                }
                <div className="ultp-sub-field">
                    <input
                        type="url"
                        value={ value.url||'' }
                        placeholder={placeholder||'https://wordpress.org/'}
                        onChange={ val => this.setSettings('url', val.target.value ) } />
                    <Tooltip text={"Target Blank"}>
                        <span className={value.target?'ultp-button active':'ultp-button'} onClick={ val => this.setSettings('target', value.target?0:1 ) }><Icon icon="admin-links" /></span>
                    </Tooltip>
                    <Tooltip text={"No Follow"}>
                        <span className={value.follow?'ultp-button active':'ultp-button'} onClick={ val => this.setSettings('follow', value.follow?0:1 ) }><Icon icon="lock" /></span>
                    </Tooltip>
                </div>
            </div>
        )
    }
}
export default Link