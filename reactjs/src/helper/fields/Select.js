const { Component, Fragment } = wp.element
import ResponsiveDevice from "../ResponsiveDevice";
import icons from '../../helper/icons'

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false, current: this._filterValue() }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isOpen: false })
    }
  }

  _filterValue() {
    const { multiple } = this.props
    if (!multiple) {
      return this.props.value ? (this.props.responsive ? (this.props.value[window.ultpDevice] || '') : this.props.value) : ''
    } else {
      return this.props.value || []
    }
  }
  _set(val) {
    const { value, onChange, responsive, multiple, pro } = this.props
    if (pro && !wp.ultp_pro) {
      return;
    }
    if (!multiple) {
      let final = responsive ? Object.assign({}, value, { [window.ultpDevice]: val }) : val
      onChange(final)
      this.setState({ current: final })
    } else {
      let filter = value.length ? value : []
      if (value.indexOf(val) == -1) { filter.push(val) }
      onChange(filter)
    }
  }

  getLabel(val) {
    const { options } = this.props
    const data = options.filter(attr => attr.value == val)
    if (data[0]) {
      return data[0].label
    }
  }

  removeItem(val) {
    const { value, onChange } = this.props
    onChange(value.filter(item => item != val))
  }

  render() {
    const { label, responsive, options, clear, multiple, value, pro, customClass } = this.props
    const filter = this._filterValue()
    return (
      <Fragment>
        <div ref={this.setWrapperRef} className={`ultp-field-wrap ultp-field-select ${(pro && !wp.ultp_pro) ? customClass : ''}`}>
          {label &&
            <label>{label}</label>
          }
          {(responsive && !multiple) &&
            <ResponsiveDevice onChange={(val) => this.setState({ current: val })} />
          }
          <div className="ultp-popup-select">
            {clear &&
              <div className={'ultp-base-control-btn dashicons dashicons-image-rotate'} onClick={() => this._set('')} />
            }
            <span className={(this.state.isOpen ? "isOpen " : '') + " ultp-selected-text"}
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
              {multiple ?
                <span className="ultp-search-value ultp-multiple-value">
                  {value.map(item => <span onClick={() => this.removeItem(item)}>{this.getLabel(item)}<span className="ultp-select-close">×</span></span>)}
                </span>
                :
                <span className="ultp-search-value">{this.getLabel(filter)}</span>
              }
              <span className="ultp-search-icon"><i className={'dashicons dashicons-arrow-' + (this.state.isOpen ? 'up-alt2' : 'down-alt2')} /></span>
            </span>
            {this.state.isOpen &&
              <ul>
                {options.map(item => <li onClick={() => {
                  this.setState({ isOpen: !this.state.isOpen });
                  this._set(item.value)
                }} value={item.value}>{item.label} {icons[item.icon] || ''}</li>)}
              </ul>
            }
          </div>
          {(pro && !wp.ultp_pro) &&
            <div className="ultp-field-pro-message">To Enable This Feature <a href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium" target="_blank">Upgrade Pro</a></div>
          }
        </div>
      </Fragment>
    )
  }
}
export default Select