prevInterval = undefined;
window.addEventListener("message", event => {
    window.answers = event.data;
    if (prevInterval) {
        clearInterval(prevInterval);
        prevInterval = undefined;
    }
    prevInterval = setInterval(window.stuff.putAnswer, 10);
});
window.opener.postMessage("getAnswers", "*");

window.stuff = {
    getChoices: () => document.querySelector("#root > div:nth-child(1) > main > div:nth-child(2) > div > div"),
    getCurrent: () => new Number(document.querySelector("#root > div:nth-child(1) > main > div:nth-child(1) > div > div:nth-child(1)").textContent.split(' ')[0]),
    getAnswer: function() {
        return window.answers[window.stuff.getCurrent() - 1][1][0].position;
    },
    putAnswer: function() {
        window.stuff.getChoices().children[window.stuff.getAnswer()].click();
    }
};
