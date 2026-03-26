import React, { useContext, useState, useEffect, useRef } from 'react';
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

function Home() {
  const { userData, serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [textInput, setTextInput] = useState("");
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = async (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setIsListening(false);
        await handleChat(text);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, [userData]); // Re-initialize if user data changes, though usually fine.

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signup");
    } catch (error) {
      setUserData(null);
      navigate("/signup");
      console.log(error);
    }
  };

  const handleChat = async (message) => {
    try {
      const res = await axios.post(`${serverUrl}/api/chat`, { message }, { withCredentials: true });
      const reply = res.data.response;
      setResponse(reply);
      speakText(reply);
    } catch (error) {
      console.error("Error communicating with AI:", error);
      setResponse("Sorry, I am having trouble connecting to my brain.");
      speakText("Sorry, I am having trouble connecting to my brain.");
    }
  };

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice based on user preference
    if (userData?.assistantVoice) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.name === userData.assistantVoice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      window.speechSynthesis.cancel();
      setTranscript("");
      setResponse("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className='w-full min-h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col p-[20px] gap-[20px]'>
      <button className='min-w-[150px] h-[50px] bg-white absolute top-[40px] right-[70px] rounded-full text-black text-[19px] hover:bg-gray-200 transition-all font-semibold' onClick={handleLogout}>Log Out</button> 
      <button className='w-[230px] h-[50px] bg-white absolute top-[100px] right-[70px] rounded-full text-black text-[19px] hover:bg-gray-200 transition-all font-semibold' onClick={() => navigate("/customize")}>Settings</button> 
      
      <div className={`w-[250px] h-[250px] md:w-[350px] md:h-[350px] flex justify-center items-center overflow-hidden rounded-full shadow-lg border-[4px] transition-all duration-300 ${isSpeaking ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.8)] scale-105' : 'border-[#ffffff40]'} z-10 mt-10 lg:mt-0`}>
        <img src={userData?.assistantImage || "https://via.placeholder.com/400"} alt="Assistant" className='h-full w-full object-cover'/> 
      </div>
      
      <h1 className='text-white text-[24px] font-semibold tracking-wider flex items-center gap-2'>
        {isSpeaking ? <span className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></span> : null}
        I'm {userData?.assistantName || "Your Assistant"}
      </h1>

      <div className='flex flex-col md:flex-row items-center justify-center gap-4 mt-4 w-full max-w-[800px] px-4'>
        <div className='flex flex-col items-center justify-center group relative'>
          <button 
            onClick={toggleListening}
            className={`w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full flex justify-center items-center text-[24px] md:text-[30px] text-white transition-all duration-300 shadow-lg shrink-0 ${isListening ? 'bg-red-500 animate-[pulse_1s_ease-in-out_infinite] scale-110 shadow-[0_0_20px_rgba(239,68,68,0.8)]' : 'bg-blue-600 hover:bg-blue-500 hover:scale-105'}`}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          <span className="absolute -bottom-6 text-[12px] text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Voice</span>
        </div>
        
        <div className="flex w-full mt-2 md:mt-0 items-center bg-[#ffffff15] shadow-lg border border-gray-500/50 rounded-full px-2 py-1 focus-within:border-blue-400 focus-within:bg-[#ffffff25] transition-all">
          <input 
            type="text" 
            value={textInput} 
            onChange={(e) => setTextInput(e.target.value)} 
            placeholder="Or type your message..."
            className="w-full bg-transparent text-white px-4 py-2 outline-none text-[16px] placeholder-gray-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && textInput.trim()) {
                setTranscript(textInput);
                handleChat(textInput);
                setTextInput("");
              }
            }}
          />
          <button 
            onClick={() => {
              if (textInput.trim()) {
                setTranscript(textInput);
                handleChat(textInput);
                setTextInput("");
              }
            }}
            className="bg-blue-600 px-5 py-2 md:px-6 md:py-3 rounded-full text-white font-semibold hover:bg-blue-500 transition-colors"
          >
            Send
          </button>
        </div>
      </div>

      <div className='w-full max-w-[800px] min-h-[100px] mt-4 flex flex-col gap-4 mb-10'>
        {(transcript || response) && (
          <div className='bg-[#ffffff10] backdrop-blur-md p-6 rounded-2xl border border-[#ffffff20] flex flex-col gap-4 text-white shadow-xl'>
            {transcript && (
              <div className='self-end bg-blue-600 px-5 py-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-md'>
                <p className='text-[16px]'>{transcript}</p>
              </div>
            )}
            {response && (
              <div className='self-start bg-[#1f2937] px-5 py-3 rounded-2xl rounded-tl-none max-w-[85%] shadow-md'>
                <p className='text-[16px] leading-relaxed'>{response}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;