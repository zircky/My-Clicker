import { useClientOnce } from './useClientOnce';
import { mockTelegramEnv, parseInitData, retrieveLaunchParams } from '@telegram-apps/sdk';

export function useTelegramMock(): void {
  useClientOnce(() => {
    let shouldMock: boolean;

    try {
      retrieveLaunchParams();

      shouldMock = !!sessionStorage.getItem('____mocked');
    } catch (e) {
      shouldMock = true;
    }

    if (shouldMock) {
      const initDataRaw = new URLSearchParams([
        ['user', JSON.stringify({
          id: 1,
          first_name: '',
          last_name: '',
          username: 'Zircky',
          language_code: '',
          is_premium: true,
          allows_write_to_pm: true,
        })],
        ['hash', ''],
        ['auth_date', ''],
        ['start_param', 'debug'],
        ['chat_type', ''],
        ['chat_instance', ''],
      ]).toString();

      mockTelegramEnv({
        themeParams: {
          accentTextColor: '#6ab2f2',
          bgColor: '#17212b',
          buttonColor: '#5288c1',
          buttonTextColor: '#ffffff',
          destructiveTextColor: '#ec3942',
          headerBgColor: '#17212b',
          hintColor: '#708499',
          linkColor: '#6ab3f3',
          secondaryBgColor: '#232e3c',
          sectionBgColor: '#17212b',
          sectionHeaderTextColor: '#6ab3f3',
          subtitleTextColor: '#708499',
          textColor: '#f5f5f5',
        },
        initData: parseInitData(initDataRaw),
        initDataRaw,
        version: '',
        platform: 'weba',
      });
      sessionStorage.setItem('____mocked', '1');

      console.info(
        'As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
      );
    }
  });
}
