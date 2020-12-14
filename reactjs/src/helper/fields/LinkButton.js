const { __ } = wp.i18n
const { Component } = wp.element
const { Tooltip, Icon } = wp.components

class LinkButton extends Component {
  render() {
    const { text, value, label, placeholder } = this.props
    return (
      <div className="ultp-field-wrap ultp-field-link-button">
        { label &&
          <label>{label}</label>
        }
        <div className="ultp-sub-field">
          <Tooltip text={placeholder}>
            <a href={value} target="_blank">{text}</a>
          </Tooltip>
        </div>
      </div>
    )
  }
}
export default LinkButton