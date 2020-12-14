const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
    'ultimate-post/taxonomy', {
        title: 'Taxonomy',
        icon: {src: icons.post_grid_1},
        category: 'ultimate-post',
        description: __( 'Listing your products in a easy way.' ),
        keywords: [ __( 'Latest Post' ), __( 'Popular Post' ), __( 'Article' ) ],
        edit: Edit,
        save() {
            return null;
        },
    }
)