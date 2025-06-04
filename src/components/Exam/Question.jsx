

function Question({number, header, a, b, c, d}) {
  return (
    <div className="question-outer-container">
    <div className="question-number-container">
        <span className="question-number">Question {number}&nbsp;</span>
        <span className="question-answered">*</span>
        </div>
    <div className="question-inner-container">
    

            <div className="questionText">{header}</div>
            <span className="multipleChoiceAnswers" style={{display: "inline"}}>
                <div className="choiceContainer">
                  <label htmlFor={`choice-q${number}-1`} className="formlabel">
                    <input type="radio" id={`choice-q${number}-1`} name={`choices-q${number}`} onChange={(e)=>console.log(1)}/>
                    <span className="bullet"><span className="letter">A</span><span className="bullet-cross-line"></span></span>
                    <span>{a}</span>
                    <span className="cross-back-fade"></span>
                    <span className="border"></span>
                    <span className="cross-line"></span>
                  </label>
                  
                </div>
                
                <br />
                <div className="choiceContainer">
                  <label htmlFor={`choice-q${number}-2`} className="formlabel">
                      <input type="radio" id={`choice-q${number}-2`} name={`choices-q${number}`} onChange={(e)=>console.log(2)} />
                      <span className="bullet"><span className="letter">B</span><span className="bullet-cross-line"></span></span>
                      <span>{b}</span>
                      <span className="cross-back-fade"></span>
                      <span className="border"></span>
                      <span className="cross-line"></span>
                  </label>
                </div>
  
  
                <br />
                <div className="choiceContainer">
                  <label htmlFor={`choice-q${number}-3`} className="formlabel">
                      <input type="radio" id={`choice-q${number}-3`} name={`choices-q${number}`} onChange={(e)=>console.log(3)}/>
                      <span className="bullet"><span className="letter" style={{marginBottom: "-1px"}}>C</span><span className="bullet-cross-line"></span></span>
                      <span>{c}</span>
                      <span className="cross-back-fade"></span>
                      <span className="border"></span>
                      <span className="cross-line"></span>
                  </label>
                </div>
  
  
                <br />
                <div className="choiceContainer">
                  <label htmlFor={`choice-q${number}-4`} className="formlabel">
                      <input type="radio" id={`choice-q${number}-4`} name={`choices-q${number}`} onChange={(e)=>console.log(4)}/>
                      <span className="bullet"><span className="letter">D</span><span className="bullet-cross-line"></span></span>
                      <span>{d}</span>
                      <span className="cross-back-fade"></span>
                      <span className="border"></span>
                      <span className="cross-line"></span>
                  </label>
                </div>
                <br />
            </span>
            
        
    </div>
    
</div>
  );
}

export default Question;
