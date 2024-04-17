import React from 'react';
import Routers from './Route';
import AnimationThemeProvider from './_helper/AnimationTheme/AnimationThemeProvider';
import CustomizerProvider from './_helper/Customizer/CustomizerProvider';
import Loader from './Layout/Loader';
import { useSelector } from "react-redux";

const App = () => {
  const storeVar = useSelector(state => state.loader)
  return (
    <div className='App'>
      <Loader status={storeVar.loading} />
      <CustomizerProvider>
          <AnimationThemeProvider>
            <Routers />
          </AnimationThemeProvider>
      </CustomizerProvider>
    </div>

  )
};

export default App;
