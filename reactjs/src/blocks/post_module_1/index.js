const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
    'ultimate-post/post-module-1', {
        title: 'Post Module #1',
        icon: {src: icons.post_module_1},
        category: 'ultimate-post',
        description: <span className="ultp-block-info">Display left big post with right small post. <a href="https://ultp.wpxpo.com/post-module-1/" target="_blank">See Demo</a></span>,
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
