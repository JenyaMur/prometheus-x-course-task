import { Routes, Route } from 'react-router-dom';
import Notfoundpage from './pages/Notfoundpage';
import Cartpage from './pages/Cartpage';
import Homepage from './pages/Homepage';
import Singlepage from './pages/Singlepage';
import Loginpage from './pages/Loginpage';
import Layout from './components/Layout';
import PrivateAuth from './hoc/PrivateAuth';
import {AuthProvider} from './hoc/AuthProvider';
import { BooksProvider } from './hoc/BooksProvider';
import { PurchaseProvider } from './hoc/PurchaseProvider';

function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <PurchaseProvider>
          <Routes>
            <Route path="/" element={ <Layout /> }>
              <Route index element={ 
                <PrivateAuth>
                  <Homepage /> 
                </PrivateAuth>
            } />
              <Route path='cart' element={ 
                <PrivateAuth>
                  <Cartpage />  
                </PrivateAuth>
            } />
              <Route path='book/:id' element={ 
                <PrivateAuth>
                  <Singlepage />   
                </PrivateAuth>
            } />
              <Route path='login' element={ <Loginpage />} />
              <Route path='*' element={ <Notfoundpage /> 
            } />
            </Route>
          </Routes>
        </PurchaseProvider>
      </BooksProvider>
    </AuthProvider>
  );
}

export default App;
