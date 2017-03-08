import {T, J, L, O, S, Z, I} from './figures';

//const FIGURES_ARRAY = [T, J, L, O, S, Z, I];

export var FigureHelper = {
	_FIGURES_ARRAY: [T, J, L, O, S, Z, I],
	_COLOR_ARRAY: [
		'#FF0D72',
		'#0DC2FF',
		'#0DFF72',
		'#F538FF',
		'#FF8E0D',
		'#FFE138',
		'#3877FF',
	],
	getFigure(){
		var figureNumber = this._getRandom(0, this._FIGURES_ARRAY.length - 1);
		return this._FIGURES_ARRAY[figureNumber].slice(0);
	},
	_getRandom(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	getFigureColor(index){
		return this._COLOR_ARRAY[index - 1];
	}
};
