(function () {
	'use strict';

	const keyEingabe = 13;
	document.addEventListener("DOMContentLoaded", () => {
	    const neuesTodoElement = document.querySelector(".newAufgabe");
	    const aufgaListElement = document.querySelector(".taskList");
	    const footerElement = document.querySelector(".footer");
	    const alleswegElement = document.querySelector(".clearKomplett");
	    function refresh() {
	        if (aufgaListElement.children.length === 0) {
	            footerElement.style.display = "none";
	        }
	        else {
	            footerElement.style.display = "";
	        }
	        let kompletterZähler = aufgaListElement.querySelectorAll("li.completed").length;
	        if (kompletterZähler === 0) {
	            alleswegElement.style.display = "none";
	        }
	        {
	            alleswegElement.style.display = "";
	        }
	    }
	    refresh();
	    const nehmeLizurück = (liElement) => {
	        const checkboxElement = liElement.querySelector(".toggle");
	        const verstreichenButtonElement = liElement.querySelector(".zerstör");
	        checkboxElement.addEventListener("change", () => {
	            if (checkboxElement.checked) {
	                liElement.classList.add("completed");
	            }
	            else {
	                liElement.classList.remove("completed");
	            }
	            refresh();
	        });
	        verstreichenButtonElement.addEventListener("click", () => {
	            liElement.remove();
	            refresh();
	        });
	    };
	    neuesTodoElement.addEventListener("keypress", (event) => {
	        if (event.which === keyEingabe && neuesTodoElement.value !== "") {
	            const neuerButtonElement = document.createElement("button");
	            neuerButtonElement.classList.add("zerstör");
	            const neuesLabelElement = document.createElement("label");
	            neuesLabelElement.appendChild(document.createTextNode(neuesTodoElement.value));
	            const neueInputCheckbox = document.createElement("input");
	            neueInputCheckbox.type = "checkbox";
	            neueInputCheckbox.classList.add("toggle");
	            const neuesDivElement = document.createElement("div");
	            neuesDivElement.classList.add("view");
	            neuesDivElement.appendChild(neueInputCheckbox);
	            neuesDivElement.appendChild(neuesLabelElement);
	            neuesDivElement.appendChild(neuerButtonElement);
	            const neuesLiElement = document.createElement("li");
	            neuesLiElement.appendChild(neuesDivElement);
	            nehmeLizurück(neuesLiElement);
	            aufgaListElement.prepend(neuesLiElement);
	            neuesTodoElement.value = "";
	            refresh();
	        }
	    });
	    alleswegElement.addEventListener("click", (event) => {
	        const completeLiElements = aufgaListElement.querySelectorAll("li.completed");
	        for (const komplettesLiElement of completeLiElements) {
	            komplettesLiElement.remove();
	        }
	        refresh();
	    });
	});

}());
