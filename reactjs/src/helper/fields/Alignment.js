import ResponsiveDevice from "../ResponsiveDevice";
const { Component } = wp.element;

class Alignment extends Component {
  constructor(props) {
    super(props)
    this.state = { current: this._filter() }
  }
  _filter() {
    const { value, responsive } = this.props
    return value ? (responsive ? (value[window.ultpDevice] || '') : value) : ''
  }
  _set(val) {
    const { value, onChange, responsive, disableToggle } = this.props
    if (val == '' && disableToggle) {
      return
    }
    const final = responsive ? Object.assign({}, value, { [window.ultpDevice]: val }) : val
    onChange(final)
    this.setState({ current: final })
  }
  render() {
    const { label, responsive, disableJustify } = this.props
    const align = disableJustify ? ['left', 'center', 'right'] : ['left', 'center', 'right', 'justify'];
    return (
      <div className={'ultp-field-wrap ultp-field-alignment'}>
        { label &&
          <label>{label}</label>
        }
        { responsive &&
          <ResponsiveDevice onChange={(val) => this.setState({ current: val })} />
        }
        <div className="ultp-sub-field">
          {align.map(data => {
            return <span onClick={() => this._set(data)} className={'dashicons ultp-button dashicons-editor-' + (data != 'justify' ? 'align' : '') + data + (data == this._filter() ? ' active' : '')} />
          })}
        </div>
      </div>
    )
  }
}
export default Alignment