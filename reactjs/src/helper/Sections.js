const { __ } = wp.i18n
const { Component, Fragment } = wp.element

class Sections extends Component {
  constructor(props) {
    super(props)
    this.state = { current: this.props.children[0].props.slug }
  }

  componentDidMount() {
    jQuery(".edit-post-sidebar").on('scroll', function () {
      if (jQuery(this).scrollTop() > 130) {
        jQuery('.ultp-section-wrap').addClass('ultp-section-fixed');
      } else {
        jQuery('.ultp-section-wrap').removeClass('ultp-section-fixed');
      }
    });
  }

  render() {
    const section = this.props.children
    const { current } = this.state

    return (
      <div className={`ultp-section-tab`} >
        <div class="ultp-section-wrap">
          <div class="ultp-section-wrap-inner">
            {section.map(tab =>
              <div className={"ultp-section-title" + (tab.props.slug === current ? ' active' : '')} onClick={() => this.setState({ current: tab.props.slug })}>
                <span className={tab.props.slug == 'setting' ? "dashicons dashicons-admin-tools" : tab.props.slug == 'advanced' ? "dashicons dashicons-admin-generic" : "dashicons dashicons-admin-appearance"}></span><span>{tab.props.title}</span>
              </div>
            )}
          </div>
        </div>
        <div className={`ultp-section-content`}>
          {section.map(tab => tab.props.slug === current ? tab : "")}
        </div>
      </div>
    )
  }
}


class Section extends Component {
  render() {
    const { children } = this.props
    return (
      <Fragment> {Array.isArray(children) ? children.map(item => item) : children} </Fragment>
    )
  }
}


export { Sections, Section }