const { __ } = wp.i18n
const { InspectorControls, RichText } = wp.blockEditor
const { Component, Fragment } = wp.element
import { CssGenerator } from '../../helper/CssGenerator'
import { GeneralAdvanced, CustomCssAdvanced, HeadingContent, Design } from '../../helper/CommonPanel'
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
        const store = {setAttributes, name, attributes, setSection: this.setSection, section: this.state.section, clientId}  
        const {blockId, advanceId, headingText, headingStyle, headingAlign, headingURL, headingBtnText, subHeadingShow, subHeadingText } = this.props.attributes;
        if (blockId) { CssGenerator(this.props.attributes, 'post-grid-1', blockId); }
        return (
            <Fragment>
                <InspectorControls>
                    <Sections>
                        <Section slug="setting" title={__('Setting')}>
                            <HeadingContent store={store}/>
                        </Section>
                        <Section slug="advanced" title={__('Advanced')}>
                            <GeneralAdvanced initialOpen={true} store={store}/>
                            <CustomCssAdvanced store={store}/>
                        </Section>
                    </Sections>
                </InspectorControls>
                
                <div {...(advanceId && {id:advanceId})} className={`ultp-block-${blockId} ${this.props.className}`}>
                    <div className={`ultp-block-wrapper`}>
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
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Edit
