const { Component } = wp.element
import ResponsiveDevice from "../ResponsiveDevice";

class Dimension extends Component {
  constructor(props) {
    super(props);
    this.state = { lock: false, current: this._filterValue() }
  }

  _filterUnit() {
    const { value, responsive } = this.props
    if (value) {
      if (responsive) {
        return value[window.ultpDevice] ? (value[window.ultpDevice].unit ? value[window.ultpDevice].unit : 'px') : 'px'
      } else {
        return value.unit || 'px'
      }
    }
    return 'px'
  }

  _filterValue(val) {
    const { value, responsive } = this.props
    if (typeof value == 'object' && Object.keys(value).length > 0) {
      if (val) {
        return responsive ? (value[window.ultpDevice] ? value[window.ultpDevice][val] || '' : '') : value[val]
      } else {
        return responsive ? value[window.ultpDevice] || '' : value
      }
    } else {
      return ''
    }
  }
  setSettings(action, position) {
    const { responsive, value, onChange } = this.props
    let data = (this.state.lock && position != 'unit') ? { 'top': action, 'right': action, 'bottom': action, 'left': action } : { [position]: action }
    data = Object.assign({}, responsive ? value[window.ultpDevice] || {} : value, data)
    data.unit = data.unit || 'px'
    const final = Object.assign({}, value, responsive ? { [window.ultpDevice]: data } : data)
    onChange(final)
    this.setState({ current: final })
  }
  render() {
    const { unit, label, responsive, value } = this.props;
    return (
      <div className={'ultp-field-wrap ultp-field-dimension'}>
        { (label || responsive) &&
          <div className="ultp-label-control">
            {label && <label>{label}</label>}
            {responsive &&
              <ResponsiveDevice onChange={(val) => this.setState({ current: val })} />
            }
            {unit &&
              <div className="ultp-unit-control">
                {(typeof unit == 'object' ? unit : ['px', 'em', '%']).map((value) => (
                  <button className={(this.props.value && value == this.props.value.unit) ? 'active' : ''} onClick={() => this.setSettings(value, 'unit')}>{value}</button>
                ))}
              </div>
            }
          </div>
        }
        <div className={"ultp-dimension-input" + (!this.props.noLock ? ' ultp-base-control-hasLock' : '')}>
          {['top', 'right', 'bottom', 'left'].map((val, index) => (<span><input type='number' value={this._filterValue(val)} onChange={(v) => this.setSettings(v.target.value, val)} /><span>{this.props.dataLabel ? this.props.dataLabel[index] : val}</span></span>))}
          {!this.props.noLock &&
            <button className={(this.state.lock ? 'active ' : '') + ''} onClick={() => this.setState({ lock: !this.state.lock })}>
              {this.state.lock ? <span className={'dashicons dashicons-lock'} /> : <span className={'dashicons dashicons-visibility'} />}
            </button>
          }
        </div>
      </div>
    )
  }
}
export default Dimension;
