import React, { useState, useEffect } from 'react';
import '../main/style.css';
import '../main/form.css';
import config from '../config.js';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${config.url}/viewevents`); // Fetch data from the backend
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handlePlay = (audioFileName) => {
    // Set the audio file URL for playback
    setAudioUrl(`${config.url}/eventaudio/${audioFileName}`);
  };
  const handleDownload = async (audioFileName) => {
    const downloadUrl = `${config.url}/eventaudio/${audioFileName}`;
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', audioFileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  return (
    <div className='home-container'>
      <table border={2} align="center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Singer</th>
            <th>Audio</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event, index) => (
              <tr key={index}>
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{event.singer }</td>
                {/*  Display the singer's name or 'Unknown' if not available */}
                {/* <td>{event.album && event.album.singer}</td> */}

                <td>
                  <div className="audio-container">
                    {event.file && typeof event.file === 'string' ? (
                      event.file.endsWith('.mp3') ? (
                        <>
                          <audio controls>
                            <source src={`${config.url}/eventaudio/${event.file}`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          <span className="play-option" onClick={() => handlePlay(event.file)}>Play</span>
                          <a href={`${config.url}eventaudio/${event.file}`}  onClick={() => handleDownload(event.file)}>Download Audio</a>
                        </>
                      ) 
                      :
                       (
                        <a href={`${config.url}eventaudio/${event.file}`}>Download Audio</a>
                      )
                    ) :
                     (
                      <span>No audio available</span>
                    )
                    }
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" align="center">No events found</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Display audio player for playback */}
      {audioUrl && (
        <div className="audio-player">
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default ViewEvents;


// import React from 'react';

// const ViewEvents = ({ events, config, handlePlay }) => {
//   // Function to render the audio player
//   const renderAudioPlayer = (event) => {
//     if (!event.audio || typeof event.audio !== 'string') {
//       return <span>No audio available</span>;
//     }

//     if (event.audio.endsWith('.mp3')) {
//       return (
//         <>
//           <audio controls>
//             <source src={`${config.url}/eventaudio/${event.file}`} type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>
//           <span className="play-option" onClick={() => handlePlay(event.file)}>Play</span>
//         </>
//       );
//     } else {
//       return <a href={`${config.url}eventaudio/${event.file}`}>Download Audio</a>;
//     }
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Category</th>
//             <th>Singer</th>
//             <th>Audio</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.length > 0 ? (
//             events.map((event, index) => (
//               <tr key={index}>
//                 <td>{event.title}</td>
//                 <td>{event.category}</td>
//                 <td>{event.singer || 'Unknown'}</td>
//                 <td>
//                   <div className="audio-container">
//                     {renderAudioPlayer(event)}
//                   </div>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" align="center">No events found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewEvents;
