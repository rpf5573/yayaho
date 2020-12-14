

// CSS Gradient
export const cssGradient = (v, type) => {
  let gradietValue = v.type == 'linear' ? 'linear-gradient(' + v.direction + 'deg, ' : 'radial-gradient( circle at ' + v.radial + ' , '
  gradietValue += v.color1 + ' ' + v.start + '%,' + v.color2 + ' ' + v.stop + '%)'
  if (type == 'object') {
    return { background: gradietValue }
  } else {
    gradietValue = 'background:' + gradietValue + (v.clip ? '-webkit-background-clip: text; -webkit-text-fill-color: transparent;' : '')
    return '{' + gradietValue + '}';
  }
}

// CSS Box Shadow
export const cssBoxShadow = (v) => {
  return '{ box-shadow:' + (v.inset || '') + ' ' + v.width.top + 'px ' + v.width.right + 'px ' + v.width.bottom + 'px ' + v.width.left + 'px ' + v.color + '; }'
}

// CSS Border
export const cssBorder = (v) => {
  v = Object.assign({}, { type: 'solid', width: {}, color: '#e5e5e5' }, v);
  const unit = v.width.unit ? v.width.unit : 'px'
  return `{ border-color:  ${v.color ? v.color : '#555d66'}; border-style: ${v.type ? v.type : 'solid'}; border-width: ${cssDimension(v.width)}; }`
}

// CSS Typography
const _device = (val, selector) => {
  let data = {}
  if (val && val.lg) { data.lg = selector.replace(new RegExp('{{key}}', "g"), val.lg + (val.unit || '')) }
  if (val && val.md) { data.md = selector.replace(new RegExp('{{key}}', "g"), val.md + (val.unit || '')) }
  if (val && val.sm) { data.sm = selector.replace(new RegExp('{{key}}', "g"), val.sm + (val.unit || '')) }
  if (val && val.xs) { data.xs = selector.replace(new RegExp('{{key}}', "g"), val.xs + (val.unit || '')) }
  return data;
}
const _push = (val, data) => {
  if (val.lg) { data.lg.push(val.lg) }
  if (val.md) { data.md.push(val.md) }
  if (val.sm) { data.sm.push(val.sm) }
  if (val.xs) { data.xs.push(val.xs) }
  return data;
}
export const cssTypography = (v) => {
  let font = ''
  if (v.family && v.family != 'none') {
    if (!['Arial', 'Tahoma', 'Verdana', 'Helvetica', 'Times New Roman', 'Trebuchet MS', 'Georgia'].includes(v.family)) {
      font = "@import url('https://fonts.googleapis.com/css?family=" + v.family.replace(' ', '+') + ':' + (v.weight || 400) + "');"
    }
  }
  let data = { lg: [], md: [], sm: [], xs: [] }
  if (v.size) { data = _push(_device(v.size, 'font-size:{{key}}'), data) }
  if (v.height) { data = _push(_device(v.height, 'line-height:{{key}} !important'), data) }
  if (v.spacing) { data = _push(_device(v.spacing, 'letter-spacing:{{key}}'), data) }
  let simple = '{' + ((v.family && v.family != 'none') ? "font-family:'" + v.family + "'," + (v.type || "sans-serif") + ";" : '') +
    (v.weight ? 'font-weight:' + v.weight + ';' : '') +
    (v.color ? 'color:' + v.color + ';' : '') +
    (v.style ? 'font-style:' + v.style + ';' : '') +
    (v.transform ? 'text-transform:' + v.transform + ';' : '') +
    (v.decoration ? 'text-decoration:' + v.decoration + ';' : '') + '}';
  return { lg: data.lg, md: data.md, sm: data.sm, xs: data.xs, simple, font };
}


// CSS Dimension
export const cssDimension = (v) => {
  const unit = v.unit ? v.unit : 'px'
  return (v.top || 0) + unit + ' ' + (v.right || 0) + unit + ' ' + (v.bottom || 0) + unit + ' ' + (v.left || 0) + unit
}

// CSS Background
const split_bg = (type, image = {}, imgPosition, imgAttachment, imgRepeat, imgSize, DefaultColor, bgGradient) => {
  let bgData = (DefaultColor ? 'background-color:' + DefaultColor + ';' : '');
  if (type == 'image') {
    bgData += (image.hasOwnProperty('url') ? 'background-image:url(' + image.url + ');' : '') + (imgPosition ? 'background-position:' + imgPosition + ';' : '') + (imgAttachment ? 'background-attachment:' + imgAttachment + ';' : '') +
      (imgRepeat ? 'background-repeat:' + imgRepeat + ';' : '') + (imgSize ? 'background-size:' + imgSize + ';' : '')
  }
  else if (type == 'gradient') {
    if (bgGradient && bgGradient.type == 'linear') {
      bgData += 'background-image: linear-gradient(' + bgGradient.direction + 'deg, ' + bgGradient.color1 + ' ' + bgGradient.start + '%,' + bgGradient.color2 + ' ' + bgGradient.stop + '%);'
    } else {
      bgData += 'background-image: radial-gradient( circle at ' + bgGradient.radial + ' , ' + bgGradient.color1 + ' ' + bgGradient.start + '%,' + bgGradient.color2 + ' ' + bgGradient.stop + '%);'
    }
  }
  return bgData;
}
export const cssBackground = (v) => {
  let background = '{'
  background += split_bg(v.bgType, v.bgImage, v.bgimgPosition, v.bgimgAttachment, v.bgimgRepeat, v.bgimgSize, v.bgDefaultColor, v.bgGradient)
  background += '}'
  if (v.bgType == 'video') {
    if (v.bgVideoFallback) {
      if (v.bgVideoFallback.url) {
        background += 'background-image: url(' + v.bgVideoFallback.url + '); background-position: center; background-repeat: no-repeat; background-size: cover;'
      }
    }
  }
  if (background != '{}') { return background }
  return {};
}

// CSS ColorAdvanced
export const cssColor = (v) => {
  let data = (v.clip ? '-webkit-background-clip: text; -webkit-text-fill-color: transparent;' : '');
  if (v.type == 'color') {
    data += (v.color ? 'background-image: none; background-color: ' + v.color + ';' : '')
  } else if (v.type == 'gradient' && v.gradient) {
    if (v.gradient && v.gradient.type == 'linear') {
      data += 'background-image : linear-gradient(' + v.gradient.direction + 'deg, ' + v.gradient.color1 + ' ' + v.gradient.start + '%,' + v.gradient.color2 + ' ' + v.gradient.stop + '%);'
    } else {
      data += 'background-image : radial-gradient( circle at ' + v.gradient.radial + ' , ' + v.gradient.color1 + ' ' + v.gradient.start + '%,' + v.gradient.color2 + ' ' + v.gradient.stop + '%);'
    }
  }
  if (v.replace) {
    return data;
  } else {
    return '{' + data + '}';
  }
}