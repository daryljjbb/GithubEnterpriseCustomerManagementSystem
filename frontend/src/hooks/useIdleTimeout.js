import {
  useEffect,
  useRef,
  useState
} from "react";

import toast from "react-hot-toast";


// -----------------------------------
// ENTERPRISE IDLE TIMEOUT HOOK
// -----------------------------------
export default function useIdleTimeout({

  timeout = 15 * 60 * 1000,

  warningTime = 60 * 1000,

  onIdle
}) {

  const timer = useRef(null);

  const warningTimer = useRef(null);

  const [showWarning, setShowWarning] =
    useState(false);


  // -----------------------------------
  // RESET TIMERS
  // -----------------------------------
  const resetTimers = () => {

    // CLEAR EXISTING TIMERS
    clearTimeout(timer.current);

    clearTimeout(warningTimer.current);


    // HIDE WARNING
    setShowWarning(false);


    // WARNING BEFORE LOGOUT
    warningTimer.current = setTimeout(() => {

      setShowWarning(true);

      toast.error(

        "Session expiring soon due to inactivity."
      );

    }, timeout - warningTime);


    // FULL LOGOUT
    timer.current = setTimeout(() => {

      onIdle();

    }, timeout);
  };


  // -----------------------------------
  // TRACK USER ACTIVITY
  // -----------------------------------
  useEffect(() => {

    const events = [

      "mousemove",

      "keydown",

      "click",

      "scroll"
    ];


    // RESET ON ACTIVITY
    events.forEach((event) => {

      window.addEventListener(

        event,

        resetTimers
      );
    });


    // START TIMER
    resetTimers();


    // CLEANUP
    return () => {

      clearTimeout(timer.current);

      clearTimeout(warningTimer.current);

      events.forEach((event) => {

        window.removeEventListener(

          event,

          resetTimers
        );
      });
    };

  }, []);


  return {
    showWarning,
    resetTimers,
  };
}