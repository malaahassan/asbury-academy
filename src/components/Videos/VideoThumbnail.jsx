import React, { useState, useEffect, useRef } from 'react';

function VideoThumbnail({file, onLoadedMetadata, onLoadedThumbnail}) {
  const [thumbnail, setThumbnail] = useState(null);
  const canvasRef = useRef(document.createElement('canvas'));

  useEffect(() => {
    if (!file) return;

    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      video.currentTime = video.duration / 4;
      const details = {duration: video.duration};
      onLoadedMetadata(details);
    };

    video.onseeked = () => {
      const canvas = canvasRef.current;

      const originalWidth = video.videoWidth;
      const originalHeight = video.videoHeight;
      const targetRatio = 16 / 9;

      // Calculate cropping dimensions
      let cropWidth = originalWidth;
      let cropHeight = cropWidth / targetRatio;

      if (cropHeight > originalHeight) {
        cropHeight = originalHeight;
        cropWidth = cropHeight * targetRatio;
      }

      const cropX = (originalWidth - cropWidth) / 2;
      const cropY = (originalHeight - cropHeight) / 2;

      // Set canvas to 16:9
      canvas.width = 1600;
      canvas.height = 900;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        video,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const imageDataURL = canvas.toDataURL('image/jpeg');
      setThumbnail(imageDataURL);
      onLoadedThumbnail(imageDataURL);
      URL.revokeObjectURL(video.src);
    };

    video.load();
  }, [file]);

  return (
    <>
      {thumbnail && 
        <img src={thumbnail} alt="Video thumbnail" className="video-tab-img"/>
      } 
      {!thumbnail &&
        <div className="skeleton-picture" />
      }
      
    </>
  );
}

export default VideoThumbnail;
