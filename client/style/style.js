function toggleNavMenu() 
{
    if (document.getElementById("navDropdown").style.display === "flex")
    {
        document.getElementById("navDropdown").style.display = "none";
        document.getElementById("bars").style.display = "block";
        document.getElementById("xMark").style.display = "none";
    }
    else
    {
        document.getElementById("navDropdown").style.display = "flex";
        document.getElementById("bars").style.display = "none";
        document.getElementById("xMark").style.display = "block";
        document.getElementById("navAuth").style.display = "none";
        document.getElementById("userIcon").style.backgroundColor = "";
    }
}

function toggleAuthMenu()
{
    if (document.getElementById("navAuth").style.display === "block")
    {
        document.getElementById("navAuth").style.display = "none";
        document.getElementById("userIcon").style.backgroundColor = "";
    }
    else 
    {
        document.getElementById("navAuth").style.display = "block";
        document.getElementById("userIcon").style.backgroundColor = "#12302c";
        document.getElementById("navDropdown").style.display = "none";
        document.getElementById("bars").style.display = "block";
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

//Close Popup and reset all when Container is clicked
window.onclick = function(event) {
    if (event.target == document.getElementById("popupContainer")) {
        document.getElementById("popupContainer").style.visibility = "hidden";
        document.getElementById("popupContainer").style.opacity = 0;
        document.body.style.overflow = "auto";
        const list = document.getElementsByClassName("popup");
        for (const elem of list) {
            elem.style.visibility = "hidden";
            elem.style.opacity = 0;
            elem.style.height = 0;
        }
        const emotDescrList = document.getElementsByClassName("emotDescr");
        for (const elem of emotDescrList) {
            elem.style.display = "none";
        }
    }
}

//Display Popup-container and selected popups inside
let currEmot; //Keep last selected Emotion

function popupOpen(currPopup , emot = '')
{
    const list = document.getElementsByClassName("popup");

    if (emot != '') {
        currEmot = emot;
        const varList = document.getElementsByClassName("var");
        for (const elem of varList) {
            elem.textContent=currEmot;
        }
    }

    console.log(currPopup, currEmot);

    document.body.style.overflow = "hidden";
    document.getElementById("popupContainer").style.visibility = "visible";
    document.getElementById("popupContainer").style.opacity = 1;

    switch (currPopup) {
        case 0:
            list[0].style.visibility = "visible";
            list[0].style.opacity = 1;
            list[0].style.height = 'auto';
            
            break;
        case 1:
            list[0].style.visibility = "hidden";
            list[0].style.opacity = 0;
            list[0].style.height = 0;
            list[1].style.visibility = "visible";
            list[1].style.opacity = 1;
            list[1].style.height = 'auto';
            break;
        case 2:
            list[1].style.visibility = "hidden";
            list[1].style.opacity = 0;
            list[1].style.height = 0;
            list[2].style.visibility = "visible";
            list[2].style.opacity = 1;
            list[2].style.height = 'auto';
            break;
        case 3:
            list[2].style.visibility = "hidden";
            list[2].style.opacity = 0;
            list[2].style.height = 0;
            list[3].style.visibility = "visible";
            list[3].style.opacity = 1;
            list[3].style.height = 'auto';
            break;
        case 4:
            for (const elem of list) {
                elem.style.visibility = "hidden";
                elem.style.opacity = 0;
                elem.style.height = 0;
            }
            list[4].style.visibility = "visible";
            list[4].style.opacity = 1;
            list[4].style.height = 'auto';
            switch (currEmot) {
                case 'Trauer':
                    document.getElementById(currEmot).style.display="flex";
                    break;
                case 'Wut':
                    document.getElementById(currEmot).style.display="flex";
                    break;
                case 'Angst':
                    document.getElementById(currEmot).style.display="flex";
                    break;
            }

            break;
        case 'close':
            document.getElementById("popupContainer").style.visibility = "hidden";
            document.getElementById("popupContainer").style.opacity = 0;
            document.body.style.overflow = "auto";
            for (const elem of list) {
                elem.style.visibility = "hidden";
                elem.style.opacity = 0;
                elem.style.height = 0;
            }
            const emotDescrList = document.getElementsByClassName("emotDescr");
            for (const elem of emotDescrList) {
                elem.style.display = "none";
            }
            break;
    }
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