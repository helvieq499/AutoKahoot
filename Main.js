if (document.location.hostname.toLowerCase() != "play.kahoot.it") {
    alert("This script can only run on play.kahoot.it due to CORS.\nA new window will be opened there.\nRe-run the script after it opens.");
    window.open("https://play.kahoot.it");
} else {
    let id = prompt("Quiz ID (The GUID in the URL of the host's browser)");
    fetch("https://play.kahoot.it/rest/kahoots/" + id)
    .then(resp => resp.status == 200 ? resp.json() : alert(`Request failed with status code ${resp.status}`))
    .then(data => {
    	let answers = data.questions.map(question => [question.question, question.choices.map((choice, index) => {choice.position = index; return choice; }).filter(choice => choice.correct)]);
        alert("Copy this tab to your clipboard.\nGo to kahoot.it\nRun the helper script.\nPaste in the data");
        document.write(JSON.stringify(answers));
    });
}
