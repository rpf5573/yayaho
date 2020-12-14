const { Component } = wp.element;
class Separator extends Component {
    render() {
        const { label } = this.props
        return (
            <div className={'ultp-field-wrap ultp-field-separator'}>
                { label && 
                    <div><span>{label}</span></div>
                }
            </div>
        )
    }
}
export default Separator