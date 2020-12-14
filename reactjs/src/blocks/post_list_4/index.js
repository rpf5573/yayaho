const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
    'ultimate-post/post-list-4', {
        title: 'Post List #4',
        icon: {src: icons.post_list_4},
        category: 'ultimate-post',
        description: <span className="ultp-block-info">Listing your post with top big image and bottom small image. <a href="https://ultp.wpxpo.com/post-list-4" target="_blank">See Demo</a></span>,
        keywords: [ __( 'Post List' ), __( 'List View' ), __( 'Article' ), __('Listing') ],
        example: {
            attributes: {
                headingShow: false,
                paginationShow: false,
                excerptShow: false,
                catShow: false,
                metaList: '["metaAuthor","metaDate"]',
                queryNumber: 3,
                readMore: false
            },
        },
        edit: Edit,
        save() {
            return null;
        },
    }
)
