if (document.location.hostname.toLowerCase() != "play.kahoot.it") {
    alert("This script can only run on play.kahoot.it due to CORS.\nA new window will be opened there.\nRe-run the script after it opens.");
    window.open("https://play.kahoot.it");
} else {
    let id = prompt("Quiz ID (The GUID in the URL of the host's browser)");
    fetch("https://play.kahoot.it/rest/kahoots/" + id)
    .then(resp => resp.status == 200 ? resp.json() : alert(`Request failed with status code ${resp.status}`))
    .then(data => {
    	let answers = data.questions.map(question => [question.question, question.choices.map((choice, index) => {choice.position = index; return choice; }).filter(choice => choice.correct)]);
        alert("Click on the page.\nData will be written to your clipboard.\nA new tab will open.\nRun the helper script and paste in the data on that tab.");
	      window.cliploop = setInterval(async () => {
            try {
                await navigator.clipboard.writeText(JSON.stringify(answers));
                clearInterval(window.cliploop);
                window.open("https://kahoot.it/");
            } catch {}
	}, 1000);
    });
}
