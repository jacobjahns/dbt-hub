module.exports = splitVExItems = itemString => {
    if(!itemString) return ''

    let s = ''
    items = itemString.split('•')

    for(item of items) {
        if(item != '') {
            s += `<p class="vex-data">• ${item}</p>`
        }
    }

    return s
}