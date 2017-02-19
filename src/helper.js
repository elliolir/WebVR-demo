export default class Helper {
    static rotateClockwise(array){
        var newArray = array.slice();
        this._transpose(newArray);
        this._revertRows(newArray);
        return newArray;
    }
    static rotateAnticlockwise(array){
        var newArray = array.slice();
        this._transpose(newArray);
        this._revertColumns(newArray);
        return newArray;
    }
    static _transpose(array){
        var temp;
        for (var i in array){
            for (var j = i; j < array[i].length; j++) {
                if (j != i) {
                    temp = array[i][j];
                    array[i][j] = array[j][i];
                    array[j][i] = temp;
                }
            }
        }
    }
    static _revertRows(array) {
        array.reverse();
    }
    static _revertColumns(array) {
        array.forEach(row => {row.reverse()});
    }
}