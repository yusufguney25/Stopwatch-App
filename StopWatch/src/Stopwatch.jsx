// creting React Hooks
import React,{useEffect,useState,useRef} from 'react';
function Stopwatch(){
    //Çalışma durumu boolean,akan zaman 0 ,süre için ref kullandım .
    const[isRunning,setIsRunning]= useState(false);
    const[elapsedTime , setElapsedTime]=useState(0);
    const intervalIdRef= useRef(null);
    const startTimeRef= useRef(null);
    //Dependencies hook
    useEffect(() =>{
        if(isRunning){
            intervalIdRef.current= setInterval(()=>{
                setElapsedTime(Date.now()-startTimeRef.current);
            },10)
        };
        return ()=>{
            clearInterval(intervalIdRef.current);
        }

    },[isRunning]);
    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime
    };
    function stop(){
        setIsRunning(false);

    };
    function reset(){
        setElapsedTime(0);
        setIsRunning(false);

    };
    function formatTime(){
        let hours = Math.floor(elapsedTime/(1000*60*60))
        let minutes = Math.floor(elapsedTime/(1000*60)%60)
        let seconds = Math.floor(elapsedTime/(1000)%60);
        let milisecond = Math.floor((elapsedTime%1000)/10)

        hours=String(hours).padStart(2,"0");
        minutes=String(minutes).padStart(2,"0");
        seconds=String(seconds).padStart(2,"0");
        milisecond=String(milisecond).padStart(2,"0");
        return `${minutes}:${seconds}:${milisecond}`
    };
    return(
        <div className='stopwatch'>
            <div className="display">{formatTime()}</div>
            <div className='controls'>
                <button onClick={start} className='start-button'>start</button>
                <button onClick={stop} className='stop-button'>stop</button>
                <button onClick={reset} className='reset-button'>reset</button>
            </div>
        </div>
    );
}
export default Stopwatch;