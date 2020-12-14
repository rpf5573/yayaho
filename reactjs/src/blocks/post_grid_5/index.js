const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
  'ultimate-post/post-grid-5', {
  title: 'Post Grid #5',
  icon: { src: icons.post_grid_5 },
  category: 'ultimate-post',
  description: <span className="ultp-block-info">Post grid with left big posts tiles overlay style. <a href="https://ultp.wpxpo.com/post-grid-5/" target="_blank">See Demo</a></span>,
  keywords: [__('Post Grid'), __('Grid View'), __('Article'), __('Post Listing')],
  example: {
    attributes: {
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