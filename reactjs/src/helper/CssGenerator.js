import { cssGradient, cssBorder, cssBoxShadow, cssTypography, cssDimension, cssBackground, cssColor } from './CssHelper'

// Replace Value
const replaceData = (selector, key, value) => {
  return selector.replace(new RegExp(key, "g"), value)
}

// Object Empty Check
const isEmpty = (obj) => {
  return (typeof obj == 'object' && Object.keys(obj).length != 0) ? true : false
}

// {{ULTP}} Replace
const replaceWarp = (selector, ID) => {
  return selector.replace(new RegExp('{{ULTP}}', "g"), '.ultp-block-' + ID)
}

export const objectReplace = (warp, value) => {
  let output = ''
  value.forEach(sel => { output += sel + ';'; })
  return warp + '{' + output + '}';
}


export const objectAppend = (warp, value) => {
  let output = ''
  value.forEach(sel => { output += warp + sel; })
  return output
}

// Plain String/Number Field CSS Replace
export const singleField = (style, blockID, key, value) => {
  value = typeof value != 'object' ? value : objectField(value).data
  if (typeof style == 'string') {
    if (style) {
      if (value) {
        let warpData = replaceWarp(style, blockID)
        if (typeof value == 'boolean') {
          return [warpData]
        } else {
          if (warpData.indexOf('{{') == -1 && warpData.indexOf('{') < 0) {
            return [warpData + value]
          } else {
            return [replaceData(warpData, '{{' + key + '}}', value)]
          }
        }
      } else {
        return []
      }
    } else {
      return [replaceWarp(value, blockID)] // Custom CSS Field
    }
  } else {
    let output = []
    style.forEach(sel => {
      output.push(replaceData(replaceWarp(sel, blockID), '{{' + key + '}}', value))
    });
    return output;
  }
}


// Object Field CSS Replace
const objectField = (data) => {
  if (data.openTypography) {
    return { data: cssTypography(data), action: 'append' }; //Typography
  } else if (data.openBg) {
    return { data: cssBackground(data), action: 'append' }; //Background
  } else if (data.openBorder) {
    return { data: cssBorder(data), action: 'append' }; //Border
  } else if (data.openShadow && data.color) {
    return { data: cssBoxShadow(data), action: 'append' }; //Shadow
  } else if (data.direction) {
    return { data: cssGradient(data, 'return'), action: 'append' }; //Gradient
  } else if (typeof (data.top) != 'undefined' || typeof (data.left) != 'undefined' || typeof (data.right) != 'undefined' || typeof (data.bottom) != 'undefined') {
    return { data: cssDimension(data), action: 'replace' }; //Dimension
  } else if (data.openColor) {
    if (data.replace) {
      return { data: cssColor(data), action: 'replace' }; //Color Advanced
    } else {
      return { data: cssColor(data), action: 'append' }; //Color Advanced
    }
  } else {
    return { data: '', action: 'append' };
  }
}


export const checkDepends = (settings, selectData) => {
  let _depends = true
  if (selectData.hasOwnProperty('depends')) {
    selectData.depends.forEach((data) => {
      let previous = _depends
      if (data.condition == '==') {
        if ((typeof data.value == 'string') || (typeof data.value == 'number') || (typeof data.value == 'boolean')) {
          _depends = settings[data.key] == data.value
        } else {
          let select = false
          data.value.forEach(arrData => {
            if (settings[data.key] == arrData) { select = true; }
          })
          if (select) { _depends = true; }
        }
      } else if (data.condition == '!=') {
        if ((typeof data.value == 'string') || (typeof data.value == 'number') || (typeof data.value == 'boolean')) {
          _depends = settings[data.key] != data.value
        } else {
          let select = false
          data.value.forEach(arrData => {
            if (settings[data.key] != arrData) { select = true; }
          })
          if (select) { _depends = true; }
        }
      }
      _depends = previous == false ? false : _depends
    })
  }

  return _depends;
}


export const CssGenerator = (settings, blockName, blockID, isInline = false) => {
  if (!blockID) return;
  let __CSS = '',
    lg = [],
    md = [],
    sm = [],
    xs = [],
    notResponsiveCss = [];

  Object.keys(settings).forEach((key) => {
    const attributes = typeof blockName === 'string' ? wp.blocks.getBlockType('ultimate-post/' + blockName).attributes : blockName
    if (attributes[key] && attributes[key].hasOwnProperty('style')) {
      attributes[key].style.forEach((selectData, indexStyle) => {
        if (selectData.hasOwnProperty('selector')) {
          let cssSelecor = selectData.selector
          if (checkDepends(settings, selectData)) {
            if (typeof settings[key] == 'object') {
              let device = false;
              let dimension = '';
              if (settings[key].lg) { // Exta Large
                device = true
                dimension = typeof settings[key].lg == 'object' ? objectField(settings[key].lg).data : settings[key].lg + (settings[key].unit || '')
                lg = lg.concat(singleField(cssSelecor, blockID, key, dimension))
              }
              if (settings[key].md) { // Desktop
                device = true
                dimension = typeof settings[key].md == 'object' ? objectField(settings[key].md).data : settings[key].md + (settings[key].unit || '')
                md = md.concat(singleField(cssSelecor, blockID, key, dimension))
              }
              if (settings[key].sm) { // Tablet
                device = true
                dimension = typeof settings[key].sm == 'object' ? objectField(settings[key].sm).data : settings[key].sm + (settings[key].unit || '')
                sm = sm.concat(singleField(cssSelecor, blockID, key, dimension))
              }
              if (settings[key].xs) { // Phone
                device = true
                dimension = typeof settings[key].xs == 'object' ? objectField(settings[key].xs).data : settings[key].xs + (settings[key].unit || '')
                xs = xs.concat(singleField(cssSelecor, blockID, key, dimension))
              }
              if (!device) { // Object Field Type Only
                const objectCss = objectField(settings[key])
                const repWarp = replaceWarp(cssSelecor, blockID)
                if (typeof objectCss.data == 'object') {
                  if (Object.keys(objectCss.data).length != 0) {
                    if (objectCss.data.background) { notResponsiveCss.push(repWarp + objectCss.data.background) }

                    // Typography
                    if (isEmpty(objectCss.data.lg)) { lg.push(objectReplace(repWarp, objectCss.data.lg)) }
                    if (isEmpty(objectCss.data.md)) { md.push(objectReplace(repWarp, objectCss.data.md)) }
                    if (isEmpty(objectCss.data.sm)) { sm.push(objectReplace(repWarp, objectCss.data.sm)) }
                    if (isEmpty(objectCss.data.xs)) { xs.push(objectReplace(repWarp, objectCss.data.xs)) }
                    if (objectCss.data.simple) { notResponsiveCss.push(repWarp + objectCss.data.simple) }
                    if (objectCss.data.font) { lg.unshift(objectCss.data.font) }

                    if (objectCss.data.shape) {
                      (objectCss.data.shape).forEach(function (el) { notResponsiveCss.push(repWarp + el) });
                      if (isEmpty(objectCss.data.data.lg)) { lg.push(objectAppend(repWarp, objectCss.data.data.lg)) }
                      if (isEmpty(objectCss.data.data.md)) { md.push(objectAppend(repWarp, objectCss.data.data.md)) }
                      if (isEmpty(objectCss.data.data.sm)) { sm.push(objectAppend(repWarp, objectCss.data.data.sm)) }
                      if (isEmpty(objectCss.data.data.xs)) { xs.push(objectAppend(repWarp, objectCss.data.data.xs)) }
                    }
                  }
                } else if (objectCss.data && (objectCss.data).indexOf('{{') == -1) {
                  if (objectCss.action == 'append') {
                    notResponsiveCss.push(repWarp + objectCss.data)
                  } else {
                    notResponsiveCss.push(singleField(cssSelecor, blockID, key, objectCss.data))
                  }
                }
              }
            } else {
              if (key == 'hideTablet') {
                if (isInline) { sm = sm.concat(singleField(cssSelecor, blockID, key, settings[key])) }
              } else if (key == 'hideMobile') {
                if (isInline) { xs = xs.concat(singleField(cssSelecor, blockID, key, settings[key])) }
              } else {
                if (settings[key]) {
                  notResponsiveCss = notResponsiveCss.concat(singleField(cssSelecor, blockID, key, settings[key]))
                }
              }
            }
          }
        }
      });
    }
  })



  // Join CSS
  if (lg.length > 0) { __CSS += lg.join('') } //lg
  if (md.length > 0) { __CSS += '@media (max-width: 1199px) {' + md.join('') + '}' } //md
  if (sm.length > 0) { __CSS += '@media (max-width: 992px) {' + sm.join('') + '}' } //sm
  if (xs.length > 0) { __CSS += '@media (max-width: 768px) {' + xs.join('') + '}' } //xs
  if (notResponsiveCss.length > 0) { __CSS += notResponsiveCss.join('') }

  if (isInline) {
    return __CSS
  }

  // Set CSS
  setStyle(__CSS, blockID)
}


// Set CSS to Head
const setStyle = (styleCss, blockID) => {
  let styleSelector = window.document;
  if (styleSelector.getElementById('ultp-block-' + blockID) === null) {
    let cssInline = document.createElement('style');
    cssInline.type = 'text/css';
    cssInline.id = 'ultp-block-' + blockID;
    if (cssInline.styleSheet) {
      cssInline.styleSheet.cssText = styleCss;
    } else {
      cssInline.innerHTML = styleCss;
    }
    styleSelector.getElementsByTagName("head")[0].appendChild(cssInline);
  } else {
    styleSelector.getElementById('ultp-block-' + blockID).innerHTML = styleCss;
  }
}