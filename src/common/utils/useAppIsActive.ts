import { useCallback, useEffect, useRef } from "react";
import { AppState } from "react-native";

export default (callback: Function) => {
  const appStateRef = useRef(AppState.currentState);
  const handleAppStateChange = useCallback((nextAppState) => {
    if (
      appStateRef.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      callback(nextAppState);
    }

    appStateRef.current = nextAppState;
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);
};
