const { __ } = wp.i18n
const { addQueryArgs } = wp.url
const { InspectorControls, RichText } = wp.blockEditor
const { Component, Fragment } = wp.element
const { Spinner,Placeholder } = wp.components
import Slider from "react-slick";
import { CssGenerator } from '../../helper/CssGenerator'
import { renderReadmore, renderTitle, renderCategory, renderMeta, SliderSetting, attrBuild, renderExcerpt, isReload, GeneralContent, QueryContent, ArrowContent, DotStyle, WrapStyle, ImageStyle, GeneralAdvanced, CustomCssAdvanced, ReadMoreStyle, TitleStyle, MetaStyle, CategoryStyle, ExcerptStyle, HeadingContent, Design } from '../../helper/CommonPanel'
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
        const { imgCrop, readMoreIcon, arrowStyle, arrows, fade, dots, slideSpeed, autoPlay, readMore, readMoreText, excerptLimit, metaStyle, catShow, metaSeparator, titleShow, catStyle, catPosition, titlePosition, excerptShow , metaList, metaShow, headingShow, headingStyle, headingAlign, headingURL, headingText, headingBtnText, subHeadingShow, subHeadingText, metaPosition, imgOverlay, imgOverlayType, contentVerticalPosition, contentHorizontalPosition, showFullExcerpt, customCatColor, onlyCatColor } = this.props.attributes;
        
        const NextArrow = (props) => {
            const { className, onClick } = props;
            const data = arrowStyle.split('#')
            return <div className={className} onClick={onClick}>{icons[data[1]]}</div>;
        }
        
        const PrevArrow = (props) => {
            const { className, onClick } = props;
            const data = arrowStyle.split('#')
            return <div className={className} onClick={onClick}>{icons[data[0]]}</div>
        }

        const settings = SliderSetting({arrows: arrows, dots: dots, autoplay: autoPlay, fade: fade, autoplaySpeed: slideSpeed, nextArrow: <NextArrow />,prevArrow: <PrevArrow /> })

        return(
            !error ? !loading ? postsList.length > 0 ?
                <div className={ `ultp-block-items-wrap` }>
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
                    <Slider { ...settings }>
                    {( postsList.map( (post, idx) => {
                        const meta          = JSON.parse(metaList)
                        const category      = renderCategory(post, catShow, catStyle, catPosition, customCatColor, onlyCatColor)
                        return (
                            <div key={idx} id={'post-id-'+post.ID} className={`ultp-block-item`}>
                                <div className={`ultp-block-slider-wrap`}>
                                    <div className={`ultp-block-image-inner`}>
                                        { post.image &&
                                        <div className={`ultp-block-image ${ (imgOverlay === true) ?  'ultp-block-image-overlay ultp-block-image-'+imgOverlayType + ' ' + 'ultp-block-image-'+imgOverlayType + idx : '' }`}>
                                            <a><img loading="lazy" alt={post.title||''} src={post.image[imgCrop]}/></a>
                                        </div>
                                        }
                                    </div>    
                                    <div className={`ultp-block-content ultp-block-content-${contentVerticalPosition} ultp-block-content-${contentHorizontalPosition}`}>
                                        <div className={`ultp-block-content-inner`}>
                                            { category }
                                            { post.title && titleShow && (titlePosition==true) &&
                                                renderTitle(post.title)
                                            }
                                            { metaShow && (metaPosition == 'top') &&
                                                renderMeta(meta, post, metaSeparator, metaStyle)
                                            }
                                            { post.title && titleShow && (titlePosition==false) &&
                                                renderTitle(post.title)
                                            }
                                            { excerptShow  &&
                                                (
                                                    showFullExcerpt ? <div className={`ultp-block-excerpt`}>{post.excerpt_full}</div>  : renderExcerpt(post.excerpt , excerptLimit)
                                                )
                                            }
                                            { readMore &&
                                                renderReadmore(readMoreText, readMoreIcon)
                                            }
                                            { metaShow && (metaPosition == 'bottom') &&
                                                renderMeta(meta, post, metaSeparator, metaStyle)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                     }))}
                     </Slider>
                </div>
                :( <Placeholder label={ __( 'No Posts found' ) }><Spinner/></Placeholder> )
                :( <Placeholder label={ __( 'Loading...' ) }> <Spinner/></Placeholder> )
                :( <Placeholder label={ __( 'Posts are not available' ) } ><div style={ { marginBottom: 15 } }>{__('Make sure Add Post.')}</div></Placeholder> )
        )
    }

    render() {
        const {setAttributes, name, attributes, clientId} = this.props
        const store = {setAttributes, name, attributes, setSection: this.setSection, section: this.state.section, clientId}
        const {blockId, advanceId, titleShow, excerptShow, catShow, metaShow, readMore, arrows, dots, headingShow, showImage } = this.props.attributes;
        if (blockId) { CssGenerator(this.props.attributes, 'post-slider-1', blockId); }
        return (
            <Fragment>
                <InspectorControls>
                    <Sections>
                        <Section slug="design" title={__('Design')}>
                            <Design store={store} initialOpen={true}/>
                        </Section>
                        <Section slug="setting" title={__('Setting')}>
                            <GeneralContent store={store} include={[{position: 0, data:{ type:'toggle',key:'fade',label:'Animation Fade' }}, { position: 3, data:{ type:'range',key:'height', label:'Height',min:0, max:1000, step:1, responsive:true } }]}  exclude={['itemView','slidesToShow','customgrid','columns','columnGap','columnGridGap','rowGap','separatorShow','paginationShow','filterShow']} />
                            <QueryContent store={store}/>
                            { arrows && <ArrowContent store={store} /> }
                            { headingShow  && <HeadingContent store={store}/> }
                            { <WrapStyle store={store} exclude={['contentWrapInnerPadding']} exclude={['imgMargin']} include={[ { position: 0, data:{ type:'tag',key:'contentVerticalPosition', label:'Vertical Position', disabled:true, options:[ {value:'topPosition',label:'Top'}, {value:'middlePosition',label:'Middle'}, {value:'bottomPosition',label:'Bottom'}]}}, { position: 1, data:{ type:'tag',key:'contentHorizontalPosition', label:'Horizontal Position', disabled:true, options:[ {value:'leftPosition',label:'Left'}, {value:'centerPosition',label:'Center'}, {value:'rightPosition',label:'Right'}]}}  ]} /> }
                            { showImage && <ImageStyle store={store} exclude={['imgWidth','imgHeight','imgMargin','imgSeparator','imgCropSmall','imgAnimation']} /> }
                            { dots && <DotStyle store={store} /> }
                            { readMore && <ReadMoreStyle store={store} /> }
                            { titleShow && <TitleStyle store={store} /> }
                            { metaShow && <MetaStyle store={store} exclude={['metaListSmall']}/> }
                            { catShow && <CategoryStyle store={store} exclude={['catPosition']}/> }
                            { excerptShow && <ExcerptStyle store={store} /> }
                        </Section>
                        <Section slug="advanced" title={__('Advanced')}>
                            <GeneralAdvanced initialOpen={true} store={store}/>
                            <CustomCssAdvanced store={store}/>
                        </Section>
                    </Sections>
                </InspectorControls>
                
                <div {...(advanceId && {id:advanceId})} className={`ultp-block-${blockId} ${this.props.className}`}>
                    <div className={`ultp-block-wrapper`}>
                        { this.renderContent() }
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Edit
