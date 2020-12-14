const { apiFetch } = wp
const { parse } = wp.blocks
const { Component, Fragment } = wp.element

const apiEndpoint = 'https://ultp.wpxpo.com/wp-json/restapi/v2/';

class Popup extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            isPopup: (props.isShow || false),
            templates: [],
            designs: [],
            reloadId: '',
            reload: false,
            isTemplate: true,
            error: false,
            templateFilter: 'all',
            designFilter: 'all',
            current: []
        }
    }
    
    fetchTemplates() {
        const $that = this
        wp.apiFetch({
            path: '/ultp/v2/get_all_templates',
            method: 'POST'
        })
        .then((response) => {
            if(response.success){
                const data = JSON.parse(response.data)
                $that.setState({templates: data.templates, designs: data.designs, current: data.templates})
            }
        })
        .catch((error) => {
            console.error(error)
        })
    }

    componentDidMount() {
        const that = this
        document.addEventListener('keydown', function(e) {
            if(e.keyCode === 27){
                document.querySelector( '.ultp-builder-modal' ).remove();
                that.setState({isPopup:false})
            }
        });
        this.fetchTemplates();
    }

    close(){
        document.querySelector( '.ultp-builder-modal' ).remove();
        this.setState({isPopup:false})
    }

    _changeVal(templateID, isPro){
        if(isPro){
            if(wp.ultp_pro){
                this.insertBlock(templateID);
            }
        }else{
            this.insertBlock(templateID);
        }
    }

    insertBlock(templateID) {
        this.setState({reload:true, reloadId:templateID})
        const $that = this
        fetch(apiEndpoint+'single-template', {
            method: 'POST',
            body: new URLSearchParams('license='+ultp_data.license+'&template_id='+templateID)
        })
        .then(response => response.text())
        .then((jsonData) => {
            jsonData = JSON.parse(jsonData)
            if (jsonData.success && jsonData.rawData) {
                wp.data.dispatch('core/block-editor').insertBlocks(parse(jsonData.rawData));
                $that.close();
                $that.setState({reload:false, reloadId:'', error: false})
            }else{
                $that.setState({error: true})
            }
        })
        .catch((error) => {
            console.error(error)
        })
    }

    _setData(type){
        const { templates, designs, isTemplate } = this.state
        if(type == 'all' || type == 'free' || type == 'pro'){
            let data = [];
            const filterTxt = isTemplate ? 'templateFilter' : 'designFilter'
            if(type == 'all'){
                data = isTemplate ? templates : designs
            }else if(type == 'pro'){
                data = (isTemplate ? templates : designs).filter(item => item.pro == true)
            }else if(type == 'free'){
                data = (isTemplate ? templates : designs).filter(item => item.pro != true)
            }
            this.setState({[filterTxt]: type, current: data})
        }else{
            if(type == 'design'){
                this.setState({isTemplate: false, designFilter: 'all', current: designs})
            }else{
                this.setState({isTemplate: true, templateFilter: 'all', current: templates})
            }
        }
    }

    render() {
        const {isPopup, current, isTemplate, error, templateFilter, designFilter} = this.state
        const filter = isTemplate ? templateFilter : designFilter
        
        return (
            <Fragment>
            { isPopup &&
                <div className="ultp-popup-wrap">
                    <div className="ultp-popup-header">
                        <div className="ultp-popup-filter-title">
                            <div className="ultp-popup-filter-nav">
                                <div onClick={() => this._setData('template')} className={'ultp-popup-tab-title'+(isTemplate ? ' ultp-active' : '')}>Starter Packs</div>
                                <div onClick={() => this._setData('design')} className={'ultp-popup-tab-title'+(isTemplate ? '' : ' ultp-active')}>Readymade Block Design</div>
                            </div>
                            <button class="ultp-btn-close" onClick={() => this.close()} id="ultp-btn-close"><span className="dashicons dashicons-no-alt"></span></button>
                        </div>
                    </div>    
                    <div className="ultp-popup-nav">
                        <ul>
                            <li onClick={() => this._setData('all')} className={filter == 'all' ? 'ultp-nav-active' : '' }>
                                <a href="#">All</a>
                            </li>
                            <li onClick={() => this._setData('free')} className={filter == 'free' ? 'ultp-nav-active' : '' }>
                                <a href="#">Free</a>
                            </li>
                            <li onClick={() => this._setData('pro')} className={filter == 'pro' ? 'ultp-nav-active' : '' }>
                                <a href="#">Premium</a>
                            </li>
                        </ul>
                    </div>
                    <div className={`ultp-popup-content`+(isTemplate ? '' : ' ultp-popup-content-designs')}>
                        { current.map(data => (
                            <div className={`ultp-popup-item`}>
                                <div className="LazyLoad">
                                { isTemplate ?
                                    <a className="ultp-popup-btn" href={data.liveurl} target="_blank"><img src={data.image} loading="lazy" alt={data.title} /></a>
                                :
                                    <img loading="lazy" src={data.image} loading="lazy" alt={data.title} />
                                }
                                { (data.pro) ?
                                    <span className="ultp-popup-premium-btn">Pro</span>
                                    :
                                    <span className="ultp-popup-premium-btn ultp-popup-premium-free-btn">Free</span>
                                }
                                </div>
                                <div className="ultp-popup-info">
                                    <span className="ultp-popup-title">{data.name}</span>
                                    <span className="ultp-action-btn">
                                        {(data.pro && !wp.ultp_pro) ?
                                            <a className="ultp-popup-primary-btn" target="_blank" href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium">Get Pro</a>
                                            :( (data.pro && error) ?
                                                <a className="ultp-popup-primary-btn" target="_blank" href="https://www.wpxpo.com/gutenberg-post-blocks/?utm_campaign=go_premium">Get License</a>
                                                :
                                                <button onClick={() => this._changeVal(data.ID, data.pro)} className="ultp-popup-btn">Import{(this.state.reload && this.state.reloadId == data.ID) && <span class="dashicons dashicons-update rotate" />}</button>
                                            )
                                        }
                                        { isTemplate &&
                                            <a className="ultp-popup-btn" href={data.liveurl} target="_blank">Live Preview</a>
                                        }
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </Fragment>
        );
    }
}

export default Popup;
