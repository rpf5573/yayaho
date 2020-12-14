const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
    'ultimate-post/image', {
        title: 'Image',
        icon: {src: icons.image},
        category: 'ultimate-post',
        description: <span className="ultp-block-info">Show Image with ultimate controls. <a href="https://ultp.wpxpo.com/image/" target="_blank">See Demo</a></span>,
        keywords: [ __( 'Image' ), __( 'Media' ), __( 'Gallery' ) ],
        edit: Edit,
        save() {
            return null;
        },
    }
)