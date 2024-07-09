import React from "react";

const getStatusAndCaffeine = () => {
  const today = new Date();
  if(today.getDay() === 0)
    return "'... Naw, occifer, there's no (hic!) blud in my alcohawl...'";

  let currentStatus: string = "";
  switch(today.getHours()) {
    case 0:
    case 1:
    case 2:
    case 3: {
      
    }
    case 4:
    case 5:
    case 6:
    case 7: {
      currentStatus = "Enjoying a siesta somewhere";
      break;
    }
    case 8: 
    case 9: {
      currentStatus = "Under-caffeinated and fresh out of bed. Basically a zombie RN";
      break;
    }
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20: {
      currentStatus = "Being yelled at by Frontend engineers";
      break;
    }
    case 21:
    case 22:
    case 23: {
      currentStatus = "Dozing, probably? IDK. I'm just a bot, dude";
      break;
    }
  }

  let caffeine

  return { currentStatus, };
}

type VitalsProps = {
  banner: string;
};
const Vitals = (props: VitalsProps) => (
  <div className="terminal-banner">{props.banner}</div>
);

export default Vitals;
