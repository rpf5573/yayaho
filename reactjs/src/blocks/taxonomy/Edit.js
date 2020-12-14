const { __ } = wp.i18n
const { addQueryArgs } = wp.url
const { InspectorControls, RichText } = wp.blockEditor
const { Component, Fragment } = wp.element
const { Spinner, Placeholder } = wp.components
import { CssGenerator } from '../../helper/CssGenerator'
import { renderTitle, renderReadmore, renderCategory, renderMeta, renderExcerpt, isReload, attrBuild, renderFilter, renderNavigation, renderPagination, renderLoadmore, GeneralContent, QueryContent, PaginationContent, SeparatorStyle, FilterContent, Content, GeneralAdvanced, CustomCssAdvanced, WrapStyle, HeadingContent, ImageStyle, ReadMoreStyle, TitleStyle, CategoryStyle, ExcerptStyle, Design, MetaStyle } from '../../helper/CommonPanel'
import icons from '../../helper/icons'
import { Sections, Section } from '../../helper/Sections'


class Edit extends Component {
  constructor() {
    super(...arguments);
    this.state = { postsList: [], loading: true, error: false, section: 'Content' };
    this.setSection = this.setSection.bind(this);
  }

  setSection(title) {
    const val = this.state.section == title ? '' : title
    this.setState({ section: val })
  }

  componentWillMount() {
    this.fetchTaxonomy();
  }

  componentDidMount() {
    const { setAttributes, clientId, attributes: { blockId } } = this.props
    const _client = clientId.substr(0, 6)
    if (!blockId) {
      setAttributes({ blockId: _client });
    } else if (blockId && blockId != _client) {
      setAttributes({ blockId: _client });
    }
  }

  fetchTaxonomy() {
    // const self = this;
    // const query = addQueryArgs( '/ultp/posts', attrBuild(this.props.attributes) );
    // if (this.state.error) {
    //     this.setState( { error: false } );
    // }
    // if (!self.state.loading) {
    //     self.setState( { loading: true } );
    // }
    // wp.apiFetch( { path: query } ).then( (obj) => {
    //     self.setState({postsList: obj, loading: false })
    // }).catch( (error) => {
    //     self.setState({loading: false, error: true })
    // })
    /*
    Title
    URL
    Count
    Image/Color/Gradient
    */

    let category = []
    if (tax) {
      const query = addQueryArgs(
        '/ultp/taxonomy', { taxonomy: tax, wpnonce: ultp_data.security }
      );
      wp.apiFetch({ path: query }).then((obj) => {
        Object.keys(obj).forEach(function (key) {
          category.push({ value: key, label: obj[key] })
        });
      })
    }
    return category;
  }

  render() {
    const { setAttributes, name, attributes, clientId } = this.props
    const store = { setAttributes, name, attributes, setSection: this.setSection, section: this.state.section, clientId }
    const { blockId, advanceId, titleShow, readMore, excerptShow, catShow, metaShow, showImage, paginationShow, headingText, headingStyle, headingShow, headingAlign, headingURL, filterShow, headingBtnText, subHeadingShow, subHeadingText, loadMoreText } = this.props.attributes;
    if (blockId) { CssGenerator(this.props.attributes, 'post-grid-1', blockId); }
    return (
      <Fragment>
        <InspectorControls>
          <Sections>
            <Section slug="design" title={__('Design')}>
              <Design store={store} />
            </Section>
            <Section slug="setting" title={__('Setting')}>
              <GeneralContent store={store} exclude={['itemView', 'slidesToShow', 'slideSpeed', 'customgrid', 'columnGap', 'rowGap', 'autoPlay', 'dots', 'arrows', 'queryNumber']} />
              <QueryContent store={store} />
              {headingShow && <HeadingContent store={store} />}
              {filterShow && <FilterContent store={store} />}
              {paginationShow && <PaginationContent store={store} />}
              {showImage && <ImageStyle store={store} exclude={['imgMargin', 'imgCropSmall']} include={[{ position: 3, data: { type: 'range', key: 'imgSpacing', label: 'Img Spacing', min: 0, max: 100, step: 1, responsive: true } }]} />}
              {<WrapStyle store={store} exclude={['contenWraptWidth', 'contenWraptHeight']} />}
              {titleShow && <TitleStyle store={store} />}
              {metaShow && <MetaStyle store={store} exclude={['metaListSmall']} />}
              {catShow && <CategoryStyle store={store} />}
              {excerptShow && <ExcerptStyle store={store} />}
              {readMore && <ReadMoreStyle store={store} />}
              <SeparatorStyle store={store} />
            </Section>
            <Section slug="advanced" title={__('Advanced')}>
              <GeneralAdvanced initialOpen={true} store={store} />
              <CustomCssAdvanced store={store} />
            </Section>
          </Sections>
        </InspectorControls>

        <div {...(advanceId && { id: advanceId })} className={`ultp-block-${blockId} ${this.props.className}`}>
          <div className={`ultp-block-wrapper`}>
            {headingShow &&
              <div className={`ultp-heading-filter`}>
                <div className={`ultp-heading-filter-in`}>
                  {headingShow &&
                    <div className={`ultp-heading-wrap ultp-heading-${headingStyle} ultp-heading-${headingAlign}`}>
                      {headingURL ?
                        <h3 className={`ultp-heading-inner`}>
                          <a>
                            <RichText
                              key="editable"
                              tagName={'span'}
                              keepPlaceholderOnFocus
                              placeholder={__('Add Text...')}
                              onChange={value => setAttributes({ headingText: value })}
                              value={headingText} />
                          </a>
                        </h3>
                        :
                        <h3 className={`ultp-heading-inner`}>
                          <RichText
                            key="editable"
                            tagName={'span'}
                            keepPlaceholderOnFocus
                            placeholder={__('Add Text...')}
                            onChange={value => setAttributes({ headingText: value })}
                            value={headingText} />
                        </h3>
                      }
                      {((headingStyle == 'style11') && headingURL) &&
                        <a className={`ultp-heading-btn`}>{headingBtnText}{icons.rightAngle2}</a>
                      }
                      {subHeadingShow &&
                        <div className={`ultp-sub-heading`}>
                          <RichText
                            key="editable"
                            tagName={'div'}
                            className={'ultp-sub-heading-inner'}
                            keepPlaceholderOnFocus
                            placeholder={__('Add Text...')}
                            onChange={value => setAttributes({ subHeadingText: value })}
                            value={subHeadingText} />
                        </div>
                      }
                    </div>
                  }

                </div>
              </div>
            }


            <div className={`ultp-block-items-wrap`}>

            </div>




          </div>
        </div>
      </Fragment>
    )
  }
}
export default Edit
