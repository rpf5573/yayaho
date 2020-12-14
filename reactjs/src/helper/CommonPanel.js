const { __ } = wp.i18n
const { Fragment } = wp.element
const { addQueryArgs } = wp.url
import { FieldGenerator } from './FieldGenerator'
import icons from '../helper/icons'

const fetchTaxonomy = (tax) => {
    let category = []
    if( tax ){
        const query = addQueryArgs(
            '/ultp/taxonomy', { taxonomy: tax, wpnonce: ultp_data.security }
        );
        wp.apiFetch( { path: query } ).then((obj) => {
            Object.keys(obj).forEach(function(key) {
                category.push( {value:key,label:obj[key]} )
            });
        })
    }
    return category;
}
const cat = fetchTaxonomy('category')
const tag = fetchTaxonomy('post_tag')

const fetchImageSize = () => {
    let imageSize = []
    const query = addQueryArgs(
        '/ultp/imagesize', { wpnonce: ultp_data.security }
    );
    wp.apiFetch( { path: query } ).then((obj) => {
        Object.keys(obj).forEach(function(key) {
            imageSize.push( {value:key,label:obj[key]} )
        });
    });
    return imageSize;
}

const fetchPostType = () => {
    let postType = []
    const query = addQueryArgs(
        '/ultp/posttype', { wpnonce: ultp_data.security }
    );
    wp.apiFetch( { path: query } ).then((obj) => {
        Object.keys(obj).forEach(function(key) {
            postType.push( {value:key,label:obj[key]} )
        });
    });
    return postType;
}

const filterFields = (include, exclude, args) => {
    let data = args
    if(exclude){
        exclude.forEach( val => {
            data = data.filter( el => el.key != val );
        });
    }
    if(include){
        include.forEach( val => {
            if( val.data){
                if (data[val.position]) {
                    if (data[val.position].key != val.data.key) {
                        data.splice(val.position, 0, val.data)
                    }
                } else {
                    data.push(val.data)
                }
            }
        });
    }
    return data;
}


// Category - Style
const CategoryStyleArg = [
    { type:'select',key:'catStyle',label:'Category Style', options:[
        {value:'classic',label:'Classic'},
        {value:'borderLeft',label:'Left Border'},
        {value:'borderRight',label:'Right Border'},
        {value:'borderBoth',label:'Both Side Border'},
    ]},
    { type:'select',key:'catPosition',label:'Position', options:[
        {value:'aboveTitle',label:'Above Title'},
        {value:'topLeft',label:'Over Image(Top Left)'},
        {value:'topRight',label:'Over Image(Top Right)'},
        {value:'bottomLeft',label:'Over Image(Bottom Left)'},
        {value:'bottomRight',label:'Over Image(Bottom Right)'},
        {value:'centerCenter',label:'Over Image(Center)'},
    ]},
    { type:'range',key:'catLineWidth',min:0, max:80, step:1, responsive:true, label:'Line Width' },
    { type:'range',key:'catLineSpacing',min:0, max:100, step:1, responsive:true, label:'Line Spacing' },
    { type:'typography',key:'catTypo',label:'Typography' },
    { type:'toggle',key:'customCatColor',label:'Specific Color (Pro)', customClass: 'ultp-pro-field', pro: true },
    { type:'linkbutton',key:'seperatorLink', placeholder:'sjdhjsdh', label:'Category Specific (Pro)',text:'Choose Color' },
    { type:'toggle',key:'onlyCatColor',label:'Only Category Color (Pro)' },
    { type:'tab', content:[
        { name:'normal', title:'Normal', options:[
            { type:'color',key:'catColor',label:'Color'},
            { type:'color2',key:'catBgColor',label:'Background Color' },
            { type:'color',key:'catLineColor',label:'Line Color' },
            { type:'border',key:'catBorder',label:'Border' },
        ]},
        { name:'hover', title:'Hover', options:[
            { type:'color',key:'catHoverColor',label:'Hover Color'},
            { type:'color2',key:'catBgHoverColor',label:'Hover Bg Color' },
            { type:'color',key:'catLineHoverColor',label:'Line Hover Color' },
            { type:'border',key:'catHoverBorder',label:'Hover Border'},
        ]},
    ]},
    { type:'dimension',key:'catRadius',label:'Border Radius', step:1, unit:true, responsive:true },
    { type:'dimension',key:'catSacing',label:'Spacing', step:1, unit:true, responsive:true },
    { type:'dimension',key:'catPadding',label:'Padding', step:1, unit:true, responsive:true },
];


// Button - Style
const ButtonStyleArg = [
    { type:'typography',key:'btnTypo',label:'Typography' },
    { type:'tab', content:[
        { name:'normal', title:'Normal', options:[
            { type:'color',key:'btnColor',label:'Color'},
            { type:'color2',key:'btnBgColor',label:'Background Color' },
            { type:'border',key:'btnBorder',label:'Border' },
            { type:'dimension',key:'btnRadius',label:'Border Radius', step:1, unit:true, responsive:true },
            { type:'boxshadow',key:'btnShadow',label:'BoxShadow' },
        ]},
        { name:'hover', title:'Hover', options:[
            { type:'color',key:'btnHoverColor',label:'Hover Color'},
            { type:'color2',key:'btnBgHoverColor',label:'Hover Bg Color' },
            { type:'border',key:'btnHoverBorder',label:'Hover Border'},
            { type:'dimension',key:'btnHoverRadius',label:'Hover Radius', step:1, unit:true, responsive:true },
            { type:'boxshadow',key:'btnHoverShadow',label:'Hover BoxShadow' },
        ]},
    ]},
    
    { type:'dimension',key:'btnSacing',label:'Spacing', step:1, unit:true, responsive:true },
    { type:'dimension',key:'btnPadding',label:'Padding', step:1, unit:true, responsive:true },
];

// General - Content
const GeneralArg = [
    { type:'select',key:'itemView',label:'layout View', options:[
        {value:'grid',label:'Grid View'},
        {value:'customgrid',label:'Costom Grid'},
        {value:'slide',label:'Slide View'}]
    },
    { type:'range',key:'queryNumber',min:-1, max:50, label:'Number of Post' },
    { type:'range',key:'slidesToShow',min:1, max:8, step:1, label:'Number of Slide' },
    { type:'select',key:'customgrid',label:'Custom Grid', options:[
        {value:'layout1',label:'layout 1'},
        {value:'layout2',label:'layout 2'},
        {value:'layout3',label:'layout 3'},
    ]},
    { type:'range',key:'columns',min:1, max:7, step:1, responsive:true, label:'Columns' },
    { type:'range',key:'columnGridGap',min:0, max:120, step:1, responsive:true, unit:['px','em'], label:'Gap' },
    { type:'range',key:'columnGap',min:0, max:120, step:1, responsive:true, unit:['px','em'], label:'Column Gap' },
    { type:'range',key:'rowGap',min:0, max:120, step:1, responsive:true, unit:['px','em'], label:'Row Gap' },
    { type:'toggle',key:'autoPlay',label:'Auto Play' },
    { type:'range',key:'slideSpeed',min:0, max:10000, step:100, label:'Slide Speed' },
    { type:'toggle',key:'dots',label:'Dots' },
    { type:'toggle',key:'arrows',label:'Arrows' },
    { type:'toggle',key:'headingShow',label:'Heading' },
    { type:'toggle',key:'titleShow',label:'Title' },
    { type:'toggle',key:'excerptShow',label:'Excerpt' },
    { type:'toggle',key:'catShow',label:'Category' },
    { type:'toggle',key:'metaShow',label:'Meta' },
    { type:'toggle',key:'showImage',label:'Image' },
    { type:'toggle',key:'readMore',label:'Read More' },
    { type:'toggle',key:'filterShow',label:'Filter' },
    { type:'toggle',key:'paginationShow',label:'Pagination' },
    { type:'alignment',key:'contentAlign', responsive:false, label:'Alignment', disableJustify:true },
];

// ReadMore - Style
const ReadMoreStyleArg = [
    { type:'text',key:'readMoreText', label:'Read More Text' },
    { type:'select',key:'readMoreIcon',label:'Icon Style', options:[
        {value:'',label:'None',icon:''},
        {value:'rightAngle',label:'Angel',icon:'rightAngle'},
        {value:'rightAngle2',label:'Arrow',icon:'rightAngle2'},
        {value:'rightArrowLg',label:'Long Arrow',icon:'rightArrowLg'},
    ]},
    { type:'typography',key:'readMoreTypo',label:'Typography' },
    { type:'range',key:'readMoreIconSize',min:0, max:80, step:1, responsive:true, unit:true, label:'Icon Size' },
    { type:'tab', content:[
        { name:'normal', title:'Normal', options:[
            { type:'color',key:'readMoreColor',label:'Color'},
            { type:'color2',key:'readMoreBgColor',label:'Background Color' },
            { type:'border',key:'readMoreBorder',label:'Border' },
            { type:'dimension',key:'readMoreRadius',label:'Border Radius', step:1, unit:true, responsive:true },
        ]},
        { name:'hover', title:'Hover', options:[
            { type:'color',key:'readMoreHoverColor',label:'Hover Color'},
            { type:'color2',key:'readMoreBgHoverColor',label:'Hover Bg Color' },
            { type:'border',key:'readMoreHoverBorder',label:'Hover Border'},
            { type:'dimension',key:'readMoreHoverRadius',label:'Hover Radius', step:1, unit:true, responsive:true },
        ]},
    ]},
    { type:'dimension',key:'readMoreSacing',label:'Spacing', step:1, unit:true, responsive:true },
    { type:'dimension',key:'readMorePadding',label:'Padding', step:1, unit:true, responsive:true },
];

//counter circle
const CounterStyleArg = [
    { type:'typography',key:'counterTypo',label:'Typography' },
    { type:'color',key:'counterColor',label:'Color'},
    { type:'color2',key:'counterBgColor',label:'Background Color' },
    { type:'range',key:'counterWidth',min:1, max:300, step:1, label:'Width' },
    { type:'range',key:'counterHeight',min:1, max:300, step:1, label:'Height' },
    { type:'border',key:'counterBorder',label:'Border' },
    { type:'dimension',key:'counterRadius',label:'Border Radius', step:1, unit:true, responsive:true },
];

// Arrow - Content
const ArrowContentArg = [
    { type:'select',key:'arrowStyle',label:'Arrow Style', options:[
        {value:'leftAngle#rightAngle',label:'Style 1', icon:'leftAngle'},
        {value:'leftAngle2#rightAngle2',label:'Style 2', icon:'leftAngle2'},
        {value:'leftArrowLg#rightArrowLg',label:'Style 3', icon:'leftArrowLg'},
    ]},

    // Style
    { type:'separator',key:'separatorStyle',label:'Arrow Style' },
    { type:'range',key:'arrowSize',min:0, max:80, step:1, responsive:true, unit:true, label:'Size' },
    { type:'range',key:'arrowWidth',min:0, max:80, step:1, responsive:true, unit:true, label:'Width' },
    { type:'range',key:'arrowHeight',min:0, max:80, step:1, responsive:true, unit:true, label:'Height' },
    { type:'range',key:'arrowVartical',min:-200, max:500, step:1, responsive:true, unit:true, label:'Vertical Position' },
    { type:'tab', content:[
        { name:'normal', title:'Normal', options:[
            { type:'color',key:'arrowColor',label:'Color'},
            { type:'color',key:'arrowBg',label:'Background Color' },
            { type:'border',key:'arrowBorder',label:'Border' },
            { type:'dimension',key:'arrowRadius',label:'Border Radius', step:1, unit:true, responsive:true },
            { type:'boxshadow',key:'arrowShadow',label:'BoxShadow' },
        ]},
        { name:'hover', title:'Hover', options:[
            { type:'color',key:'arrowHoverColor',label:'Hover Color'},
            { type:'color',key:'arrowHoverBg',label:'Hover Bg Color' },
            { type:'border',key:'arrowHoverBorder',label:'Hover Border'},
            { type:'dimension',key:'arrowHoverRadius',label:'Hover Radius', step:1, unit:true, responsive:true },
            { type:'boxshadow',key:'arrowHoverShadow',label:'Hover BoxShadow' },
        ]},
    ]},
];


// Dot - Style
const DotStyleArg = [
    { type:'range',key:'dotSpace',min:0, max:100, step:1, unit:true, responsive:true, label:'Space' },
    { type:'range',key:'dotVartical',min:-200, max:700, step:1, unit:true, responsive:true, label:'Vertical Position' },
    { type:'range',key:'dotHorizontal',min:-800, max:800, step:1, unit:true, responsive:true, label:'Horizontal Position' },
    { type:'tab', content:[
        { name:'normal', title:'Normal', options:[
            { type:'range',key:'dotWidth',min:0, max:100, step:1, responsive:true, label:'Width' },
            { type:'range',key:'dotHeight',min:0, max:100, step:1, unit:true, responsive:true, label:'Height' },
            { type:'color',key:'dotBg',label:'Background Color' },
            { type:'border',key:'dotBorder',label:'Border' },
            { type:'dimension',key:'dotRadius',label:'Border Radius', step:1, unit:true, responsive:true },
            { type:'boxshadow',key:'dotShadow',label:'BoxShadow' },
        ]},
        { name:'hover', title:'Active', options:[
            { type:'range',key:'dotHoverWidth',min:0, max:100, step:1, responsive:true, label:'Width' },
            { type:'range',key:'dotHoverHeight',min:0, max:100, step:1, unit:true, responsive:true, label:'Height' },
            { type:'color',key:'dotHoverBg',label:'Hover Bg Color' },
            { type:'border',key:'dotHoverBorder',label:'Hover Border'},
            { type:'dimension',key:'dotHoverRadius',label:'Hover Radius', step:1, unit:true, responsive:true },
            { type:'boxshadow',key:'dotHoverShadow',label:'Hover BoxShadow' },
        ]},
    ]},
];

// Query - Content
const QueryArg = [
    { type:'select',key:'queryQuick',label:'Quick Query', customClass: 'ultp-pro-field', pro: true, options:[
        {value:'', label:'- Select Advance Query -'},
        {value:'sticky_posts', label:'Sticky Post'},
        {value:'most_comment', label:'Most Comment'},
        {value:'most_comment_1_day', label:'Most Comment (1 Day)'},
        {value:'most_comment_7_days', label:'Most Comment (7 Days)'},
        {value:'most_comment_30_days', label:'Most Comment (30 Days)'},
        {value:'popular_post_1_day_view', label:'Popular Post (1 Day - View Counter)'},
        {value:'popular_post_7_days_view', label:'Popular Post (7 Days - View Counter)'},
        {value:'popular_post_30_days_view', label:'Popular Post (30 Days - View Counter)'},
        {value:'popular_post_all_times_view', label:'Popular Post (All Time - View Counter)'},
        {value:'random_post', label:'Random Post'},
        {value:'random_post_7_days', label:'Random Post (7 Days)'},
        {value:'random_post_30_days', label:'Random Post (30 Days)'},
        {value:'latest_post_published', label:'Latest Posts - Published Date'},
        {value:'latest_post_modified', label:'Latest Posts - Modified Date'},
        {value:'oldest_post_published', label:'Oldest Post - Published Date'},
        {value:'oldest_post_modified', label:'Oldest Post - Modified Date'},
        {value:'alphabet_asc', label:'Alphabet ASC'},
        {value:'alphabet_desc', label:'Alphabet DESC'},
    ]},
    { type:'select',key:'queryType',label:'Post Type', options: fetchPostType() },
    { type:'range',key:'queryNumber',min:-1, max:50, label:'Number of Post' },
    { type:'tag',key:'queryTax',label:'Taxonomy', disabled:true, options:[
        {value:'category',label:'Category'},
        {value:'post_tag',label:'Tag'},
    ]},
    { type:'select',key:'queryCat',label:'Category', multiple:true, options: cat },
    { type:'select',key:'queryTag',label:'Tags', multiple:true, options: tag },
    { type:'select',key:'queryOrderBy',label:'Order By', options:[
        {value:'title',label:'Title'},
        {value:'comment_count',label:'Comment Count'},
        {value:'meta_value_num',label:'Meta Value Number'},
        {value:'menu_order',label:'Menu Order'},
        {value:'date',label:'Date'},
        {value:'modified',label:'Modified'},
        {value:'rand',label:'Random'},
    ]},
    { type:'text',key:'metaKey', label:'Meta Key' },
    { type:'tag',key:'queryOrder',label:'Order', options:[
        {value:'asc',label:'ASC'},
        {value:'desc',label:'DESC'},
    ]},
    { type:'text',key:'queryInclude', label:'Include Post', placeholder: 'Note: Separate post id with comma' },
    { type:'text',key:'queryExclude', label:'Exclude Post', placeholder: 'Note: Separate post id with comma' },
    { type:'range',key:'queryOffset',min:0, max:50, step:1, label:'Offset Post' },
];

// Content - Style
const OverlayStyleArg = [
    { type:'tag',key:'overlayContentPosition',label:'Content Position', disabled:true, options:[
        {value:'topPosition',label:'Top'},
        {value:'middlePosition',label:'Middle'},
        {value:'bottomPosition',label:'Bottom'},
    ]},
    // { type:'range',key:'overlayHeight',min:0, max:800, step:1, unit:true, responsive:true, label:'Height' },
    // { type:'range',key:'overlaySmallHeight',min:0, max:400, step:1, unit:true, responsive:true, label:'Small Height' },
    { type:'color2',key:'overlayBgColor',label:'Content Background', pro: true, customClass: 'ultp-pro-field' },
    { type:'dimension',key:'overlayWrapPadding',label:'Padding', step:1, unit:true, responsive:true },
];

// Wrap - Style
const WrapStyleArg = [
    { type:'range',key:'contenWraptWidth',min:0, max:800, step:1, unit:true, responsive:true, label:'Width' },
    { type:'range',key:'contenWraptHeight',min:0, max:500, step:1, unit:true, responsive:true, label:'Height' },
    { type:'tab', content:[
        { name:'normal', title:'Normal', options:[
            { type:'color',key:'contentWrapBg',label:'Background Color' },
            { type:'border',key:'contentWrapBorder',label:'Border' },
            { type:'dimension',key:'contentWrapRadius',label:'Border Radius', step:1, unit:true, responsive:true },
            { type:'boxshadow',key:'contentWrapShadow',label:'BoxShadow' },
        ]},
        { name:'hover', title:'Hover', options:[
            { type:'color',key:'contentWrapHoverBg',label:'Hover Bg Color' },
            { type:'border',key:'contentWrapHoverBorder',label:'Hover Border'},
            { type:'dimension',key:'contentWrapHoverRadius',label:'Hover Radius', step:1, unit:true, responsive:true },
            { type:'boxshadow',key:'contentWrapHoverShadow',label:'Hover BoxShadow' },
        ]},
    ]},
    { type:'dimension',key:'contentWrapInnerPadding',label:'Inner Padding', step:1, unit:true, responsive:true },
    { type:'dimension',key:'contentWrapPadding',label:'Padding', step:1, unit:true, responsive:true },
];

// Heading - Content
const HeadingContentArg = [
    { type:'text',key:'headingText', label:'Add Heading' },
    { type:'alignment',key:'headingAlign', label:'Alignment', disableJustify:true },
    { type:'select',key:'headingStyle',label:'Heading Style', options:[
        {value:'style1',label:'Style 1'},
        {value:'style2',label:'Style 2'},
        {value:'style3',label:'Style 3'},
        {value:'style4',label:'Style 4'},
        {value:'style5',label:'Style 5'},
        {value:'style6',label:'Style 6'},
        {value:'style7',label:'Style 7'},
        {value:'style8',label:'Style 8'},
        {value:'style9',label:'Style 9'},
        {value:'style10',label:'Style 10'},
        {value:'style11',label:'Style 11'},
        {value:'style12',label:'Style 12'},
        {value:'style13',label:'Style 13'},
        {value:'style14',label:'Style 14'},
        {value:'style15',label:'Style 15'},
        {value:'style16',label:'Style 16'},
        {value:'style17',label:'Style 17'},
        {value:'style18',label:'Style 18'},
        {value:'style19',label:'Style 19'},
        {value:'style20',label:'Style 20'},
    ]},
    { type:'tag',key:'headingTag',label:'Heading Tag', options:
        [{value:'h1',label:'H1'},
        {value:'h2',label:'H2'},
        {value:'h3',label:'H3'},
        {value:'h4',label:'H4'},
        {value:'h5',label:'H5'},
        {value:'h6',label:'H6'},
        {value:'span',label:'span'},
        {value:'p',label:'p'}
    ]
    },
    { type:'text',key:'headingBtnText', label:'Button Text' },
    { type:'text',key:'headingURL', label:'Heading URL' },
    // Style
    { type:'separator',key:'separatorStyle',label:'Heading Style' },
    { type:'typography',key:'headingTypo',label:'Typography' },
    { type:'color',key:'headingColor',label:'Color' },
    { type:'color',key:'headingBg',label:'Background' },
    { type:'color',key:'headingBg2',label:'Background 2' },
    { type:'color',key:'headingBorderBottomColor',label:'Border Color', clip:true },
    { type:'color',key:'headingBorderBottomColor2',label:'Border Color 2', clip:true },
    { type:'range',key:'headingBorder',label:'Border Size', min:1, max:20, step:1 },
    { type:'typography',key:'headingBtnTypo',label:'Button Typography' },
    { type:'color',key:'headingBtnColor',label:'Button Color' },
    { type:'color',key:'headingBtnHoverColor',label:'Button Hover Color' },
    { type:'range',key:'headingSpacing',label:'Spacing', min:1, max:150, step:1, unit:true, responsive:true },
    { type:'dimension',key:'headingRadius',label:'Border Radius', step:1, unit:true, responsive:true },
    { type:'dimension',key:'headingPadding',label:'Padding', step:1, unit:true, responsive:true },

    { type:'separator',key:'subHeadingSeparator',label:'Sub Heading' },
    { type:'toggle',key:'subHeadingShow',label:'Sub Heading' },
    { type:'textarea',key:'subHeadingText', label:'Sub Heading Text' },
    // Style
    { type:'typography',key:'subHeadingTypo',label:'Typography' },
    { type:'color',key:'subHeadingColor',label:'Color' },
    { type:'dimension',key:'subHeadingSpacing',label:'Spacing', step:1, unit:true, responsive:true },
];


// Image - Style
const ImageStyleArg = [
    { type:'select',key:'imgCrop',label:'Large Item', options: fetchImageSize() },
    { type:'select',key:'imgCropSmall',label:'Small Item', options: fetchImageSize() },
    { type:'select',key:'imgAnimation',label:'Hover Animation', options:[
        {value:'none',label:'No Animation'},
        {value:'zoomIn',label:'Zoom In'},
        {value:'zoomOut',label:'Zoom Out'},
        {value:'opacity',label:'Opacity'},
        {value:'roateLeft',label:'Rotate Left'},
        {value:'rotateRight',label:'Rotate Right'},
        {value:'slideLeft',label:'Slide Left'},
        {value:'slideRight',label:'Slide Right'},
    ]},
    { type:'range',key:'imgWidth',min:0, max:1000, step:1, responsive:true, unit:['px','em','%'], label:'Width' },
    { type:'range',key:'imgHeight',min:0, max:1000, step:1, responsive:true, unit:['px','em','%'], label:'Height' },
    { type:'tab', key:'imgTab', content:[
        { name:'Normal', title:'Normal', options:[
            { type:'range',key:'imgGrayScale',label:'Gray Scale', min:0, max:100, step:1, unit:['%'], responsive:true },
            { type:'dimension',key:'imgRadius',label:'Radius', step:1, unit:true, responsive:true },
            { type:'boxshadow',key:'imgShadow',label:'BoxShadow' },
        ]},
        { name:'tab2', title:'Hover', options:[
            { type:'range',key:'imgHoverGrayScale',label:'Hover Gray Scale', min:0, max:100, step:1, unit:['%'], responsive:true },
            { type:'dimension',key:'imgHoverRadius',label:'Hover Radius', step:1, unit:true, responsive:true },
            { type:'boxshadow',key:'imgHoverShadow',label:'Hover BoxShadow' },
        ]},
    ]},
    { type:'dimension',key:'imgMargin',label:'Margin', step:1, unit:true, responsive:true },
    { type:'toggle',key:'imgOverlay',label:'Overlay' },
    { type:'select',key:'imgOverlayType',label:'Overlay Type', options:[
        {value:'default',label:'Default'},
        {value:'simgleGradient',label:'Simple Gradient'},
        {value:'multiColour',label:'Multi Colour'},
        {value:'flat',label:'Flat'},
        {value:'custom',label:'Custom'},
    ] },
    { type:'color2',key:'overlayColor',label:'Custom Color' },
    { type:'range',key:'imgOpacity',min:0, max:1, step:0.05, label:'Overlay Opacity' },
];

// Title - Style
const TitleStyleArg = [
    { type:'tag',key:'titleTag',label:'Tag' },
    { type:'toggle',key:'titlePosition',label:'Below Meta' },
    { type:'color',key:'titleColor',label:'Color' },
    { type:'color',key:'titleHoverColor',label:'Hover Color' },
    { type:'typography',key:'titleTypo',label:'Typography' },
    { type:'dimension',key:'titlePadding',label:'Padding', step:1, unit:true, responsive:true },
];

// Meta - Style
const MetaStyleArg = [
    { type:'tag',key:'metaPosition',label:'Meta Position', options:[
        {value:'top',label:'Top'},
        {value:'bottom',label:'Bottom'}
    ]},
    { type:'select',key:'metaStyle',label:'Style', options:[
        {value:'noIcon',label:'No Icon'},
        {value:'icon',label:'With Icon'},
        {value:'style2',label:'Style2'},
        {value:'style3',label:'Style3'},
        {value:'style4',label:'Style4'},
        {value:'style5',label:'Style5'},
        {value:'style6',label:'Style6'},
    ]},
    { type:'select',key:'metaSeparator',label:'Separator', options:[
        {value:'dot',label:'Dot'},
        {value:'slash',label:'Slash'},
        {value:'doubleslash',label:'Double Slash'},
        {value:'close',label:'Close'},
        {value:'dash',label:'Dash'},
        {value:'verticalbar',label:'Vertical Bar'},
        {value:'emptyspace',label:'Empty'},
    ]},
    { type:'select',key:'metaList',label:'Meta', multiple:true,
        options:[
            {value:'metaAuthor',label:'Author'},
            {value:'metaDate',label:'Date'},
            {value:'metaComments',label:'Comment'},
            {value:'metaView',label:'View Count'},
            {value:'metaTime',label:'Date Time'},
            {value:'metaRead',label:'Reading Time'},
        ]
    },
    { type:'select',key:'metaListSmall',label:'Small Item Meta', multiple:true,
        options:[
            {value:'metaAuthor',label:'Author'},
            {value:'metaDate',label:'Date'},
            {value:'metaComments',label:'Comment'},
            {value:'metaView',label:'View Count'},
            {value:'metaTime',label:'Date Time'},
            {value:'metaRead',label:'Reading Time'},
        ] 
    },
    { type:'typography',key:'metaTypo',label:'Typography' },
    { type:'color',key:'metaColor',label:'Color' },
    { type:'color',key:'metaHoverColor',label:'Hover Color'},
    { type:'range',key:'metaSpacing',label:'Spacing', min:0, max:50, step:1, unit:true, responsive:true },
    { type:'dimension',key:'metaMargin',label:'Margin', step:1, unit:true, responsive:true },
    { type:'dimension',key:'metaPadding',label:'Padding', step:1, unit:true, responsive:true },
    { type:'color',key:'metaBg',label:'Background' },
    { type:'border',key:'metaBorder',label:'Border'},
];

// Excerpt - Style
const ExcerptStyleArg = [
    { type:'toggle',key:'showFullExcerpt', label:'Show Full Excerpt' },
    { type:'range',key:'excerptLimit',min:1, max:200, step:1, label:'Excerpt Limit' },
    { type:'typography',key:'excerptTypo',label:'Typography' },
    { type:'color',key:'excerptColor',label:'Color' },
    { type:'dimension',key:'excerptPadding',label:'Padding', step:1, unit:true, responsive:true },
];

// Filter - Content
const FilterContentArg = [
    { type:'text',key:'filterText', label:'All Filter Text' },
    { type:'select',key:'filterType',label:'Filter Type', options:[
        {value:'category',label:'Category'},
        {value:'post_tag',label:'Tag'},
    ]},
    { type:'select',key:'filterCat',label:'Category', multiple:true, options: cat },
    { type:'select',key:'filterTag',label:'Tags', multiple:true, options: tag },
    // Style
    { type:'typography',key:'fliterTypo',label:'Typography' },
    { type:'tab', content:[
        { name:'normal', title:'Normal', options:[
            { type:'color',key:'filterColor',label:'Color' },
            { type:'color',key:'filterBgColor',label:'Background Color' },
            { type:'border',key:'filterBorder',label:'Border'},
        ]},
        { name:'hover', title:'Hover', options:[
            { type:'color',key:'filterHoverColor',label:'Hover Color' },
            { type:'color',key:'filterHoverBgColor',label:'Hover Bg Color' },
            { type:'border',key:'filterHoverBorder',label:'Hover Border'},
        ]},
    ]},
    { type:'dimension',key:'filterRadius',label:'Border Radius', step:1, unit:true, responsive:true },
    { type:'dimension',key:'fliterSpacing',label:'Margin', step:1, unit:true, responsive:true },
    { type:'dimension',key:'fliterPadding',label:'Padding', step:1, unit:true, responsive:true },
    { type:'color',key:'filterDropdownColor',label:'Dropdown Text Color' },
    { type:'color',key:'filterDropdownHoverColor',label:'Dropdown Hover Color' },
    { type:'color',key:'filterDropdownBg',label:'Dropdown Background'},
    { type:'range',key:'filterDropdownRadius',min:0, max:300, step:1, responsive:true, unit:['px','em','%'], label:'Dropdown Radius' },
    { type:'dimension',key:'filterDropdownPadding',label:'Dropdown Padding', step:1, unit:true, responsive:true },
];

// Separator - Style
const SeparatorStyleArg = [
    { type:'toggle',key:'separatorShow',label:'Show Separator' },
    { type:'color',key:'septColor',label:'Border Color' },
    { type:'range',key:'septSize',min:0, max:20, step:1, label:'Border Size' },
    { type:'select',key:'septStyle',label:'Border Style', options:[
        {value:'none',label:'None'},
        {value:'solid',label:'Solid'},
        {value:'dashed',label:'Dashed'},
        {value:'dotted',label:'Dotted'},
        {value:'double',label:'Double'},
    ] },
    { type:'range',key:'septSpace',min:0, max:80, step:1, responsive:true, label:'Spacing' },
];

// Pagination - Content
const PaginationContentArg = [
    { type:'select',key:'paginationType',label:'Pagination Type', options:[
        {value:'loadMore',label:'Load More'},
        {value:'navigation',label:'Navigation'},
        {value:'pagination',label:'Pagination'},
    ]},
    { type:'text',key:'loadMoreText', label:'Loadmore Text' },
    { type:'alignment',key:'pagiAlign', responsive:true, label:'Alignment', disableJustify:true },
    { type:'select',key:'paginationNav',label:'Pagination', options:[
        {value:'textArrow',label:'Text & Arrow'},
        {value:'onlyarrow',label:'Only Arrow'},
    ]},
    { type:'toggle',key:'paginationAjax',label:'Ajax Pagination' },
    { type:'select',key:'navPosition',label:'Navigation Position', options:[
        {value:'topRight',label:'Top Right'},
        {value:'bottomLeft',label:'Bottom'},
    ]},

    // Styles
    { type:'typography',key:'pagiTypo',label:'Typography' },
    { type:'range',key:'pagiArrowSize',min:0, max:100, step:1, responsive:true, label:'Arrow Size' },
    { type:'tab', content:[
        { name:'normal', title:'Normal', options:[
            { type:'color',key:'pagiColor',label:'Color', clip:true },
            { type:'color2',key:'pagiBgColor',label:'Background Color' },
            { type:'border',key:'pagiBorder',label:'Border'},
            { type:'boxshadow',key:'pagiShadow',label:'BoxShadow' },
            { type:'dimension',key:'pagiRadius',label:'Border Radius', step:1, unit:true, responsive:true },
        ]},
        { name:'hover', title:'Hover', options:[
            { type:'color',key:'pagiHoverColor',label:'Hover Color', clip:true },
            { type:'color2',key:'pagiHoverbg',label:'Hover Bg Color' },
            { type:'border',key:'pagiHoverBorder',label:'Hover Border'},
            { type:'boxshadow',key:'pagiHoverShadow',label:'BoxShadow' },
            { type:'dimension',key:'pagiHoverRadius',label:'Hover Radius', step:1, unit:true, responsive:true },
        ]},
    ]},
    { type:'dimension',key:'pagiMargin',label:'Margin', step:1, unit:true, responsive:true },
    { type:'dimension',key:'navMargin',label:'Margin', step:1, unit:true, responsive:true },
    { type:'dimension',key:'pagiPadding',label:'Padding', step:1, unit:true, responsive:true },
];

// General - Advanced 
const GeneralAdvanceedArg = [
    { type:'text',key:'advanceId', label:'ID' },
    { type:'range',key:'advanceZindex',min:-100, max:10000, step:1, label:'z-index' },
    { type:'dimension',key:'wrapMargin',label:'Margin', step:1, unit:true, responsive:true },
    { type:'dimension',key:'wrapOuterPadding',label:'Padding', step:1, unit:true, responsive:true },
    { type:'tab', content:[
        { name:'normal', title:'Normal', options:[
            { type:'color2',key:'wrapBg',label:'Background' },
            { type:'border',key:'wrapBorder',label:'Border' },
            { type:'boxshadow',key:'wrapShadow',label:'BoxShadow' },
            { type:'dimension',key:'wrapRadius',label:'Border Radius', step:1, unit:true, responsive:true },
        ]},
        { name:'hover', title:'Hover', options:[
            { type:'color2',key:'wrapHoverBackground',label:'Background' },
            { type:'border',key:'wrapHoverBorder',label:'Hover Border'},
            { type:'boxshadow',key:'wrapHoverShadow',label:'Hover BoxShadow' },
            { type:'dimension',key:'wrapHoverRadius',label:'Hover Radius', step:1, unit:true, responsive:true },
        ]},
    ]},
];

// Custom CSS - Advanced
const CustomCssAdvancedArg = [
    { type:'textarea',key:'advanceCss', placeholder: 'Add {{ULTP}} before the selector to wrap element.' },
];

const DesignArg = [
    { type:'template', key:'design' },
]

const LayoutArg = [];

const Layout = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={__('Layout')}
        block={props.block}
        store={props.store}
        data={props.data}/>
    )
};

const HeadingContent = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={__('Heading')}
        store={props.store}
        data={filterFields(props.include, props.exclude, HeadingContentArg)}/>
    )
};

const GeneralContent = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'General' ) }
        store={props.store}
        data={filterFields(props.include, props.exclude, GeneralArg)}/>
    )
};

const QueryContent = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Query' ) }
        store={props.store}
        data={ filterFields(props.include, props.exclude, QueryArg) }/>
    )
};

const PaginationContent = (props) => { 
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={__('Pagination')}
        store={props.store}
        pro={props.pro}
        data={filterFields(props.include, props.exclude, PaginationContentArg)}/>
    )
};

const FilterContent = (props) => { 
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={__('Filter')}
        store={props.store}
        pro={props.pro}
        data={filterFields(props.include, props.exclude, FilterContentArg)}/>
    )
};

const ArrowContent = (props) => { 
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Arrow' ) }
        store={props.store}
        data={filterFields(props.include, props.exclude, ArrowContentArg)}/>
    )
};

const TitleStyle = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={__('Title')}
        store={props.store}
        data={filterFields(props.include, props.exclude, TitleStyleArg)}/>
    )
};   


const MetaStyle = (props) => { 
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Meta' ) }
        store={props.store}
        pro={props.pro}
        data={filterFields(props.include, props.exclude, MetaStyleArg)}/>
    )
};

const ImageStyle = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Image' ) }
        store={props.store}
        data={filterFields(props.include, props.exclude, ImageStyleArg)}/>
    )
};

const ExcerptStyle = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={__('Excerpt')}
        store={props.store}
        data={filterFields(props.include, props.exclude, ExcerptStyleArg)}/>
    )
};

const SeparatorStyle = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Separator' ) }
        store={props.store}
        data={filterFields(props.include, props.exclude, SeparatorStyleArg)}/>
    )
};

const CategoryStyle = (props) => { 
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Category' ) }
        store={props.store}
        pro={props.pro}
        data={filterFields(props.include, props.exclude, CategoryStyleArg)}/>
    )
};

const ButtonStyle = (props) => { 
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Button Style' ) }
        store={props.store}
        data={filterFields(props.include, props.exclude, ButtonStyleArg)}/>
    )
};

const WrapStyle = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={__('Content Wrap')}
        store={props.store}
        data={filterFields(props.include, props.exclude, WrapStyleArg)}/>
    )
};

const OverlayStyle = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={__('Content')}
        store={props.store}
        data={filterFields(props.include, props.exclude, OverlayStyleArg)}/>
    )
};

const DotStyle = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Dot' ) }
        store={props.store}
        data={filterFields(props.include, props.exclude, DotStyleArg)}/>
    )
};

const ReadMoreStyle = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Read More' ) }
        store={props.store}
        data={filterFields(props.include, props.exclude, ReadMoreStyleArg)}/>
    )
};

const CounterStyle = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Count Style' ) }
        store={props.store}
        data={filterFields(props.include, props.exclude, CounterStyleArg)}/>
    )
};
const GeneralAdvanced = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'General' ) }
        store={props.store}
        data={ filterFields(props.include, props.exclude, GeneralAdvanceedArg) }/>
    )
};

const CustomCssAdvanced = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Custom CSS' ) }
        store={props.store}
        data={ filterFields(props.include, props.exclude, CustomCssAdvancedArg) }/>
    )
};

const Design = (props) => {
    return (
        <FieldGenerator
        initialOpen={props.initialOpen||false}
        title={ __( 'Readymade Design' ) }
        store={props.store}
        data={ filterFields(props.include, props.exclude, DesignArg) }/>
    )
};


const SliderSetting = (settings = {}) => {
    const common = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: true,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        fade: false,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return Object.assign({}, common, settings);
}

const renderNavigation = () => {
    return (
        <div className={`ultp-next-prev-wrap`}>
            <ul> 
                <li>
                    <a class={`ultp-prev-action ultp-disable`} href="#"> 
                        {icons.leftAngle2}
                        <span className={`screen-reader-text`}>{ __( 'Previous' ) }</span>
                    </a>
                </li> 
                <li>
                    <a class={`ultp-prev-action`} href="#"> 
                        {icons.rightAngle2}
                        <span className={`screen-reader-text`}>{ __( 'Next' ) }</span> 
                    </a>
                </li> 
            </ul>
        </div>
    );
}

const renderPagination = (paginationNav, paginationAjax, pages = 4) => {
    return (
        <div className={'ultp-pagination-wrap' + (paginationAjax ? ' ultp-pagination-ajax-action' : '') }>
            <ul className={`ultp-pagination`}>
                <li><a href="#" className={`ultp-prev-page-numbers`}>{icons.leftAngle2}{paginationNav == 'textArrow' ? 'Previous ' : ''}</a></li>
                { pages > 4 && <li className={`ultp-first-dot`}><a href="#">...</a></li> }
                { (new Array(pages>2?3:pages).fill(0)).map( (v,i) => <li><a href="#">{i+1}</a></li> )}
                { pages > 4 && <li className={`ultp-last-dot`}><a href="#" >...</a></li> }
                { pages > 5 && <li className={`ultp-last-pages`}><a href="#" >{pages}</a></li> }
                <li><a href="#" className={`ultp-next-page-numbers`}>{paginationNav == 'textArrow' ? 'Next ' : ''}{icons.rightAngle2}</a></li>
            </ul>
        </div>
    )
}

const renderLoadmore = (loadMoreText) => {
    return (
        <div className={`ultp-loadmore`}>
            <a className={`ultp-loadmore-action`}>{loadMoreText}</a>
        </div>
    )
}



const renderFilter = (filterText, filterType, filterCat, filterTag) => {
    return (
        <div className={`ultp-filter-wrap`}>
            <ul className={`ultp-flex-menu`}>
                { filterText &&
                    <li className={`filter-item`}><a href="#">{filterText}</a></li>
                }
                {
                    JSON.parse(filterType == 'category'?filterCat:filterTag).map( v => <li className={`filter-item`}><a href="#">{v.replace(/-/g, " ")}</a></li> )
                }
            </ul>
        </div>
    )
}

const isReload = (prevAttr, attr, query = ['queryNumber', 'metaKey', 'queryType', 'queryTax', 'queryCat', 'queryTag', 'queryOrderBy', 'queryOrder', 'queryInclude', 'queryExclude', 'queryOffset', 'queryQuick']) => {
    let reload = false
    for (let i = 0; i < query.length; i++) {
        if (query[i] == 'queryCat' || query[i] == 'queryTag') {
            if(prevAttr[query[i]] && attr[query[i]]){
                if(prevAttr[query[i]].length != attr[query[i]].length){
                    reload = true; break;
                }
            }
        } else {
            if(prevAttr[query[i]]!=attr[query[i]]){
                reload = true; break;
            }
        }
    }
    return reload;
}

const attrBuild = (attr) => {
    let args = {wpnonce: ultp_data.security};
    const { queryNumber, queryType, queryTax, queryCat, queryTag, queryOrderBy, queryOrder, queryInclude, queryExclude, queryOffset, metaKey, queryQuick, filterShow, filterType } = attr;
    if (queryNumber) { args.count = queryNumber }
    if (queryType) { args.post_type = queryType }
    if (queryTax) {
        if (queryTax == 'category' && queryCat.length>2) {
            args.taxonomy = (JSON.parse(queryCat).map( v => 'category__'+v )).join('__')
        }
        if (queryTax == 'post_tag' && queryTag.length>2) {
            args.taxonomy = (JSON.parse(queryTag).map( v => 'post_tag__'+v )).join('__')
        }
    }
    if (queryOrderBy) { args.orderby = queryOrderBy }
    if (queryOrderBy && metaKey) {
        if (queryOrderBy == 'meta_value_num') {
            args.meta_key = metaKey;
        }
    }
    if (queryOrder) { args.order = queryOrder }
    if (queryInclude) { args.include = queryInclude.replace(/,/g, '__') }
    if (queryExclude) { args.exclude = queryExclude.replace(/,/g, '__') }
    if (queryOffset) { args.offset = queryOffset }
    if (queryQuick) { args.queryQuick = queryQuick }
    return args;
}

const renderExcerpt = (value, limit) => {
    const data = value.split(' ').splice(0, limit).join(' ')+'...';
    return <div className={`ultp-block-excerpt`}>{data}</div>
}

const renderMeta = (meta, post, metaSeparator, metaStyle) => {
    const authorImgOnly = meta.includes('metaAuthor') ? <span className={`ultp-block-author`}><img loading="lazy" className={`ultp-meta-author-img`} src={post.avatar_url}/></span> : ''
    const authorImg     = meta.includes('metaAuthor') ? <span className={`ultp-block-author`}><img loading="lazy" className={`ultp-meta-author-img`} src={post.avatar_url}/> {__('By')} <a target="_blank" href="#">{post.display_name}</a></span> : ''
    const authorIcon    = meta.includes('metaAuthor') ? <span className={`ultp-block-author`}>{icons.user}<a target="_blank" href="#">{post.display_name}</a></span> : ''
    const authorBy      = meta.includes('metaAuthor') ? <span className={`ultp-block-author`}>{__('By')}<a target="_blank" href={post.author_link}>{post.display_name}</a></span> : ''
    const date          = meta.includes('metaDate') ? <span className={`ultp-block-date`}>{post.time}</span> : ''
    const dateIcon      = meta.includes('metaDate') ? <span className={`ultp-block-date`}>{icons.calendar}{post.time}</span> : ''
    const comments      = meta.includes('metaComments') ? <span className={`ultp-post-comment`}>{ (post.comments === 0) ? post.comments + __(' comment') : post.comments + __(' comments') }</span>  : ''
    const commentsIcon  = meta.includes('metaComments') ? <span className={`ultp-post-comment`}>{icons.comment}{post.comments}</span> : ''
    const view          = meta.includes('metaView') ? <span className={`ultp-post-view`}>{ (post.view == 0) ? '0 view': post.view + ' views' }</span> : ''
    const viewIcon      = meta.includes('metaView') ? <span className={`ultp-post-view`}>{icons.view}{post.view}</span> : ''
    const postTime      = meta.includes('metaTime') ? <span className={`ultp-post-time`}>{post.post_time} {__('ago')}</span> : ''
    const postTimeIcon  = meta.includes('metaTime') ? <span className={`ultp-post-time`}>{icons.clock}{post.post_time} {__('ago')}</span> : ''
    const reading       = meta.includes('metaRead') ? <span className={`ultp-post-read`}>{post.reading_time}</span> : ''
    const readingIcon   = meta.includes('metaRead') ? <span className={`ultp-post-read`}>{icons.book}{post.reading_time}</span> : ''
    return (
        <div className={`ultp-block-meta ultp-block-meta-${metaSeparator} ultp-block-meta-${metaStyle}`}>
            {(metaStyle == 'noIcon') && <Fragment> {authorBy} {date} {comments} {view} {reading} {postTime}</Fragment> }
            {(metaStyle == 'icon') && <Fragment> { authorIcon } {dateIcon} {commentsIcon} {viewIcon} {postTimeIcon} {readingIcon}</Fragment> }
            {(metaStyle == 'style2') && <Fragment> { authorBy } {dateIcon} {commentsIcon} {viewIcon} {postTimeIcon} {readingIcon}</Fragment> }
            {(metaStyle == 'style3') && <Fragment> {authorImg} {dateIcon} {commentsIcon} {viewIcon} {postTimeIcon} {readingIcon}</Fragment> }
            {(metaStyle == 'style4') && <Fragment> { authorIcon } {dateIcon} {commentsIcon} {viewIcon} {postTimeIcon} {readingIcon}</Fragment> }
            {(metaStyle == 'style5') && <Fragment> <div className={`ultp-meta-media`}>{ authorImgOnly }</div> <div className={`ultp-meta-body`}>{authorBy} {dateIcon} {commentsIcon} {viewIcon} {postTimeIcon} {readingIcon}</div></Fragment> }
            {(metaStyle == 'style6') && <Fragment> { authorImgOnly } {authorBy} {dateIcon} {commentsIcon} {viewIcon} {postTimeIcon} {readingIcon}</Fragment> }
        </div>
    )
}

const renderCategory = (post, catShow, catStyle, catPosition, customCatColor, onlyCatColor) => {
    return post.category && catShow ? <div className={`ultp-category-grid ultp-category-${catStyle} ultp-category-${catPosition}`}><div className={`ultp-category-in ultp-customCatColor-${customCatColor}`}>{ post.category.map(v => 
        customCatColor ? 
            onlyCatColor ? 
                <a style={{color: v.color||'#CE2746' }}>{v.name}</a> 
                :
                <a className={`ultp-customCatOnlyColor-${customCatColor}`} style={{backgroundColor: v.color||'#CE2746', color:'#fff' }}>{v.name}</a> 
            : 
            <a>{v.name}</a>
    )}</div></div> : '';
}

const renderReadmore = (readMoreText, readMoreIcon) => {
    return <div className="ultp-block-readmore"><a>{readMoreText ? readMoreText : __( 'Read More' ) }{icons[readMoreIcon]}</a></div>
}

const renderTitle = (title, classname = '') => {
    return <h3 className={`ultp-block-title`}><a dangerouslySetInnerHTML={{__html: title }} /></h3>
}

const titleAnimationArg = [{ 
    position: 1, 
    data:{ 
        type:'select',
        key:'titleAnimation',
        label:'Content Animation', 
        pro: true,
        customClass: 'ultp-pro-field',
        options:[
            {value:'',label:'- None -'},
            {value:'slideup',label:'Slide Up'},
            {value:'slidedown',label:'Slide Down'}]
        }
}];

export { 
    // Functions
    isReload,
    attrBuild, 

    // Render
    renderTitle, 
    renderReadmore, 
    renderCategory, 
    renderMeta, 
    renderExcerpt, 
    renderNavigation, 
    renderPagination, 
    renderLoadmore, 
    renderFilter, 

    // Content & Style
    ReadMoreStyle, 
    CounterStyle,
    ArrowContent, 
    DotStyle, 
    OverlayStyle,
    WrapStyle,
    HeadingContent,
    ImageStyle,
    TitleStyle,
    GeneralContent,
    QueryContent,
    CategoryStyle,
    ButtonStyle,
    MetaStyle,
    ExcerptStyle,
    FilterContent,
    SeparatorStyle,
    PaginationContent,
    GeneralAdvanced,
    CustomCssAdvanced,

    Design,
    Layout,

    // Settings
    SliderSetting,
    titleAnimationArg
}