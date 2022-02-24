if (document.location.hostname.toLowerCase() != "play.kahoot.it") {
    alert("This script can only run on play.kahoot.it due to CORS.\nA new window will be opened there.\nRe-run the script after it opens.");
    window.open("https://play.kahoot.it");
} else {
    let id = prompt("Quiz ID (The GUID in the URL of the host's browser)");
    fetch("https://play.kahoot.it/rest/kahoots/" + id)
    .then(resp => resp.status == 200 ? resp.json() : alert(`Request failed with status code ${resp.status}`))
    .then(data => {
    	let answers = data.questions.map(question => [question.question, question.choices.map((choice, index) => {choice.position = index; return choice; }).filter(choice => choice.correct)]);
        alert("A new window will now open.\nRun the helper script in the child window.");
        window.addEventListener("message", event => {
           if (event.data == "getAnswers")
               event.source.postMessage(answers, event.origin);
        });
        window.open("//kahoot.it");
    });
}
