const { __ } = wp.i18n
const { Component } = wp.element
import Select from "./Select"
import Range from "./Range"
import Color from "./Color"

const defVal = { 
    color1: '#16d03e',
    color2: '#1f91f3',
    type: 'linear',
    direction: '90',
    start: 5,
    stop: 80,
    radial: 'center',
    clip: false
};

class Gradient extends Component {

    componentWillMount() {
        this.props.onChange(Object.assign({}, defVal, (this.props.clip ? { clip: this.props.clip } : {}), this.props.value))
    }

    _set(value, type) {
        this.props.onChange(Object.assign({}, this.props.value, { [type]: value }))
    }

    render() {
        const { value,label,inset } = this.props
        return (
            <div className={"ultp-field-gradient"}>
                { label && <label>{label}</label> }
                <div className="ultp-common-popup">
                    <Select
                            label={__('Type')}
                            value={value.type}
                            options={[
                                {value:'linear',label:'Linear'},
                                {value:'radial',label:'Radial'}]}
                            onChange={val => this._set(val, 'type')} 
                    />
                    { value.type == 'radial' ?
                        <Select
                            label={__('Radial Pointer')}
                            value={value.radial}
                            options={[
                                {value:'center', label:'Center'},
                                {value:'top left', label:'Top Left'},
                                {value:'top', label:'Top'},
                                {value:'top right', label:'Top Right'},
                                {value:'right', label:'Right'},
                                {value:'bottom right', label:'Bottom Right'},
                                {value:'bottom', label:'Bottom'},
                                {value:'bottom left', label:'Bottom Left'},
                                {value:'left', label:'Left'}]}
                            onChange={val => this._set(val, 'radial')} />
                        :
                        <Range
                            min={0}
                            step={1}
                            max={360}
                            allowReset
                            label={__('Direction')}
                            beforeIcon="image-rotate"
                            value={value.direction || 90}
                            onChange={val => this._set(val, 'direction')}/>
                    }
                    <Range
                        min={0}
                        step={1}
                        max={100}
                        allowReset
                        value={value.start || 5}
                        beforeIcon="arrow-up-alt"
                        label={__('Color 1 Angle')}
                        onChange={start => this._set(start, 'start')}
                    />
                    <Color 
                        inset={inset}
                        label={__('Color 1')}
                        value={value.color1}
                        onChange={ val => this._set(val, 'color1') }
                    />
                    <Range
                        min={0}
                        step={1}
                        max={100}
                        allowReset
                        value={value.stop || 80}
                        label={__('Color 2 Angle')}
                        beforeIcon="arrow-down-alt"
                        onChange={val => this._set(val, 'stop')}
                    />
                    <Color 
                        inset={inset}
                        label={__('Color 2')}
                        value={value.color2}
                        onChange={ val => this._set(val, 'color2') }
                    />
                </div>
            </div>
        )
    }
}
export default Gradient;