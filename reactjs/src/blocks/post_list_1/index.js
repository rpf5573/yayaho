const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
  'ultimate-post/post-list-1', {
  title: 'Post List #1',
  icon: { src: icons.post_list_1 },
  category: 'ultimate-post',
  description: <span className="ultp-block-info">Listing your post with classic style. <a href="https://ultp.wpxpo.com/post-list-1/" target="_blank">See Demo</a></span>,
  keywords: [__('Post Listing'), __('Listing'), __('Article'), __('List View')],
  example: {
    attributes: {
      columns: {
        lg: 2
      },
      headingShow: false,
      paginationShow: false,
      excerptLimit: 9,
      catShow: false,
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