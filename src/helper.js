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
        array.forEach(row => {row.reverse()});
    }
    static _revertColumns(array) {
        var temp;
        for (var j = 0; j< array.length;j++){
            for (var  i = 0; i<array.length/2; i++){
                temp = array[i][j];
                array[i][j] = array[array.length - i][j];
                array[array.length - i][j] = temp;
            }
        }
    }
}