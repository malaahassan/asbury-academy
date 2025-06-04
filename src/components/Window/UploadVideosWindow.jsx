import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { useXHR } from "../Contexts/UseXHR";
import { useDropzone } from 'react-dropzone';
import VideoUploadBlock from '../Videos/VideoUploadBlock';


const UploadVideosWindow = ({refetch, onClose}) => {
        const { sendRequest } = useXHR();
    
        const [responseErrors, setResponesErrors] = useState([]);
        const [saveLoading, setSaveLoading] = useState(false);
        const errorsBox = useRef();

        const [files, setFiles] = useState([]);
        const [readyCount, setReadyCount] = useState(0);
        const videosDetailsRef = useRef([]);

        
        
        const saveTimeout = useRef();
       

        function upsertRefObject(ref, key, value, newObject) {
            const index = ref.current.findIndex(obj => obj[key] === value);
          
            if (index !== -1) {
              ref.current[index] = newObject; // Replace
            } else {
              ref.current.push(newObject);    // Add
            }
          }


        function handleSaveClick(){
            console.log(videosDetailsRef.current)
            sendRequest(
                ()=>{
                    setSaveLoading(true);
                    setResponesErrors([]);
                },
                "/back/create_videos.php",
                {videos: JSON.stringify(videosDetailsRef.current)},
                saveTimeout,
                (response) => {
                    refetch();
                    onClose();
                },
                () => {
                    setSaveLoading(false);
                },
                (errors) => {
                    setResponesErrors(errors);
                }
                
              );
        }

        useEffect(() => {
            if (responseErrors.length > 0 && errorsBox.current) {
                errorsBox.current.scrollIntoView({
                    behavior: 'smooth', // Smooth scrolling animation
                    block: 'start', // Aligns the element at the top of the viewport
                  });
            }
          }, [responseErrors]);

        
         
          
          const { getRootProps, getInputProps, open } = useDropzone({
            noClick: true,
            noKeyboard: true,
            accept: {
                'video/mp4': ['.mp4']
              },
            onDrop: (acceptedFiles) => {
                setFiles(acceptedFiles);
                acceptedFiles.forEach(file => console.log(file));
            }
          });

          
        return ReactDOM.createPortal(
            <div className="window-container">
                <div className="window" style={{ width: '600px', alignItems: 'start', height: "max-content"}}>
                    <div className="edit-account-form">
                        <h1
                        className="dashboard-header"
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: 30,
                            fontSize: 26,
                            fontWeight: 500
                        }}
                        >
                        Upload Videos
                        </h1>
                        
                        {files.length <= 0 &&
                        <div>
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />

                                <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0L8 12m4-4v12" />
                                </svg>

                                <p className="dropzone-text">Drag & drop files here</p>

                                <button type="button" onClick={open} className="select-button">
                                    Select Files
                                </button>
                            </div>
                        </div>
                        }
                        {files.map((file, i)=>
                            <VideoUploadBlock key={`${file.name}-${i}`} file={file} onChange={(newItem)=> upsertRefObject(videosDetailsRef, 'filename', newItem.filename, newItem)} onReady={()=>setReadyCount((prev)=>prev+1)}/>
                        )}
                        
                        
                        
                        
                        

                    </div>
                    <div ref={errorsBox} id="errorsBox" style={{display: responseErrors.length > 0 ? "block" : "none", width: "100%"}}>
                        <div className="error-message">
                            <span>Please fix the following problem(s):</span>
                            <ul>
                                {
                                    responseErrors.map((error, index) => 
                                        <li key={index}>{error}</li>
                                    )
                                }
                                
                            </ul>
                        </div>
                    </div>
                    <div className="cropper-btn-container" style={{ marginTop: "3rem", pointerEvents: saveLoading && "none", opacity: saveLoading && "0.5"}}>
                        <button className="danger" onClick={() => { onClose() }}>Cancel</button>
                        <button className={`${(readyCount == files.length && readyCount > 0) ? "" : "disabled-button"}`} onClick={handleSaveClick}>Publish</button>
                    </div>
                </div>
            </div>,
      
            document.body
        );
}
export default UploadVideosWindow;