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
    }
}