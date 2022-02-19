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
        document.getElementById("mobNavAuth").style.display = "none";
        document.getElementById("userIcon").style.backgroundColor = "";
    }
}
function mobAuthMenu() 
{
    if (document.getElementById("mobNavAuth").style.display === "block")
    {
        document.getElementById("mobNavAuth").style.display = "none";
        document.getElementById("userIcon").style.backgroundColor = "";
    }
    else 
    {
        document.getElementById("mobNavAuth").style.display = "block";
        document.getElementById("userIcon").style.backgroundColor = "#12302c";
        document.getElementById("mobNavDropdown").style.display = "none";
        document.getElementById("bars").style.display = "inline";
        document.getElementById("xMark").style.display = "none";
    }
}
function deskAuthMenu() 
{
    if (document.getElementById("deskNavAuth").style.display === "block")
    {
        document.getElementById("deskNavAuth").style.display = "none";
        document.getElementById("deskUserIcon").style.backgroundColor = "";
    }
    else 
    {
        document.getElementById("deskNavAuth").style.display = "block";
        document.getElementById("deskUserIcon").style.backgroundColor = "#12302c";
    }
}