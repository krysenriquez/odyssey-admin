import {EventHandlerUtil} from '../_utils'

class ThemeMode {
  menu = null
  element = null

  getParamName = (postfix) => {
    const ktName = document.body.hasAttribute('data-name')
    const name = ktName ? ktName + '_' : ''
    return 'kt_' + name + 'theme_mode_' + postfix
  }

  getMode = () => {
    const modeParam = this.getParamName('value')
    const menuMode = this.getMenuMode()
    const defaultMode = 'light'
    if (!localStorage) {
      return defaultMode
    }

    const ls = localStorage.getItem(modeParam)
    if (ls) {
      return ls
    }

    const dataTheme = this.element?.getAttribute('data-theme')
    if (dataTheme) {
      return dataTheme
    }

    if (!menuMode) {
      return defaultMode
    }

    if (menuMode === 'system') {
      return this.getSystemMode()
    }

    return menuMode
  }

  setMode = (mode, menuMode) => {
    // Check input values
    if (mode !== 'light' && mode !== 'dark') {
      return
    }

    // Get param names
    const modeParam = this.getParamName('value')
    const menuModeParam = this.getParamName('menu')

    // Reset mode if system mode was changed
    if (menuMode === 'system') {
      if (this.getSystemMode() !== mode) {
        mode = this.getSystemMode()
      }
    }

    // Check menu mode
    if (!menuMode) {
      menuMode = mode
    }

    // Read active menu mode value
    const activeMenuItem =
      this.menu?.querySelector('[data-element="mode"][data-value="' + menuMode + '"]') || null

    // Enable switching state
    this.element?.setAttribute('data-theme-mode-switching', 'true')

    // Set mode to the target element
    this.element?.setAttribute('data-theme', mode)

    // Disable switching state
    const self = this
    setTimeout(function () {
      self.element?.removeAttribute('data-theme-mode-switching')
    }, 300)

    // Store mode value in storage
    if (localStorage) {
      localStorage.setItem(modeParam, mode)
    }

    // Set active menu item
    if (activeMenuItem && localStorage) {
      localStorage.setItem(menuModeParam, menuMode)
      this.setActiveMenuItem(activeMenuItem)
    }

    // Flip images
    this.flipImages()
  }

  getMenuMode = () => {
    const menuModeParam = this.getParamName('menu')
    const menuItem = this.menu?.querySelector('.active[data-element="mode"]')
    const dataKTValue = menuItem?.getAttribute('data-value')
    if (dataKTValue) {
      return dataKTValue
    }

    if (!menuModeParam) {
      return ''
    }

    const ls = localStorage ? localStorage.getItem(menuModeParam) : null
    return ls || ''
  }

  getSystemMode = () => {
    return window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  }

  initMode = () => {
    this.setMode(this.getMode(), this.getMenuMode())
    if (this.element) {
      EventHandlerUtil.trigger(this.element, 'kt.thememode.init')
    }
  }

  getActiveMenuItem = () => {
    return (
      this.menu?.querySelector('[data-element="mode"][data-value="' + this.getMenuMode() + '"]') ||
      null
    )
  }

  setActiveMenuItem = (item) => {
    const menuModeParam = this.getParamName('menu')
    const menuMode = item.getAttribute('data-value')
    const activeItem = this.menu?.querySelector('.active[data-element="mode"]')
    if (activeItem) {
      activeItem.classList.remove('active')
    }

    item.classList.add('active')
    if (localStorage && menuMode && menuModeParam) {
      localStorage.setItem(menuModeParam, menuMode)
    }
  }

  handleMenu = () => {
    this.menu?.querySelectorAll?.('[data-element="mode"]')?.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()

        const menuMode = item.getAttribute('data-value')
        const mode = menuMode === 'system' ? this.getSystemMode() : menuMode

        if (mode) {
          this.setMode(mode, menuMode)
        }
      })
    })
  }

  flipImages = () => {
    document.querySelectorAll('[data-img-dark]')?.forEach((item) => {
      if (item.tagName === 'IMG') {
        if (this.getMode() === 'dark' && item.hasAttribute('data-img-dark')) {
          item.setAttribute('data-img-light', item.getAttribute('src') || '')
          item.setAttribute('src', item.getAttribute('data-img-dark') || '')
        } else if (this.getMode() === 'light' && item.hasAttribute('data-img-light')) {
          item.setAttribute('data-img-dark', item.getAttribute('src') || '')
          item.setAttribute('src', item.getAttribute('data-img-light') || '')
        }
      } else {
        if (this.getMode() === 'dark' && item.hasAttribute('data-img-dark')) {
          item.setAttribute('data-img-light', item.getAttribute('src') || '')
          item.style.backgroundImage = "url('" + item.getAttribute('data-img-dark') + "')"
        } else if (this.getMode() === 'light' && item.hasAttribute('data-img-light')) {
          item.setAttribute('data-img-dark', item.getAttribute('src') || '')
          item.style.backgroundImage = "url('" + item.getAttribute('data-img-light') + "')"
        }
      }
    })
  }

  on = (name, hander) => {
    if (this.element) {
      return EventHandlerUtil.on(this.element, name, hander)
    }
  }

  off = (name, handlerId) => {
    if (this.element) {
      return EventHandlerUtil.off(this.element, name, handlerId)
    }
  }

  init = () => {
    this.menu = document.querySelector('[data-element="theme-mode-menu"]')
    this.element = document.documentElement

    this.initMode()

    if (this.menu) {
      this.handleMenu()
    }
  }
}

const ThemeModeComponent = new ThemeMode()
// Initialize app on document ready => ThemeModeComponent.init()
export {ThemeModeComponent}
