import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { uploadImage } from '../api/apis';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/reducers/messages';

const ImageUploader = (props) => {
    const [imageURL, setImageURL] = useState('');

    const dispatch = useDispatch()


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', 'gwxgv5ii'); // Replace with your Cloudinary upload preset
        formData.append('folder', 'boatey-farms')

        axios
            .post('https://api.cloudinary.com/v1_1/daurieb51/image/upload', formData)
            .then((response) => {
                if (response) {
                    const publicId = [...props.public_id, response.data?.public_id];

                    const body = { public_id: publicId };
                    console.log(body)
                    uploadImage(body, props.id)
                    uploadImage(
                        body,
                        props.id
                    )
                        .then(() => {
                            props.setRecordEditted(init => init + 1)
                            dispatch(addMessage('Image editted successfully'))
                        })
                        .catch((err) => console.log(err))
                }

            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {imageURL && (
                <div>
                    <h2>Uploaded Image</h2>
                    <Image cloudName={"daurieb51"} publicId={imageURL}>
                        <Transformation width="300" height="300" crop="fill" />
                    </Image>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
