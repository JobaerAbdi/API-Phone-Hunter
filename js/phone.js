const phonesDataLoad = async(search)=>{
    //const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data)
}
const displayPhones = phones =>{
    phones = phones.slice(0,2);

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
                <h5 class="card-title">Name: ${phone.phone_name}</h5>
                <h5 class="card-title">Brand: ${phone.brand}</h5>
                <h5 class="card-title">Slug: ${phone.slug}</h5>
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

const toggleBar = isLoding =>{
    const loading = document.getElementById('spinner');
    if(isLoding){
        loading.classList.remove('d-none');
    }
    else{
        loading.classList.add('d-none');
    }
}

// const btnClicked = ()=>{
//     const inputField = document.getElementById('input-field');
//     const inputText = inputField.value;
//     inputField.value = '';
//     phonesDataLoad(inputText);
// }

