const { Component } = wp.element
import ResponsiveDevice from "../ResponsiveDevice";


class Range extends Component {
    constructor(props) {
        super(props)
        this.state = { current:this._filterValue(), device: 'lg' }
    }

    _filterValue(type) {
        const { value ,responsive } = this.props
        if( type == 'unit' ){
            return value ? ( value.unit || 'px' ) : 'px'
        }else{
            return value ? ( responsive ? ( value[window.ultpDevice] || '' ): value ) : ''
        }
    }

    setSettings(val,type) {
        const { value, onChange, responsive, min, max, unit, pro } = this.props
        let final = value || {}
        if( unit && (!final.hasOwnProperty('unit')) ){ final.unit = 'px' }
        if( type == 'unit' && (responsive) ){
            final = value || {};
            final.unit = val;
        }else{
            final = (responsive ) ? Object.assign({}, value, { [window.ultpDevice]: val }) : val
            final = min ? ( final < min ? min : final ) : ( final < 0 ? 0 : final )
            final = max ? ( final > max ? max : final ) : ( final > 1000 ? 1000 : final )
        }
        
        if(pro){
            if(wp.ultp_pro){
                onChange(final)
                this.setState({ current: final })
            }
        }else{
            onChange(final)
            this.setState({ current: final })
        }
    }

    _minMax( type ){
        let unit = this._filterValue('unit')
        return ( this.props[type] && this.props[type] != 0 ) ? ( unit == 'em' ? Math.round(this.props[type]/16) : this.props[type] ) : 0
    }

    _steps(){
        let unit = this._filterValue('unit')
        return unit == 'em' ? .001 : ( this.props.step || 1 )
    }

    render() {
        const {unit, label, responsive, pro, customClass} = this.props
        return (
            <div className={'ultp-field-wrap ultp-field-range  ' + (responsive ? 'ultp-base-control-responsive' : '') +  ' ' + ((pro && !wp.ultp_pro) ? customClass: '') }>
                <div className="ultp-label-control">
                    { label && <label>{label}</label>}
                    { responsive &&
                        <ResponsiveDevice onChange={(val) => this.setState({ device: val })} />
                    }
                    { unit &&
                        <div className="ultp-unit-control">
                            { (typeof unit == 'object' ? unit : ['px', 'em', '%']).map((value) => (
                                <button className={(this.props.value && value == this.props.value.unit) ? 'active' : ''} onClick={ () => {this.setSettings(value,'unit')} }>{value}</button>
                            )) }
                        </div>
                    }
                </div>
                <div className="ultp-range-control">
                    <div className="ultp-range-input">
                        <input
                            type="range"
                            min={ this._minMax('min') }
                            max={ this._minMax('max') }
                            value={ this._filterValue() }
                            step={ this._steps() }
                            onChange={ e => this.setSettings(this._filterValue() == e.target.value ? '' : e.target.value, 'range')}
                        />
                        <input 
                            type="number" 
                            step={this._steps()} 
                            min={ this._minMax('min') }
                            max={ this._minMax('max') }
                            onChange={v=>this.setSettings(v.target.value,'range')} 
                            value={this._filterValue()+(this.props.suffix?this.props.suffix:'')} 
                            { ...( this.props.suffix && { disabled: true } ) }/>
                    </div>
                </div>
                { (pro && !wp.ultp_pro) &&
                    <div className="ultp-field-pro-message">To Enable This Feature <a href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium" target="_blank">Upgrade Pro</a></div>
                }
            </div>
        )
    }
}
export default Range