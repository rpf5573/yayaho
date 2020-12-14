import "./helper/FieldRender"
import "./blocks/post_list_1"
import "./blocks/post_list_2"
import "./blocks/post_list_3"
import "./blocks/post_list_4"
import "./blocks/post_slider_1"
import "./blocks/post_grid_1"
import "./blocks/post_grid_2"
import "./blocks/post_grid_3"
import "./blocks/post_grid_4"
import "./blocks/post_grid_5"
import "./blocks/post_grid_6"
import "./blocks/post_grid_7"
import "./blocks/heading"
import "./blocks/image"
import "./blocks/wrapper"
import "./blocks/post_module_1"
import "./blocks/post_module_2"

window.ultpDevice = 'lg'
window.bindCss = false

wp.blocks.updateCategory('ultimate-post', { icon: <img loading="lazy" className="ultp-insert-box-popup" style={{ height: '25px', 'margin-top': '-5px' }} src={ultp_data.url + 'assets/img/logo-sm.svg'} alt={'Gutenberg Post Blocks'} /> });

// Set Locate
wp.i18n.setLocaleData( { '': {} }, 'ultimate-post' );

// Save Style CSS within Database/File
import ParseCss from './helper/ParseCss.js'
wp.data.subscribe(() => {
    const {isSavingPost,isAutosavingPost} = wp.data.select("core/editor")
    if( isSavingPost() && (!isAutosavingPost()) ){
        //if( window.bindCss == false ){
            ParseCss();
        //}
    }
});

import Popup from './helper/Popup'

if( ultp_data.hide_import_btn != 'yes' ) {
    document.addEventListener( 'DOMContentLoaded', appendImportButton );
    function appendImportButton() {
        setTimeout(function(){ 
            let toolbar = document.querySelector( '.edit-post-header-toolbar' );
            if ( ! toolbar ) {
                return;
            }
            let buttonDiv = document.createElement( 'div' );
            let html = `<div class="sab-toolbar-insert-layout">`;
            html += '<button id="UltpInsertButton" class="ultp-popup-button" aria-label="Insert Layout"><img loading="lazy" src="'+ultp_data.url+'assets/img/logo-sm.svg">Block Library</button>';
            html += `</div>`;
            buttonDiv.innerHTML = html;
            toolbar.appendChild( buttonDiv );
            document.getElementById( 'UltpInsertButton' ).addEventListener( 'click', ultpInsertLayout );
        }, 0 );
    }
    
    function ultpInsertLayout() {
        let node = document.createElement('div')
        node.className = "ultp-builder-modal"
        document.body.appendChild(node)
        wp.element.render(<Popup isShow={true} />, node)
        document.body.classList.add('ultp-popup-open')
    }
}

