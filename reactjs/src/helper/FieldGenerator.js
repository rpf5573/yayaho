const { Component, Fragment } = wp.element
const { TextControl, TextareaControl, TabPanel } = wp.components
import Alignment from './fields/Alignment'
import Border from './fields/Border'
import BoxShadow from './fields/BoxShadow'
import Color from './fields/Color'
import Color2 from './fields/Color2'
import Divider from './fields/Divider'
import Dimension from './fields/Dimension'
import Gradient from './fields/Gradient'
import Link from './fields/Link'
import Media from './fields/Media'
import RadioImage from './fields/RadioImage'
import Range from './fields/Range'
import Select from './fields/Select'
import Tag from './fields/Tag'
import Toggle from './fields/Toggle'
import Typography from './fields/Typography'
import Separator from './fields/Separator'
import Template from './fields/Template'
import LinkButton from './fields/LinkButton'
import Layout from './fields/Layout'


class FieldGenerator extends Component {

  constructor() {
    super(...arguments);
    this.state = { init: true };
  }

  _isShow(settings, style) {
    let _show = true
    style.forEach((selectData, i) => {
      if (selectData.hasOwnProperty('depends')) {
        selectData.depends.forEach(data => {
          let previous = (i == 0 ? false : _show)
          if (data.condition == '==') {
            if (typeof data.value == 'object') {
              _show = data.value.includes(settings[data.key])
            } else {
              _show = settings[data.key] == data.value
            }
          } else if (data.condition == '!=') {
            if (typeof data.value == 'object') {
              _show = data.value.includes(settings[data.key]) ? false : true
            } else {
              _show = settings[data.key] != data.value
            }
          }
          if (previous == true && _show == false) {
            _show = true
          }
        });
      }
    })

    return _show;
  }

  _fieldRender(customData) {
    const { data, store } = this.props
    const initVal = wp.blocks.getBlockType(store.name)
    return (customData || data).map(attr => {
      const _val = store.attributes[attr.key];
      const _data = _val === false ? true : _val
      if (_data && initVal.attributes[attr.key].style) {
        if (this._isShow(store.attributes, initVal.attributes[attr.key].style) === false) {
          return;
        }
      }
      if (attr.type == 'alignment') {
        return <Alignment
          value={_val}
          label={attr.label}
          responsive={attr.responsive}
          disableJustify={attr.disableJustify}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'border') {
        return <Border
          value={_val}
          label={attr.label}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'boxshadow') {
        return <BoxShadow
          value={_val}
          label={attr.label}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'color') {
        return <Color
          value={_val}
          label={attr.label}
          pro={attr.pro}
          customClass={attr.customClass}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'color2') {
        return <Color2
          value={_val}
          clip={attr.clip}
          label={attr.label}
          pro={attr.pro}
          customClass={attr.customClass}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'divider') {
        return <Divider
          label={attr.label} />
      }
      else if (attr.type == 'dimension') {
        return <Dimension
          value={_val}
          min={attr.min}
          max={attr.max}
          unit={attr.unit}
          step={attr.step}
          label={attr.label}
          responsive={attr.responsive}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'link') {
        return <Link
          value={_val}
          label={attr.label}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'media') {
        return <Media
          value={_val}
          label={attr.label}
          multiple={attr.multiple}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'radioimage') {
        return <RadioImage
          value={_val}
          label={attr.label}
          options={attr.options}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'range') {
        return <Range
          value={_val}
          min={attr.min}
          max={attr.max}
          step={attr.step}
          unit={attr.unit}
          label={attr.label}
          pro={attr.pro}
          customClass={attr.customClass}
          responsive={attr.responsive}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'select') {
        return <Select
          value={attr.multiple ? (_val ? JSON.parse(_val) : []) : _val}
          label={attr.label}
          clear={attr.clear}
          options={attr.options}
          multiple={attr.multiple}
          responsive={attr.responsive}
          pro={attr.pro}
          customClass={attr.customClass}
          onChange={v => attr.multiple ? store.setAttributes({ [attr.key]: JSON.stringify(v) }) : store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'tag') {
        return <Tag
          value={_val}
          label={attr.label}
          options={attr.options}
          disabled={attr.disabled}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'text') {
        return <TextControl
          value={_val}
          placeholder={attr.placeholder}
          label={attr.label}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'textarea') {
        return <TextareaControl
          value={_val}
          label={attr.label}
          placeholder={attr.placeholder}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'toggle') {
        return <Toggle
          value={_val}
          label={attr.label}
          pro={attr.pro}
          customClass={attr.customClass}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'typography') {
        return <Typography
          value={_val}
          label={attr.label}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'tab') {
        return <TabPanel
          tabs={attr.content}
          activeClass="active-tab"
          className="ultp-inspect-tabs ultp-hover-tabs">
          {(tab) => <Fragment>{this._fieldRender(tab.options)}</Fragment>}
        </TabPanel>
      }
      else if (attr.type == 'gradient') {
        return <Gradient
          value={_val}
          label={attr.label}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'separator') {
        return <Separator
          label={attr.label} />
      }
      else if (attr.type == 'linkbutton') {
        return <LinkButton
          value={_val}
          text={attr.text}
          label={attr.label}
          placeholder={attr.placeholder}
          onChange={v => store.setAttributes({ [attr.key]: v })} />
      }
      else if (attr.type == 'template') {
        return <Template
          label={attr.label}
          store={store} />
      }
      else if (attr.type == 'layout') {
        return <Layout
          value={_val}
          label={attr.label}
          pro={attr.pro}
          block={attr.block}
          options={attr.options}
          customClass={attr.customClass}
          onChange={v => store.setAttributes(v)} />
      }
    });
  }

  render() {
    const { title, initialOpen, pro } = this.props
    const { init } = this.state
    const { setSection, section } = this.props.store
    if (title) {
      let is_show = (title == section) ? '' : 'is-hide'
      if (init && initialOpen) { is_show = '' }
      return (
        <div className="ultp-section-accordion">
          <div className="ultp-section-accordion-item" onClick={() => {
            setSection(title)
            this.setState({ init: false })
          }}>
            {title}
            {is_show ? <span className="ultp-section-arrow dashicons dashicons-arrow-down-alt2"></span> : <span className="ultp-section-arrow dashicons dashicons-arrow-up-alt2"></span>}
          </div>
          <div className={`ultp-section-show ` + is_show}>
            {(pro && !wp.ultp_pro) ?
              <div className="ultp-pro-total">
                <div className="ultp-section-pro-message"><span>To Unlock all Settings <a href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium" target="_blank">Upgrade Pro</a></span></div>
                {this._fieldRender()}
              </div>
              :
              this._fieldRender()
            }
          </div>
        </div>
      )
    } else {
      return <Fragment>{this._fieldRender()}</Fragment>
    }
  }
}
export { FieldGenerator }