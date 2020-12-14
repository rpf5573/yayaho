const { __ } = wp.i18n
const { addQueryArgs } = wp.url
const { InspectorControls, RichText } = wp.blockEditor
const { Component, Fragment } = wp.element
const { Spinner, Placeholder } = wp.components
import { CssGenerator } from '../../helper/CssGenerator'
import { renderTitle, renderReadmore, renderCategory, renderMeta, renderExcerpt, isReload, attrBuild, renderFilter, renderNavigation, renderPagination, renderLoadmore, ExcerptStyle, QueryContent, CategoryStyle, SeparatorStyle, GeneralAdvanced, CustomCssAdvanced, PaginationContent, TitleStyle, ImageStyle, WrapStyle, Design, HeadingContent, FilterContent, GeneralContent, ReadMoreStyle, MetaStyle, CounterStyle, Layout } from '../../helper/CommonPanel'
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
    const { readMoreIcon, imgCrop, imgCropSmall, excerptLimit, showFullExcerpt, showSmallMeta, metaStyle, metaShow, catShow, showImage, metaSeparator, titleShow, catStyle, catPosition, titlePosition, excerptShow, imgAnimation, imgOverlayType, imgOverlay, metaList, metaListSmall, showSmallCat, readMore, readMoreText, showSmallBtn, showSmallExcerpt, varticalAlign, imgFlip, metaPosition, layout, customCatColor, onlyCatColor } = this.props.attributes;

    return (
      !error ? !loading ? postsList.length > 0 ?
        <div className={`ultp-block-items-wrap ultp-block-content-${varticalAlign} ultp-block-content-${imgFlip} ultp-${layout}`}>
          {(postsList.map((post, idx) => {
            const meta = idx == 0 ? JSON.parse(metaList) : JSON.parse(metaListSmall)
            const category = renderCategory(post, catShow, catStyle, catPosition, customCatColor, onlyCatColor)
            return (
              <div key={idx} id={'post-id-' + post.ID} className={`ultp-block-item ultp-block-media`}>
                <div className={`ultp-block-content-wrap ${(idx === 0) ? 'ultp-first-postlist-2' : 'ultp-all-postlist-2'}`}>
                  {post.image && showImage &&
                    <div className={`ultp-block-image ultp-block-image-${imgAnimation} ${(imgOverlay === true) ? 'ultp-block-image-overlay ultp-block-image-' + imgOverlayType + ' ' + 'ultp-block-image-' + imgOverlayType + idx : ''}`}>
                      {(idx == 0) ?
                        <a><img loading="lazy" alt={post.title || ''} src={post.image[imgCrop]} /></a>
                        :
                        ((layout === 'layout1') || (layout === 'layout4')) && <a><img loading="lazy" alt={post.title || ''} src={post.image[imgCropSmall]} /></a>
                      }
                      {(idx == 0 || showSmallCat) && (catPosition != 'aboveTitle') && <div className={`ultp-category-img-grid`}>{category}</div>}
                    </div>
                  }
                  <div className={`ultp-block-content`}>
                    {((catPosition == 'aboveTitle') && (idx == 0 || showSmallCat)) && category}
                    {post.title && titleShow && (titlePosition == true) &&
                      renderTitle(post.title)
                    }
                    {(idx == 0 || showSmallMeta) && metaShow && (metaPosition == 'top') &&
                      renderMeta(meta, post, metaSeparator, metaStyle)
                    }
                    {post.title && titleShow && (titlePosition == false) &&
                      renderTitle(post.title)
                    }
                    {(idx == 0 || showSmallExcerpt) && excerptShow && (
                      showFullExcerpt ? <div className={`ultp-block-excerpt`}>{post.excerpt_full}</div> : renderExcerpt(post.excerpt, excerptLimit)
                    )
                    }
                    {(idx == 0 || showSmallBtn) && readMore &&
                      renderReadmore(readMoreText, readMoreIcon)
                    }
                    {(idx == 0 || showSmallMeta) && metaShow && (metaPosition == 'bottom') &&
                      renderMeta(meta, post, metaSeparator, metaStyle)
                    }
                  </div>
                </div>
              </div>
            )
          }))}
          <span className={`ultp-loadmore-insert-before`}></span>
        </div>
        : (<Placeholder label={__('No Posts found')}><Spinner /></Placeholder>)
        : (<Placeholder label={__('Loading...')}> <Spinner /></Placeholder>)
        : (<Placeholder label={__('Posts are not available')} ><div style={{ marginBottom: 15 }}>{__('Make sure Add Post.')}</div></Placeholder>)
    )
  }

  render() {
    const { setAttributes, name, attributes, clientId } = this.props
    const store = { setAttributes, name, attributes, setSection: this.setSection, section: this.state.section, clientId }
    const { blockId, advanceId, titleShow, readMore, excerptShow, catShow, metaShow, showImage, paginationShow, paginationAjax, headingText, headingStyle, headingShow, headingAlign, headingURL, filterShow, filterType, filterText, filterCat, filterTag, paginationType, navPosition, headingBtnText, paginationNav, subHeadingShow, subHeadingText, loadMoreText, layout } = this.props.attributes;
    if (blockId) { CssGenerator(this.props.attributes, 'post-list-2', blockId); }
    return (
      <Fragment>
        <InspectorControls>
          <Sections>
            <Section slug="design" title={__('Design')}>
              <Layout
                store={store} initialOpen={true}
                data={[{
                  type: 'layout', block: 'post-list-2', key: 'layout', pro: true, options: [
                    { icon: icons.pl2layout1, label: __('Layout 1'), value: 'layout1', pro: false },
                    { icon: icons.pl2layout2, label: __('Layout 2'), value: 'layout2', pro: true },
                    { icon: icons.pl2layout3, label: __('Layout 3'), value: 'layout3', pro: true },
                    { icon: icons.pl2layout4, label: __('Layout 4'), value: 'layout4', pro: true },
                  ]
                }]} />
              <Design store={store} initialOpen={true} />
            </Section>
            <Section slug="setting" title={__('Setting')}>
              <GeneralContent store={store}
                exclude={['contentAlign', 'itemView', 'slidesToShow', 'slideSpeed', 'customgrid', 'columns', 'columnGap', 'columnGridGap', 'rowGap', 'autoPlay', 'dots', 'arrows', 'queryNumber']}
                include={[
                  { data: { type: 'toggle', key: 'imgFlip', label: 'Image Flip' } },
                  { data: { type: 'select', key: 'varticalAlign', label: 'Vertical Align', options: [{ value: 'top', label: 'Top' }, { value: 'middle', label: 'Middle' }, { value: 'bottom', label: 'Bottom' }] } },
                  { data: { type: 'toggle', key: 'showSmallExcerpt', label: 'Small Item Excerpt' } },
                  { data: { type: 'toggle', key: 'showSmallBtn', label: 'Small Item Button' } },
                  { data: { type: 'toggle', key: 'showSmallMeta', label: 'Small Item Meta' } },
                  { data: { type: 'toggle', key: 'showSmallCat', label: 'Small Item Category' } }]} />
              <QueryContent store={store} />
              {headingShow && <HeadingContent store={store} />}
              {titleShow && <TitleStyle store={store} include={[
                { position: 2, data: { type: 'typography', key: 'titleLgTypo', label: 'Typography Large Item' } },
                { position: 7, data: { type: 'dimension', key: 'titleLgPadding', label: 'Padding Large Item', step: 1, unit: true, responsive: true } },
              ]} />}
              {metaShow && <MetaStyle store={store} />}
              {catShow && <CategoryStyle store={store} />}
              {showImage && <ImageStyle store={store} exclude={['imgMargin']}
                include={[
                  { position: 3, data: { type: 'range', key: 'imgSpacing', label: 'Img Spacing', min: 0, max: 100, step: 1, responsive: true } },
                  { position: 4, data: { type: 'range', key: 'largeimgSpacing', label: 'Large Img Spacing', min: 0, max: 100, step: 1, responsive: true } },
                  { position: 7, data: { type: 'range', key: 'largeHeight', min: 0, max: 800, step: 1, unit: true, responsive: true, label: 'Large Height' } },
                  { position: 5, data: { type: 'range', key: 'spaceLargeItem', min: 0, max: 100, step: 1, unit: true, responsive: true, label: 'Large Item Space' } },
                ]} />
              }
              {<WrapStyle store={store} exclude={['contenWraptWidth', 'contenWraptHeight']} />}
              {((layout === 'layout3') || (layout === 'layout4')) && <CounterStyle store={store} />}
              {filterShow && <FilterContent store={store} />}
              {paginationShow && <PaginationContent store={store} />}
              {readMore && <ReadMoreStyle store={store} />}
              {excerptShow && <ExcerptStyle store={store} />}
              <SeparatorStyle store={store} />
            </Section>
            <Section slug="advanced" title={__('Advanced')}>
              <GeneralAdvanced initialOpen={true} store={store}
                include={[
                  { position: 2, data: { type: 'color', key: 'loadingColor', label: 'Loading Color' } },
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
