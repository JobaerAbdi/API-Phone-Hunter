const phonesDataLoad = async(search)=>{
    //const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url)
    const data = await res.json()
    displayphones(data.data)
}
const displayphones = phones =>{
    phones = phones.slice(0,9);

    const phoneFound = document.getElementById('phone-found');
    if(phones.length === 0){
        phoneFound.classList.remove('d-none');
    }
    else{
        phoneFound.classList.add('d-none');
    }

    
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    phones.forEach(phone =>{
        //console.log(phone);
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div class="card p-5 bg-warning">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-phoneTitle">Name: ${phone.phone_name}</h5>
                <h5 class="card-phoneTitle">Brand: ${phone.brand}</h5>
                <h5 class="card-phoneTitle">Slug: ${phone.slug}</h5>
                <button onclick="searchDetail('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Search Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(newDiv);
    });
    toggleBar(false);
}

document.getElementById('btn-field').addEventListener('click',function(){
    toggleBar(true);
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';
    phonesDataLoad(inputText);
})

document.getElementById('input-field').addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        const inputFields = document.getElementById('input-field');
        const inputText = inputFields.value;
        inputFields.value = '';
        phonesDataLoad(inputText);
    }
})

// const btnClicked = ()=>{
//     const inputField = document.getElementById('input-field');
//     const inputText = inputField.value;
//     inputField.value = '';
//     phonesDataLoad(inputText);
// }


const toggleBar = isLoding =>{
    const loading = document.getElementById('spinner');
    if(isLoding){
        loading.classList.remove('d-none');
    }
    else{
        loading.classList.add('d-none');
    }
}

const searchDetail = (slug)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then(res => res.json())
    .then(data => showPhoneDetails(data.data))
}

const showPhoneDetails = (phone)=>{
    console.log(phone);
    const phoneTitle = document.getElementById('phoneDetailModalLabel');
    phoneTitle.innerHTML = `<h2>Brand: ${phone.brand}</h2>`;

    const bodyDetails = document.getElementById('phone-body');
    bodyDetails.innerHTML = `
         <h6 class="text-center"><img src="${phone.image}" alt=""></h6>
         <h6 class="mt-3">Chipset: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No Chipset Found'}</h6>
         <h6 class="mt-3">Displaysize: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Displaysize Found'}</h6>
         <h6 class="mt-3">Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No Memory Found'}</h6>
         <h6 class="mt-3">Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Found'}</h6>

         <h6 class="mt-3">Storage: ${phone.mainFeatures.sensors[0]}</h6>
         <h6 class="mt-3">Storage: ${phone.mainFeatures.sensors[1]}</h6>
         <h6 class="mt-3">Storage: ${phone.mainFeatures.sensors[2]}</h6>
         <h6 class="mt-3">Storage: ${phone.mainFeatures.sensors[3]}</h6>
         <h6 class="mt-3">Storage: ${phone.mainFeatures.sensors[4]}</h6>
         <h6 class="mt-3">Storage: ${phone.mainFeatures.sensors[5] ? phone.mainFeatures.sensors[5] : 'No Found' }</h6>
    `;

}

phonesDataLoad('apple');



