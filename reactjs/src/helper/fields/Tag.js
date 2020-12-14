const { Component } = wp.element

class Tag extends Component {
  _set(val) {
    const { value, disabled, onChange } = this.props
    if (disabled && value == val) {
      onChange('')
    } else {
      onChange(val)
    }
  }
  render() {
    const { value, options, label } = this.props
    return (
      <div className="ultp-field-wrap ultp-field-tag">
        { label &&
          <label>{label}</label>
        }
        <div className="ultp-sub-field">
          {(options ||
            [{ value: 'h1', label: 'H1' },
            { value: 'h2', label: 'H2' },
            { value: 'h3', label: 'H3' },
            { value: 'h4', label: 'H4' },
            { value: 'h5', label: 'H5' },
            { value: 'h6', label: 'H6' }]).map((data, index) => {
              return (<span className={data.value == value ? 'ultp-button active' : 'ultp-button'} onClick={() => this._set(data.value)}>{data.label}</span>)
            })
          }
        </div>
      </div>
    )
  }
}
export default Tag