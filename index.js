"use strict";

// Elements from HTML file
const quoteText = document.getElementById("quote");
const quoteButton = document.getElementById("quote-button");
const authorName = document.getElementById("author");
const copy = document.getElementById("copy");
const speech = document.getElementById("speech");
const message = document.getElementById("message");

// Random quote generator function
async function randomQuote() {
    quoteButton.textContent = 'loading';
    const quotes = await fetch('https://qapi.vercel.app/api/random');
    const result = await quotes.json();
    const {quote, author} = result;
    quoteText.textContent = quote;
    authorName.textContent = author;
    quoteButton.textContent = 'New Quote';
}

// Speech to text function
function speechToText() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    } else {
        let speechText = new SpeechSynthesisUtterance();
        speechText.text = `${quoteText.textContent}`;
        speechText.voice = window.speechSynthesis.getVoices()[0];
        window.speechSynthesis.speak(speechText)
    }
}

// ASYNC function copy text to clipboard
copy.addEventListener('click', () => {
    navigator.clipboard.writeText(quoteText.innerText);
    message.classList.add('active');

    setInterval(() => {
        message.classList.remove('active');
    }, 2500);
})

// Button event listeners
speech.addEventListener('click', speechToText)
quoteButton.addEventListener('click', randomQuote);