const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor
class Save extends Component {
    render() {
        const { blockId, advanceId } = this.props.attributes
        return (
            <div {...(advanceId && {id:advanceId})} className={`ultp-block-${blockId}`}>
                <div className={`ultp-wrapper-block`}>
                    <InnerBlocks.Content />
                </div>
            </div>
        )
    }
}
export default Save