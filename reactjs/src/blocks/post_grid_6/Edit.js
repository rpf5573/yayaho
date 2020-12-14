const { __ } = wp.i18n
const { addQueryArgs } = wp.url
const { InspectorControls, RichText } = wp.blockEditor
const { Component, Fragment } = wp.element
const { Spinner,Placeholder } = wp.components
import { CssGenerator } from '../../helper/CssGenerator'
import { renderTitle, renderReadmore, renderMeta, renderCategory, renderExcerpt, isReload, attrBuild, renderFilter, renderNavigation, GeneralContent, QueryContent, PaginationContent, FilterContent, HeadingContent, OverlayStyle, ImageStyle, ReadMoreStyle, TitleStyle, CategoryStyle, ExcerptStyle, GeneralAdvanced, CustomCssAdvanced, Design, MetaStyle, titleAnimationArg, Layout } from '../../helper/CommonPanel'
import icons from '../../helper/icons'
import {Sections, Section} from '../../helper/Sections'

class Edit extends Component {
    constructor() {
        super( ...arguments );
        this.state = { postsList: [], loading: true, error: false, section: 'Content' };
        this.setSection = this.setSection.bind(this);
    }

    setSection(title){
        const val = this.state.section == title ? '' : title
        this.setState({section: val})
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

    componentDidUpdate( prevProps ) {
        const { attributes } = this.props;
        if (isReload(prevProps.attributes, attributes)) {
            this.fetchProducts();
        }
    }

    fetchProducts() {
        const self = this;
        const query = addQueryArgs( '/ultp/posts', attrBuild(this.props.attributes) );
        if (this.state.error) {
            this.setState( { error: false } );
        }
        if (!self.state.loading) {
            self.setState( { loading: true } );
        }
        wp.apiFetch( { path: query } ).then( (obj) => {
            self.setState({postsList: obj, loading: false })
        }).catch( (error) => {
            self.setState({loading: false, error: true })
        })
    }
    
    renderContent(){
        const { postsList, loading, error } = this.state;
        const { excerptLimit, metaStyle, metaShow, showSmallMeta, catShow, showImage, metaSeparator, titleShow, catStyle, catPosition, titlePosition, excerptShow , imgAnimation, imgOverlayType, imgOverlay, metaList, metaListSmall, showSmallCat, readMore, readMoreText, readMoreIcon, overlayContentPosition, showSmallBtn, showSmallExcerpt, metaPosition, showFullExcerpt, layout, columnFlip, titleAnimation, customCatColor, onlyCatColor } = this.props.attributes;
        return(
            !error ? !loading ? postsList.length > 0 ?
                <div className={ `ultp-block-items-wrap ultp-block-row ultp-${layout} ultp-block-content-${columnFlip}` }>
                    {( postsList.map( (post, idx) => {
                        const meta = idx == 0 ? JSON.parse(metaList) : JSON.parse(metaListSmall)
                        const category = renderCategory(post, catShow, catStyle, catPosition, customCatColor, onlyCatColor)
                        return (
                            <div key={idx} id={'post-id-'+post.ID} className={`ultp-block-item ultp-block-item-${idx} ${titleAnimation ? 'ultp-animation-'+titleAnimation : '' }`}>
                                <div className={`ultp-block-content-wrap ultp-block-content-overlay`}>
                                    { (post.image && showImage) ? (
                                        <div className={`ultp-block-image ultp-block-image-${imgAnimation} ${ (imgOverlay === true) ?  'ultp-block-image-overlay ultp-block-image-'+imgOverlayType + ' ' + 'ultp-block-image-'+imgOverlayType + idx : '' }`}>
                                            <a><img loading="lazy" alt={post.title||''} src={post.image['full']}/></a>    
                                            {(idx == 0 || showSmallCat) && (catPosition!='aboveTitle') && <div className={`ultp-category-img-grid`}>{category}</div>}
                                        </div>
                                    ) : (
                                        <div className={`ultp-block-image ultp-block-empty-image`}></div>
                                    )
                                    }
                                    <div className={`ultp-block-content ultp-block-content-${overlayContentPosition}`}>
                                        <div className={`ultp-block-content-inner`}>
                                            { ((catPosition == 'aboveTitle') && (idx == 0 || showSmallCat) ) &&  category }
                                            { post.title && titleShow && (titlePosition==true) &&
                                                renderTitle(post.title)
                                            }
                                            { (idx == 0 || showSmallMeta) && metaShow && (metaPosition == 'top') &&
                                                renderMeta(meta, post, metaSeparator, metaStyle)
                                            }
                                            { post.title && titleShow && (titlePosition==false) &&
                                                renderTitle(post.title)
                                            }
                                            { (idx == 0 || showSmallExcerpt) && excerptShow && 
                                                (
                                                    showFullExcerpt ? <div className={`ultp-block-excerpt`}>{post.excerpt_full}</div>  : renderExcerpt(post.excerpt , excerptLimit)
                                                )
                                            }
                                            { (idx == 0 || showSmallBtn) && readMore &&
                                                renderReadmore(readMoreText, readMoreIcon)
                                            }
                                            { (idx == 0 || showSmallMeta) && metaShow && (metaPosition == 'bottom') &&
                                                renderMeta(meta, post, metaSeparator, metaStyle)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                     }))}
                     <span className={`ultp-loadmore-insert-before`}></span>
                </div>
                :( <Placeholder label={ __( 'No Posts found' ) }><Spinner/></Placeholder> )
                :( <Placeholder label={ __( 'Loading...' ) }> <Spinner/></Placeholder> )
                :( <Placeholder label={ __( 'Posts are not available' ) } ><div style={ { marginBottom: 15 } }>{__('Make sure Add Post.')}</div></Placeholder> )
        )
    }

    render() {
        const {setAttributes, name, attributes, clientId} = this.props
        const store = {setAttributes, name, attributes, setSection: this.setSection, section: this.state.section, clientId}
        const {blockId, advanceId, titleShow, readMore, excerptShow, catShow, metaShow, paginationShow, paginationAjax, headingText, headingStyle, headingShow, headingAlign, headingURL, filterShow, filterType, filterText, filterCat, filterTag, paginationType, navPosition, headingBtnText, paginationNav, subHeadingShow, subHeadingText, layout } = this.props.attributes;
        if (blockId) { CssGenerator(this.props.attributes, 'post-grid-6', blockId); }
        return (
            <Fragment>
                <InspectorControls>
                    <Sections>
                        <Section slug="design" title={__('Design')}>
                            <Layout 
                                store={store} initialOpen={true}
                                data={[{ type:'layout', block:'post-grid-6', key:'layout', pro: true, options: [
                                    { icon: icons.pg6layout1, label: __('Layout 1'), value: 'layout1', pro: false },
                                    { icon: icons.pg6layout2, label: __('Layout 2'), value: 'layout2', pro: true },
                                ]}]}/>
                            <Design store={store} initialOpen={true}/>
                        </Section>
                        <Section slug="setting" title={__('Setting')}>
                            <GeneralContent store={store} 
                                exclude={['itemView','slidesToShow','slideSpeed','customgrid','columnGap','columnGridGap','columns','rowGap','autoPlay','dots','arrows','queryNumber','separatorShow','showImage']}
                                include={[
                                    { position: 0, data:{ type:'range',key:'overlayHeight', min:0, max:800, step:1, unit:true, responsive:true, label:'Height', pro: true, customClass: 'ultp-pro-field' } },
                                    { position: 1, data:{ type:'range',key:'columnGridGap',min:0, max:120, step:1, responsive:true, unit:['px','em'], label:'Gap', pro: true, customClass: 'ultp-pro-field' }},
                                    { data:{ type:'toggle',key:'columnFlip', label:'Flip', pro: true, customClass: 'ultp-pro-field' } }, 
                                    { data:{ type:'toggle',key:'showSmallExcerpt', label:'Excerpt Small Item' } }, 
                                    { data:{ type:'toggle',key:'showSmallBtn', label:'Button Small Item' }}, 
                                    { data:{ type:'toggle',key:'showSmallMeta', label:'Meta Small Item' }}, 
                                    { data:{ type:'toggle',key:'showSmallCat', label:'Category Small List', pro: true, customClass: 'ultp-pro-field' } }]} />
                            <QueryContent store={store} exclude={['queryNumber']}/>
                            { headingShow  && <HeadingContent store={store}/> }
                            { titleShow && <TitleStyle store={store} include={[{ position: 2, data:{ type:'typography',key:'titleLgTypo', label:'Typography Large Title' } }]} /> }
                            { metaShow && <MetaStyle pro={true} store={store} /> }
                            { catShow && <CategoryStyle pro={true} store={store}/> }
                            <ImageStyle store={store} exclude={['imgMargin','imgWidth','imgHeight','imgCropSmall','imgCrop']} />
                            <OverlayStyle store={store} include={titleAnimationArg}/>
                            { filterShow && <FilterContent pro={true} store={store}/> }
                            { paginationShow && <PaginationContent pro={true} store={store} include={[{ position: 1, data:{ type:'select',key:'paginationType', label:'Pagination Type', options:[{value:'none',label:'None'},{value:'navigation',label:'Navigation'}] } }]} exclude={['paginationType','paginationAjax','loadMoreText']}/> }
                            { excerptShow && <ExcerptStyle store={store} /> }
                            { readMore && <ReadMoreStyle store={store} /> }
                        </Section>
                        <Section slug="advanced" title={__('Advanced')}>
                            <GeneralAdvanced initialOpen={true} store={store}
                            include={[
                                { position: 2, data:{ type:'color',key:'loadingColor', label:'Loading Color' } },
                            ]}
                            />
                            <CustomCssAdvanced store={store}/>
                        </Section>
                    </Sections>
                </InspectorControls>
                
                <div {...(advanceId && {id:advanceId})} className={`ultp-block-${blockId} ${this.props.className}`}>
                    <div className={`ultp-block-wrapper`}>
                        { (headingShow || filterShow || paginationShow ) &&
                            <div className={`ultp-heading-filter`}>
                                <div className={`ultp-heading-filter-in`}>
                                    { headingShow &&
                                        <div className={`ultp-heading-wrap ultp-heading-${headingStyle} ultp-heading-${headingAlign}`}>
                                            { headingURL ?
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
                                            { ( (headingStyle == 'style11') && headingURL ) &&
                                                <a className={`ultp-heading-btn`}>{ headingBtnText }{icons.rightAngle2}</a>
                                            }
                                            { subHeadingShow &&
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
                                    { (filterShow || paginationShow) &&
                                        <div className={`ultp-filter-navigation`}>
                                            { filterShow &&
                                                renderFilter(filterText, filterType, filterCat, filterTag)
                                            }
                                            { paginationShow && (paginationType == 'navigation') &&  (navPosition == 'topRight') &&
                                                renderNavigation()
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        { this.renderContent() }
                        { paginationShow && (paginationType == 'navigation') &&  (navPosition != 'topRight') &&
                            renderNavigation()
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Edit
