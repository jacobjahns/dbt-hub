module.exports = dateConversion = date => {
    const d = new Date(date);
    let day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
    let month = (d.getMonth()+1).length-1 ? d.getMonth()+1 : '0' + (d.getMonth()+1);
    let year = d.getFullYear();
    return `${day}.${month}.${year}`;
};