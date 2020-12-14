export const { Tooltip, Dashicon } = wp.components;
const { MediaUpload } = wp.blockEditor;
const { Component } = wp.element;
const { __ } = wp.i18n

class Media extends Component {

  setSettings(media) {
    const { multiple, onChange, value } = this.props
    if (multiple) {
      let medias = [];
      media.forEach(single => {
        if (single && single.url) {
          medias.push({ url: single.url, id: single.id });
        }
      });
      onChange(value ? value.concat(medias) : medias);
    } else {
      if (media && media.url) {
        onChange({ url: media.url, id: media.id });
      }
    }
  }

  removeImage(id) {
    const { multiple, onChange } = this.props
    if (multiple) {
      let value = (this.props.value).slice()
      value.splice(id, 1)
      onChange(value)
    } else {
      onChange({})
    }
  }

  isUrl(url) {
    if (['wbm', 'jpg', 'jpeg', 'gif', 'png'].indexOf(url.split('.').pop().toLowerCase()) != -1) {
      return url;
    } else {
      return ultp_data.url + 'assets/img/ultp-placeholder.jpg';
    }
  }

  changeUrl(val) {
    const { multiple, onChange } = this.props
    if (multiple) {

    } else {
      onChange({ url: val.target.value, id: 99999 });
    }
  }


  render() {
    const { type, multiple, value, label } = this.props;
    return (
      <div className='ultp-field-wrap ultp-field-media'>
        { label &&
          <label>{label}</label>
        }
        <MediaUpload
          onSelect={val => this.setSettings(val)}
          allowedTypes={type || ['image']}
          multiple={multiple || false}
          value={value}
          render={({ open }) => (
            <div className="ultp-media-img">
              { multiple ?
                <div className="ultp-multiple-img">
                  {(value.length > 0) &&
                    value.map((v, index) => {
                      return (
                        <span className="ultp-media-image-item">
                          <img loading="lazy" src={this.isUrl(v.url)} alt={__('image')} />
                          <span className={'ultp-image-close-icon dashicons dashicons-no-alt'} onClick={() => this.removeImage(index)} />
                        </span>
                      )
                    })
                  }
                  <div onClick={open} className={"ultp-placeholder-image"}><span>{__('Upload')}</span></div>
                </div>
                :
                ((value && value.url) ?
                  <span className="ultp-media-image-item">
                    <input type="text" onChange={(v) => this.changeUrl(v)} value={value.url} />
                    <div onClick={open} className={"ultp-placeholder-image"}><span>{__('Upload')}</span></div>
                    <span className={'ultp-image-close-icon dashicons dashicons-no-alt'} onClick={() => this.removeImage()} />
                  </span>
                  :
                  <span>
                    <input type="text" onChange={(v) => this.changeUrl(v)} value="" />
                    <div onClick={open} className={"ultp-placeholder-image"}><span>{__('Upload')}</span></div>
                  </span>
                )
              }
            </div>
          )}
        />
      </div>
    );
  }
}
export default Media;