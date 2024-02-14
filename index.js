var apiKey="fca_live_EqWU5TJHcXWFa3kQDL9yS1GK3RT0skEeI9DQE1LP"
 var baseCurrency = "USD";
async function populatecurrencies(){
  try{
    const response=await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`);
    const data=await response.json();
   var currencies=Object.keys(data.data);

   const fromselect=document.querySelector(".from-select");
const toselect=document.querySelector(".to-select");


   currencies.forEach((currency)=>{
    const option=document.createElement("option");
    option.value=currency
    option.textContent=currency
    fromselect.appendChild(option.cloneNode(true));
    const toOption = option.cloneNode(true);
  toOption.value = currency; // Reset the value for the "to" select dropdown
  toselect.appendChild(toOption);
    
  })
  
  }
catch(error){
    console.error("got an error",error)
    
}


}


async function convertcurrency(){
  try{
  const frominput=document.querySelector(".from-input").value;
  const fromselect=document.getElementById("from-select").value;
  const toselect=document.getElementById("to-select").value;

  if(fromselect!=toselect){
  const response=await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`);
  const data=await response.json();

  const enteries=Object.entries(data.data)
  const toRate =
        toselect === baseCurrency
          ? 1 // If converting to the base currency, rate is 1
          : enteries.find((entry) => entry[0] === toselect)[1];

      // Find the rate of the 'fromselect' currency
      const fromRate =
        fromselect === baseCurrency
          ? 1 // If converting from the base currency, rate is 1
          : enteries.find((entry) => entry[0] === fromselect)[1];

      // Calculate the final output
      const finalOutput = (frominput * toRate) / fromRate;

      const result = document.querySelector(".display-result");
      result.textContent = `${frominput} ${fromselect} = ${finalOutput.toFixed(
        3
        
      )} ${toselect}`;
    }
  } catch (error) {
    console.error("got an error", error);
  }
}

// Call populatecurrencies with the specified base currency
populatecurrencies();






