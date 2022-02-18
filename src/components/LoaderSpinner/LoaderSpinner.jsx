import React from 'react';
import {Spinner} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import SpinnerStyles from './LoaderSpinner.module.css'

const LoaderSpinner = () => {
    return (
        <div className={SpinnerStyles.container__spinner}>
            <Spinner color="primary"/>
        </div>
     );
}

export default LoaderSpinner;