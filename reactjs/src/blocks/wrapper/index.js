const { __ } = wp.i18n
const { registerBlockType } = wp.blocks;
import Edit from './Edit'
import Save from './Save'
import icons from '../../helper/icons'
registerBlockType(
    'ultimate-post/wrapper', {
        title: 'Wrapper',
        icon: {src: icons.wrapper},
        category: 'ultimate-post',
        description: __( 'Wrapper block for Gutenberg.' ),
        keywords: [ __( 'wrapper' ), __( 'wrap' ), __( 'column' ) ],
        edit: Edit,
        save: Save,
        attributes: {
            blockId: {
                type: 'string',
                default: '',
            },

            //--------------------------
            //  Wrapper Style
            //--------------------------
            wrapBg: {
                type: 'object',
                default: {openColor: 1, type: 'color', color: '#f5f5f5'},
                style: [{selector:'{{ULTP}} .ultp-wrapper-block'}]
            },
            wrapBorder:{
                type: 'object',
                default: {openBorder:0, width:{top: 1, right: 1, bottom: 1, left: 1},color: '#009fd4',type: 'solid'},
                style:[{ selector: '{{ULTP}} .ultp-wrapper-block' }],
            },
            wrapShadow:{
                type: 'object',
                default: {openShadow: 0, width: {top: 1, right: 1, bottom: 1, left: 1},color: '#009fd4'},
                style: [{ selector: '{{ULTP}} .ultp-wrapper-block' }],
            },
            wrapRadius:{
                type: 'object',
                default: {lg:'', unit:'px'},
                style:[{ selector: '{{ULTP}} .ultp-wrapper-block { border-radius:{{wrapRadius}}; }' }],
            },
            wrapHoverBackground:{
                type: 'object',
                default: {openColor: 0, type: 'color', color: '#1740f5'},
                style:[{ selector: '{{ULTP}} .ultp-wrapper-block:hover' }]
            },
            wrapHoverBorder:{
                type: 'object',
                default: {openBorder:0, width: {top: 1, right: 1, bottom: 1, left: 1},color: '#009fd4',type: 'solid'},
                style:[{ selector: '{{ULTP}} .ultp-wrapper-block:hover' }],
            },
            wrapHoverRadius:{
                type: 'object',
                default: {lg:'', unit:'px'},
                style: [{ selector: '{{ULTP}} .ultp-wrapper-block:hover { border-radius:{{wrapHoverRadius}}; }' }],
            },
            wrapHoverShadow:{
                type: 'object',
                default: {openShadow: 0, width: {top: 1, right: 1, bottom: 1, left: 1},color: '#009fd4'},
                style:[{ selector: '{{ULTP}} .ultp-wrapper-block:hover' }],
            },
            wrapMargin:{
                type: 'object',
                default: {lg:{top: '',bottom: '', unit:'px'}},
                style:[{ selector:'{{ULTP}} .ultp-wrapper-block { margin:{{wrapMargin}}; }' }],
            },
            wrapOuterPadding:{
                type: 'object',
                default: {lg:{top: '30',bottom: '30',left: '30', right: '30', unit:'px'}},
                style:[ {selector: '{{ULTP}} .ultp-wrapper-block { padding:{{wrapOuterPadding}}; }'} ],
            },
            advanceId:{
                type: 'string',
                default: '',
            },
            advanceZindex:{
                type: 'number',
                default: '',
                style:[{ selector: '{{ULTP}} {z-index:{{advanceZindex}};}' }],
            },
            advanceCss:{
                type: 'string',
                default: '',
                style: [{selector: ''}],
            }
        }
    }
)