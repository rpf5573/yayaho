const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
  'ultimate-post/post-list-3', {
  title: 'Post List #3',
  icon: { src: icons.post_list_3 },
  category: 'ultimate-post',
  description: <span className="ultp-block-info">Listing your post with left side image. <a href="https://ultp.wpxpo.com/post-list-3/" target="_blank">See Demo</a></span>,
  keywords: [__('Post List'), __('List View'), __('Article'), __('Listing')],
  example: {
    attributes: {
      headingShow: false,
      paginationShow: false,
      excerptShow: false,
      metaList: '["metaAuthor","metaDate"]',
      queryNumber: 2,
      readMore: false
    },
  },
  edit: Edit,
  save() {
    return null;
  },
}
)