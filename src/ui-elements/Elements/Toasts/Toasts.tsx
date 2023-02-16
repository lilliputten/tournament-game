/** @module Toasts
 *  @since 2023.01.27, 20:59
 *  @changed 2023.02.16, 23:55
 */

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const toastContextData = { toast };

export const ToastsContext = React.createContext(toastContextData);

export { toast };

interface TToastsProps {
  children: React.ReactNode;
}

export function useToast() {
  const toastsContext = React.useContext(ToastsContext);
  return toastsContext.toast;
}

export function WithToastsWrapper(props: TToastsProps) {
  const { children } = props;
  return (
    <ToastsContext.Provider value={toastContextData}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        // hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        // draggable
        pauseOnHover
        theme="colored"
      />
    </ToastsContext.Provider>
  );
}
