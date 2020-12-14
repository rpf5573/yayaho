const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
    'ultimate-post/post-grid-2', {
        title: 'Post Grid #2',
        icon: 'grid-view',
        icon: {src: icons.post_grid_2},
        category: 'ultimate-post',
        description: <span className="ultp-block-info">Post grid with gradient image overlay style. <a href="https://ultp.wpxpo.com/post-grid-2/" target="_blank">See Demo</a></span>,
        keywords: [__( 'Post Grid' ), __( 'Grid View' ), __( 'Article' ), __('Post Listing')],
        example: {
            attributes: {
                columns: {
                    lg: 2
                },
                headingShow: false,
                metaList: '["metaAuthor","metaDate"]',
                queryNumber: 4
            },
        },
        edit: Edit,
        save() {
            return null;
        },
    }
)