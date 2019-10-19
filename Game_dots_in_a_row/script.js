document.addEventListener('DOMContentLoaded', () => {

	let game = document.querySelector('#game');
	let field = document.querySelector('.field');

	let rowsNum = 20;
	let colsNum = 30;
	let gamer = ['gamer1', 'gamer2'];
	let gamerNum = 0;

	let rows = fillField(field, rowsNum, colsNum);

	let cols = getColumns(rows);
	let diag1 = getFirstDiags(rows);
	let diag2 = getSecondDiags(rows);
	let lines = rows.concat(cols, diag1, diag2);

	function checkWin(gamer, lines) {
		for (let i = 0; i < lines.length; i++) {
			for (let j = 4; j < lines[i].length; j++) {
				if (
						lines[i][j - 4].classList.contains(gamer) &&
						lines[i][j - 3].classList.contains(gamer) &&
						lines[i][j - 2].classList.contains(gamer) &&
						lines[i][j - 1].classList.contains(gamer) && 
						lines[i][j].classList.contains(gamer)
						) {
							return true;
				}
			}
		}
		return false;
	}

	function isWin(gamers, lines) {
		for (let i = 0; i < gamers.length; i++) {
			if (checkWin(gamers[i], lines)) {
				endGame(gamers[i]);
				break;
			}
		}
	}

	function endGame(gamer) {
		alert(gamer);
		freezeField(field)
	}

	function freezeField(field) {
		let cells = document.querySelectorAll('td');
		for (let i = 0; i < cells.length; i++) {
			cells[i].removeEventListener('click', cellClickHandler);
		}
	}

	function fillField(field, rowsNum, colsNum) {
		let rows = [];
		for (let i = 0; i < rowsNum; i++) {
			let tr = document.createElement('tr');
			rows[i] = [];
			for (let j = 0; j < colsNum; j++) {
				let td = document.createElement('td');
				tr.appendChild(td);
				td.addEventListener('click', cellClickHandler);
				rows[i][j] = td;
			}
			field.appendChild(tr);
		}
		return rows;
	}

	function cellClickHandler() {
		this.classList.add(gamer[gamerNum]);
		this.removeEventListener('click', cellClickHandler);
		isWin(gamer, lines);
		gamerNum++;
		if (gamerNum == gamer.length) gamerNum = 0;
	}

	function getColumns(arr) {
		let result = [];
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				if (result[j] === undefined) {
					result[j] = [];
				}
				result[j][i] = arr[i][j];
			}
		}
		return result;
	}

	function getFirstDiags(arr) {
		let result = [];
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				if (result[i + j] === undefined) {
					result[i + j] = [];
				}
				result[i + j].push(arr[i][j]);
			}
		}
		return result;
	}

	function getSecondDiags(arr) {
		return getFirstDiags(reverseSubArrs(arr));
	}

	function reverseSubArrs(arr) {
		let result = [];
		for (let i = 0; i < arr.length; i++) {
			for (let j = arr[i].length - 1; j >= 0; j--) {
				if (result[i] === undefined) {
					result[i] = [];
				}
				result[i].push(arr[i][j]);
			}
		}
		return result;
	}

});