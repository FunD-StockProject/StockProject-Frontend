import { ToastState } from '@hooks/useToast';
import { ToastContainer, ToastContent } from './Toast.Style';

const Toast = ({ toast, hideToast }: { toast: ToastState; hideToast: () => void }) => {
  const { message, enabled, closing } = toast;

  if (!enabled) return null;

  return (
    <ToastContainer closing={closing} onClick={hideToast}>
      <ToastContent>{message}</ToastContent>
    </ToastContainer>
  );
};

export default Toast;
