import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import VideoThumbnail from './VideoThumbnail';

const CHUNK_SIZE = 1024 * 1024; // 1MB

function VideoUploadBlock({file, onChange, onReady}) {
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  

  function formatDuration(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
  
    const paddedMins = hrs > 0 ? String(mins).padStart(2, '0') : String(mins);
    const paddedSecs = String(secs).padStart(2, '0');
  
    return hrs > 0
      ? `${hrs}:${paddedMins}:${paddedSecs}`
      : `${paddedMins}:${paddedSecs}`;
  }

  
  const isMounted = useRef(true);

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);


  const videoDetailsRef = useRef({
    ready: false,
    filename: file.name,
    title: "",
    description: "",
    duration: 0,
    thumbnail: null
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);


  function handleVideoDetailsChange(){
    onChange(videoDetailsRef.current);
  }

  function handleVideoDoneUpload(){
    onReady();
    videoDetailsRef.current.ready = true;
    handleVideoDetailsChange();
  }

  function handleTitleChange(e){
    videoDetailsRef.current.title = e.target.value;
    handleVideoDetailsChange();
  }

  function handleDescriptionChange(e){
    videoDetailsRef.current.description = e.target.value;
    handleVideoDetailsChange();

  }
  

  function handleLoadedMetadata(details){
    setDuration(details.duration);
    videoDetailsRef.current.duration = details.duration;
    handleVideoDetailsChange();
  }

  function handleLoadedThumbnail(src){
    videoDetailsRef.current.thumbnail = src;
    handleVideoDetailsChange();
    uploadFile();
  }


  const checkChunkExists = async (fileName, chunkIndex) => {
    try {
      const res = await axios.get('/back/upload_video.php', {
        params: { fileName, chunkIndex },
        withCredentials: true,
        validateStatus: () => true,
      });
      return res.status === 200 && res.data.success && res.data.exists;
    } catch {
      return false;
    }
  };

  const uploadFile = async () => {
    if (!file || !isMounted.current) return;

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let uploadedChunks = 0;

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      if (!file || !isMounted.current) return;
      const exists = await checkChunkExists(file.name, chunkIndex);
      if (exists) {
        console.log(`Chunk ${chunkIndex} already uploaded`);
        uploadedChunks++;
        setProgress(Math.round((uploadedChunks / totalChunks) * 100));
        continue;
      }

      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('fileName', file.name);
      formData.append('chunkIndex', chunkIndex);

      try {
        await axios.post('/back/upload_video.php', formData, {
          withCredentials: true,
        });
        console.log(`Chunk ${chunkIndex} uploaded`);
        uploadedChunks++;
        setProgress(Math.round((uploadedChunks / totalChunks) * 100));
      } catch (err) {
        console.error(`Chunk ${chunkIndex} failed`, err);
        chunkIndex--; // retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    

    // Send merge request
    const mergeForm = new FormData();
    mergeForm.append('fileName', file.name);
    mergeForm.append('action', 'merge');

    try {
      await axios.post('/back/upload_video.php', mergeForm, {
        withCredentials: true,
      });
      handleVideoDoneUpload();
      setProgress(100);
    } catch (err) {
      console.error('Merge failed', err);
    }
  };

  return (
    <div className="video-upload-block-container">
        <div className="video-upload-block-top-info-container">
            <div className="video-tab-img-container">
                <VideoThumbnail file={file} onLoadedMetadata={handleLoadedMetadata} onLoadedThumbnail={handleLoadedThumbnail}/>
                <div className="video-tab-play-icon-container">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z" />
                    </g>
                    </svg>
                </div>
                <span className="video-tab-duration-box">{formatDuration(duration)}</span>
            </div>
            
            <div className="video-upload-block-inputs-container">
                <input onChange={handleTitleChange} className="video-upload-block-field" type="text" placeholder="Add video title" name={`video-title-${file.name}`}/>
                <textarea onChange={handleDescriptionChange} className="video-upload-block-field" placeholder="Add video description" name={`video-description-${file.name}`}></textarea>
            </div>
        </div>

        <div className="video-upload-block-bottom-info-container">
          <div className="video-upload-extra-info-container">
            <span className="video-upload-file-name">{file.name}</span>
            <span className="video-upload-file-size">{formatBytes(file.size)}</span>
          </div>
          <div className="video-upload-progress-bar-container">
              <div className="video-upload-progress-bar">
                <div className="video-upload-progress-bar-slider" style={{width: `${progress}%`}}></div>
              </div>
              <span className="video-upload-progress-text">{progress}%</span>
          </div>
        </div>
        
        
        

    </div>
  );
}

export default VideoUploadBlock;