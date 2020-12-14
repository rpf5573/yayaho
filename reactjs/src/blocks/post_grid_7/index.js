const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
  'ultimate-post/post-grid-7', {
  title: 'Post Grid #7',
  icon: { src: icons.post_grid_7 },
  category: 'ultimate-post',
  description: <span className="ultp-block-info">Display gradient grid post with vertical overlay. <a href="https://ultp.wpxpo.com/post-grid-7/" target="_blank">See Demo</a></span>,
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