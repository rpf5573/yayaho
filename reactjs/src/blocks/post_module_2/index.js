const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
    'ultimate-post/post-module-2', {
        title: 'Post Module #2',
        icon: {src: icons.post_module_2},
        category: 'ultimate-post',
        description: <span className="ultp-block-info">Listing your post with top big post. <a href="https://ultp.wpxpo.com/post-module-2/" target="_blank">See Demo</a></span>,
        keywords: [ __( 'Post List' ), __( 'Post Grid' ), __( 'Post Module' ), __('Latest Post') ],
        example: {
            attributes: {
                headingShow: false,
                paginationShow: false,
                excerptShow: false,
                catShow: false,
                metaList: '["metaAuthor","metaDate"]',
                queryNumber: 5,
                readMore: false
            },
        },
        edit: Edit,
        save() {
            return null;
        },
    }
)
