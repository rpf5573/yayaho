const { Component } = wp.element
class RadioImage extends Component {
    render() {
        const { value, options, label, onChange, isText } = this.props
        return(
            <div className="ultp-field-wrap ultp-field-radio-image">
                { label && 
                    <label>{label}</label>
                }
                <div className="ultp-field-radio-image-content">
                    { isText ?
                        options.map((data, index) => {
                            return ( <div onClick={()=>onChange(data.value)}><span className={data.value==value?'active':''}>{data.label}</span></div> )
                        })
                        :
                        options.map((data, index) => {
                            return ( <div onClick={()=>onChange(data.value)}><img loading="lazy" className={data.value==value?'active':''} src={data.url} /></div> )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default RadioImage