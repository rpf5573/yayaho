const { __ } = wp.i18n
const { InspectorControls, RichText, MediaUpload } = wp.blockEditor
const { Component, Fragment } = wp.element
const { TextControl, PanelBody, SelectControl } = wp.components
import { CssGenerator } from '../../helper/CssGenerator'
import { ImageStyle, ButtonStyle, GeneralAdvanced, CustomCssAdvanced } from '../../helper/CommonPanel'
import {Sections, Section} from '../../helper/Sections'
const { RadioImage,Alignment,Dimension,Toggle,Typography,Color,Media} = wp.ultp


class Edit extends Component {
    constructor() {
        super( ...arguments );
        this.state = { postsList: [], loading: true, error: false, section: 'Content' };
        this.setSection = this.setSection.bind(this);
        this.state = { device: 'md'};
    }

    setSection(title){
        const val = this.state.section == title ? '' : title
        this.setState({section: val})
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

    render() {
        const {setAttributes, name, attributes, clientId} = this.props
        const { device } = this.state
        const store = {setAttributes, name, attributes, setSection: this.setSection, section: this.state.section, clientId } 
        const {blockId, advanceId, headingText, imageUpload, imgLink, imgAlt, imgOverlay, imgOverlayType, imgAnimation, headingColor, headingTypo, headingEnable, headingMargin, linkTarget, alignment, buttonEnable, btnLink, btnText, btnTarget, btnPosition, linkType } = this.props.attributes;
        if (blockId) { CssGenerator(this.props.attributes, 'image', blockId); }
        return (
            <Fragment>
                <InspectorControls>
                <Sections>
                    <Section slug="setting" title={__('Setting')}>
                    <PanelBody title={__('Image')}>
                        <Media label={__('Upload Image')} multiple={false} type={['image']} panel={true} value={ imageUpload } onChange={ (val) => setAttributes({imageUpload: val} )} />
                        <TextControl label={__('Image Alt Text')} value={imgAlt} onChange={val => setAttributes({ imgAlt: val })} />
                        <RadioImage 
                            label={__('Link Type')} 
                            isText = {true}
                            options={[
                                { label: __('Link'), value: 'link' },
                                { label: __('Button'), value: 'button' }
                            ]}
                            value={linkType} onChange={val => setAttributes({ linkType: val })} 
                            />
                        
                        { (linkType == 'link') &&
                            <Fragment>
                                <TextControl label={__('Link')} value={imgLink} onChange={val => setAttributes({ imgLink: val })} />
                                <SelectControl
                                    label={__('Link Target')}
                                    value={linkTarget || ''}
                                    options={[
                                        { label: __('Self'), value: '_self' },
                                        { label: __('Blank'), value: '_blank' }
                                    ]}
                                    onChange={val => setAttributes({ linkTarget: val })}
                                />
                            </Fragment>
                        }
                        { (linkType == 'button') &&
                            <Fragment>
                                <TextControl label={__('Button Text')} value={btnText} onChange={val => setAttributes({ btnText: val })} />
                                <TextControl label={__('Button Link')} value={btnLink} onChange={val => setAttributes({ btnLink: val })} />
                                <SelectControl
                                    label={__('Button Link Target')}
                                    value={btnTarget || ''}
                                    options={[
                                        { label: __('Self'), value: '_self' },
                                        { label: __('Blank'), value: '_blank' }
                                    ]}
                                    onChange={val => setAttributes({ btnTarget: val })}
                                />
                                <SelectControl
                                    label={__('Button Position')}
                                    value={btnPosition || ''}
                                    options={[
                                        { label: __('Left Top'), value: 'leftTop' },
                                        { label: __('Right Top'), value: 'rightTop' },
                                        { label: __('Center Center'), value: 'centerCenter' },
                                        { label: __('Bottom Left'), value: 'bottomLeft' },
                                        { label: __('Bottom Right'), value: 'bottomRight' },
                                    ]}
                                    onChange={val => setAttributes({ btnPosition: val })}
                                />
                            </Fragment>
                        }
                        <Toggle label={__('Caption Enable')} value={headingEnable} onChange={val => setAttributes({ headingEnable: val })} />
                    </PanelBody>
                    </Section>    
                    <Section slug="style" title={__('Style')}>
                        <ImageStyle store={store} exclude={['imgCropSmall','imgCrop']} include={[{ position: 1, data:{ type:'alignment',key:'imgAlignment', label:'Image Align', responsive:true, disableJustify:true } }]} />
                        {   headingEnable &&
                            <PanelBody title={__('Caption')}>
                                <Alignment label={__('Alignment')} value={alignment} onChange={val => setAttributes({ alignment: val })}  disableJustify responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Color label={__('Caption Color')} value={headingColor} onChange={val => setAttributes({ headingColor: val })} />
                                <Typography label={__('Caption Typography')} value={headingTypo} onChange={val => setAttributes({ headingTypo: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Dimension label={__('Caption Margin')} value={headingMargin}  onChange={val => setAttributes({ headingMargin: val })}
                                    min={0}
                                    max={100}
                                    unit={['px', 'em', '%']}
                                    responsive
                                    device={this.state.device}
                                    onDeviceChange={value => this.setState({ device: value })}
                                    clientId={this.props.clientId}
                                />                          
                            </PanelBody>
                        }
                        {  (linkType =='button') &&
                            <ButtonStyle store={store}/>
                        }
                    </Section>
                    <Section slug="advanced" title={__('Advanced')}>
                        <GeneralAdvanced store={store}/>
                        <CustomCssAdvanced store={store}/>
                    </Section>
                </Sections>
                </InspectorControls>
                <div {...(advanceId && {id:advanceId})} className={`ultp-block-${blockId} ${this.props.className}`}>
                    <div className={`ultp-block-wrapper`}>
                        <figure className={`ultp-image-block-wrapper`}>
                            <div className={`ultp-image-block ultp-image-block-${imgAnimation} ${ (imgOverlay === true) ?  'ultp-image-block-overlay ultp-image-block-'+imgOverlayType : '' }`}>
                                {/* <MediaUpload
                                    onSelect={ val => setAttributes({imageUpload:{url: val.url, id: val.id}}) }
                                    allowedTypes={ ['image'] }
                                    multiple={ false }
                                    value={ imageUpload }
                                    render={({ open }) => (
                                        <Fragment>
                                            { imageUpload['url'] ?
                                                (imgLink ? 
                                                    <a><img loading="lazy" onClick={open} className={`ultp-image`} src={imageUpload['url']} alt={imgAlt ? imgAlt : 'Image'} /></a>
                                                    :
                                                    <img loading="lazy" onClick={open} className={`ultp-image`} src={imageUpload['url']} alt={imgAlt ? imgAlt : 'Image'}/>
                                                )
                                                :
                                                (
                                                    <div className="ultp-imag-empty"><span onClick={open}><span>Upload</span></span></div>
                                                )
                                            }
                                            { imageUpload['url'] &&
                                                <span className="ultp-image-close-icon dashicons dashicons-no-alt" onClick={ () => setAttributes({imageUpload:{}}) }></span>
                                            }
                                        </Fragment>
                                    )} /> */}

                                    { imageUpload['url'] &&
                                        ( ( (linkType == 'link') && imgLink ) ? 
                                            <a><img loading="lazy" className={`ultp-image`} src={imageUpload['url']} alt={imgAlt ? imgAlt : 'Image'} /></a>
                                            :
                                            <img loading="lazy" className={`ultp-image`} src={imageUpload['url']} alt={imgAlt ? imgAlt : 'Image'}/>
                                        )
                                    }

                                { (linkType == 'button') && btnLink &&
                                    <div className={`ultp-image-button ultp-image-button-${btnPosition}`} ><a href={btnLink}>{btnText}</a></div>
                                }
                            </div>
                            { headingEnable && headingText && 
                                <RichText
                                    key="editable"
                                    tagName={'figcaption'}
                                    className={`ultp-image-caption`}
                                    keepPlaceholderOnFocus
                                    placeholder={__('Add Text...')}
                                    onChange={value => setAttributes({ headingText: value })}
                                    value={headingText} 
                                />
                            }
                        </figure>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Edit
