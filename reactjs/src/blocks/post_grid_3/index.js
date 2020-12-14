const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
  'ultimate-post/post-grid-3', {
  title: 'Post Grid #3',
  icon: { src: icons.post_grid_3 },
  category: 'ultimate-post',
  description: <span className="ultp-block-info">Post grid with top big posts overlay style. <a href="https://ultp.wpxpo.com/post-grid-3/" target="_blank">See Demo</a></span>,
  keywords: [__('Post Grid'), __('Grid View'), __('Article'), __('Post Listing')],
  example: {
    attributes: {
      headingShow: false,
      metaList: '["metaAuthor","metaDate"]',
      queryNumber: 3
    },
  },
  edit: Edit,
  save() {
    return null;
  },
}
)