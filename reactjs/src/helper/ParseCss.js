import { CssGenerator } from './CssGenerator'

const endpoint = '/ultp/v1/save_block_css'

const API_fetch = (post_id, block_css, hasBlocks) => {
  return wp.apiFetch({
    path: endpoint,
    method: 'POST',
    data: { block_css, post_id, has_block: hasBlocks }
  }).then(data => data)
}

let __CSS = ''
function innerBlocks(blocks, type = false) {
  if (type == true) {
    __CSS = ''
    type = false
  }
  blocks.map(row => {
    const { attributes, name } = row
    const blockName = name.split('/')
    if (blockName[0] === 'ultimate-post' && attributes.blockId) {
      __CSS += CssGenerator(attributes, blockName[1], attributes.blockId, true)
    }
    if (row.innerBlocks && (row.innerBlocks).length > 0) {
      innerBlocks(row.innerBlocks)
    }
  })
  return __CSS
}

function isUltp(blocks) {
  let hasBlocks = false
  blocks.forEach(element => {
    if (element.name.indexOf('ultimate-post/') != -1) {
      hasBlocks = true
    }
    if (element.innerBlocks && (element.innerBlocks).length > 0) {
      element.innerBlocks.forEach(el => {
        if (el.name.indexOf('ultimate-post/') != -1) {
          hasBlocks = true
        }
        if (el.innerBlocks && (el.innerBlocks).length > 0) {
          el.innerBlocks.forEach(e => {
            if (e.name.indexOf('ultimate-post/') != -1) {
              hasBlocks = true
            }
          })
        }
      })

    }
  });
  return hasBlocks
}

function getData(pId) {
  wp.apiFetch({
    path: '/ultp/v1/get_posts',
    method: 'POST',
    data: { postId: pId }
  }).then(response => {
    if (response.success) {
      const innerBlock = innerBlocks(wp.blocks.parse(response.data), true)
      if (innerBlock.css) {
        wp.apiFetch({
          path: '/ultp/v1/appened_css',
          method: 'POST',
          data: { inner_css: innerBlock.css, post_id: select('core/editor').getCurrentPostId() }
        }).then(res => {
          if (res.success) {
            // Save Data
          }
        })
      }
    }
  })
};


function parseBlock(blocks) {
  blocks.forEach(block => {
    if (block.name.indexOf('core/block') != -1) {
      getData(block.attributes.ref)
    }
    if (block.innerBlocks && (block.innerBlocks).length > 0) {
      parseBlock(block.innerBlocks)
    }
  })
}

const ParseCss = () => {
  window.bindCss = true
  const all_blocks = wp.data.select('core/block-editor').getBlocks()
  const { getCurrentPostId } = wp.data.select('core/editor')
  const hasBlocks = isUltp(all_blocks);
  let blockCss = innerBlocks(all_blocks, true)
  parseBlock(all_blocks);
  API_fetch(getCurrentPostId(), blockCss, hasBlocks).then(data => { })
  setTimeout(() => { window.bindCss = false }, 900)
}

export default ParseCss