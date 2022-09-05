const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit)
}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

    // display 10 phones only 
    const showAll = document.getElementById('show-all')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, dataLimit);
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
    }

    // display no phones found messages
    const noPhone = document.getElementById('no-phone')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    }
 console.log(phones)
    // display all phones 
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                    content. This content is a little bit longer.</p>
                <button class="btn btn-primary" type="button" onclick="loadPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Phone Details</button>
            </div>
        </div>
        `
        console.log(phone.phone_name)
        phonesContainer.appendChild(phoneDiv);
    })
    spinerPreLoader(false)
}
const loadPhoneDetails = async(slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhonesDetails(data.data)
}
const displayPhonesDetails = phone => {
    const phoneTitle = document.getElementById('exampleModalLabel')
    const phoneDetails = document.getElementById('phone-details')
    phoneTitle.textContent = phone.name
    console.log(phone)
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Brand: ${phone.brand ? phone.brand : 'No brand Found'}</p>
    <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No Storage Found'}</p>
    <p>Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No Memory Found'}</p>
    <p>Processor: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No ChipSet Found'}</p>
    <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors : 'No Sensor Found'}</p>
    `
}
const processSearch = (dataLimit) => {
    const searchField = document.getElementById("search-field");
    const searachText = searchField.value;
    loadPhones(searachText, dataLimit);
    spinerPreLoader(true)
}
document.getElementById('btn-search').addEventListener("click", () => {
    processSearch(10)

});
document.getElementById('search-field').addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        processSearch(10)
    }
});
document.getElementById('show-all').addEventListener("click", () => {
    processSearch()
});
const spinerPreLoader = (isLoading) =>{
    const spiner = document.getElementById("loader")
    if(isLoading){
        spiner.classList.remove("d-none")
    }else{
        spiner.classList.add("d-none")
    }
}
loadPhones('iphone')