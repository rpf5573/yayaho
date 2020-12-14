const { __ } = wp.i18n
const { Component } = wp.element
const { Dropdown, SelectControl } = wp.components
import FontList from './Fonts'
import Range from "./Range"

class Typography extends Component {

    _getWeight(){
        const { value } = this.props
        if( value && value.family && value.family != 'none' ){
            let weight = FontList.filter( o => { return o.n == value.family } )[0].v
            return weight.map( ( w ) => {
                return { value: w, label: w };
            } );
        }else{
            return [{value: '100', label: '100'},{value: '200', label: '200'},{value: '200', label: '300'},{value: '400', label: '400'},{value: '500', label: '500'},{value: '700', label: '700'}];
        }
    }

    setSettings( type, value ){
        if( type == 'family' ){
            if(value){
                value = { [type]:value, type:(FontList.filter( o => { return o.n == value } )[0].f) }
            }
        }else{
            value = {[type]:value}
        }
        this.props.onChange( Object.assign( {}, this.props.value, value ) )
    }

    render(){
        const { value } = this.props
        const isActive = value && value.openTypography ? true : false

        const fontsarray = FontList.map( ( name ) => {
            return { value: name.n, label: name.n };
        } );

        const transformOptions = [
			{ value: 'inherit', label: __( 'Inherit' ) },
			{ value: 'capitalize', label: __( 'Capitalize' ) },
			{ value: 'lowercase', label: __( 'Lowercase' ) },
			{ value: 'uppercase', label: __( 'Uppercase' ) },
        ]; 
        const styleOptions = [
			{ value: 'normal', label: __( 'Normal' ) },
			{ value: 'italic', label: __( 'Italic' ) },
			{ value: 'oblique', label: __( 'Oblique' ) },
			{ value: 'uppercase', label: __( 'Uppercase' ) },
        ]; 
        const decorationOptions = [
			{ value: 'none', label: __( 'None' ) },
			{ value: 'inherit', label: __( 'Inherit' ) },
			{ value: 'underline', label: __( 'Underline' ) },
			{ value: 'overline', label: __( 'Overline' ) },
			{ value: 'line-through', label: __( 'Line Through' ) },
        ]; 
        const typographyContent =  (
            <div className={this.props.inline ? "ultp-range-control" : "ultp-field-typography" }>
                <div className="ultp-typo-family-wrap">
                    <div className="ultp-typo-family">
                        <SelectControl
                            label="Font Family"
                            value={ value&&value.family }
                            options={ fontsarray }
                            onChange={ val => this.setSettings('family', val ) }
                        />
                    </div>
                    <div className="ultp-typo-weight">
                        <SelectControl
                            label="Font Weight"
                            value={ value&&value.weight }
                            options={ this._getWeight() }
                            onChange={
                                val => this.setSettings('weight', val)
                            }
                        />
                    </div>
                </div>
                <div className="ultp-typo-slide">
                    <Range
                        unit={['px','em']}
                        responsive
                        label={ 'Font Size' }
                        value={ value&&value.size }
                        onChange={
                            val => this.setSettings('size', val )
                        }
                        min={ 1 }
                        max={ 300 }
                        step={ 1 }
                    />
                </div>
                <div className="ultp-typo-slide">
                    <Range
                        unit={['px','em']}
                        responsive
                        label={ 'Line Height' }
                        value={ value&&value.height }
                        onChange={ val => this.setSettings('height', val ) }
                        min={ 1 }
                        max={ 300 }
                        step={ 1 }
                    />
                </div>
                <div className="ultp-typo-slide">
                    <Range
                        unit={['px','em']}
                        responsive
                        label={ 'Letter Spacing' }
                        value={ value&&value.spacing }
                        onChange={
                            val => this.setSettings('spacing', val )
                        }
                        min={ -10 }
                        max={ 30 }
                        step={ .1 }
                    />
                </div>
                <div className="ultp-typo-style-wrap">
                    <div className="ultp-typo-transfer">
                        <SelectControl
                            label="Transform"
                            value={ value&&value.transform }
                            options={ transformOptions }
                            onChange={ val => this.setSettings('transform', val ) }
                        />
                    </div>
                    <div className="ultp-typo-style">
                        <SelectControl
                            label="Style"
                            value={ value&&value.style }
                            options={ styleOptions }
                            onChange={ val => this.setSettings('style', val ) }
                        />
                    </div>
                    <div className="ultp-typo-decoration">
                        <SelectControl
                            label="Decoration"
                            value={ value&&value.decoration }
                            options={ decorationOptions }
                            onChange={ val => this.setSettings('decoration', val ) }
                        />
                    </div>
                </div>
            </div>
        )

        return(
            <div className="ultp-field-wrap ultp-popup-control">
                { this.props.label &&
                    <label>{this.props.label}</label>
                }
                { this.props.inline ? 
                    typographyContent : 
                    ( <Dropdown
                        className="ultp-range-control"
                        position="top right"
                        renderToggle={({ isOpen, onToggle }) => (
                            <div className="ultp-edit-btn">
                                <div className={ (isActive ? '' : 'active ')+'ultp-base-control-btn dashicons dashicons-image-rotate' } onClick={() => { if(isOpen){ onToggle(); } this.setSettings( 'openTypography', 0 );}}></div>
                                <div className={ (isActive ? 'active ' : '')+'ultp-base-control-btn dashicons dashicons-edit' } onClick={() => { onToggle(); this.setSettings( 'openTypography', 1 ); }} aria-expanded={isOpen}></div>
                            </div>
                        )}
                        renderContent={ () => typographyContent }
                    /> )
                }
            </div>
        )
    }
}
export default Typography