const createQuiz = function() {
	return {
		fetchQuestions : function(url) {
			return fetch(url).then(res => res.json());
		},
		
		render : function(questions) {
			const ul = document.querySelector('main ul.questions');
			
			questions.forEach((question) => {
				const li = document.createElement('li');
				ul.appendChild(li);
				
				const h2 = document.createElement('h2');
				li.appendChild(h2);
				h2.innerText = question.title;
				
				const p = document.createElement('p');
				li.appendChild(p);
				p.innerText = question.content;
				
				const select = document.createElement('select');
				li.appendChild(select);
				
				question.options.forEach((option) => {
					const answerOption = document.createElement('option');
					select.appendChild(answerOption);
					answerOption.innerText = option.content;
					answerOption.value = option.correct;
				})
				
			})
		},
		
		showScore : function(event) {
			event.preventDefault();
			let score = 0;
			const selectors = [...document.querySelectorAll('select')];
			selectors.forEach((select) => {
				console.log(select);
				const i = select.selectedIndex;
				const answer = select.options[i].value;
				if (answer === 'true') {
					score++;
				}
			});
			const total = selectors.length;
			document.querySelector('.result').innerText = score + '/' + total;
			
			if (score === total) {
				const confetti = new ConfettiGenerator({ target: 'confetti' });
				confetti.render();
			}
		}
		
	}	
};

const url = 'https://gist.githubusercontent.com/benna100/13f5850bf78f59d9baea915cbbe9f258/raw/ef8f2b137b07b05e8f593cef0281b4f1f0aba79a/JS-3%2520questions';

const hyfQuiz = createQuiz();

hyfQuiz.fetchQuestions(url)
	.then((questions) => hyfQuiz.render(questions));

document.querySelector('button').addEventListener('click', hyfQuiz.showScore);
