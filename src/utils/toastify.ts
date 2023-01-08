import Toastify from 'toastify-js';
import './toastify.scss';

const defaults = {
  duration    : 9000,
  stopOnFocus : true,
  close       : true,
};

interface IOptions {
  type?: string;
}

export default function (message:string | undefined, _options : IOptions = {}):void {
  const { type = 'success' } = _options;

  const options = Object.assign({
    text      : message,
    className : `toastify--${type}`,
  }, defaults, _options);

  Toastify(options).showToast();
}
