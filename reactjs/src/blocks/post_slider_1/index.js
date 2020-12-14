const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import icons from '../../helper/icons'
registerBlockType(
  'ultimate-post/post-slider-1', {
  title: 'Post Slider #1',
  icon: { src: icons.post_slider_1 },
  category: 'ultimate-post',
  description: <span className="ultp-block-info">Dynamic post slider with lots of settings. <a href="https://ultp.wpxpo.com/post-slide-1/" target="_blank">See Demo</a></span>,
  keywords: [__('Post Slider'), __('Post Carousel'), __('Slide')],
  example: {
    attributes: {
      headingShow: false,
      paginationShow: false,
      excerptShow: false,
      metaShow: false,
      queryNumber: 1,
      readMore: false
    },
  },
  edit: Edit,
  save() {
    return null;
  },
}
)