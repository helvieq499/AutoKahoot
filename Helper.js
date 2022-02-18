window.answers = JSON.parse(prompt("Enter the data from the main script"));
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
setInterval(window.stuff.putAnswer, 10);
