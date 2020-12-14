const { __ } = wp.i18n
const { addQueryArgs } = wp.url
const { InspectorControls, RichText } = wp.blockEditor
const { Component, Fragment } = wp.element
const { Spinner, Placeholder } = wp.components
import { CssGenerator } from '../../helper/CssGenerator'
import { renderTitle, renderReadmore, renderCategory, renderMeta, renderExcerpt, isReload, attrBuild, renderFilter, renderNavigation, renderPagination, renderLoadmore, GeneralContent, PaginationContent, FilterContent, QueryContent, HeadingContent, OverlayStyle, ReadMoreStyle, TitleStyle, CategoryStyle, ExcerptStyle, Design, MetaStyle, GeneralAdvanced, CustomCssAdvanced, ImageStyle, titleAnimationArg } from '../../helper/CommonPanel'
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
    this.fetchProducts();
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

  componentDidUpdate(prevProps) {
    const { attributes } = this.props;
    if (isReload(prevProps.attributes, attributes)) {
      this.fetchProducts();
    }
  }

  fetchProducts() {
    const self = this;
    const query = addQueryArgs('/ultp/posts', attrBuild(this.props.attributes));
    if (this.state.error) {
      this.setState({ error: false });
    }
    if (!self.state.loading) {
      self.setState({ loading: true });
    }
    wp.apiFetch({ path: query }).then((obj) => {
      self.setState({ postsList: obj, loading: false })
    }).catch((error) => {
      self.setState({ loading: false, error: true })
    })
  }

  renderContent() {
    const { postsList, loading, error } = this.state;
    const { readMoreIcon, excerptLimit, metaStyle, metaShow, catShow, overlayContentPosition, metaSeparator, titleShow, catStyle, catPosition, titlePosition, excerptShow, imgAnimation, imgOverlayType, imgOverlay, metaList, readMore, readMoreText, metaPosition, showFullExcerpt, showImage, titleAnimation, customCatColor, onlyCatColor } = this.props.attributes;

    return (
      !error ? !loading ? postsList.length > 0 ?
        <div className={`ultp-block-items-wrap ultp-block-row`}>
          {(postsList.map((post, idx) => {
            const meta = JSON.parse(metaList)
            const category = renderCategory(post, catShow, catStyle, catPosition, customCatColor, onlyCatColor)
            return (
              <div key={idx} id={'post-id-' + post.ID} className={`ultp-block-item ${titleAnimation ? ' ultp-animation-' + titleAnimation : ''}`}>
                <div className={`ultp-block-content-wrap ultp-block-content-overlay`}>
                  {(post.image && showImage) ? (
                    <div className={`ultp-block-image ultp-block-image-${imgAnimation} ${(imgOverlay === true) ? 'ultp-block-image-overlay ultp-block-image-' + imgOverlayType + ' ' + 'ultp-block-image-' + imgOverlayType + idx : ''}`}>
                      <a><img loading="lazy" alt={post.title || ''} src={post.image.full} /></a>
                      { (catPosition != 'aboveTitle') && <div className={`ultp-category-img-grid`}>{category}</div>}
                    </div>
                  ) : (
                      <div className={`ultp-block-image ultp-block-empty-image`}></div>
                    )
                  }
                  <div className={`ultp-block-content ultp-block-content-${overlayContentPosition}`}>
                    <div className={`ultp-block-content-inner`}>
                      {(catPosition == 'aboveTitle') && category}
                      {post.title && titleShow && (titlePosition == true) &&
                        renderTitle(post.title)
                      }
                      {metaShow && (metaPosition == 'top') &&
                        renderMeta(meta, post, metaSeparator, metaStyle)
                      }
                      {post.title && titleShow && (titlePosition == false) &&
                        renderTitle(post.title)
                      }
                      {excerptShow && (
                        showFullExcerpt ? <div className={`ultp-block-excerpt`}>{post.excerpt_full}</div> : renderExcerpt(post.excerpt, excerptLimit)
                      )}
                      {readMore &&
                        renderReadmore(readMoreText, readMoreIcon)
                      }
                      {metaShow && (metaPosition == 'bottom') &&
                        renderMeta(meta, post, metaSeparator, metaStyle)
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
          }))}
        </div>
        : (<Placeholder label={__('No Posts found')}><Spinner /></Placeholder>)
        : (<Placeholder label={__('Loading...')}> <Spinner /></Placeholder>)
        : (<Placeholder label={__('Posts are not available')} ><div style={{ marginBottom: 15 }}>{__('Make sure Add Post.')}</div></Placeholder>)
    )
  }

  render() {
    const { setAttributes, name, attributes, clientId } = this.props
    const store = { setAttributes, name, attributes, setSection: this.setSection, section: this.state.section, clientId }
    const { blockId, advanceId, titleShow, showImage, readMore, excerptShow, catShow, metaShow, paginationShow, paginationAjax, headingText, headingStyle, headingShow, headingAlign, headingURL, filterShow, filterType, filterText, filterCat, filterTag, paginationType, navPosition, headingBtnText, paginationNav, subHeadingShow, subHeadingText, loadMoreText } = this.props.attributes;
    if (blockId) { CssGenerator(this.props.attributes, 'post-grid-2', blockId); }
    return (
      <Fragment>
        <InspectorControls>
          <Sections>
            <Section slug="design" title={__('Design')}>
              <Design store={store} initialOpen={true} />
            </Section>
            <Section slug="setting" title={__('Setting')}>
              <GeneralContent store={store} exclude={['itemView', 'slidesToShow', 'slideSpeed', 'customgrid', 'columnGap', 'rowGap', 'autoPlay', 'dots', 'arrows', 'queryNumber']}
                include={[
                  { position: 2, data: { type: 'range', key: 'overlayHeight', min: 0, max: 700, step: 1, unit: true, responsive: true, label: 'Height' } },
                ]} />
              <QueryContent store={store} />
              {headingShow && <HeadingContent store={store} />}
              {titleShow && <TitleStyle store={store} />}
              {metaShow && <MetaStyle store={store} exclude={['metaListSmall']} />}
              {catShow && <CategoryStyle store={store} />}
              {showImage && <ImageStyle store={store} exclude={['imgWidth', 'imgHeight', 'imgMargin', 'imgCropSmall', 'imgCrop']} />}
              <OverlayStyle store={store} include={titleAnimationArg} exclude={['overlaySmallHeight']} />
              {filterShow && <FilterContent store={store} />}
              {paginationShow && <PaginationContent store={store} />}
              {excerptShow && <ExcerptStyle store={store} />}
              {readMore && <ReadMoreStyle store={store} />}
            </Section>
            <Section slug="advanced" title={__('Advanced')}>
              <GeneralAdvanced initialOpen={true} store={store}
                include={[
                  { position: 2, data: { type: 'color', key: 'loadingColor', label: 'Loading Color', pro: true, customClass: 'ultp-pro-field' } },
                ]}
              />
              <CustomCssAdvanced store={store} />
            </Section>
          </Sections>
        </InspectorControls>

        <div {...(advanceId && { id: advanceId })} className={`ultp-block-${blockId} ${this.props.className}`}>
          <div className={`ultp-block-wrapper`}>
            {(headingShow || filterShow || paginationShow) &&
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
                  {(filterShow || paginationShow) &&
                    <div className={`ultp-filter-navigation`}>
                      {filterShow &&
                        renderFilter(filterText, filterType, filterCat, filterTag)
                      }
                      {paginationShow && (paginationType == 'navigation') && (navPosition == 'topRight') &&
                        renderNavigation()
                      }
                    </div>
                  }
                </div>
              </div>
            }
            {this.renderContent()}
            {paginationShow && (paginationType == 'loadMore') &&
              renderLoadmore(loadMoreText)
            }
            {paginationShow && (paginationType == 'navigation') && (navPosition != 'topRight') &&
              renderNavigation()
            }
            {(paginationShow && paginationType == 'pagination') &&
              renderPagination(paginationNav, paginationAjax)
            }
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Edit
