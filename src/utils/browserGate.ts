/* ============================================================
   IN-APP BROWSER DETECTION & ESCAPE LINKS
   ------------------------------------------------------------
   When the fest link is shared in an Instagram DM / Facebook /
   TikTok etc., it opens inside the app's own stripped-down
   browser (a WebView). Those WebViews — especially WebKit ones —
   break several effects of the realm (animated gradient text,
   some canvas/filter compositing).


   detectInAppBrowser()  — sniffs the user-agent for known
                           in-app browsers and generic WebViews.
   buildEscapeLinks()    — builds platform-correct deep links
                           that hand the page over to a REAL
                           browser:
                             • Android → intent:// URLs. They can
                               target Chrome, Firefox, or (with
                               no package) WHICHEVER browser the
                               device has as default.
                             • iOS → googlechromes:// and
                               firefox://open-url schemes. Apple
                               does not allow a website to force
                               Safari, so copy-link is the
                               fallback there.
   ============================================================ */


export type GatePlatform = 'android' | 'ios' | 'other';


export interface InAppBrowserInfo {
  isInAppBrowser: boolean;
  /** Friendly name of the host app, e.g. "Instagram" — null for generic WebViews. */
  appName: string | null;
  platform: GatePlatform;
}


/** Order matters: more specific tokens first (Messenger before Facebook). */
const APP_TOKENS: Array<[RegExp, string]> = [
  [/Instagram/i, 'Instagram'],
  [/FBAN\/(?:Messenger|Orca)|FBAV\/Messenger/i, 'Messenger'],
  [/FBAN|FBAV/i, 'Facebook'],
  [/TikTok|BytedanceWebview|musical_ly/i, 'TikTok'],
  [/WhatsApp/i, 'WhatsApp'],
  [/Twitter/i, 'X (Twitter)'],
  [/LinkedInApp/i, 'LinkedIn'],
  [/Snapchat/i, 'Snapchat'],
  [/Pinterest/i, 'Pinterest'],
  [/MicroMessenger|WeChat/i, 'WeChat'],
  [/KAKAOTALK/i, 'KakaoTalk'],
  [/\bLine\//i, 'LINE'],
];


export function detectInAppBrowser(
  ua: string = typeof navigator !== 'undefined' ? navigator.userAgent : ''
): InAppBrowserInfo {
  const platform: GatePlatform = /android/i.test(ua)
    ? 'android'
    : /iphone|ipad|ipod/i.test(ua)
      ? 'ios'
      : 'other';


  // iOS "Add to Home Screen" PWAs also lack the Safari token but are
  // perfectly capable browsers — never gate those.
  const isStandalonePwa =
    typeof navigator !== 'undefined' &&
    ('standalone' in navigator && (navigator as unknown as { standalone?: boolean }).standalone === true);


  const appMatch = APP_TOKENS.find(([re]) => re.test(ua));


  // Instagram/Facebook iOS WebViews: AppleWebKit present, "Safari" absent.
  const isIosWebView =
    platform === 'ios' && !isStandalonePwa && /AppleWebKit/i.test(ua) && !/Safari/i.test(ua);


  // Android WebView markers: the "; wv)" flag, or legacy "Version/x.x".
  const isAndroidWebView =
    platform === 'android' &&
    (/;\s?wv\)/i.test(ua) || (/Version\/[\d.]+/i.test(ua) && /AppleWebKit/i.test(ua)));


  return {
    isInAppBrowser: platform !== 'other' && (Boolean(appMatch) || isIosWebView || isAndroidWebView),
    appName: appMatch ? appMatch[1] : null,
    platform,
  };
}


export interface EscapeLinks {
  /** Launch Chrome (Android intent with Chrome package / iOS googlechromes://). */
  chrome: string;
  /** Launch Firefox (Android intent with Firefox package / iOS firefox://). */
  firefox: string;
  /** Android only: hand over to WHICHEVER browser is the device default. */
  defaultBrowser: string | null;
  /** The page URL, for the copy-link fallback. */
  pageUrl: string;
}


export function buildEscapeLinks(platform: GatePlatform): EscapeLinks {
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';


  if (typeof window === 'undefined') {
    return { chrome: pageUrl, firefox: pageUrl, defaultBrowser: null, pageUrl };
  }


  const { host, pathname, search, hash } = window.location;


  if (platform === 'android') {
    // NOTE: the page's own #/route hash would collide with the "#Intent;"
    // marker, so intent URLs carry path+search only (lands on home).
    const target = `${host}${pathname}${search}`;
    return {
      chrome: `intent://${target}#Intent;scheme=https;package=com.android.chrome;end`,
      firefox: `intent://${target}#Intent;scheme=https;package=org.mozilla.firefox;end`,
      defaultBrowser: `intent://${target}#Intent;scheme=https;end`,
      pageUrl,
    };
  }


  if (platform === 'ios') {
    return {
      // googlechromes:// = Chrome's HTTPS handler; the fragment survives.
      chrome: `googlechromes://${host}${pathname}${search}${hash}`,
      firefox: `firefox://open-url?url=${encodeURIComponent(pageUrl)}`,
      defaultBrowser: null,
      pageUrl,
    };
  }


  return { chrome: pageUrl, firefox: pageUrl, defaultBrowser: null, pageUrl };
}
