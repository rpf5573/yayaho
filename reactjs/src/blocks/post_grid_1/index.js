const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
  'ultimate-post/post-grid-1', {
  title: 'Post Grid #1',
  icon: { src: icons.post_grid_1 },
  category: 'ultimate-post',
  description: <span className="ultp-block-info">Post grid with classic style. <a href="https://ultp.wpxpo.com/post-grid-1/" target="_blank">See Demo</a></span>,
  keywords: [__('Post Grid'), __('Grid View'), __('Article'), __('Post Listing')],
  example: {
    attributes: {
      columns: {
        lg: 2
      },
      headingShow: false,
      paginationShow: false,
      excerptLimit: 9,
      catShow: false,
      separatorShow: true,
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