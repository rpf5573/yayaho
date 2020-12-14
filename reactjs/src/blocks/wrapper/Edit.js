const { __ } = wp.i18n
const { InspectorControls, InnerBlocks } = wp.blockEditor
const { Component, Fragment } = wp.element
import { CssGenerator } from '../../helper/CssGenerator'
import { GeneralAdvanced, CustomCssAdvanced } from '../../helper/CommonPanel'
import {Sections, Section} from '../../helper/Sections'

class Edit extends Component {
    constructor() {
        super( ...arguments );
        this.state = { postsList: [], loading: true, error: false, section: 'content' };
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
        const store = {setAttributes, name, attributes, setSection: this.setSection, section: this.state.section, clientId } 
        const {blockId, advanceId } = this.props.attributes;
        if (blockId) { CssGenerator(this.props.attributes, 'wrapper', blockId); }else{ this.componentDidMount() }
        
        return (
            <Fragment>
                <InspectorControls>
                <Sections>
                    <Section slug="setting" title={__('Style')}>
                        <GeneralAdvanced store={store}/>
                    </Section>    
                    <Section slug="advanced" title={__('Advanced')}>
                        <CustomCssAdvanced store={store}/>
                    </Section>
                </Sections>
                </InspectorControls>
                <div {...(advanceId && {id:advanceId})} className={`ultp-block-${blockId} ${this.props.className}`}>
                    <div className={`ultp-wrapper-block`}>
                        <InnerBlocks templateLock={false} />
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Edit
