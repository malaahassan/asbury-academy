function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const allMenus = [].slice.call(document.querySelectorAll(".menu"));

function displayError(text){
  errorMenuText.textContent = text;
  for(const m of allMenus){
    m.style.display = "none";
  }
  errorMenu.style.display = "flex";
}

let mainColors = ['red', 'orange', 'yellow', 'green', 'springgreen', 'cyan', 'blue', 'violet', 'magenta', 'pink'];
let mainColorsWithFalse = [false, 'red', 'orange', 'yellow', 'green', 'springgreen', 'cyan', 'blue', 'violet', 'magenta', 'pink'];
var thisSection = {passages:
  [{number: 1,text: ""}],
  questions:
  []};

  
var toolbarOptions1 = [
  [{ 'header': [] }],
  ['bold', 'italic', 'underline'],
  [{ 'align': [] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{'color': mainColorsWithFalse}, {'background': mainColorsWithFalse}],
  ['image'],
  ['link'],
  ['formula'],
  ['clean']
];

var toolbarOptions2 = [
  [{ 'header': [] }],
  ['bold', 'italic', 'underline'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{'color': mainColorsWithFalse}, {'background': mainColorsWithFalse}],
  ['image'],
  ['link'],
  ['formula'],
  ['clean']
];

var quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions1
  },
  placeholder: 'Add passage'
});

var quill1 = new Quill('#editor1', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions2
  },
  placeholder: 'Add Choice 1'
});
var quill2 = new Quill('#editor2', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions2
  },
  placeholder: 'Add Choice 2'
});
var quill3 = new Quill('#editor3', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions2
  },
  placeholder: 'Add Choice 3'
});
var quill4 = new Quill('#editor4', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions2
  },
  placeholder: 'Add Choice 4'
});

var quill4a = new Quill('#editor4a', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions2
  },
  placeholder: 'Add Choice 5'
});

var quill5 = new Quill('#question', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions2
  },
  placeholder: 'Add Question Headline'
});

var quill6 = new Quill('#editor5', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions2
  },
  placeholder: 'Add Answer Explanation'
});



const id = getParameterByName("id");
const newForm = false; //getParameterByName("new");
var quizInterface = getParameterByName("interface");

/*
const endingQuestion = parseInt(getParameterByName("ending"));
const startingQuestion = parseInt(getParameterByName("starting"));
const requestedQuestions = endingQuestion - startingQuestion;
var quizType = getParameterByName("type");
if(quizType == null){
  quizType = "reading";
}

if(quizType == "real"){
  disableButton(addPassageButton);
  disableButton(deleteQuestionButton);

  
}

var formTimer = getParameterByName("timer");
if(formTimer == null){
  formTimer = 0;
}

const formName = getParameterByName("name");
if(formName == null){
  returnError("URL Error: Test name is missing.");
}

const formPath = getParameterByName("path");
if(formPath == null){
  returnError("URL Error: Test path is missing.");
}

const formSection = getParameterByName("section");
if(formSection == null){
  returnError("URL Error: Test section is missing.");
}

if(quizType == "diagnosticreading" || quizType == "diagnosticwriting"){
  for(i = startingQuestion - 1; i < endingQuestion; i++){
    let newObject = {number: i+1,passageNumber: 1,text: "",choices: ["", "", "", ""],answer:"A",durationOfQuestion:60,lesson:""};
    thisSection["questions"].push(newObject);
    console.log(i)
  }
  questionanswerduration.addEventListener("input", function(){
    if(!switchingQuestion){
      currentSection["questions"][currentQuestion - 1]["durationOfQuestion"] = parseInt(questionanswerduration.value);
    };
  });
  questionanswerlesson.addEventListener("input", function(){
    if(!switchingQuestion){
      currentSection["questions"][currentQuestion - 1]["lesson"] = questionanswerlesson.value;
    };
  });
} else {
  questionanswerduration.style.display = "none";
  questionanswerdurationh4.style.display = "none";
  questionanswerlesson.style.display = "none";
  questionanswerlessonh4.style.display = "none";
  for(i = startingQuestion - 1; i < endingQuestion; i++){
    let newObject = {number: i+1,passageNumber: 1,text: "",choices: ["", "", "", ""],answer:"A"};
    thisSection["questions"].push(newObject);
  }
}*/


var currentSection = thisSection;
var currentQuestion = 1;
var switchingQuestion = false;


if(newForm != "true"){
  const xhr2 = new XMLHttpRequest();
  xhr2.open("POST", "/back/retrievetest.php");
  xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr2.send(`id=${encodeURIComponent(id)}&interface=${encodeURIComponent(quizInterface)}`);
  xhr2.onerror = function(){
    returnError("Failed to establish a connection to database to grab necessary files.");
  };
  xhr2.onload = function(){
    let response = JSON.parse(this.responseText);
    console.log(JSON.parse(response.form))
    currentSection = JSON.parse(response.form);
    startEditor();
    switchQuestion();
  }

} else {
  startEditor();
  switchQuestion();
}
        



exitReview.addEventListener("click", function(){
  saveForm(true);
});

var retryTimer;

function saveForm(exit){
  let numbers = [];
  let errorPresent = false;
  for(const i in currentSection["questions"]){
    if(!numbers.includes(currentSection["questions"][i]["number"])){
      numbers.push(currentSection["questions"][i]["number"]);
    } else {
      errorPresent = true;
      displayError(`Two questions in this form have the exact same number, which is number ${currentSection["questions"][i]["number"]}. Please change or delete one of them to proceed.`);
      break;
    }
    
  }

  if(!errorPresent){
    let words = editor.querySelector(".ql-editor").textContent.split(' ').length;
    let questionsLength = currentSection["questions"] == null ? 0 : currentSection["questions"].length;
    let passagesLength = currentSection["passages"] == null ? 0 : currentSection["passages"].length;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/back/edit_test_form.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`id=${encodeURIComponent(id)}&words=${encodeURIComponent(words)}&questions=${questionsLength}&passages=${passagesLength}&content=${encodeURIComponent(JSON.stringify(currentSection))}`);
    xhr.onload = function(){
      if(xhr.status == 200){
        if(xhr.responseText == "success"){

          finishUpload();
        } else {
          uploadingTestText.innerHTML = `Failed to upload test.<br>${xhr.responseText}`;
        }
      } else {
        uploadFailed();
      }
    }


    blank.style.display = "block";
    uploadingTest.style.display = "flex";
    uploadingTestText.innerHTML = "Uploading test...<br>(DO NOT CLOSE THIS WINDOW)";
    function uploadFailed(){
      uploadingTestText.innerHTML = "Failed to upload test. Retrying in 3 seconds...";
      clearTimeout(retryTimer);
      retryTimer = setTimeout(function(){
        uploadingTestText.innerHTML = "Uploading test...<br>(DO NOT CLOSE THIS WINDOW)";
        saveForm(exit);
      }, 3000);
    }
    function finishUpload(){
      if(exit){
        window.onbeforeunload = null;
        window.location.replace("/admin/tests");
        
      } else {
        blank.style.display = "none";
        uploadingTest.style.display = "none";
      }
    }
  }
  
  
}


/*let Inline = Quill.import('blots/inline');

class SpanBlock extends Inline{

    static create(value){
        let node = super.create();
        node.setAttribute('class','spanblock');
        return node;
    }
}

SpanBlock.blotName = 'spanblock';
SpanBlock.tagName = 'div';
Quill.register(SpanBlock);




function buttonF(q, c){
  var spanBlockButton = c.querySelector('.ql-spanblock');

  //event listener to spanblock button on toolbar
  spanBlockButton.addEventListener('click', function() {

          var range = q.getSelection();
          if(range){

              q.formatText(range,'spanblock',true);
          }else{
              q.removeFormat(range.index, range.index + range.length);
          }

      }
  );
}*/


/*
buttonF(quill, editorContainer);
buttonF(quill1, label1);
buttonF(quill2, label2);
buttonF(quill3, label3);
buttonF(quill4, label4);
buttonF(quill5, answerArea);*/


var aceeditor = ace.edit("aceEditor");
aceeditor.setTheme("ace/theme/twilight");
aceeditor.session.setMode("ace/mode/json");
aceeditor.getSession().setUseWrapMode(true);
aceeditor.setOptions({
  fontSize: "15px"
});

editCodeButton.addEventListener("click", function(){
  aceeditor.session.setValue(JSON.stringify(currentSection)); // set value and reset undo history
  devMenu.style.display = "flex";
});



var errorsTimer;

saveDevButton.addEventListener("click", function(){
  let errors = aceeditor.getSession().getAnnotations();
  if(errors.length != 0){
    devMenuDown.style.display = "flex";
    console.log("===========================================================");
    console.log("CURRENT SESSION DEVELOPER ERRORS:");
    for(const i in errors){
      console.log(parseInt(parseInt(i)+1) + ". " + errors[i]["text"] + " on line " + errors[i]["row"] + " and column " + errors[i]["column"]);
    };
    console.log("===========================================================");
    clearTimeout(errorsTimer);
    errorsTimer = setTimeout(function(){
      devMenuDown.style.display = "none";
    }, 3000);
  } else {
    currentSection = JSON.parse(aceeditor.session.getValue());
    startEditor();
    switchQuestion();
  };
});

discardDevButton.addEventListener("click", function(){
  devMenu.style.display = "none";
});

devMenuTopClose.addEventListener("click", function(){
  devMenu.style.display = "none";
});

quill.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change' && !switchingQuestion) {
    let currentPassage = currentSection["questions"][currentQuestion - 1]["passageNumber"] - 1;
    currentSection["passages"][currentPassage]["text"] = editor.querySelector(".ql-editor").innerHTML;
  };
});

quill1.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change' && !switchingQuestion) {
    currentSection["questions"][currentQuestion - 1]["choices"][0] = editor1.querySelector(".ql-editor").innerHTML;
  };
});

quill2.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change' && !switchingQuestion) {
    currentSection["questions"][currentQuestion - 1]["choices"][1] = editor2.querySelector(".ql-editor").innerHTML;
  };
});

quill3.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change' && !switchingQuestion) {
    currentSection["questions"][currentQuestion - 1]["choices"][2] = editor3.querySelector(".ql-editor").innerHTML;
  };
});

quill4.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change' && !switchingQuestion) {
    currentSection["questions"][currentQuestion - 1]["choices"][3] = editor4.querySelector(".ql-editor").innerHTML;
  };
});

quill4a.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change' && !switchingQuestion) {
    currentSection["questions"][currentQuestion - 1]["choices"][4] = editor4a.querySelector(".ql-editor").innerHTML;
  };
});

quill5.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change' && !switchingQuestion) {
    currentSection["questions"][currentQuestion - 1]["text"] = question.querySelector(".ql-editor").innerHTML;
  };
});

quill6.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change' && !switchingQuestion) {
    currentSection["questions"][currentQuestion - 1]["explanation"] = editor5.querySelector(".ql-editor").innerHTML;
  };
});

function startEditor(){
  window.onbeforeunload = function() {
      return "Are you sure you want to leave? Your inputs will be lost.";
  };
  navigatorQuestions.innerHTML = "";
  bottomnavigationbuttons.innerHTML = "";
  for(const q in currentSection["questions"]){

    if(quizInterface == "act"){
      
      console.log(`${parseInt(q)} | ${parseInt(q)%2==0} | Entered ${currentSection["questions"][q]["answer"]}`)
      if(parseInt(q)%2 == 0){
        switch(currentSection["questions"][q]["answer"]){
          case "F":
            currentSection["questions"][q]["answer"] = "A";
            break;
          case "G":
            currentSection["questions"][q]["answer"] = "B";
            break;
          case "H":
            currentSection["questions"][q]["answer"] = "C";
            break;
          case "J":
            currentSection["questions"][q]["answer"] = "D";
            break;
          case "K":
            currentSection["questions"][q]["answer"] = "E";
            break;
        }
        
      } else {
        switch(currentSection["questions"][q]["answer"]){
          case "A":
            currentSection["questions"][q]["answer"] = "F";
            break;
          case "B":
            currentSection["questions"][q]["answer"] = "G";
            break;
          case "C":
            currentSection["questions"][q]["answer"] = "H";
            break;
          case "D":
            currentSection["questions"][q]["answer"] = "J";
            break;
          case "E":
            currentSection["questions"][q]["answer"] = "K";
            break;
        }
      }
      
    } else {
      switch(currentSection["questions"][q]["answer"]){
        case "F":
          currentSection["questions"][q]["answer"] = "A";
          break;
        case "G":
          currentSection["questions"][q]["answer"] = "B";
          break;
        case "H":
          currentSection["questions"][q]["answer"] = "C";
          break;
        case "J":
          currentSection["questions"][q]["answer"] = "D";
          break;
        case "K":
          currentSection["questions"][q]["answer"] = "E";
          break;
      }
    }

    const questionButton = document.createElement("button");
    questionButton.setAttribute("navQNumber", parseInt(q) + 1);
    questionButton.classList.add("diffButton");
    questionButton.textContent = currentSection["questions"][q]["number"];
    bottomnavigationbuttons.appendChild(questionButton);

    const onelineSpan = document.createElement("span");
    onelineSpan.classList.add("oneline");
    onelineSpan.setAttribute("navQNumber", parseInt(q) + 1);
    navigatorQuestions.appendChild(onelineSpan);

    const arrow = document.createElement("span");
    arrow.classList.add("lineArrow");
    onelineSpan.appendChild(arrow);

    const numberSpan = document.createElement("span");
    numberSpan.classList.add("number");
    onelineSpan.appendChild(numberSpan);
    numberSpan.textContent = currentSection["questions"][q]["number"];

    onelineSpan.addEventListener("click", function(evt){
      currentQuestion = parseInt(q) + 1;
      switchQuestion();
    });

    questionButton.addEventListener("click", function(){
      currentQuestion = parseInt(q) + 1;
      switchQuestion();
    });


    if(q == 0){
      onelineSpan.style.backgroundColor = "#f5f5f5";
      arrow.style.display = "inline";
    };
  };
}

nextButton.addEventListener("click", function(){
  currentQuestion++;
  switchQuestion();
});


prevButton.addEventListener("click", function(){
  currentQuestion--;
  switchQuestion();
});

function disableButton(button){
  button.style.pointerEvents = "none";
  button.style.opacity = "0.5";
};

function enableButton(button){
  button.style.pointerEvents = "auto";
  button.style.opacity = "1";
};


var loadingTimer;
function switchQuestion(){
  switchingQuestion = true;
  loading.style.display = "none";
  //clearTimeout(loadingTimer);
  
    devMenu.style.display = "none";
    addPassageMenu.style.display = "none";
    document.body.style.pointerEvents = "auto";
    blank.style.display = "none";
    navigatorBackground.style.display = "none";
     
    /*if(currentSection["questions"].some((element) => (element.answer == "F" || element.answer == "G" || element.answer == "H" || element.answer == "J" || element.answer == "K") )){
      
    }*/
    
    questionanswer.innerHTML = "";
    const option1 = document.createElement("option");
    
    questionanswer.appendChild(option1);
    const option2 = document.createElement("option");
    
    questionanswer.appendChild(option2);
    const option3 = document.createElement("option");
    
    questionanswer.appendChild(option3);
    const option4 = document.createElement("option");
    
    questionanswer.appendChild(option4);

    function ABCDE(){
        option1.textContent = "A";
        option1.value = "A";
        option2.textContent = "B";
        option2.value = "B";
        option3.textContent = "C";
        option3.value = "C";
        option4.textContent = "D";
        option4.value = "D";
        choice1letter.textContent = "A.";
        choice2letter.textContent = "B.";
        choice3letter.textContent = "C.";
        choice4letter.textContent = "D.";
        choice5letter.textContent = "E.";
        if(currentSection["questions"][currentQuestion - 1]["choices"].length > 4){
          const option5 = document.createElement("option");
          option5.textContent = "E";
          option5.value = "E";
          questionanswer.appendChild(option5);
        }
    }

    function FGHJK(){
      option1.textContent = "F";
      option1.value = "F";
      option2.textContent = "G";
      option2.value = "G";
      option3.textContent = "H";
      option3.value = "H";
      option4.textContent = "J";
      option4.value = "J";
      choice1letter.textContent = "F.";
      choice2letter.textContent = "G.";
      choice3letter.textContent = "H.";
      choice4letter.textContent = "J.";
      choice5letter.textContent = "K.";
      if(currentSection["questions"][currentQuestion - 1]["choices"].length > 4){
        const option5 = document.createElement("option");
        option5.textContent = "K";
        option5.value = "K";
        questionanswer.appendChild(option5);
      }
  }

    if(quizInterface == "act"){
      if(currentQuestion%2 == 0){
        FGHJK();
      } else {
        ABCDE();
      }
    } else {
      ABCDE();
    }
    

    if(currentSection["passages"] != null){
      questionpassagequestioncontainer.style.display = "block";
      questionpassage.innerHTML = "";
      for(const i in currentSection["passages"]){
        const passageoption = document.createElement("option");
        passageoption.textContent = `Passage ${currentSection["passages"][i]["number"]}`;
        passageoption.value = currentSection["passages"][i]["number"];
        questionpassage.appendChild(passageoption);
      }

      questionpassage.value = currentSection["questions"][currentQuestion - 1]["passageNumber"];
    } else {
      questionpassagequestioncontainer.style.display = "none";
    }
    

    
    
    console.log(currentQuestion)
    console.log(currentSection["questions"][currentQuestion - 1]["answer"])
    if(currentSection["questions"][currentQuestion - 1]["answer"] != ""){
      questionanswer.value = currentSection["questions"][currentQuestion - 1]["answer"];
    };
    /*if(quizType == "diagnosticreading" || quizType == "diagnosticwriting"){
      questionanswerduration.value = currentSection["questions"][currentQuestion - 1]["durationOfQuestion"];
      questionanswerlesson.value = currentSection["questions"][currentQuestion - 1]["lesson"];
    }*/

    questionNo.textContent = currentSection["questions"][currentQuestion - 1]["number"];
    console.log(question.querySelector(".ql-editor"))
    question.querySelector(".ql-editor").innerHTML = currentSection["questions"][currentQuestion - 1]["text"];
    editor1.querySelector(".ql-editor").innerHTML = currentSection["questions"][currentQuestion - 1]["choices"][0];
    editor2.querySelector(".ql-editor").innerHTML = currentSection["questions"][currentQuestion - 1]["choices"][1];
    editor3.querySelector(".ql-editor").innerHTML = currentSection["questions"][currentQuestion - 1]["choices"][2];
    editor4.querySelector(".ql-editor").innerHTML = currentSection["questions"][currentQuestion - 1]["choices"][3];
    if(currentSection["questions"][currentQuestion - 1]["choices"].length > 4){
      fifthchoice.style.display = "flex";
      editor4a.querySelector(".ql-editor").innerHTML = currentSection["questions"][currentQuestion - 1]["choices"][4];
    } else {
      fifthchoice.style.display = "none";
    }
    if(currentSection["questions"][currentQuestion - 1]["explanation"] != null){
      editor5.querySelector(".ql-editor").innerHTML = currentSection["questions"][currentQuestion - 1]["explanation"];

    } else {
      editor5.querySelector(".ql-editor").innerHTML = "";

    }
    if(currentSection["passages"] != null){
      questionArea.style.display = "block";
      let currentPassage = currentSection["questions"][currentQuestion - 1]["passageNumber"] - 1;
      passageNo.textContent = currentPassage + 1;
      editor.querySelector(".ql-editor").innerHTML = currentSection["passages"][currentPassage]["text"];
      if(editor.querySelector(".ql-editor").querySelector("[qn]") != null){
        const allQn = [].slice.call(editor.querySelector(".ql-editor").querySelectorAll("[qn]"));
        let indexOfQuestion = allQn.indexOf(allQn.find(element => parseInt(element.getAttribute("qn")) == currentQuestion));
        if(indexOfQuestion != -1){
          if(!allQn[indexOfQuestion].classList.contains("nounderline")){
            //questiontype.value = "underlined";
          } else {
            //questiontype.value = "notunderlined";
          };
        } else {
          //questiontype.value = "general";
        };
      } else {
        //questiontype.value = "general";
      };
      finishPassageEdit();
    } else {
      enableButton(answerArea);
      //questiontype.style.display = "none";
      editPassageButton.style.display = "none";
      //questiontypeheadline.style.display = "none";
      questionArea.style.display = "none";
      answerArea.style.paddingLeft = "50px";
      answerArea.style.width = "100%";
    };
    if(currentQuestion == 1){
      disableButton(prevButton);
    } else {
      enableButton(prevButton);
    };
    if(currentQuestion == currentSection["questions"].length){
      disableButton(nextButton);
    } else {
      enableButton(nextButton);
    };
    let allQuestionsInNav = [].slice.call(navigatorQuestions.querySelectorAll("span[navQNumber]"));
    for(q in allQuestionsInNav){
      allQuestionsInNav[q].removeAttribute("style");
      allQuestionsInNav[q].querySelector(".lineArrow").removeAttribute("style");
    };
    navigatorQuestions.querySelector("span[navQNumber='"+currentQuestion+"']").style.backgroundColor = "#f5f5f5";
    navigatorQuestions.querySelector("span[navQNumber='"+currentQuestion+"']").querySelector(".lineArrow").style.display = "inline";
    let allButtonsInBottomNav = [].slice.call(bottomnavigationbuttons.querySelectorAll("button"));
    if(currentQuestion - Math.floor(numberOfQInBar/2) > 0){
      bottomnavigationbuttons.scrollTo(bottomnavigationbuttons.querySelector("button[navQNumber='"+(currentQuestion - Math.floor(numberOfQInBar/2))+"']").offsetLeft - 29, 0);
    } else {
      bottomnavigationbuttons.scrollTo(0, 0);
    };
    for(q in allButtonsInBottomNav){
      allButtonsInBottomNav[q].removeAttribute("id");
    };
    bottomnavigationbuttons.querySelector("button[navQNumber='"+currentQuestion+"']").setAttribute("id", "selectednavButton");
    bottomnavigationbuttons.querySelector("button[navQNumber='"+currentQuestion+"']").blur();
    switchingQuestion = false;
  
};

/*loading.addEventListener("animationend", function(){
  loading.style.display = "none";
});

loading.addEventListener("animationcancel", function(){
  loading.style.display = "none";
});*/


window.onresize = function(){
  alignQuestionsInBar();
};

var numberOfQInBar = Math.floor((((85/100)*window.innerWidth) - 58)/29);
var zoom = 1;

function alignQuestionsInBar(){
  if(window.innerWidth < 800 && window.innerWidth > 500){
    numberOfQInBar = Math.floor((((75/100)*(window.innerWidth/zoom)) - 58)/29);
  } else if(window.innerWidth <= 500){
    numberOfQInBar = Math.floor((((65/100)*(window.innerWidth/zoom)) - 58)/29);
  } else {
    numberOfQInBar = Math.floor((((85/100)*(window.innerWidth/zoom)) - 58)/29);
  };
  bottomnavigationbuttons.style.maxWidth = (numberOfQInBar*29) + "px";
};

bottomnavSlideLeft.addEventListener("click", function(){
  if(numberOfQInBar > Math.floor(numberOfQInBar/2)){
    bottomnavigationbuttons.scrollLeft -= (Math.floor(numberOfQInBar/2)*29);
  } else {
    bottomnavigationbuttons.scrollLeft -= (numberOfQInBar*29);
  };
});

bottomnavSlideRight.addEventListener("click", function(){
  if(numberOfQInBar > Math.floor(numberOfQInBar/2)){
    bottomnavigationbuttons.scrollLeft += (Math.floor(numberOfQInBar/2)*29);
  } else {
    bottomnavigationbuttons.scrollLeft += (numberOfQInBar*29);
  };
});

alignQuestionsInBar();

function finishPassageEdit(){
  finishPassageButton.style.display = "none";
  editPassageButton.style.display = "flex";
  let currentPassage = currentSection["questions"][currentQuestion - 1]["passageNumber"] - 1;
  editorContainer.style.display = "none";
  afterEdit.style.display = "block";
  afterEdit.innerHTML = editor.querySelector(".ql-editor").innerHTML;
  const allUnderlines = [].slice.call(afterEdit.querySelectorAll("u"));
  for(const i in allUnderlines){
    allUnderlines[i].style.width = allUnderlines[i].offsetWidth + "px";
    allUnderlines[i].classList.add("chooseUnderlinedPart");
    if(allUnderlines[i].getAttribute("qn") != null){
      var initialText = allUnderlines[i].textContent;
      allUnderlines[i].innerHTML = "";
      allUnderlines[i].style.paddingLeft = "3em";
      allUnderlines[i].title = "Attached to Question " + allUnderlines[i].getAttribute("qn");
      const chooseUnderlinedPartSpan = document.createElement("span");
      chooseUnderlinedPartSpan.innerHTML = `<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.25 12.321 7.27 6.491c.143.127.321.19.499.19.206 0 .41-.084.559-.249l11.23-12.501c.129-.143.192-.321.192-.5 0-.419-.338-.75-.749-.75-.206 0-.411.084-.559.249l-10.731 11.945-6.711-5.994c-.144-.127-.322-.19-.5-.19-.417 0-.75.336-.75.749 0 .206.084.412.25.56" fill-rule="nonzero"></path></svg>` + allUnderlines[i].getAttribute("qn");
      chooseUnderlinedPartSpan.classList.add("check");
      const chooseUnderlinedPartText = document.createElement("span");
      chooseUnderlinedPartText.textContent = initialText;
      chooseUnderlinedPartText.classList.add("text");
      allUnderlines[i].appendChild(chooseUnderlinedPartText);
      allUnderlines[i].appendChild(chooseUnderlinedPartSpan);
      allUnderlines[i].classList.add("chooseUnderlinedPartAlreadyDone");
      allUnderlines[i].addEventListener("click", function(){
        proceedMessageElements.innerHTML = "";
        if(parseInt(allUnderlines[i].getAttribute("qn")) != currentQuestion){

          proceedMessage.style.display = "flex";
          const textSpan1 = document.createElement("span");
          const cln = allUnderlines[i].cloneNode(true);
          textSpan1.textContent = "This action will remove the binding of part '";
          proceedMessageElements.appendChild(textSpan1);
          proceedMessageElements.appendChild(cln);
          const textSpan2 = document.createElement("span");
          textSpan2.textContent = "' with question " + allUnderlines[i].getAttribute("qn") + " and will rebind it to current question, which is question number " + currentQuestion + ". Are you sure?";
          proceedMessageElements.appendChild(textSpan2);
          const shareButtons = document.createElement("div");
          shareButtons.id = "shareButtons";
          proceedMessageElements.appendChild(shareButtons);
          const proceedYes = document.createElement("button");
          proceedYes.classList.add("diffButton");
          shareButtons.appendChild(proceedYes);
          proceedYes.textContent = "Yes";
          proceedYes.addEventListener("click", function(){
            proceedMessage.style.display = "none";
            let allUnderlinesInEditor = [].slice.call(editor.querySelector(".ql-editor").querySelectorAll("u"));
            let indexOfQuestion = allUnderlinesInEditor.indexOf(allUnderlinesInEditor.find(element => element.getAttribute("qn") == allUnderlines[i].getAttribute("qn") && element.textContent == allUnderlines[i].querySelector(".text").textContent));
            allUnderlinesInEditor[indexOfQuestion].setAttribute("qn", currentQuestion);
            /*if(questiontype.value == "notunderlined"){
              allUnderlinesInEditor[indexOfQuestion].classList.add("nounderline");
            };*/
            let currentPassage = currentSection["questions"][currentQuestion - 1]["passageNumber"] - 1;
            currentSection["passages"][currentPassage]["text"] = editor.querySelector(".ql-editor").innerHTML;
            finishPassageEdit();
          });
          const proceedNo = document.createElement("button");
          proceedNo.classList.add("diffButton");
          proceedNo.textContent = "No";
          shareButtons.appendChild(proceedNo);
          proceedNo.addEventListener("click", function(){
            proceedMessage.style.display = "none";
          });
        } else {
          proceedMessage.style.display = "flex";
          const textSpan1 = document.createElement("span");
          const cln = allUnderlines[i].cloneNode(true);
          textSpan1.textContent = "Part '";
          proceedMessageElements.appendChild(textSpan1);
          proceedMessageElements.appendChild(cln);
          const textSpan2 = document.createElement("span");
          textSpan2.textContent = "' is already bound for current question, which is question number " + currentQuestion + ".";
          proceedMessageElements.appendChild(textSpan2);
          const shareButtons = document.createElement("div");
          shareButtons.id = "shareButtons";
          proceedMessageElements.appendChild(shareButtons);
          const proceedNo = document.createElement("button");
          proceedNo.classList.add("diffButton");
          proceedNo.textContent = "Ok";
          shareButtons.appendChild(proceedNo);
          proceedNo.addEventListener("click", function(){
            proceedMessage.style.display = "none";
          });
        };
      });
    } else {
      var initialText = allUnderlines[i].textContent;
      allUnderlines[i].innerHTML = "";
      const chooseUnderlinedPartText = document.createElement("span");
      chooseUnderlinedPartText.textContent = initialText;
      chooseUnderlinedPartText.classList.add("text");
      allUnderlines[i].appendChild(chooseUnderlinedPartText);
      allUnderlines[i].addEventListener("click", function(){
        proceedMessageElements.innerHTML = "";
        proceedMessage.style.display = "flex";
        const textSpan1 = document.createElement("span");
        const cln = allUnderlines[i].cloneNode(true);
        textSpan1.textContent = "This action will bind part '";
        proceedMessageElements.appendChild(textSpan1);
        proceedMessageElements.appendChild(cln);
        const textSpan2 = document.createElement("span");
        textSpan2.textContent = "'to current question, which is question number " + currentQuestion + ".";
        proceedMessageElements.appendChild(textSpan2);
        const shareButtons = document.createElement("div");
        shareButtons.id = "shareButtons";
        proceedMessageElements.appendChild(shareButtons);
        const proceedYes = document.createElement("button");
        proceedYes.classList.add("diffButton");
        proceedYes.textContent = "Yes";
        shareButtons.appendChild(proceedYes);
        const proceedNo = document.createElement("button");
        proceedYes.addEventListener("click", function(){
          proceedMessage.style.display = "none";
          let allUnderlinesInEditor = [].slice.call(editor.querySelector(".ql-editor").querySelectorAll("u"));
          let indexOfQuestion = allUnderlinesInEditor.indexOf(allUnderlinesInEditor.find(element => element.getAttribute("qn") == allUnderlines[i].getAttribute("qn") && element.textContent == allUnderlines[i].querySelector(".text").textContent));
          allUnderlinesInEditor[indexOfQuestion].setAttribute("qn", currentQuestion);
          /*if(questiontype.value == "notunderlined"){
            allUnderlinesInEditor[indexOfQuestion].classList.add("nounderline");
          };*/
          let currentPassage = currentSection["questions"][currentQuestion - 1]["passageNumber"] - 1;
          currentSection["passages"][currentPassage]["text"] = editor.querySelector(".ql-editor").innerHTML;
          finishPassageEdit();
        });
        proceedNo.classList.add("diffButton");
        proceedNo.textContent = "No";
        shareButtons.appendChild(proceedNo);
        proceedNo.addEventListener("click", function(){
          proceedMessage.style.display = "none";
        });
      });
    };
  };
  showNhideSections();
};

function showNhideSections(){
  //disableButton(questionArea);
  questionArea.style.pointerEvents = "none";
  enableButton(answerArea);
};


questionpassage.addEventListener("input", function(){
  if(!switchingQuestion){
    currentSection["questions"][currentQuestion - 1]["passageNumber"] = parseInt(questionpassage.value);
    switchQuestion();
  };
});

questionanswer.addEventListener("input", function(){
  if(!switchingQuestion){
    currentSection["questions"][currentQuestion - 1]["answer"] = questionanswer.value;
  };
});

finishPassageButton.addEventListener("click", function(){
  finishPassageEdit();
});

editPassageButton.addEventListener("click", function(){
  finishPassageButton.style.display = "flex";
  editPassageButton.style.display = "none";
  editorContainer.style.display = "block";
  afterEdit.style.display = "none";
  disableButton(answerArea);
  enableButton(questionArea);
});

navButton.addEventListener("click", function(){
  navigatorBackground.style.display = "flex";
});

navigationClose.addEventListener("click", function(){
  navigatorBackground.style.display = "none";
});

navigatorTopClose.addEventListener("click", function(){
  navigatorBackground.style.display = "none";
});





addPassageButton.addEventListener("click", function(){
  addPassageContainer.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">Loading real tests...</div>`;
  addPassageMenu.style.display = "flex";
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/back/get_all_tests.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
  xhr.onerror = function(){
    addPassageContainer.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">Connection Failure: failed to connect to server to retrieve tests information.</div>`;
  };
  xhr.onload = function(){
    if(xhr.status == 200){
      try {
        let alltests = JSON.parse(xhr.responseText).response;
        
        

        function addPassage(required_id, required_interface, requiredPassage, requiredQuestion, passageOption, keepQuestionsNumbers){
          document.body.style.pointerEvents = "none";
          addPassageContainer.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">Loading Test...</div>`;
          const newxhr2 = new XMLHttpRequest();
          newxhr2.open("POST", "/back/retrievetest.php");
          newxhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          newxhr2.send(`id=${encodeURIComponent(required_id)}&interface=${required_interface}`);
          
          newxhr2.onerror = function(){
            addPassageContainer.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">Connection Failure: failed to connect to server to retrieve test information.</div>`;
          };

          newxhr2.onprogress = function(pe) {
            addPassageContainer.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; text-align: center;">Downloading Test...<br>(${pe.loaded} Bytes loaded)</div>`;
          }

          newxhr2.onload = function(){
            if(newxhr2.status == 200){
              try {
                let thisTest;
                let response = JSON.parse(this.responseText);
                thisTest = JSON.parse(response.form);

                if(passageOption == "replacepassage"){
                  
                  currentSection["passages"] = [];
                  currentSection["passages"].push(thisTest["passages"][requiredPassage - 1]);
                  currentSection["passages"][0]["number"] = 1;
                  currentSection["questions"] = [];

                  let addedQuestions = [];
                  if(keepQuestionsNumbers){

                    for(const q in thisTest["questions"]){
                      if(thisTest["questions"][q]["passageNumber"] == requiredPassage){
                        currentSection["questions"].push(thisTest["questions"][q]);
                        addedQuestions.push(thisTest["questions"][q]);
                      }
                    }

                  } else {
                    let nextQuestionNumber = 1;
                    for(const q in thisTest["questions"]){
                      if(thisTest["questions"][q]["passageNumber"] == requiredPassage){
                        thisTest["questions"][q]["number"] = nextQuestionNumber;
                        currentSection["questions"].push(thisTest["questions"][q]);
                        addedQuestions.push(thisTest["questions"][q]);
                        nextQuestionNumber++;
                      }
                    }
                  }
                  
                  for(const q in addedQuestions){
                    addedQuestions[q]["passageNumber"] = 1;
                  }
                  console.log(thisTest);
                } else if(passageOption == "addpassage"){
                  if(currentSection["passages"] == null){
                    currentSection["passages"] = [{number: 1, text:""}];
                    for(const q of currentSection["questions"]){
                      q.passageNumber = 1;
                    }
                  }
                  currentSection["passages"].push(thisTest["passages"][requiredPassage - 1]);
                  currentSection["passages"][currentSection["passages"].length - 1]["number"] = currentSection["passages"].length;
                  let addedQuestions = [];

                  if(keepQuestionsNumbers){
                    for(const q in thisTest["questions"]){
                      if(thisTest["questions"][q]["passageNumber"] == requiredPassage){
                        currentSection["questions"].push(thisTest["questions"][q]);
                        addedQuestions.push(thisTest["questions"][q]);
                      }
                      
                    }
                  } else {
                    let nextQuestionNumber = currentSection["questions"][currentSection["questions"].length - 1]["number"] + 1;
                    for(const q in thisTest["questions"]){
                      if(thisTest["questions"][q]["passageNumber"] == requiredPassage){
                        thisTest["questions"][q]["number"] = nextQuestionNumber;
                        currentSection["questions"].push(thisTest["questions"][q]);
                        addedQuestions.push(thisTest["questions"][q]);
                        nextQuestionNumber++;
                      }
                      
                    }
                  }
                  
                  for(const q in addedQuestions){
                    addedQuestions[q]["passageNumber"] = currentSection["passages"].length;
                  }
                  console.log(thisTest);
                }  else if(passageOption == "onequestion"){
                  //I WAS HERE
                  if(keepQuestionsNumbers){
                    thisTest["questions"][requiredQuestion - 1]["passageNumber"] = currentSection["questions"][currentSection["questions"].length - 1]["passageNumber"];
                    currentSection["questions"].push(thisTest["questions"][requiredQuestion - 1]);
                  } else {
                    thisTest["questions"][requiredQuestion - 1]["number"] = currentSection["questions"][currentSection["questions"].length - 1]["number"] + 1;
                    thisTest["questions"][requiredQuestion - 1]["passageNumber"] = currentSection["questions"][currentSection["questions"].length - 1]["passageNumber"];
                    currentSection["questions"].push(thisTest["questions"][requiredQuestion - 1]);
                  }
                  
                    
                  console.log(thisTest);
                }

                console.log(currentSection)

                currentQuestion = 1;
                
                
                startEditor();
                switchQuestion();
              } catch(err){
                console.log(err)
                displayError(newxhr2.responseText);
              }
            } else {
              addPassageContainer.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">Connection Failure: failed to connect to server to retrieve test information.</div>`;
            }
          }

        }

        function listTests(){
          let requiredTest;
          let requiredPassage;
          let requiredSection;
          let requiredTestType;
          let passageOption;
          let numberOfQuestions;
          let keepQuestionsNumbers;

          addPassageHeader.textContent = "Add Passage";
          addPassageContainer.innerHTML = "";

          //First Options
          const optionReplace = document.createElement("span");
          optionReplace.style.height = "120px";
          optionReplace.classList.add("oneline");
          addPassageContainer.appendChild(optionReplace);
          optionReplace.innerHTML = `<span class="number">1</span><span class="state">Replace current test entirely with a passage from another test.</span>`;
          optionReplace.addEventListener("click", function(){
            addPassageHeader.textContent = "Replace Passage";
            passageOption = "replacepassage";
            moveOnToQuestionsQuestion();
          });

            const optionAdd = document.createElement("span");
            optionAdd.style.height = "120px";

            optionAdd.classList.add("oneline");
            addPassageContainer.appendChild(optionAdd);
            optionAdd.innerHTML = `<span class="number">2</span><span class="state">Add an entire passage from another test after the current one.</span>`;
            optionAdd.addEventListener("click", function(){
              passageOption = "addpassage";
              moveOnToQuestionsQuestion();
            });
          

          

          const optionQuestion = document.createElement("span");
          optionQuestion.style.height = "120px";

          optionQuestion.classList.add("oneline");
          addPassageContainer.appendChild(optionQuestion);
          optionQuestion.innerHTML = `<span class="number">3</span><span class="state">Add a single question from another test to this passage (without associated passage).</span>`;
          optionQuestion.addEventListener("click", function(){
            passageOption = "onequestion";
            addPassageHeader.textContent = "Add Question";
            moveOnToQuestionsQuestion();
          });

          function moveOnToQuestionsQuestion(){
            addPassageContainer.innerHTML = "";
            const optionKeep = document.createElement("span");
            optionKeep.classList.add("oneline");
            optionKeep.style.height = "90px";
            addPassageContainer.appendChild(optionKeep);
            optionKeep.innerHTML = `<span class="number">1</span><span class="state">Keep original question(s) numbering (Might cause confusion).</span>`;
            optionKeep.addEventListener("click", function(){
              moveOnWithList();
              addPassageHeader.textContent += ` (Original numbers)`;
              keepQuestionsNumbers = true;
            });

            const optionChange = document.createElement("span");
            optionChange.classList.add("oneline");
            optionChange.style.height = "90px";
            addPassageContainer.appendChild(optionChange);
            if(passageOption == "addpassage"){
              optionChange.innerHTML = `<span class="number">2</span><span class="state">Re-number questions in an ascending order after current last question.</span>`;
            } else if(passageOption == "replacepassage"){
              optionChange.innerHTML = `<span class="number">2</span><span class="state">Re-number questions in an ascending order.</span>`;
            } else if(passageOption == "onequestion"){
              optionChange.innerHTML = `<span class="number">2</span><span class="state">Re-number the question to suit the end of last passage.</span>`;
            }
            optionChange.addEventListener("click", function(){
              moveOnWithList();
              addPassageHeader.textContent += ` (Re-number)`;
              keepQuestionsNumbers = false;
            });
          }

          function moveOnWithList(){
            addPassageContainer.innerHTML = "";
            for(const i in alltests){
              const onelineSpan = document.createElement("span");
              onelineSpan.classList.add("oneline");
              addPassageContainer.appendChild(onelineSpan);
  
              const numberSpan = document.createElement("span");
              numberSpan.classList.add("number");
              onelineSpan.appendChild(numberSpan);
              numberSpan.textContent = parseInt(i) + 1;
  
              const stateSpan = document.createElement("span");
              stateSpan.classList.add("state");
              onelineSpan.appendChild(stateSpan);
              stateSpan.textContent = alltests[i].name;
  
              onelineSpan.addEventListener("click", function(){
                addPassageHeader.textContent += ` → ${alltests[i].name}`;
                addPassageContainer.innerHTML = "";
  
                function continueToPassages(section_value, section_name, section_passages, required_interface){
                  
                  addPassageContainer.innerHTML = "";
                  function addPassageSpan(p){
                    const passageSpan = document.createElement("span");
                    passageSpan.innerHTML = `<span class="state">Passage ${p}</span>`;
                    passageSpan.classList.add("oneline");
                    addPassageContainer.appendChild(passageSpan);
                    passageSpan.addEventListener("click", function(){
                      addPassageHeader.textContent += ` → Passage ${p}`;
                      requiredPassage = p;
                      addPassage(section_value, required_interface, requiredPassage, 0, passageOption, keepQuestionsNumbers);
                      
                    });
                  }
                  addPassageHeader.textContent += ` → ${section_name}`;
                  let noOfPassages = section_passages;
                  
                  for (let p = 1; p <= noOfPassages; p++) {
                    console.log(p)
                    addPassageSpan(p);
                  }
  
                }
                for(const sec of alltests[i]["sections"]){
                  if(sec.passages > 0 || passageOption == "onequestion"){
                    const writingSpan = document.createElement("span");
                    writingSpan.innerHTML = `<span class="state">${sec.displayName} Section</span>`;
                    writingSpan.classList.add("oneline");
                    addPassageContainer.appendChild(writingSpan);
                    writingSpan.addEventListener("click", function(){
                      numberOfQuestions = sec.questions;
                      if(passageOption != "onequestion"){
                        continueToPassages(sec.value, sec.displayName, sec.passages, alltests[i].test_interface);

                      } else {
                        addPassageContainer.innerHTML = "";
                          for (let f = 1; f <= numberOfQuestions; f++) {
                            
                            const currentIndex = f;
                            const fonelineSpan = document.createElement("span");
                            fonelineSpan.classList.add("oneline");
                            addPassageContainer.appendChild(fonelineSpan);
                            
                            const fstateSpan = document.createElement("span");
                            fstateSpan.classList.add("state");
                            fonelineSpan.appendChild(fstateSpan);
                            fstateSpan.textContent = `Question ${f}`;

                            fonelineSpan.addEventListener("click", function(){
                              addPassage(sec.value, alltests[i].test_interface, requiredPassage, currentIndex, passageOption, keepQuestionsNumbers);
                            });

                          }
                      }
                    });
                  }
                  
                  
                }
                
                
  
  
  
  
  
              });
            }
          }
          
      }
      listTests();

      } catch(err){
        console.log(err)
        displayError(xhr.responseText);
      }
    } else {
      addPassageContainer.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">Connection Failure.</div>`;
    }
  }
});

function rearrangePassages(){
  let allPassages = currentSection["passages"];
  let allQuestions = currentSection["questions"]
  for(const i in allPassages){
    
    let oldPassageNumber = allPassages[i].number;
    let newPassageNumber = parseInt(i) + 1;

    if(oldPassageNumber != newPassageNumber){
      allPassages[i].number = newPassageNumber;
      for(const q in allQuestions){
        if(allQuestions[q].passageNumber == oldPassageNumber){
          allQuestions[q].passageNumber = newPassageNumber;
        }
      }

    }
    
  }
}

deleteQuestionButton.addEventListener("click", function(){
  if(currentSection["questions"].length != 1){
    let indexOfCurrentQuestion = currentQuestion - 1;
    let passageOfCurrentQuestion = currentSection["questions"][indexOfCurrentQuestion]["passageNumber"];
    let indexOfPassageOfCurrentQuestion = passageOfCurrentQuestion - 1;
    if(currentQuestion == currentSection["questions"].length){
      currentQuestion = currentSection["questions"].length - 1;
    }
    currentSection["questions"].splice(indexOfCurrentQuestion, 1);
    if(!currentSection["questions"].some(element => element.passageNumber == passageOfCurrentQuestion)){
      currentSection["passages"].splice(indexOfPassageOfCurrentQuestion, 1);
    }
    
    rearrangePassages();
    startEditor();
    switchQuestion();
    
  } else {
    displayError("You can't delete this question. Please add more questions to delete this one.");

  }
});

addPassageMenuTopClose.addEventListener("click", function(){
  addPassageMenu.style.display = "none";
});

errorMenuTopClose.addEventListener("click", function(){
  errorMenu.style.display = "none";
});
