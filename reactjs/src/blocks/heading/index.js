const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
  'ultimate-post/heading', {
  title: 'Heading',
  icon: { src: icons.heading },
  category: 'ultimate-post',
  description: <span className="ultp-block-info">Show heading or title with ultimate controls. <a href="https://ultp.wpxpo.com/heading/" target="_blank">See Demo</a></span>,
  keywords: [__('heading'), __('title'), __('section')],
  example: {
    attributes: {
      headingText: __('Heading Example.')
    },
  },
  edit: Edit,
  save() {
    return null;
  },
}
)