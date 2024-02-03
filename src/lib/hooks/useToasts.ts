// useToasta.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useToast = () => {
  const showToast = (message, type) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  return { showToast };
};

export default useToast;
