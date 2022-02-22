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

function textBoxOpen(num)
{
    const list = document.getElementsByClassName("explBox");
    console.log(list[num].style.display)
    if (list[num].style.display == "")
    {
        for (const elem of list) {
            if (elem != list[num]) {
                elem.style.display = "";
            } else
                elem.style.display = "grid";
        }
    }
    else 
    {
        list[num].style.display = ""
    }
}