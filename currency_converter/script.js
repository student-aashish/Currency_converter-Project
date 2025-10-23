const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// for (let code in countryList) {
//     console.log(code,countryList[code]);
// }
for (let select of dropDowns){
    for(currCode in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOptions.selected = true;
        }else if(select.name === "to" && currCode === "NPR"){
            newOptions.selected = true;
        }
        select.append(newOptions);
     }
     select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
};

const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`; // just the base currency file
    let response = await fetch(URL);
    if (response.ok) {
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; // get the "to" currency rate
    // console.log(`Rate: ${rate}`);
    // } else {
    // console.error("Fetch failed with status:", response.status);
    console.log(rate);
    // console.log(amount);
    let finalAmount = (amtVal * rate).toFixed(2)
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount}${toCurr.value}`;
}
};
const updateFlag = (element) =>{
    let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
};
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
window.document.addEventListener("load",()=>{
    updateExchangeRate();
});

