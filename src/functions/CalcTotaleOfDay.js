function CalcolaTotale(TappeOfDay) {
    var somma = 0;
    TappeOfDay.forEach(tappe => {
        somma += tappe["Costo"];
    });

    return somma;
}

function CalcTotOfTappeToDo(TappeOfDay) {
    var somma = 0;
    TappeOfDay.forEach(tappe => {
        if (tappe["Svolta"] == 0) {
            somma += tappe["Costo"];
        }
    });

    return somma;
}


export { CalcolaTotale , CalcTotOfTappeToDo }