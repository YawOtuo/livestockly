import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const ImageUploader = (props) => {
    const [imageURL, setImageURL] = useState('');

    const dispatch = useDispatch()




    return (
        <div>
            <input type="file" accept="image/*"/>

            {imageURL && (
                <div>
                    <h2>Uploaded Image</h2>
                    {/* <Image cloudName={"daurieb51"} publicId={imageURL}>
                        <Transformation width="300" height="300" crop="fill" />
                    </Image> */}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
