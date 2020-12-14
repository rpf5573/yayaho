const { Component } = wp.element

class Layout extends Component {

  getPostAttr(block, val) {
    let data = {};
    data.layout = val
    switch (block) {
      case 'post-grid-7':
        data.queryNumber = (val == 'layout1' ? '4' : '3');
        break;
      case 'post-grid-3':
        if (val == 'layout3' || val == 'layout4' || val == 'layout5') {
          data.queryNumber = '5';
          data.column = '3';
        } else {
          data.queryNumber = '3';
          data.column = '2';
        }
        break;
      case 'post-grid-4':
        if (val == 'layout4') {
          data.queryNumber = '4';
        } else {
          data.queryNumber = '3';
        }
        break;
      default:
        break;
    }
    return data;
  }

  setValue(val, isPro) {
    const { onChange, block } = this.props
    const data = this.getPostAttr(block, val)
    if (isPro) {
      if (wp.ultp_pro) {
        onChange(data)
      }
    } else {
      onChange(data)
    }
  }

  render() {
    const { value, options, label, pro } = this.props
    return (
      <div className="ultp-field-wrap ultp-field-layout">
        { label &&
          <label>{label}</label>
        }
        <div className="ultp-field-layout-wrapper">
          {
            options.map((data, index) => {
              return (
                <div
                  onClick={() => this.setValue(data.value, data.pro)}
                  className={data.value == value ? 'ultp-field-layout-items active' : 'ultp-field-layout-items'}
                >
                  <div className={`ultp-field-layout-item ${(pro && wp.ultp_pro) ? 'ultp-field-layout-item-pro' : ''}`}>
                    <div className={'ultp-field-layout-content'}>
                      {data.icon}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        { (pro && !wp.ultp_pro) &&
          <div className="ultp-field-pro-message">To Unlock All Layouts <a href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium" target="_blank">Upgrade Pro</a></div>
        }
      </div>
    )
  }
}
export default Layout