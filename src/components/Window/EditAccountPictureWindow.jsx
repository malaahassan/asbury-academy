import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const EditAccountPictureWindow = ({ onClose, previewPfp, previewCover, firstName, type, setCoverPhoto, setProfilePhoto }) => {
    const windowRef = useRef(null);
    const imageRef = useRef(null);
    const cropperRef = useRef(null);
    useEffect(() => {
        if (imageRef.current) {
            cropperRef.current = new Cropper(imageRef.current, {
                aspectRatio: type==='profile'? 1: 2/1,
                viewMode: 1,
                autoCropArea: 1,
                zoomable: true,
                responsive: true,
                ready() {
                    cropperRef.current.zoomTo(0);
                },
                zoom(event) {
                    if (event.detail.ratio === cropperRef.current.options.minZoomRatio) {
                        const cropper = cropperRef.current;
                        const canvasData = cropper.getCanvasData();
                        const containerData = cropper.getContainerData();
                        const centerX = containerData.width / 2;
                        const centerY = containerData.height / 2;
                        cropper.setCanvasData({
                            left: centerX - canvasData.width / 2,
                            top: centerY - canvasData.height / 2,
                        });
                    }
                }
            });
        }
        return () => {
            if (cropperRef.current) {
                cropperRef.current.destroy();
            }
        };
    }, [previewCover, previewPfp]);

    const handleSave = () => {
        cropperRef.current.getCroppedCanvas().toBlob((blob) => {
            if (blob) {
                const file = new File([blob], `randomShitName`, { type: 'image/jpeg' });
                type === 'profile'
                 ? setProfilePhoto(file)
                 : setCoverPhoto(file); 

                onClose()
            }
        }, 'image/jpeg');

    };
    return ReactDOM.createPortal(
        <div className='window-container'>
            <div className={ type === 'profile' ? 'window edit-profile-window pfp-preview' : 'window edit-profile-window cover-preview'  } ref={windowRef}>
                <h2 className='edit-profile-header'>Edit {`${firstName}'s ${type} `}picture</h2>
                    <div className='hr' style={{margin:'none'}}></div>
                <div className='pfp-cropper-container'>
                    <img src={ type === 'profile' ? previewPfp : previewCover} alt="Preview" ref={imageRef} style={{ maxWidth: '100%' }} />
                </div>
                <div className='hr' style={{margin:'none'}}></div>
                <div className='cropper-btn-container' style={{marginTop:'1rem'}}>
                    <button className='danger' onClick={()=>{onClose()}}>Cancel</button>
                    <button onClick={handleSave}>Ok</button>
                </div>
            </div>
        </div>,
        document.body
    );
};
export default EditAccountPictureWindow;