export type SetAppActiveError = (message: string) => void;
export type AppActiveError = { message: string };

export type AppStateHandler = {
  setAppActiveError: SetAppActiveError;
};

export interface AppStateStorage {
  readonly activeError: AppActiveError;
  readonly setActiveError: SetAppActiveError;
}
