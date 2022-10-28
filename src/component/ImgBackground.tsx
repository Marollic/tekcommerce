
import React from 'react';
import { ImageBackground as DefaultImageBackground } from 'react-native';

const img = require('../images/background_login.png');

type ImageBackgroundProps = DefaultImageBackground['props'] & {
    children: React.ReactNode
}

const ImgBackground = (props: ImageBackgroundProps) => {

    return (
            <DefaultImageBackground {...props} />
    )
}

export default ImgBackground

