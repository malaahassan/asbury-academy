import Logo from "../components/Sidebar/Logo";
import Question from "../components/Exam/Question";
import { useParams } from 'react-router-dom';

function Exam() {
    const { id } = useParams();
    const header = (
        <>
          <p>Which of the following best explains why water has a high specific heat capacity?</p>
        </>
      ); 

      const a = (
        <>
          <p>Water molecules are non-polar and do not interact strongly with each other.</p>
        </>
      ); 

      const b = (
        <>
          <p>Hydrogen bonds between water molecules absorb significant energy before breaking.</p>
        </>
      ); 

      const c = (
        <>
          <p>The high density of water allows it to store more heat energy.</p>
        </>
      ); 

      const d = (
        <>
          <p>Water has a low molecular weight, which increases its ability to retain heat.</p>
        </>
      ); 


    return (
       <>
       <div className="topnav">
            <Logo />
            <div className="textDirectionsContainer">
                <h3 className="testTitle">AP Chemistry Practice Test</h3>
                <div className="nav-info-container">
                    <div className="timerContainer" title="Time Remaining">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"></path></svg>
                        <span>00:00</span>
                    </div>
                    <div className="nav-info-space"></div>
                    <div className="timerContainer" title="Answered Questions">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.48 10.089l1.583-1.464c1.854.896 3.028 1.578 5.11 3.063 3.916-4.442 6.503-6.696 11.311-9.688l.516 1.186c-3.965 3.46-6.87 7.314-11.051 14.814-2.579-3.038-4.301-4.974-7.469-7.911zm14.407.557c.067.443.113.893.113 1.354 0 4.962-4.038 9-9 9s-9-4.038-9-9 4.038-9 9-9c1.971 0 3.79.644 5.274 1.723.521-.446 1.052-.881 1.6-1.303-1.884-1.511-4.271-2.42-6.874-2.42-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11c0-1.179-.19-2.313-.534-3.378-.528.633-1.052 1.305-1.579 2.024z"></path></svg>
                        <span>0 of 12</span>
                    </div>
                </div>
                
            </div>
            
        </div>
        <div className="testSection">
            <Question number={1} header={header} a={a} b={b} c={c} d={d} />
            <Question number={2} header={header} a={a} b={b} c={c} d={d} />
            <Question number={3} header={header} a={a} b={b} c={c} d={d} />
            <Question number={4} header={header} a={a} b={b} c={c} d={d} />
            <Question number={5} header={header} a={a} b={b} c={c} d={d} />
            <Question number={6} header={header} a={a} b={b} c={c} d={d} />
            <Question number={7} header={header} a={a} b={b} c={c} d={d} />
        </div>
       
       </>
    );
  }
  
export default Exam;