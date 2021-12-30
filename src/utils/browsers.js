import androidWebviewLogo from '@browser-logos/android-webview/android-webview.png?url'
import chromeLogo from '@browser-logos/chrome/chrome.svg?url'
import firefoxLogo from '@browser-logos/firefox/firefox.svg?url'
import edgeLogo from '@browser-logos/edge/edge.svg?url'
import safariLogo from '@browser-logos/safari/safari.svg?url'
import safariIosLogo from '@browser-logos/safari-ios/safari-ios.svg?url'
import internetExplorer6Logo from '@browser-logos/internet-explorer_6/internet-explorer_6.png?url'
import internetExplorer7Logo from '@browser-logos/internet-explorer_7-8/internet-explorer_7-8.png?url'
import internetExplorer11Logo from '@browser-logos/internet-explorer_9-11/internet-explorer_9-11.svg?url'
import operaMiniLogo from '@browser-logos/opera-mini/opera-mini.png?url'
import operaLogo from '@browser-logos/opera/opera.svg?url'
import samsungInternetLogo from '@browser-logos/samsung-internet/samsung-internet.svg?url'
import ucLogo from '@browser-logos/uc/uc.svg?url'
import nodeLogo from '@browser-logos/node.js/node.js.svg?url'
import webLogo from '@browser-logos/web/web.svg?url'

export const sortBrowsers = (a, b) => {
  if (a.identifier < b.identifier) {
    return -1
  }
  if (a.identifier > b.identifier) {
    return 1
  }

  if (a.version < b.version) {
    return -1
  }
  if (a.version > b.version) {
    return 1
  }

  return 0
}

export const browserInfoFromStr = (browserStr) => {
  if (!browserStr) {
    return {
      key: 'unknown',
      name: 'Unknown',
      identifier: 'unknown',
      version: 1,
      icon: webLogo
    }
  }

  const browserArr = browserStr.split(' ')
  if (browserArr.length < 2) {
    return {
      key: browserStr,
      name: browserStr,
      identifier: browserStr,
      version: 1,
      icon: webLogo
    }
  }

  const identifier = browserArr.slice(0, -1).join(' ')
  const version = browserArr.slice(-1)[0]

  const baseInfo = {
    key: browserStr,
    identifier,
    version: parseFloat(version)
  }

  switch (identifier) {
    case 'android': {
      return {
        ...baseInfo,
        name: `Android (WebView) ${version}`,
        icon: androidWebviewLogo
      }
    }
    case 'and_ff': {
      return {
        ...baseInfo,
        name: `Firefox Android ${version}`,
        icon: firefoxLogo
      }
    }
    case 'firefox': {
      return {
        ...baseInfo,
        name: `Firefox ${version}`,
        icon: firefoxLogo
      }
    }
    case 'and_chr': {
      return {
        ...baseInfo,
        name: `Chrome Android ${version}`,
        icon: chromeLogo
      }
    }
    case 'chrome': {
      return {
        ...baseInfo,
        name: `Chrome ${version}`,
        icon: chromeLogo
      }
    }
    case 'edge': {
      return {
        ...baseInfo,
        name: `Edge ${version}`,
        icon: edgeLogo
      }
    }
    case 'ie': {
      switch (version) {
        case '5':
        case '5.5':
        case '6': {
          return {
            ...baseInfo,
            name: `Internet Explorer ${version}`,
            icon: internetExplorer6Logo
          }
        }
        case '7':
        case '8': {
          return {
            ...baseInfo,
            name: `Internet Explorer ${version}`,
            icon: internetExplorer7Logo
          }
        }
        default: {
          return {
            ...baseInfo,
            name: `Internet Explorer ${version}`,
            icon: internetExplorer11Logo
          }
        }
      }
    }
    case 'ie_mob': {
      return {
        ...baseInfo,
        name: `Internet Explorer Mobile ${version}`,
        icon: internetExplorer11Logo
      }
    }
    case 'ios_saf': {
      return {
        ...baseInfo,
        name: `Safari iOS ${version}`,
        icon: safariIosLogo
      }
    }
    case 'safari': {
      return {
        ...baseInfo,
        name: `Safari ${version}`,
        icon: safariLogo
      }
    }
    case 'kaios': {
      return {
        ...baseInfo,
        name: `Kaios ${version}`,
        icon: webLogo
      }
    }
    case 'op_mini': {
      return {
        ...baseInfo,
        name: `Opera Mini ${version}`,
        icon: operaMiniLogo
      }
    }
    case 'op_mob': {
      return {
        ...baseInfo,
        name: `Opera Mobile ${version}`,
        icon: operaLogo
      }
    }
    case 'opera': {
      return {
        ...baseInfo,
        name: `Opera ${version}`,
        icon: operaLogo
      }
    }
    case 'samsung': {
      return {
        ...baseInfo,
        name: `Samsung Internet ${version}`,
        icon: samsungInternetLogo
      }
    }
    case 'and_uc': {
      return {
        ...baseInfo,
        name: `UC Browser ${version}`,
        icon: ucLogo
      }
    }
    case 'and_qq': {
      return {
        ...baseInfo,
        name: `QQ browser Android ${version}`,
        icon: webLogo
      }
    }
    case 'bb': {
      return {
        ...baseInfo,
        name: `BlackBerry ${version}`,
        icon: webLogo
      }
    }
    case 'baidu': {
      return {
        ...baseInfo,
        name: `Baidu ${version}`,
        icon: webLogo
      }
    }
    case 'node': {
      return {
        ...baseInfo,
        name: `Node ${version}`,
        icon: nodeLogo
      }
    }
    default: {
      return {
        ...baseInfo,
        name: browserStr,
        icon: webLogo
      }
    }
  }
}
