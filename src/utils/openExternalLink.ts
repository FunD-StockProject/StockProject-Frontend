import { MESSAGE_TYPES } from '../config/webview';
import { detectWebView } from './Detector';

/**
 * 외부 링크를 시스템 브라우저로 엽니다.
 * - 웹뷰 환경: 네이티브 앱에 메시지를 전송하여 시스템 브라우저 실행
 * - 일반 브라우저: 새 탭에서 링크 열기
 */
export const openExternalLink = (url: string): void => {
  const isWebView = detectWebView();

  if (isWebView && (window as any).ReactNativeWebView) {
    // WebView 환경: 네이티브 앱으로 메시지 전송
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({
        type: MESSAGE_TYPES.OPEN_EXTERNAL_BROWSER,
        url,
      }),
    );
  } else {
    // 일반 브라우저: 새 탭에서 열기
    window.open(url, '_blank');
  }
};
