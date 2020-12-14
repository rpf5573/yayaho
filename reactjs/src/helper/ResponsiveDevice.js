const { __ } = wp.i18n
const { Component } = wp.element
const { Tooltip } = wp.components

class ResponsiveDevice extends Component {
    constructor( props ){
        super(props)
        this.state = { current: typeof props.device !== 'undefined' && props.device !== '' ? props.device : 'lg' }
    }
    componentDidMount(){
        if( typeof this.props.device !== 'undefined' && this.props.device !== '' ){
            window.ultpDevice = this.props.device
        }
    }
    _set(value){
        window.ultpDevice = value
        this.setState({current:value})
        this.props.onChange(value);
    }

    render(){
        const {current} = this.state
        return(
            <div className="ultp-device">
                <Tooltip text={__('Large')}>
                    <button onClick={() => this._set('lg')} className={"ultp-device-large" + (current=='lg'?' active':'')}/>
                </Tooltip>
                <Tooltip text={__('Medium')}>
                    <button onClick={() => this._set('md')} className={"ultp-device-medium" + (current=='md'?' active':'')}/>
                </Tooltip>
                <Tooltip text={__('Small')}>
                    <button onClick={() => this._set('sm')} className={"ultp-device-small" + (current=='sm'?' active':'')}/>
                </Tooltip>
                <Tooltip text={__('Extra Small')}>
                    <button onClick={() => this._set('xs')} className={"ultp-device-extra-small" + (current=='xs'?' active':'')}/>
                </Tooltip>
            </div>
        )
    }
}
export default ResponsiveDevice