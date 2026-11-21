let lastTagElem = null;
let clearClsTimerID = null;
let bHasClickedOnce = false;

function goToAnchor(inData)
{
    if(lastTagElem !== null)
    {
        lastTagElem.classList.remove("jumped-to-anchor");
        clearTimeout(clearClsTimerID);
    }

    if(!bHasClickedOnce)
    {
        //Hide the notice since the user knows by now that there is buttons to click.
        document.querySelector("#click-notice").setAttribute("style", "display: none;");
        bHasClickedOnce = true;
    }
    
    window.location = window.location.protocol + "//" + window.location.host + window.location.pathname + inData.anchorID;
    lastTagElem = inData.anchorElem;
    lastTagElem.classList.add("jumped-to-anchor");
    clearClsTimerID = setTimeout(() => {
        lastTagElem.classList.remove("jumped-to-anchor");
        clearClsTimerID = null;
    }, 5000);
}

function setupGoToButton(inBtnTag, anchorTag)
{
    let tempObj = {
        btnElem: null,
        anchorElem: null,
        anchorID: anchorTag
    };

    let btn = document.querySelector(inBtnTag);
    tempObj.btnElem = btn;
    tempObj.anchorElem = document.querySelector(anchorTag);

    if(tempObj.anchorElem === null)
    {
        console.warn(`${inBtnTag} set with an invalid tag: '${anchorTag}'!`);
        return;
    }

    btn.addEventListener("click", (event) => {goToAnchor(tempObj);});

    btn.addEventListener("mouseenter", (event) => {
        if(!tempObj.anchorElem.classList.contains("jumped-to-anchor"))
            tempObj.anchorElem.classList.add("hovered-anchor");
    });

    btn.addEventListener("mouseleave", (event) => {tempObj.anchorElem.classList.remove("hovered-anchor");});
}

document.addEventListener("DOMContentLoaded", (event) => {
    setupGoToButton("#section-btn-palette-name", "#anchor-palette-name");
    setupGoToButton("#section-btn-view-mode", "#anchor-view-mode");
    setupGoToButton("#section-btn-palette-select", "#anchor-palette-select");
    setupGoToButton("#section-btn-quote", "#anchor-quote");
    setupGoToButton("#section-btn-saving-export", "#anchor-saving-export");
    setupGoToButton("#section-btn-color-swatch", "#anchor-color-swatch");
    setupGoToButton("#section-btn-color-swatch-editor", "#anchor-color-swatch-editor");
    setupGoToButton("#section-btn-palette-splitter", "#anchor-palette-splitter");
    setupGoToButton("#section-btn-click", "#anchor-click");
})