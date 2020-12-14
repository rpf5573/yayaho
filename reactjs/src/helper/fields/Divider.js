const { Component } = wp.element
class Divider extends Component {

  render() {
    return (
      <div className="ultp-field-wrap ultp-field-divider">
        { this.props.label &&
          <div className="ultp-field-label">{this.props.label}</div>
        }
        <hr />
      </div>
    )
  }
}
export default Divider
