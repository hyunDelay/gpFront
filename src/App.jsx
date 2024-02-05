

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/reset.css';
import { BrowserRouter } from 'react-router-dom';
import Wrap from './component/common/Wrap';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <Wrap/>
    </BrowserRouter>
  );
}

export default App;
