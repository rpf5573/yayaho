const { Component } = wp.element
const { Dropdown, ToggleControl } = wp.components
import Dimension from './Dimension'
import Color from './Color'

const defaultData = {
  inset: '',
  width: { top: 4, right: 3, bottom: 2, left: 1 },
  color: '#555d66'
};

class BoxShadow extends Component {
  constructor(props) {
    super(props)
    this.state = { enableShadow: false }
  }

  componentWillMount() {
    const { value } = this.props
    this.props.onChange(Object.assign({}, defaultData, (value || {})));
  }

  setSettings(type, value) {
    this.props.onChange(Object.assign({}, this.props.value, { [type]: value || 0 }))
  }

  render() {
    const { value } = this.props;
    const isActive = value && value.openShadow ? true : false
    return (
      <div className="ultp-field-wrap ultp-popup-control">
        { this.props.label &&
          <label>{this.props.label}</label>
        }
        <Dropdown
          className="ultp-range-control"
          position="top right"
          renderToggle={({ isOpen, onToggle }) => (
            <div className="ultp-edit-btn">
              <div className={(isActive ? '' : 'active ') + 'ultp-base-control-btn dashicons dashicons-image-rotate'} onClick={() => { if (isOpen) { onToggle(); } this.setSettings('openShadow', 0); }}></div>
              <div className={(isActive ? 'active ' : '') + 'ultp-base-control-btn dashicons dashicons-edit'} onClick={() => { onToggle(); this.setSettings('openShadow', 1); }} aria-expanded={isOpen}></div>
            </div>
          )}
          renderContent={() => (
            <div className={"ultp-common-popup"}>
              <Dimension
                label={'Shadow'}
                value={value['width'] || ''}
                onChange={val => this.setSettings('width', val)}
                dataLabel={['offset-x', 'offset-y', 'blur', 'spread']}
                min={0}
                max={100}
                step={1}
                noLock />
              <ToggleControl
                label={'Inset'}
                checked={value['inset'] ? 1 : 0}
                onChange={val => this.setSettings('inset', val ? 'inset' : '')} />
              <Color
                inset
                label={'Color'}
                value={value['color'] || ''}
                onChange={val => this.setSettings('color', val)} />
            </div>
          )}
        />
      </div>
    )
  }
}
export default BoxShadow