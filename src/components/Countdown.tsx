
import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        // Target date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    // Calculate immediately and then set interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 w-full max-w-lg mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <span className="text-2xl md:text-4xl font-bold text-wedding-primary">{timeLeft.days}</span>
        </div>
        <span className="mt-2 text-sm md:text-base text-white font-medium">Days</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <span className="text-2xl md:text-4xl font-bold text-wedding-primary">{timeLeft.hours}</span>
        </div>
        <span className="mt-2 text-sm md:text-base text-white font-medium">Hours</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <span className="text-2xl md:text-4xl font-bold text-wedding-primary">{timeLeft.minutes}</span>
        </div>
        <span className="mt-2 text-sm md:text-base text-white font-medium">Minutes</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <span className="text-2xl md:text-4xl font-bold text-wedding-primary">{timeLeft.seconds}</span>
        </div>
        <span className="mt-2 text-sm md:text-base text-white font-medium">Seconds</span>
      </div>
    </div>
  );
};

export default Countdown;
