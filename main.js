var rgArr = new Array()
var transition = []
var state = []
var startState
var finalState = []

/* NFA TO RG */

//Show Table
function showTable(id){
   document.getElementById(id).style="display:block;";   
}

//Show Regular Grammar
function showReg(){
    document.getElementById("regularGrammar").style="display:block; border: 5px solid rgb(167, 163, 120);";   
 }
 
/*function checkStart(startName){
    // check input at start, if the value at input start == to Q, change the document in Q to >
    //let tableRows= document.getElementById(tableID).rows.length;
    start = document.getElementById(startName).value;

    for (let i = 1 ; i < 6; i++) {
        
        let loop = "";
        loop += i;
        q = document.getElementById(loop).innerHTML;
        if (q == start){
            document.getElementById(loop).innerHTML = '>' + q;
            break;
        }
    }
}*/

// Check Final State
function checkFinal(finalName){

    var final = document.getElementById(finalName).value;
    var start = document.getElementsByClassName("startClass")[0].value;

    //console.log(start);
    //console.log(final);

    for (let i = 1; i < 6 ; i++) {
        let loop = "";
        loop += i;
        q = document.getElementById(loop).innerHTML;

        if (start == q){
            document.getElementById(loop).innerHTML = '>' + q;
            if(final == q){
                document.getElementById(loop).innerHTML = '>' + '*' + q;
            }
        }
        
        else if(final == q){
           // document.getElementById(loop).innerHTML = " ";
            document.getElementById(loop).innerHTML =  '*' + q;
            //console.log(start);
        }
    }
}

//Transition Table
function newTable(tableID){
    let final = "";
    let tempString;
    let tableRows= document.getElementById(tableID).rows.length;
    //let graph = {};
    //let tableCols = document.getElementById(tableID).rows[0].cells.length;

    for (i = 1; i < tableRows; i++) {
        zero = 0;
        zeroString = zero.toString();
        tempString ="";
    
        let id = "";
        id += i; //1
    
        var epsilon= document.getElementById(id).innerHTML.toLocaleUpperCase();
        let variable = document.getElementById(id).innerHTML.toLocaleUpperCase(); //get 1
        //console.log(variable);

        if(variable.charAt(0) === "&"){
            variable = variable.substring(4);
        }
        if(variable.charAt(0) === "*"){ 
            variable = variable.substring(1);
        }
        if(variable.charAt(4) === "*"){  
            variable = variable.substring(5);
        }
        //console.log(variable);

        tempString += variable + "&rarr;";


        let elementVal = document.getElementById(id + zeroString.repeat(2)).value.toLocaleUpperCase(); //get 100
        if (elementVal!=""){

            tempString += document.getElementById(zeroString.repeat(3)).innerHTML; //000
            tempString += elementVal; 
            final += tempString;
        }
    
        else {
            if(variable != ""){
                final += variable + "&rarr;";
            }
        }

        tempString="";
        id ="";
        id += i + "01" //101

        var elementVal2 =document.getElementById(id).value.toLocaleUpperCase();
        if(elementVal2!="" && elementVal!= ""){
            final+= " | ";
            tempString += document.getElementById(zeroString.repeat(2) + "1").innerHTML; //001
            tempString += elementVal2;
            final += tempString;
        }
        
        else if(elementVal2!= ""){
            tempString += document.getElementById(zeroString.repeat(2) + "1").innerHTML; //001
            tempString += elementVal2;
            final += tempString;
        }
 
        tempString="";

        id ="";
        id += i + zeroString + "2" //102

        var elementVal3 = document.getElementById(id).value.toLocaleUpperCase();

        if((elementVal3!="" && elementVal2!="") || (elementVal3!="" && elementVal!="")){
            
            final += " | ";
            tempString += document.getElementById(zeroString.repeat(2) + "2").innerHTML;
            tempString += elementVal3;
            final += tempString;
            }
        
        else if(elementVal3!=""){

            tempString += document.getElementById(zeroString.repeat(2) + "2").innerHTML;
            tempString += elementVal3;
            final += tempString;
        }

        tempString="";

        id = "";
        id += i + zeroString + "3"; //103

        var elementVal4 = document.getElementById(id).value.toLocaleUpperCase();
        if((elementVal4!="" && elementVal3!="") || (elementVal4!="" && elementVal2!="") || (elementVal4!="" && elementVal!="")){
            
            final += " | ";
            tempString += document.getElementById(zeroString.repeat(2) + "3").innerHTML;
            tempString = elementVal4 + " | " + tempString;
            final += tempString;
            }

        else if(elementVal4!=""){
           
           tempString += document.getElementById(zeroString.repeat(2) + "3").innerHTML;
           tempString = elementVal4 + " | " + tempString;
           final += tempString;

        }

        //if final state & empty, then go to epsilon
        //console.log(epsilon);
        if(epsilon.charAt(0) === "*" && elementVal4 == "" && elementVal3 == "" && elementVal2 == "" && elementVal == ""){
            final += "ε";
        }

        else if(epsilon.charAt(0) === "*" && elementVal4 == ""){
            final += " | ε";
        }
        
        final+= "<br>"
            
    }

    document.getElementById("regularGrammar").innerHTML= final;
    //console.log(final);
    return final;
    //console.log(var final = document.getElementById(finalName).value;)

}

function checkFinalString(){
    checkStrings('00','01');
    checkStrings('02','03');
    checkStrings('04','05');
    checkStrings('06','07');
    checkStrings('08','09');
}


////Check Strings
function checkStrings(input, output){
    
    const strings = document.getElementById(input).value;
    var regularGrammar = document.getElementById('regularGrammar').innerHTML;
    //Replace all <br> except one
    regularGrammar = regularGrammar.replace('#<br />(\s*<br />)+#', '<br />', '');
    //Replace <br> with ,
    regularGrammar = regularGrammar.replace(/\<br\>/g,",");
    regularGrammar = regularGrammar.replace(/\→/g," ");
    regularGrammar = regularGrammar.toUpperCase();

    const test = [ ];
    for (let i = 0; i < 5; i++) {
        test.push(regularGrammar.split(',')[i]);
        //console.log(test);
    }
    console.log(test);

    const nodeMap = {};

    test.forEach((item) => {
        const [key, ...rest] = item.split(' ').filter(x => !['|'].includes(x) && x)

        const lowerCaseFirstLetter = (string) => {
            if (string.length <= 1) {
                return string;
            }
            return string.charAt(0).toLowerCase() + string.slice(1);
        }
        nodeMap[key] = [...rest.map(lowerCaseFirstLetter)]
    })

    //console.log(nodeMap)

    //console.log([...strings])

    const checkStrings = (graph, sequence, start, goal, goal1, goal2, goal3, goal4) => {
        const stack = [start];

        while (stack.length > 0) {
            const current = stack.pop();

            if ((goal.includes(current) && sequence.length === 0))
              return "ACCEPTED";
            else if ((goal1.includes(current) && sequence.length === 0))
              return "ACCEPTED";
            else if ((goal2.includes(current) && sequence.length === 0))
              return "ACCEPTED";
            else if ((goal3.includes(current) && sequence.length === 0))
              return "ACCEPTED";
            else if ((goal4.includes(current) && sequence.length === 0))
              return "ACCEPTED";

            const currentSequence = sequence.shift();

            for (let neighbor of graph[current]) {
                if (currentSequence === neighbor.charAt(0)) {
                    stack.push(neighbor.charAt(1))
                }
            }
        }

        return 'REJECTED';
    }
    var start = document.getElementById('startState').value;
    var final = document.getElementById('finalState').value;
    var final1 = document.getElementById('finalState1').value;
    var final2 = document.getElementById('finalState2').value;
    var final3 = document.getElementById('finalState3').value;
    var final4 = document.getElementById('finalState4').value;


    //console.log(start);
    //console.log(final);
    const result = checkStrings(nodeMap, [...strings], start, final, final1, final2,final3,final4);
    document.getElementById(output).innerHTML = result;
}

/* RG TO NFA */

class UserInput {
    constructor(initialState, finalStates, states, alphabet, transitions) {
      this.initialState = initialState;
      this.finalStates = finalStates;
      this.states = states;
      this.alphabet = alphabet;
      this.transitions = transitions;
    }
  }

function addRow(tableID) {

    var table = document.getElementById(tableID);

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "checkbox";
    element1.name="chkbox[]";
    cell1.appendChild(element1);

    var cell2 = row.insertCell(1);
    cell2.classList.add("v");
    var element2 = document.createElement("input");
    element2.type = "text";
    element2.name = "txtbox[]";
    element2.style = "width: 15px;"
    let arrow = document.createTextNode("   →");
    cell2.appendChild(element2);
    cell2.appendChild(arrow);


    var cell3 = row.insertCell(2);
    var element3 = document.createElement("input");
    element3.type = "text";
    element3.name = "txtbox[]";
    element3.style = "width: 20px;"
    cell3.appendChild(element3);

    var cell4 = row.insertCell(3);
    var element4 = document.createElement("input");
    element4.type = "text";
    element4.name = "txtbox[]";
    element4.style = "width: 20px;"
    cell4.appendChild(element4);

    var cell5 = row.insertCell(4);
    var element5 = document.createElement("input");
    element5.type = "text";
    element5.name = "txtbox[]";
    element5.style = "width: 20px;"
    cell5.appendChild(element5);

    var cell6 = row.insertCell(5);
    var element6 = document.createElement("input");
    element6.type = "text";
    element6.name = "txtbox[]";
    element6.style = "width: 20px;"
    cell6.appendChild(element6);

    var cell7 = row.insertCell(6);
    var element7 = document.createElement("input");
    element7.type = "text";
    element7.name = "txtbox[]";
    element7.style = "width: 20px;"
    cell7.appendChild(element7);

    var cell8 = row.insertCell(7);
    var element8 = document.createElement("input");
    element8.type = "text";
    element8.name = "txtbox[]";
    element8.style = "width: 160px;"
    cell8.appendChild(element8);

}

function deleteRow(tableID) {
    try {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;


    
    for(var i=0; i<rowCount; i++) {
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[0];
        if(null != chkbox && true == chkbox.checked) {
            if(rowCount <= 1) {
                alert("Cannot delete all the rows.");
                break;
            }
            table.deleteRow(i);
            rowCount--;
            i--;
        }
        rgArr=[];
    }
    }catch(e) {
        alert(e);
    }
}

function submit(transition_id,transitionTable_id) {
    var myTab = document.getElementById('table1');
    rgArr = []
    // loop through each row of the table.
    for (row = 1; row < myTab.rows.length; row++) {
        var rowArr = [];
        // loop through each cell in a row.
        for (c = 0; c < myTab.rows[row].cells.length; c++) {
            var element = myTab.rows.item(row).cells[c];
            if (element.childNodes[0].getAttribute('type') == 'text') {
                rowArr.push(element.childNodes[0].value);
            }
        }
        rgArr.push(rowArr)
    }
    console.log(rgArr)
    createTransition(transition_id,transitionTable_id)
    
    
}

function createTransitionTable(id,state,transition){
    var div = document.getElementById(id);
    var table = document.createElement('TABLE');
    table.border='1';

    for(var i=0; i<state.length+1;i++){
        var tr = document.createElement('TR')
        table.appendChild(tr)
        for(var j=0;j<transition.length+2;j++){
            var td = document.createElement('TD')
            td.width='75';

            if(i==0){
                if(j==0){
                    td.appendChild(document.createTextNode(' '))
                    tr.appendChild(td)
                }
                else if(j==transition.length+1){
                    td.appendChild(document.createTextNode('ε'))
                    tr.appendChild(td)
                }
                else{
                        td.appendChild(document.createTextNode(transition[j-1]))
                        tr.appendChild(td)
                }
            }
            else{
                if(j==0){
                    td.appendChild(document.createTextNode(state[i-1]))
                    tr.appendChild(td)
                }
            }
            
            td.appendChild(document.createTextNode(''))
            tr.appendChild(td)
        }
    }

    let input = getTransitionInput()
    let temp = input.transitions

    let row = table.rows
    for(let i=0;i<row.length;i++){

        for(let j=0;j<temp.length;j++){
            //console.log(temp[0].state+"state OUTSIDE")
            if (temp[j].state == row[i].cells[0].innerHTML){
                console.log(temp[j].symbol+"symbol")
                if(temp[j].symbol == 'a'){
                    row[i].cells[1].innerHTML = temp[j].nextStates[0]
                    //console.log(temp[j].symbol+"symbol")
                }
                else if(temp[j].symbol == 'b'){
                    row[i].cells[2].innerHTML = temp[j].nextStates[0]
                }
                else if(temp[j].symbol == 'c'){
                    row[i].cells[3].innerHTML = temp[j].nextStates[0]
                }
            }
        }
    }


    var epsilonArr = []
    
    for(var i=0;i<rgArr.length;i++){
        var tempArr = []
        for(var j=0;j<rgArr[0].length;j++){
            if(j==4){
                if(rgArr[i][j]!=='')    
                    tempArr.push(rgArr[i][j].toString())
            }
            if(j==5){
                if(rgArr[i][j]!=='')    
                    tempArr.push(rgArr[i][j])
            }
        }
        console.log(tempArr)
        epsilonArr.push(tempArr)
    }

    console.log(epsilonArr.toString())



    for(var i=0; i<table.rows.length;i++){
        var cellCount = table.rows[0].cells.length
        
        for(var j=0; j<cellCount;j++){
            if(i!==0){
                if(j==cellCount-1){
                    table.rows[i].cells[j].innerHTML = epsilonArr[i-1]
                }
            }
        }
    }

    for (let row of table.rows) {
        for(let cell of row.cells) {
            if(cell.innerHTML === '')
                cell.innerHTML = '∅'
        }
    }

    div.appendChild(table)

}

function createTransition(id,tableId){
    var rows = document.getElementById(id).rows;
    console.log(rows)

    arr = [];
    for (row of rgArr) for (e of row) arr.push(e);

    var unique = [...new Set(arr)];
    console.log(unique); // unique is ['a', 1, 2, '1']
    
    for(e of unique){
        if(isNaN(e)){
            if(e.toString() === e.toString().toUpperCase())
            state.push(e)
        }
    }

    transition = getTransition()
    startState = rgArr[0][0]
    for(let i=0;i<rgArr.length;i++){
        if(rgArr[i][6]==1){
            finalState.push(rgArr[i][0])
        }
    }
    //finalState = rgArr[rgArr.length-1][0]
    state = state.filter(n => n)

    console.log("Transition ["+transition+"]")
    console.log("State ["+state+"]")
    console.log("start " + startState)
    console.log("final "+ finalState)

    document.getElementById('transitionSum').innerHTML = transition.toString()
    document.getElementById('transitionQ').innerHTML = state.toString()
    document.getElementById('transitionStart').innerHTML = startState.toString()
    document.getElementById('transitionFinal').innerHTML = finalState.toString()

    createTransitionTable(tableId,state,transition)

    document.getElementById(id).style="display:block;"; 
    document.getElementById("nfa2dfaBtn").style="display:block;"; 
    document.getElementById("nfaBtn").style="display:block;"; 
    document.getElementById("checkStringBtn").style="display:block;"; 
    document.getElementById("stringTable").style="display:block;"; 
    
    
}

function getTransition(){
    var arr = []
    for (e of rgArr){
        console.log(e)
        if(e[1]!=='') 
            arr.push('a')
        if(e[2]!=='') 
            arr.push('b')
        if(e[3]!=='') 
            arr.push('c')
    }
    arr = [...new Set(arr)]
    return arr
}

function getTransitionInput(){
    let alphabet = transition
    let transitions = []
    let nextState = []
    let currentState = ''
    let inputSymbol = ''

    for(let i=0;i<rgArr.length;i++){
        
        for(let j=0;j<rgArr[i].length;j++){
            nextState=[]
            currentState = rgArr[i][0]

            if(j+1!==rgArr[i].length) {
                if(rgArr[i][j+1]!==''){
                    nextState.push(rgArr[i][j+1])
                    if(j+1==1){
                        inputSymbol='a';
                        transitions.push(new Transition(currentState, nextState, inputSymbol));
                    } 
                    if(j+1==2){
                        inputSymbol='b';
                        transitions.push(new Transition(currentState, nextState, inputSymbol));
                    } 
                    if(j+1==3){
                        inputSymbol='c';
                        transitions.push(new Transition(currentState, nextState, inputSymbol));
                    } 
                    if(j+1==4){
                        inputSymbol='\u03BB';
                        transitions.push(new Transition(currentState, nextState, inputSymbol));
                    } 
                    if(j+1==5){
                        inputSymbol='\u03BB';
                        transitions.push(new Transition(currentState, nextState, inputSymbol));
                    } 
                }
                    
            }
        }
    }


    console.log(transitions)
    return new UserInput(
        startState,
        finalState,
        state,
        alphabet,
        transitions
    )
    
}

function drawNfa(){
    let user_input = getTransitionInput();

    let dotStr = "digraph fsm {\n";
    dotStr += "rankdir=LR;\n";
    dotStr += 'size="8,5";\n';
    dotStr += "node [shape = doublecircle]; " + user_input.finalStates + ";\n";
    dotStr += "node [shape = point]; INITIAL_STATE\n";
    dotStr += "node [shape = circle];\n";
    dotStr += "INITIAL_STATE -> " + user_input.initialState + ";\n";

    for (let transition of user_input.transitions)
      dotStr +=
        "" +
        transition.state +
        " -> " +
        transition.nextStates +
        " [label=" +
        transition.symbol +
        "];\n";

    dotStr += "}";

    console.log(dotStr);
    d3.select(".nfa").graphviz().zoom(false).renderDot(dotStr);
}

function generateNfaWithoutE(id){
    let user_input = getTransitionInput();
    let dfa = generateDFA(
        new NFA(
          user_input.initialState,
          user_input.finalStates,
          user_input.states,
          user_input.alphabet,
          user_input.transitions
        )
      );
    
    let temp = []
    for(let i=0;i<dfa.transitions.length;i++){
      
      console.log(dfa.transitions[i].state)
      dfa.transitions[i].state = dfa.transitions[i].state.replace(/[{()}]/g, '')
      dfa.transitions[i].state = dfa.transitions[i].state.split(",")
      console.log(dfa.transitions[i].state)

      for(let j=0;j<dfa.transitions[i].state.length;j++){
        let next = []
        next.push(dfa.transitions[i].nextStates[0])
        temp.push(new Transition(dfa.transitions[i].state[j],next,dfa.transitions[i].symbol))
      }
    }

    console.log(temp)

    var div = document.getElementById(id);
    var table = document.createElement('TABLE');
    table.border='1';

    let tempStates = []
    for(let i=0;i<dfa.states.length;i++){
      dfa.states[i] = dfa.states[i].replace(/[{()}]/g, '')
      dfa.states[i] = dfa.states[i].split(",")
    }

    for(let i=0;i<dfa.states.length;i++){
      for(let j=0;j<dfa.states[i].length;j++){
        tempStates.push(dfa.states[i][j])
      }
    }

    tempStates = [...new Set(tempStates)]

    for(var i=0; i<tempStates.length+1;i++){
        var tr = document.createElement('TR')
        table.appendChild(tr)
        for(var j=0;j<dfa.alphabet.length+1;j++){
            var td = document.createElement('TD')
            td.width='75';

            if(i==0){
                if(j==0){
                    td.appendChild(document.createTextNode(' '))
                    tr.appendChild(td)
                }
                else{
                        td.appendChild(document.createTextNode(dfa.alphabet[j-1]))
                        tr.appendChild(td)
                }
            }
            else{
                if(j==0){
                    td.appendChild(document.createTextNode(tempStates[i-1]))
                    tr.appendChild(td)
                }
            }
            
            td.appendChild(document.createTextNode(''))
            tr.appendChild(td)
        }
    }

    div.appendChild(table)

    let row = table.rows
    for(let i=0;i<row.length;i++){

        for(let j=0;j<temp.length;j++){
            //console.log(temp[0].state+"state OUTSIDE")
            if (temp[j].state == row[i].cells[0].innerHTML){
                console.log(temp[j].symbol+"symbol")
                if(temp[j].symbol == 'a'){
                    row[i].cells[1].innerHTML = temp[j].nextStates[0]
                    //console.log(temp[j].symbol+"symbol")
                }
                else if(temp[j].symbol == 'b'){
                    row[i].cells[2].innerHTML = temp[j].nextStates[0]
                }
                else if(temp[j].symbol == 'c'){
                    row[i].cells[3].innerHTML = temp[j].nextStates[0]
                }
            }
        }
    }

    //fill blank with null
    for (let row of table.rows) {
      for(let cell of row.cells) {
          if(cell.innerHTML === '')
              cell.innerHTML = '∅'
      }
  }
  

}

function submitString(id){

  if(checkString("1stString")){
    document.getElementById("1stOutput").innerHTML = "ACCEPTED"
  }
  else{
    document.getElementById("1stOutput").innerHTML = "REJECTED"
  }

  if(checkString("2ndString")){
    document.getElementById("2ndOutput").innerHTML = "ACCEPTED"
  }
  else{
    document.getElementById("2ndOutput").innerHTML = "REJECTED"
  }

  if(checkString("3rdString")){
    document.getElementById("3rdOutput").innerHTML = "ACCEPTED"
  }
  else{
    document.getElementById("3rdOutput").innerHTML = "REJECTED"
  }

  if(checkString("4thString")){
    document.getElementById("4thOutput").innerHTML = "ACCEPTED"
  }
  else{
    document.getElementById("4thOutput").innerHTML = "REJECTED"
  }

  if(checkString("5thString")){
    document.getElementById("5thOutput").innerHTML = "ACCEPTED"
  }
  else{
    document.getElementById("5thOutput").innerHTML = "REJECTED"
  }
  

}

function checkString(input, output){
  let temp = document.getElementById(input).value.split("")

  let user_input = getTransitionInput();
  let nfa =new NFA(
        user_input.initialState,
        user_input.finalStates,
        user_input.states,
        user_input.alphabet,
        user_input.transitions
    )

  var currState = nfa.initialState
  var tran = nfa.transitions
  var final = nfa.finalStates

  if(temp[0] == 'e') temp[0] = "\u03BB"


  while(temp.length > 0){
    try{
      let target = tran.find(e => e.state == currState && e.symbol == temp[0])
      if(target !== undefined){
       // console.log(currState + target.nextStates[0] + target.symbol)
        
        currState = target.nextStates[0]
        temp.shift()
      
      
        // console.log(currState)
        // console.log(temp)
      }
      else{
        target = tran.find(e => e.state == currState && e.symbol == "\u03BB")
        //console.log(currState + target.nextStates[0] + target.symbol)
        
        currState = target.nextStates[0]
        temp.shift()
      
      }

    }
    catch(error){
      return false
    }

  }

  if(currState == final){
    return true
  }
  return false


}


   
let LAST_COMPLETED_STEP_COUNT = 0;

class Transition {
  constructor(state, nextStates, symbol) {
    if (!(typeof state === "string" || state instanceof String))
      throw new Error("Expected a single state (string)");

    if (!Array.isArray(nextStates)) {
      console.warn("Expected nextStates in transition to be an array");
      let arr = [];
      arr.push(nextStates.toString());
      nextStates = arr;
    }

    if (!(typeof symbol === "string" || symbol instanceof String))
      throw new Error("Expected a string symbol");

    this.state = state;
    this.nextStates = nextStates;
    this.symbol = symbol;
  }
}

class NFA {
  constructor(initialState, finalStates, states, alphabet, transitions) {
    if (!(typeof initialState === "string" || initialState instanceof String))
      throw new Error("Expected a single initial state (string)");

    if (!Array.isArray(finalStates)) {
      console.warn("Expected finalStates in NFA to be an array");
      let arr = [];
      arr.push(finalStates.toString());
      finalStates = arr;
    }

    if (!Array.isArray(alphabet)) {
      console.warn("Expected alphabet in NFA to be an array");
      let arr = [];
      arr.push(alphabet.toString());
      alphabet = arr;
    }

    if (!Array.isArray(transitions)) {
      console.warn("Expected transitions in NFA to be an array");
      let arr = [];
      arr.push(transitions);
      transitions = arr;
    }

    // TODO Make sure states cannot be named INITIAL_STATE

    this.initialState = initialState;
    this.finalStates = finalStates;
    this.states = states;
    this.alphabet = alphabet;
    this.transitions = transitions;
  }

  toDotString() {
    let dotStr = "digraph fsm {\n";
    dotStr += "rankdir=LR;\n";
    dotStr += 'size="8,5";\n';
    dotStr += "node [shape = point]; INITIAL_STATE\n";
    dotStr +=
      "node [shape = doublecircle]; " + this.finalStates.join(",") + ";\n";
    dotStr += "node [shape = circle];\n";
    dotStr +=
      "INITIAL_STATE -> " + this.formatDotState(this.initialState) + ";\n";

    for (let i = 0; i < this.transitions.length; i++) {
      let t = this.transitions[i];

      dotStr +=
        "" +
        this.formatDotState(t.state) +
        " -> " +
        this.formatDotState(t.nextStates) +
        " [label=" +
        t.symbol +
        "];\n";
    }

    dotStr += "}";

    return dotStr;
  }

  formatDotState(state_str) {
    state_str = state_str.toString();
    if (isMultiState(state_str)) {
      state_str = state_str.substring(1, state_str.length - 1);
      state_str = state_str.replace(/,/g, "");
      return state_str;
    } else {
      return state_str;
    }
  }
}

function lambdaClosureNFA(nfa) {
  let hasLambda = false;
  for (let t of nfa.transitions) {
    if (t.symbol === "" || t.symbol === "\u03BB") {
      hasLambda = true;
      break;
    }
  }

  // If we don't have lambda transitions, don't do anything to it
  if (!hasLambda) return nfa;

  let nfa_closed_transitions = [];
  let nfa_closed_final_states = [];

  for (let i = 0; i < nfa.states.length; i++) {
    let state = nfa.states[i];

    // 1) Find the lambda-closure (epsilon-closure) of the state
    let state_closure = fetch_E_Closure(state, nfa.transitions);
    //console.debug("--");
    //console.debug(state_closure);
    //console.debug("-");
    console.debug("Lambda-closure of " + state + ": " + state_closure);

    // 2) Find the next state for each state in the state_closure for each symbol in the alphabet
    for (let j = 0; j < nfa.alphabet.length; j++) {
      let symbol = nfa.alphabet[j];
      let symbol_next_states = [];

      for (let k = 0; k < state_closure.length; k++) {
        let next_states = findNextStates(
          state_closure[k],
          symbol,
          nfa.transitions
        );

        if (next_states.length !== 0) {
          for (let n = 0; n < next_states.length; n++) {
            let closure = fetch_E_Closure(next_states[n], nfa.transitions);

            //console.log("ARRAY? " + Array.isArray(closure));
            //console.log(closure);

            for (let m = 0; m < closure.length; m++) {
              let to_add = closure[m];

              //console.log("TO ADD? " + to_add);

              if (!symbol_next_states.includes(to_add))
                symbol_next_states.push(to_add);
            }
          }
        }
      }

      symbol_next_states.sort();

      /*if (symbol_next_states.length > 0) {
                for (let fs of nfa.finalStates) {
                    //console.log("Is " + fs + " in " + symbol_next_states + "? | " + symbol_next_states.includes(fs) + ", " + nfa_closed_final_states.includes(fs));
                    if (symbol_next_states.includes(fs) && nfa.initialState !== state) {
                        if (!nfa_closed_final_states.includes(state)) {
                            nfa_closed_final_states.push(state);
                            console.log("Added " + state + " (check state) to nfa closed final states");
                        }
                        if (!nfa_closed_final_states.includes(fs)) {
                            nfa_closed_final_states.push(fs);
                            console.log("Added " + fs + " (final state) to nfa closed final states");
                        }
                        //console.log(nfa_closed_final_states);
                    }
                }
            }*/

      console.log(
        "NFA Closure: " +
          state +
          " -> " +
          symbol +
          " = " +
          symbol_next_states +
          " (Length " +
          symbol_next_states.length +
          ")"
      );
      nfa_closed_transitions.push(
        new Transition(state, symbol_next_states, symbol)
      );
    }
  }

  nfa_closed_final_states.sort();
  //console.log("Closed NFA Final States: " + nfa_closed_final_states);

  // Special case for lambda from initial state to a final state
  let initial_state_closure = fetch_E_Closure(
    nfa.initialState,
    nfa.transitions
  );
  let init_closure_has_final_state = false;

  for (let final_state of nfa.finalStates) {
    if (initial_state_closure.includes(final_state)) {
      init_closure_has_final_state = true;
      break;
    }
  }

  if (init_closure_has_final_state) {
    // Make the initial state final
    nfa.finalStates.push(nfa.initialState);
  }

  nfa = new NFA(
    nfa.initialState,
    nfa.finalStates,
    nfa.states,
    nfa.alphabet,
    nfa_closed_transitions
  );

  console.log("--- Lambda NFA ---");
  console.log(nfa.toDotString());
  console.log("--___--");

  return nfa;
}

function fetch_E_Closure(state, transitions) {
  if (!(typeof state === "string" || state instanceof String))
    throw new Error("Expected a single state input as a string");

  if (!Array.isArray(transitions))
    throw new Error("Expected transitions parameter to be an array");

  let e_closure = [];
  e_closure.push(state);
  //console.log("--- Add to e_closure 1 ---");
  //console.log(state);
  //console.log("-----");

  for (let i = 0; i < transitions.length; i++) {
    let t = transitions[i];

    // Lambda transition
    if (t.symbol.trim() === "" || t.symbol.trim() === "\u03BB") {
      // The transition is going from our state
      if (state === t.state) {
        if (!Array.isArray(t.nextStates))
          throw new Error("Expected nextStates in NFA to be an array");

        for (let j = 0; j < t.nextStates.length; j++) {
          // See if the state is part of the closure
          if (!e_closure.includes(t.nextStates[j])) {
            // If not, add it to the closure
            e_closure.push(t.nextStates[j]);
            ///console.log("--- Add to e_closure 2 ---");
            //console.log(t.nextStates[j]);
            //console.log("-----");

            // Then check the closure for the newly added state (recursive)
            //console.log("RECURSIVE");
            let sub_e_closure = fetch_E_Closure(t.nextStates[j], transitions);

            for (let j = 0; j < sub_e_closure.length; j++) {
              if (!e_closure.includes(sub_e_closure[j])) {
                e_closure.push(sub_e_closure[j]);
                //console.log("--- Add to e_closure 3 ---");
                //console.log(sub_e_closure[j]);
                //console.log("-----");
              }
            }
          }
        }
      }
    }
  }

  return e_closure;
}

function generateDFA(nfa, step_counter_stop = -1) {
  let step_counter = 0;
  let step_interrupt = false;

  nfa = lambdaClosureNFA(nfa);

  let dfa_states = [];
  let dfa_final_states = [];
  let dfa_transitions = [];

  let stack = [];

  dfa_states.push(nfa.initialState);
  stack.push(nfa.initialState); // States we need to check/convert

  while (stack.length > 0) {
    let state = stack.pop();
    console.log("Pop'd state: " + state);
    if (++step_counter === step_counter_stop) {
      step_interrupt = true;
      break;
    }

    let states;

    if (isMultiState(state)) {
      states = separateStates(state);
    } else {
      states = [];
      states.push(state);
    }

    for (let i = 0; i < nfa.alphabet.length; i++) {
      let next_states_union = [];

      for (let j = 0; j < states.length; j++) {
        let ns = findNextStates(states[j], nfa.alphabet[i], nfa.transitions);
        //console.log("Next states for " + states[j] + ", " + nfa.alphabet[i] + " -> " + ns);
        for (let k = 0; k < ns.length; k++)
          if (!next_states_union.includes(ns[k])) next_states_union.push(ns[k]);
      }

      let combinedStatesUnion = combineStates(next_states_union);

      if (combinedStatesUnion != null) {
        //console.log("Combined union of " + next_states_union + " (" + next_states_union.length + "): " + combinedStatesUnion + " | " + Array.isArray(combinedStatesUnion));
        console.log(
          state + ", " + nfa.alphabet[i] + " -> " + combinedStatesUnion
        );
        dfa_transitions.push(
          new Transition(state, combinedStatesUnion, nfa.alphabet[i])
        );

        if (!dfa_states.includes(combinedStatesUnion)) {
          dfa_states.push(combinedStatesUnion);
          stack.push(combinedStatesUnion);
        }
      } 
      // else {
      //   console.log("TRAP state needed");

      //   if (!dfa_states.includes("TRAP")) {
      //     for (let n = 0; n < nfa.alphabet.length; n++)
      //       dfa_transitions.push(
      //         new Transition("TRAP", ["TRAP"], nfa.alphabet[n])
      //       );

      //     dfa_states.push("TRAP");
      //   }

      //   dfa_transitions.push(new Transition(state, ["TRAP"], nfa.alphabet[i]));
      // }
    }
  }

  console.log("--- NFA Final States ---");
  console.log(nfa.finalStates);
  console.log("-----");

  for (let i = 0; i < dfa_states.length; i++) {
    let dfa_sep_states = separateStates(dfa_states[i]);

    for (let j = 0; j < nfa.finalStates.length; j++) {
      console.log(
        "Does " + dfa_sep_states + " include " + nfa.finalStates[j] + "?"
      );

      if (dfa_sep_states.includes(nfa.finalStates[j])) {
        dfa_final_states.push(nfa.formatDotState(dfa_states[i]));
        break;
      }
    }
  }

  if (!step_interrupt) {
    LAST_COMPLETED_STEP_COUNT = step_counter;
    console.log("LAST_COMPLETED_STEP_COUNT = " + step_counter);
  }

  return new NFA(
    nfa.initialState,
    dfa_final_states,
    dfa_states,
    nfa.alphabet,
    dfa_transitions
  );
}

function minimizeDFA(dfa) {
  console.log("TIME TO MINIMIZE!");

  for (let state of dfa.states) {
    for (let state2 of dfa.states) {
      if (
        state !== state2 &&
        dfa.finalStates.includes(dfa.formatDotState(state)) ===
          dfa.finalStates.includes(dfa.formatDotState(state2))
      ) {
        //console.log("Testing if " + state + " = " + state2);

        let statesEqual = true;

        for (let symbol of dfa.alphabet) {
          //console.log("--- Symbol " + symbol + " ---");

          let state1_nextStates = findNextStates(
            state,
            symbol,
            dfa.transitions
          );
          let state2_nextStates = findNextStates(
            state2,
            symbol,
            dfa.transitions
          );

          //console.log(state1_nextStates);
          //console.log(state2_nextStates);

          //console.log("---");

          if (!arraysEqual(state1_nextStates, state2_nextStates)) {
            statesEqual = false;
          }
        }

        if (statesEqual) {
          let remove = state;
          let replace = state2;

          console.log(remove);
          console.log(replace);
          console.log(dfa.initialState);

          if (dfa.initialState === remove) {
            remove = state2;
            replace = state;
          }

          console.log(
            "The two states are equal [" + remove + " = " + replace + "]"
          );

          if (remove === "TRAP") {
            console.log("Trap state will not be removed.");
            continue;
          }

          console.log(dfa.states);
          console.log("Delete " + remove);

          dfa.states = dfa.states.filter(function (s) {
            return dfa.formatDotState(s) !== dfa.formatDotState(remove);
          });

          dfa.transitions = dfa.transitions.filter(function (t) {
            if (t.state !== remove) {
              if (t.nextStates[0] === remove) {
                t.nextStates[0] = replace;
              }
              return true;
            } else {
              return false;
            }
          });

          dfa.finalStates = dfa.finalStates.filter(function (s) {
            return dfa.formatDotState(s) !== dfa.formatDotState(remove);
          });
        }
      }
    }
  }

  return dfa;
}

function findNextStates(state, symbol, transitions) {
  let next_states = [];

  for (let i = 0; i < transitions.length; i++) {
    let t = transitions[i];

    if (t.state === state && t.symbol === symbol) {
      for (let j = 0; j < t.nextStates.length; j++) {
        if (!next_states.includes(t.nextStates[j])) {
          next_states.push(t.nextStates[j]);
        }
      }
    }
  }

  return next_states;
}

function isMultiState(state) {
  state = state.toString();
  return state.startsWith("{") && state.endsWith("}");
}

function separateStates(state) {
  if (isMultiState(state)) {
    return state.substring(1, state.length - 1).split(",");
  } else {
    return state;
  }
}

function combineStates(states) {
  if (!Array.isArray(states)) {
    throw new Error("Array expected for combineStates() function");
  }

  // Remove null entries from array
  states = states.filter(function (e) {
    return e != null;
  });

  if (states.length > 0 && Array.isArray(states[0])) {
    console.warn("Sub-arrays are not expected for combineStates() function");
    states = states[0];
  }

  if (states.length === 0) return null;

  states.sort();

  if (states.length === 1) return states[0].toString();

  //console.log("-- Combining --");
  //console.log(states);
  //console.log("Combine length: " + states.length);

  let state = "{";
  for (let i = 0; i < states.length; i++) {
    state += states[i] + ",";
  }
  state = state.trim().replace(/,+$/, "");
  state += "}";

  //console.log("Return " + state);
  //console.log("----");

  return state;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;

  return true;
}

/* Home Page */

function font(num){

    let str = "";
    let output = document.getElementById("nameOutput");

    if(num==1) 
    {
        str += "Fatin Natasha Binti Zahari";
    }
    if(num==2){
        str += "Wong Chun Gee";
    }
    if(num==3){
        str += "Chuah JieYi";
    }
    if(num==4){
        str += "Ng Zhen Xiong";
    }

    output.innerHTML = str;
}


function clickPage(event, nameOfPage){
    
    let pages;
    let windowPage;
    let i;

    windowPage = document.getElementsByClassName("windowPage");
    for(i= 0; i < windowPage.length; i++){
        windowPage[i].style.display = "none";
    }

    pages = document.getElementsByClassName("pages");
    for(i= 0; i < pages.length; i++){
        pages[i].className = pages[i].className.replace(" active", "");
    }

    document.getElementById(nameOfPage).style= "display:block";
    event.currentTarget.className += " active";
}

document.getElementById("autoOpen").click()




