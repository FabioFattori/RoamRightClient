function GetSingleDate(inizio, fine) {

    var appoggio = inizio.split('/');

    var dateEnglishFormat = appoggio[1] + "/" + appoggio[0] + "/" + appoggio[2];

    const date1 = new Date(dateEnglishFormat);

    appoggio = fine.split('/');
    var dateEnglishFormat = appoggio[1] + "/" + appoggio[0] + "/" + appoggio[2];

    const date2 = new Date(dateEnglishFormat);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    //return number of days

    return diffDays;
}

export { GetSingleDate }