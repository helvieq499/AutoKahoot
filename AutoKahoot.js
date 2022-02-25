if (document.location.host.toLowerCase() == "kahoot.it") {
    window.AutoKahoot = {
        getChoices: () => document.querySelector("#root > div:nth-child(1) > main > div:nth-child(2) > div > div"),
        getCurrent: () => new Number(document.querySelector("#root > div:nth-child(1) > main > div:nth-child(1) > div > div:nth-child(1)").textContent.split(' ')[0]),
        getAnswer: () => window.answers[window.AutoKahoot.getCurrent() - 1][1][0].position,
        putAnswer: () => window.AutoKahoot.getChoices().children[window.AutoKahoot.getAnswer()].click(),
    };

    window.addEventListener("message", event => {
        window.answers = event.data;
        if (window.prevInterval) {
            clearInterval(prevInterval);
            delete window.prevInterval;
        }
        window.prevInterval = setInterval(window.AutoKahoot.putAnswer, 10);
    });

    alert("Rerun this script on the new child window that opens.");
    window.open("https://play.kahoot.it/");
} else if (document.location.host.toLowerCase() == "play.kahoot.it") {
    if (!window.opener) alert("This script must be ran on the child window");
    else {
        let id = prompt("Quiz ID (The GUID in the URL of the host's browser)");

        fetch("https://play.kahoot.it/rest/kahoots/" + id)
        .then(resp => resp.status == 200 ? resp.json() : alert(`Request failed with status code ${resp.status}`))
        .then(data => window.opener.postMessage(
            data.questions.map(question => [question.question, question.choices.map((choice, index) => {choice.position = index; return choice; }).filter(choice => choice.correct)]),
            "*"
        ));
    }
} else alert("This can only be ran on kahoot.it");
