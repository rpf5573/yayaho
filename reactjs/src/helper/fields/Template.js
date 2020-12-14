const { Component } = wp.element

const designEndpoint = 'https://ultp.wpxpo.com/wp-json/restapi/v2/';

class Template extends Component {
    constructor() {
        super( ...arguments );
        this.state = { designList: [], error: false, reload: false, reloadId: '' };
    }

    componentWillMount(){
        const $that = this
        let blockName = this.props.store.name
        blockName = blockName.split('/')
        wp.apiFetch({
            path: '/ultp/v2/get_design',
            method: 'POST'
        })
        .then((response) => {
            if(response.success){
                const data = JSON.parse(response.data)
                $that.setState({ designList: data[blockName[1]] })
            }
        })
        .catch((error) => {
            console.error(error)
        })
    }

    _changeVal(designID, isPro){
        this.setState({reload: true, reloadId: designID})
        if(isPro){
            if(wp.ultp_pro){
                this._changeDesign(designID);
            }
        }else{
            this._changeDesign(designID);
        }
    }

    _changeDesign(designID){
        const { clientId, attributes } = this.props.store
        const { replaceBlock } = wp.data.dispatch('core/block-editor')
        const removeItem = ['queryNumber', 'queryType', 'queryTax', 'queryCat', 'queryTag', 'queryOrderBy', 'queryOrder', 'queryInclude', 'queryExclude', 'queryOffset', 'metaKey'];
        
        fetch(designEndpoint+'single-design', {
            method: 'POST',
            body: new URLSearchParams('license='+ultp_data.license+'&design_id='+designID)
        })
        .then(response => response.text())
        .then((jsonData) => {
            jsonData = JSON.parse(jsonData)
            if (jsonData.success && jsonData.rawData) {
                let parseData = wp.blocks.parse(jsonData.rawData)
                let attr = parseData[0].attributes
                for ( let i=0; i < removeItem.length; i++ ) {
                    if(attr[removeItem[i]]){ delete attr[removeItem[i]]; }
                }
                attr = Object.assign({}, attributes,  attr);
                parseData[0].attributes = attr;
                this.setState({error: false, reload: false, reloadId: '' });
                replaceBlock(clientId, parseData );
            }else{
                this.setState({error: true, reload: false, reloadId: '' });
            }
        })
        .catch((error) => {
            console.error(error)
        })
    }

    render() {
        const { label } = this.props.store
        const { designList, error, reload, reloadId } = this.state

        if(typeof designList === 'undefined' ) return null;

        return(
            <div className="ultp-field-wrap ultp-field-template">
                { label && 
                    <label>{label}</label>
                }
                <div className="ultp-sub-field-template">
                    { designList.map( (data) => {
                            return (
                                <div className={`ultp-field-template-item ${(data.pro && !wp.ultp_pro) ? 'ultp-field-premium':''}`}>
                                    <img loading="lazy" src={data.image} loading="lazy"/>
                                    {(data.pro && !wp.ultp_pro) &&
                                        <span className="ultp-field-premium-badge">Premium</span>
                                        // :
                                        // <span className="ultp-field-premium-badge">Free</span>
                                    }
                                    {(data.pro && !wp.ultp_pro) ?
                                        <div className="ultp-field-premium-lock">
                                            <a href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium" target="_blank">Go Pro</a>
                                        </div>
                                        :( (data.pro && error) ?
                                            <div className="ultp-field-premium-lock">
                                                <a href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium" target="_blank">Get License</a>
                                            </div>
                                            :
                                            <div className="ultp-field-premium-lock"><button className={'ultp-popup-btn'} onClick={()=>this._changeVal(data.ID, data.pro)}>
                                                Import{(reload && reloadId == data.ID) && <span class="dashicons dashicons-update rotate" />}</button></div>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Template