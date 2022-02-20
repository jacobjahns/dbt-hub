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