import { useEffect, useState } from "react";
import logo from './logo.svg';

const batchGenerateCanvas1 = async (img, count = 100) => {
  const promises = Array.from({ length: count}).map((_id, index) => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        ctx.drawImage(img, 0, 0, 200, 200);
        ctx.fillStyle = 'red';
        ctx.font = '60px sans-serif';
        ctx.fillText(index, 80, 80);
        resolve(canvas.toDataURL());
      } catch (e) {
        reject(e);
      }
    })
  })
  return Promise.all(promises);
}

const batchGenerateCanvas2 = async (img, count = 100) => {
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = 200;
  offscreenCanvas.height = 200;
  offscreenCanvas.getContext('2d').drawImage(img, 0, 0, 200, 200);

  const promises = Array.from({ length: count}).map((_id, index) => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        ctx.drawImage(offscreenCanvas, 0, 0, 200, 200);
        ctx.fillStyle = 'red';
        ctx.font = '60px sans-serif';
        ctx.fillText(index, 80, 80);
        resolve(canvas.toDataURL());
      } catch (e) {
        reject(e);
      }
    })
  })
  return Promise.all(promises);
}

const loadImage = (src) => {
  const imgElem = new Image();
  imgElem.src = src;
  return new Promise((resolve, reject) => {
    imgElem.onload = () => resolve(imgElem);
    imgElem.onerror = reject;
  })
}


const Gallery = () => {
  const [imgUrls, setImgUrls] = useState([]);
  useEffect(() => {
    (async () => {
      const img = await loadImage(logo);
      const startTime1 = Date.now();
      const _imgUrls = await batchGenerateCanvas1(img);
      console.log(`cost time ${Date.now() - startTime1}`);
      const startTime2 = Date.now();
      await batchGenerateCanvas2(img);
      console.log(`cost time2 ${Date.now() - startTime2}`);
      setImgUrls(_imgUrls);
    })();
  }, []);
  return (
    <div>
      {imgUrls.map((item, index) => {
        return <img src={item} key={index} alt={`img-${index}`}/>
      })}
    </div>
  )
}

export default Gallery;