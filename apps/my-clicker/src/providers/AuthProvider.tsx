'use client'
import { PropsWithChildren, useEffect, useMemo } from 'react';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  retrieveLaunchParams
} from '@telegram-apps/sdk';
import { useFetchCurrentUser } from '../hook/useFetchCurrentUser';
import { useLoginUser } from '../hook/useLoginUser';
import { AuthContext } from '../contexts/AuthContext';
import { useTelegramMock } from '../hook/useTelegramMock';
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useSDK,
  useThemeParams,
  useViewport
} from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { ErrorBoundary } from '../app/ErrorBoundary';
import { ErrorPage } from '../app/ErrorPage';
import { useDidMount } from '../hook/useDidMount';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

function AuthProvider({ children }:PropsWithChildren) {
  const { initDataRaw } = retrieveLaunchParams()

  const { user, error: fetchCurrentUserError, fetchCurrentUser, setUser, isLoading: isFetchingCurrentUser } = useFetchCurrentUser()

  const { authData, error: loginUserError, loginUser, isLoading: isLoggingIn } = useLoginUser()

  useMemo(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  useEffect(() => {
    if(fetchCurrentUserError && initDataRaw) {
      loginUser(initDataRaw)
    }
  }, [fetchCurrentUserError, initDataRaw, loginUser])

  useEffect(() => {
    if(authData) {
      setUser(authData.user)
      localStorage.setItem("token", authData.token)
      console.log(authData.token)
    }
  }, [authData, setUser])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Code that uses window, sessionStorage, or navigation history
      console.log(window.location.href);
      console.log(sessionStorage.getItem("key"));
    }
  }, []);

  const isLoading = isFetchingCurrentUser || isLoggingIn

  const isError = fetchCurrentUserError || loginUserError

  if(user !== undefined) {
    return (
        <AuthContext.Provider value={{ user }}>
          {children}
        </AuthContext.Provider>
    )
  }

  if(isLoading) return "Loading"

  if(isError) return "Error"

  return null
}

function App(props: PropsWithChildren) {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return (
    <AppRoot
      appearance={miniApp.isDark ? 'dark' : 'light'}
      platform={['macos', 'weba'].includes(lp.platform) ? 'ios' : 'base'}
    >
      {props.children}
    </AppRoot>
  );
}

function RootInner({ children }: PropsWithChildren) {
  // Mock Telegram environment in development mode if needed.
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <AuthProvider>
          <App>
            {children}
          </App>
        </AuthProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
  // Rendering. That's why we are showing loader on the server side.
  const didMount = useDidMount();

  return didMount ? (
    // eslint-disable-next-line react/jsx-no-undef
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props}/>
    </ErrorBoundary>
  ) : <div className="root__loading">Loading</div>;
}

