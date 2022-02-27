function navMenuOpen() 
{
    if (document.getElementById("mobNavDropdown").style.display === "flex")
    {
        document.getElementById("mobNavDropdown").style.display = "none";
        document.getElementById("bars").style.display = "inline";
        document.getElementById("xMark").style.display = "none";
    }
    else 
    {
        document.getElementById("mobNavDropdown").style.display = "flex";
        document.getElementById("bars").style.display = "none";
        document.getElementById("xMark").style.display = "inline";
        document.getElementById("navAuth").style.display = "none";
        const list = document.getElementsByClassName("userIcon");
        for (let elem of list) {
            elem.style.backgroundColor = "";
        }
    }
}

function toggleAuthMenu()
{
    if (document.getElementById("navAuth").style.display === "block")
    {
        document.getElementById("navAuth").style.display = "none";
        const list = document.getElementsByClassName("userIcon");
        for (var i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "";
        }
    }
    else 
    {
        document.getElementById("navAuth").style.display = "block";
        const list = document.getElementsByClassName("userIcon");
        for (var i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "#12302c";
        }
        document.getElementById("mobNavDropdown").style.display = "none";
        document.getElementById("bars").style.display = "inline";
        document.getElementById("xMark").style.display = "none";
    }
}

//Open/Close Selected Explanation Boxes
function textBoxOpen(num)
{
    const list = document.getElementsByClassName("explBox");
    const coll = document.getElementsByClassName("iconExpl");
    num2 = num*2;

    if (list[num].style.display == "")
    {
        for (const elem of list) {
            if (elem != list[num]) {
                elem.style.display = "";
            } else
                elem.style.display = "flex";
        }
        //reset all arrows first
        for (var i = 0; i < coll.length; i++) {
            if ((i % 2) == 1) //all odd numbered objects
                coll[i].style.display = "none";
            else
                coll[i].style.display = "inline-block";
        }
        //then set selected arrows
        coll[num2].style.display = "none";
        coll[num2+1].style.display = "inline-block";
    }
    else
    {
        list[num].style.display = "";
        coll[num2].style.display = "inline-block";
        coll[num2+1].style.display = "none";
    }
}

//Close Popup when Container is clicked
window.onclick = function(event) {
    if (event.target == document.getElementById("popupContainer")) {
        document.getElementById("popupContainer").style.display = "none";
        document.body.style.overflow = "auto";
    }
}

//Display Popup-container and selected popups inside
function popupOpen(num)
{
    document.body.style.overflow = "hidden";
    document.getElementById("popupContainer").style.display = "flex";
    const list = document.getElementsByClassName("popup");
    list[num].style.display = "grid";

}

// VEx Textboxes
const textboxSize = { cols: 20, rows: 1 };
const setTextboxSize = () => {
    let tb = document.getElementsByClassName('vex-textbox');
    for(let i = 0; i < tb.length; i++) {
        tb[i].setAttribute('cols', textboxSize.cols);
        tb[i].setAttribute('rows', tb[i].innerHTML.split('•').length || Math.ceil(tb[i].innerHTML.length % textboxSize.cols));
        if(tb[i].innerHTML == '') tb[i].innerHTML = '• ';
        let parts = tb[i].innerHTML.split(/(?=[•])|(?<=[•])/g);
        for(let j = 0; j < parts.length; j++) {
            try {
                if(parts[j] != '\n•' && parts[j] != '•') parts[j] = ' ' + parts[j].trim();
                if(parts[j] == '•' && j > 0 && parts.indexOf('\n') == -1) parts[j] = '\n' + parts[j];
            } catch {}
        }
        tb[i].innerHTML = parts.join('');

    }
}

const addItem = elem => {
    elem.setAttribute('rows', '' + (parseInt(elem.getAttribute('rows')) + 1))
    console.log(elem)

    elem.value += '\n• '
    return true
}

const handleInput = e => {
    if(e.target.value == '') return null;

    if(e.key === 'Enter') {
        addItem(e.target);
        e.preventDefault();
    }

    return null;
}

const textboxes = document.getElementsByClassName('vex-textbox');
setTextboxSize();
for(let i = 0; i < textboxes.length; i++) {
    textboxes[i].addEventListener('keypress', handleInput);
}