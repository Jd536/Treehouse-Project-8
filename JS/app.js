const employeeList = document.getElementById("employeesContainer");
const h3s= document.getElementsByClassName('names'); 
const emailsContainer= document.getElementsByClassName('emails'); 
const citiesContainer= document.getElementsByClassName('cities'); 
const overlay = document.getElementById("overlay");
const profileContainer = document.getElementById("profile");
const fetchData =fetch('https://randomuser.me/api/?results=12')
    .then( function (response){
           return response.json();
    });

   fetchData.then (function(data){
      const employees= data.results;
//      console.log(employees);
      const employeesPictures = employees.map(employee => employee.picture.medium);
      employeesPictures.forEach(picture => {
          createitems(picture);

          
      });
    });


// Image .First and Last Name .Email .City

// This function add images to the list items, create the list items and append them to the ul
function createitems(picture, fullname, email,city){
    const newItem = document.createElement('li');
    newItem.className = "cards";
     newItem.innerHTML = ` <img src= '${picture}' class="photos"  alt="employe name..."> 
     <div class=" cardsInfo">
        <h3 class= "names"></h3>
        <p class = "emails"></p>
        <p class = " cities"></p>
     </div>`
        ;
     employeeList.appendChild(newItem);

    //  newItem.addEventListener("click", function(li){
    //         const profile = document.getElementById('profile');
    //         profile.style.display="block";
    //        profile.appendChild(li.target);
    //         overlay.style.display ='block';
    //        console.log(li.target);
          
    //  });
}


// get first name and last Names

fetchData.then( function getinfo(data){
    const fullnames = data.results;
    const names = fullnames.map(fullname => `${fullname.name.first} ` + `${fullname.name.last}`);
//    console.log(names);
    for(var i = 0; i<names.length; i++){
        var namecontainers=Array.from(h3s);
        namecontainers[i].innerText = names[i];
//        console.log(names[i]);
    }
});
// get emails
fetchData.then( function getinfo(data){
    const emails = data.results;
    
    const emailList = emails.map(email => email.email);
//    console.log(emailList);

    for(var i = 0; i<emailList.length; i++){
//        console.log(emailList[i]);
        let emailsContainers=Array.from(emailsContainer);
        emailsContainers[i].innerText = emailList[i];
        // eemailsContainers[i].innerText = emailList[i];
       
    }
});
// get cities

fetchData.then( function getinfo(data){
    const citieS = data.results;
    
    const citiesList = citieS.map(citie => citie.location.city);
//    console.log(citiesList);
   
    for(var i = 0; i<citiesList.length; i++){
//        console.log(citiesList[i]);
    
        let citiesContainers=Array.from(citiesContainer);
        citiesContainers[i].innerText = citiesList[i];
     
       
    }
});
 


var cards = $('cards');
// var cardsArray =$.makeArray(cards);
console.log(cards);