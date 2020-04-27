import {isDevMode} from '@angular/core';

export const safeLogger = (message: any, ...args) => {
  if (isDevMode()) {
    // tslint:disable-next-line:no-console
    console.info(message, ...args);
  }
};
export const safeLoggerWarn = (message: any, ...args) => {
  if (isDevMode()) {
    console.warn(message, ...args);
  }
};
export const safeLoggerError = (message: any, ...args) => {
  if (isDevMode()) {
    console.error(message, ...args);
  }
};
