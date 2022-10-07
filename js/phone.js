const phonesDataLoad = async(search)=>{
    //const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data)
}
const displayPhones = phones =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    phones.forEach(phone =>{
        console.log(phone);
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div class="card p-5 bg-warning">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name:${phone.phone_name}</h5>
                <h5 class="card-title">Brand:${phone.brand}</h5>
                <h5 class="card-title">Slug:${phone.slug}</h5>
            </div>
        </div>
        `;
        phonesContainer.appendChild(newDiv);
    })
}

document.getElementById('btn-field').addEventListener('click',function(){
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';
    phonesDataLoad(inputText);
})

