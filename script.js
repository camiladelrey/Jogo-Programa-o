const questions = [
{icon:"🌱",question:"Qual destas opções é um ser vivo?",answers:["Uma pedra","Uma árvore","Uma nuvem","Um copo"],correct:1,explanation:"Isso mesmo! A árvore nasce, cresce e precisa de água e luz."},
{icon:"🌳",question:"Qual destes é um bioma brasileiro?",answers:["Saara","Tundra","Cerrado","Alpes"],correct:2,explanation:"O Cerrado é um bioma brasileiro com muitas espécies de plantas e animais."},
{icon:"🫁",question:"Qual é a principal função dos pulmões?",answers:["Bombear o sangue","Ajudar na respiração","Digerir os alimentos","Produzir pensamentos"],correct:1,explanation:"Os pulmões participam das trocas gasosas durante a respiração."},
{icon:"🐬",question:"Qual destes animais é um mamífero?",answers:["Tubarão","Sapo","Golfinho","Tartaruga"],correct:2,explanation:"O golfinho é mamífero: respira por pulmões e amamenta seus filhotes."},
{icon:"♻️",question:"Qual atitude ajuda a reduzir o lixo?",answers:["Jogar tudo no rio","Reutilizar materiais","Queimar plástico","Deixar lixo na rua"],correct:1,explanation:"Reutilizar materiais ajuda a diminuir a quantidade de resíduos."},
{icon:"❤️",question:"Qual órgão bombeia o sangue pelo corpo?",answers:["Estômago","Coração","Pulmão","Rim"],correct:1,explanation:"O coração impulsiona o sangue, que transporta substâncias pelo corpo."},
{icon:"💧",question:"Qual atitude evita o desperdício de água?",answers:["Deixar a torneira aberta","Tomar banho sem parar","Fechar a torneira ao escovar os dentes","Lavar a calçada com mangueira todo dia"],correct:2,explanation:"Fechar a torneira quando não está usando é uma forma simples de economizar água."},
{icon:"☀️",question:"O que as plantas usam na fotossíntese?",answers:["Luz, água e gás carbônico","Som e areia","Apenas terra","Plástico e vento"],correct:0,explanation:"Com luz, água e gás carbônico, as plantas produzem açúcares e liberam oxigênio."},
{icon:"🐰",question:"Um animal herbívoro se alimenta principalmente de…",answers:["Plantas","Pedras","Apenas carne","Metal"],correct:0,explanation:"Herbívoros se alimentam principalmente de partes de plantas."},
{icon:"🌊",question:"O que pode acontecer quando lixo chega aos rios?",answers:["A água fica sempre mais limpa","Os animais ficam protegidos","A água pode ser poluída","Nada muda nunca"],correct:2,explanation:"O lixo pode poluir a água e prejudicar os seres vivos que dependem dela."}
];
const $=id=>document.getElementById(id);
const startScreen=$("start-screen"),gameScreen=$("game-screen"),resultScreen=$("result-screen");
let currentIndex=0,score=0,lives=3,answered=false,correctCount=0;
function startGame(){currentIndex=0;score=0;lives=3;correctCount=0;answered=false;startScreen.classList.add("hidden");resultScreen.classList.add("hidden");gameScreen.classList.remove("hidden");renderQuestion();}
function renderQuestion(){
 answered=false;const item=questions[currentIndex];
 $("question-counter").textContent=`Pergunta ${currentIndex+1} de ${questions.length}`;
 $("lives").textContent=`${"❤️ ".repeat(lives)}${"🤍 ".repeat(3-lives)}`.trim();$("lives").setAttribute("aria-label",`${lives} vidas restantes`);
 $("score").textContent=score;$("question-icon").textContent=item.icon;$("question-text").textContent=item.question;
 $("answers").innerHTML="";$("feedback").textContent="";$("feedback").className="feedback";$("next-btn").classList.add("hidden");
 $("progress-fill").style.width=`${currentIndex/questions.length*100}%`;$("progress-track").setAttribute("aria-valuenow",currentIndex);
 item.answers.forEach((answer,index)=>{const button=document.createElement("button");button.className="answer-btn";button.type="button";button.textContent=`${String.fromCharCode(65+index)}. ${answer}`;button.addEventListener("click",()=>chooseAnswer(index,button));$("answers").appendChild(button);});
}
function chooseAnswer(selectedIndex,selectedButton){
 if(answered)return;answered=true;const item=questions[currentIndex];const buttons=[...$("answers").querySelectorAll("button")];buttons.forEach(button=>button.disabled=true);
 if(selectedIndex===item.correct){score+=10;correctCount++;selectedButton.classList.add("correct");$("feedback").textContent=`✅ Correto! ${item.explanation}`;$("feedback").classList.add("good");}
 else{lives--;selectedButton.classList.add("incorrect");buttons[item.correct].classList.add("correct");$("feedback").textContent=`💡 Quase! ${item.explanation}`;$("feedback").classList.add("bad");}
 $("score").textContent=score;$("lives").textContent=`${"❤️ ".repeat(lives)}${"🤍 ".repeat(3-lives)}`.trim();$("lives").setAttribute("aria-label",`${lives} vidas restantes`);
 $("next-btn").textContent=(currentIndex===questions.length-1||lives===0)?"Ver resultado 🏆":"Próxima pergunta ➜";$("next-btn").classList.remove("hidden");
}
function advanceQuestion(){if(!answered)return;if(lives===0||currentIndex===questions.length-1){showResult();return;}currentIndex++;renderQuestion();}
function showResult(){
 gameScreen.classList.add("hidden");resultScreen.classList.remove("hidden");$("final-score").textContent=score;$("result-detail").textContent=`Você acertou ${correctCount} de ${currentIndex+1} pergunta(s).`;
 if(score>=80){$("result-emoji").textContent="🏆";$("result-title").textContent="Explorador nota 10!";$("result-message").textContent="Excelente! Você mostrou que conhece muito sobre Ciências e natureza.";}
 else if(score>=50){$("result-emoji").textContent="🌟";$("result-title").textContent="Muito bem!";$("result-message").textContent="Você está no caminho certo. Continue curioso e aprendendo!";}
 else{$("result-emoji").textContent="🌱";$("result-title").textContent="Toda missão ensina!";$("result-message").textContent="Vale tentar de novo. Cada pergunta é uma oportunidade de aprender algo novo.";}
 $("progress-fill").style.width=`${(currentIndex+1)/questions.length*100}%`;$("progress-track").setAttribute("aria-valuenow",currentIndex+1);
}
$("start-btn").addEventListener("click",startGame);$("next-btn").addEventListener("click",advanceQuestion);$("restart-btn").addEventListener("click",startGame);
