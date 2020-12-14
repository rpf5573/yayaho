const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
  'ultimate-post/post-grid-6', {
  title: 'Post Grid #6',
  icon: { src: icons.post_grid_6 },
  category: 'ultimate-post',
  description: <span className="ultp-block-info">Display gradient grid post with tiles Blocks. <a href="https://ultp.wpxpo.com/post-grid-6/" target="_blank">See Demo</a></span>,
  keywords: [__('Post Grid'), __('Grid View'), __('Article'), __('Post Listing')],
  example: {
    attributes: {
      headingShow: false,
      metaList: '["metaAuthor","metaDate"]',
      queryNumber: 5
    },
  },
  edit: Edit,
  save() {
    return null;
  },
}
)