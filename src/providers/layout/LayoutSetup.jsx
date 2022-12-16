import {DefaultLayoutConfig} from './DefaultLayoutConfig'

const LAYOUT_CONFIG_KEY = import.meta.env.VITE_BASE_LAYOUT_CONFIG_KEY || 'LayoutConfig'

export function getLayout() {
  const ls = localStorage.getItem(LAYOUT_CONFIG_KEY)
  if (ls) {
    try {
      return JSON.parse(ls)
    } catch (er) {
      console.error(er)
    }
  }
  return DefaultLayoutConfig
}

function setLayout(config) {
  try {
    localStorage.setItem(LAYOUT_CONFIG_KEY, JSON.stringify(config))
  } catch (er) {
    console.error(er)
  }
}

export function getEmptyCssClasses() {
  return {
    header: [],
    headerContainer: [],
    headerMobile: [],
    headerMenu: [],
    aside: [],
    asideMenu: [],
    asideToggle: [],
    toolbar: [],
    toolbarContainer: [],
    content: [],
    contentContainer: [],
    footerContainer: [],
    sidebar: [],
    pageTitle: [],
  }
}

export function getEmptyHTMLAttributes() {
  return {
    asideMenu: new Map(),
    headerMobile: new Map(),
    headerMenu: new Map(),
    headerContainer: new Map(),
    pageTitle: new Map(),
  }
}

export function getEmptyCSSVariables() {
  return {
    body: new Map(),
  }
}

export class LayoutSetup {
  static isLoaded = false
  static config = getLayout()
  static classes = getEmptyCssClasses()
  static attributes = getEmptyHTMLAttributes()
  static cssVariables = getEmptyCSSVariables()

  static initCSSClasses() {
    LayoutSetup.classes = getEmptyCssClasses()
  }

  static initHTMLAttributes() {
    LayoutSetup.attributes = Object.assign({}, getEmptyHTMLAttributes())
  }

  static initCSSVariables() {
    LayoutSetup.cssVariables = getEmptyCSSVariables()
  }

  static initLayout(config) {
    if (config.main?.body?.backgroundImage) {
      document.body.style.backgroundImage = `url(${config.main.body.backgroundImage})`
    }
  }

  static initHeader(config) {
    LayoutSetup.classes.headerContainer.push(
      config.width === 'fluid' ? 'container-fluid' : 'container-xxl'
    )

    if (config.fixed.desktop) {
      document.body.classList.add('header-fixed')
    }

    if (config.fixed.tabletAndMobile) {
      document.body.classList.add('header-tablet-and-mobile-fixed')
    }
  }

  static initToolbar(config) {
    if (!config.display) {
      return
    }

    document.body.classList.add('toolbar-enabled')
    LayoutSetup.classes.toolbarContainer.push('container-fluid')
    if (config.width === 'fluid') {
      LayoutSetup.classes.toolbarContainer.push(
        config.width === 'fluid' ? 'container-fluid' : 'container-xxl'
      )
    }

    if (config.fixed?.desktop) {
      document.body.classList.add('toolbar-fixed')
    }

    if (config.fixed?.tabletAndMobileMode) {
      document.body.classList.add('toolbar-tablet-and-mobile-fixed')
    }
  }

  static initPageTitle(config) {
    if (!config.display) {
      return
    }

    if (config.responsive) {
      LayoutSetup.classes.pageTitle.push('mb-5 mb-lg-0')
      LayoutSetup.attributes.pageTitle.set('data-kt-swapper', 'true')
      LayoutSetup.attributes.pageTitle.set('data-kt-swapper-mode', 'prepend')
      LayoutSetup.attributes.pageTitle.set(
        'data-kt-swapper-parent',
        `{default: '#kt_content_container', '${config.responsiveBreakpoint}: ${config.responsiveTarget}'`
      )
    }
  }

  static initContent(config) {
    LayoutSetup.classes.contentContainer.push(
      config.width === 'fluid' ? 'container-fluid' : 'container-xxl'
    )
  }

  static initAside(config) {
    if (!config.display) {
      return
    }

    document.body.classList.add('aside-enabled')

    // Fixed aside
    if (config.fixed) {
      document.body.classList.add('aside-fixed')
    }
  }

  static initAsideMenu(config) {}

  static initFooter(config) {
    LayoutSetup.classes.footerContainer.push(
      `container-${config.width === 'fluid' ? 'fluid' : 'xxl'}`
    )
  }

  static initConfig(config) {
    // Init layout
    LayoutSetup.initLayout(config)
    if (config.main?.type !== 'default') {
      return
    }

    LayoutSetup.initHeader(config.header)
    LayoutSetup.initPageTitle(config.pageTitle)
    LayoutSetup.initToolbar(config.toolbar)
    LayoutSetup.initContent(config.content)
    LayoutSetup.initAside(config.aside)
    LayoutSetup.initFooter(config.footer)
    LayoutSetup.initAsideMenu(config.aside)
  }

  static updatePartialConfig(fieldsToUpdate) {
    const config = LayoutSetup.config
    const updatedConfig = {...config, ...fieldsToUpdate}
    LayoutSetup.initCSSClasses()
    LayoutSetup.initCSSVariables()
    LayoutSetup.initHTMLAttributes()
    LayoutSetup.isLoaded = false
    LayoutSetup.config = updatedConfig
    LayoutSetup.initConfig(Object.assign({}, updatedConfig))
    LayoutSetup.isLoaded = true // remove loading there
    return updatedConfig
  }

  static setConfig(config) {
    setLayout(config)
  }

  static bootstrap = (() => {
    LayoutSetup.updatePartialConfig(LayoutSetup.config)
  })()
}
