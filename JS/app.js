const employeesProfilesContainer = document.getElementById('employeesProfilesContainer');
const overlay = document.getElementById('overlay');
const body = document.getElementsByName('body');
var cardIndex;
var numberOfEmployees=0;
var employeesRawData;
/*========================================================

=========================================================*/

// Fetch Random user Data from randomuser.me

 const fetchData= fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response=> response.json());

    fetchData
        .then(function(data){
            employeesRawData= data.results;
            numberOfEmployees= employeesRawData.length;
            // Generate HTML for the employee profile
            for(var i = 0; i<numberOfEmployees; i++){
                
                const card = document.createElement('li');
                card.id=i;
                card.className='cards';
                card.innerHTML = 
                    `
                    <img class="profilePicture" src='${employeesRawData[i].picture.large}' alt="picture of">
                    <div class="cardsInfo">
                        <p class="names">${employeesRawData[i].name.first +" "+ employeesRawData[i].name.last}</p>
                        <p class="emails">${employeesRawData[i].email}</p>
                        <p class="cities">${employeesRawData[i].location.city}</p>
                    </div>
                    ` 
                    // append the users (li) to the container
                employeesProfilesContainer.appendChild(card);
            }
           
        })
        .then(function(){
            const cards =document.getElementsByClassName('cards');
            for(var i=0; i<cards.length;i++){
                var card =cards[i];
                card.addEventListener("click",function(){
                overlay.className= "overlayShow";
                    cardIndex=this.id;
                    generateModalHTML(employeesRawData, cardIndex);
            });
                }
    })
    // Add Filter Functionality that filters card
    .then(function(){
        var searchEmployee=$("#search");
        var members = $(".cards");
        var names = $(".names");
        searchEmployee.keyup(function(){
         var value = $(this).val().toLowerCase();
            console.log(names);
         $(".names").filter(function(){
              $(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1);
         });
    
        });
    });
    function abbreviateState(input, to){
        var states = [
            ['Arizona', 'AZ'],
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['Arizona', 'AZ'],
            ['Arkansas', 'AR'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY'],
        ];
        if (to == 'abbr'){
          input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
              return(states[i][1]);
            }
          }    
        }
      }
  
const formatDate = function(dateArray, i){
    let dateOfBirth= new Date(dateArray[i].dob.date);
                let dd = dateOfBirth.getDate();
                let mm = dateOfBirth.getMonth() + 1;
                let year = dateOfBirth.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                  }
                if (mm < 10) {
                    mm = '0' + mm;
                  }
                let employeeDob = `${mm}/${dd}/${year}`;
                return employeeDob;
}
      
    
// Create a modal HTML (create a calll back function that can be used in the click event) street name and number, city, state, and postcode. 


let generateModalHTML = function(employeesRawData, i){
                 numberOfEmployees= employeesRawData.length;
//                 console.log(numberOfEmployees);
                    let index = i;
    const modal = document.createElement('div');
                let employeeDob=formatDate(employeesRawData,i);
                modal.id=i;
                modal.className='modal';
                modal.innerHTML = 
                 `
                        <i class="fas fa-times close" id="close" ></i>
                        <i class="fas fa-angle-left leftArrow"></i>
                        <i class="fas fa-angle-right rightArrow"></i>
                    <img class="modalPicture" src='${employeesRawData[i].picture.large}' alt="picture of">
                    <div class="modalinfo">
                        <p class="modalnames">${employeesRawData[i].name.first +" "+ employeesRawData[i].name.last}</p>
                        <p class="modalemails">${employeesRawData[i].email}</p>
                        <p class="modalcities">${employeesRawData[i].location.city}</p>
                    </div>
                    <div class="modalInfo2">
                        <p class="modalphone">${employeesRawData[i].cell}</p>
                        <p class="modaladdress">${employeesRawData[i].location.street} ${employeesRawData[i].location.city}, ${abbreviateState(employeesRawData[i].location.state, 'abbr')}  ${employeesRawData[i].location.postcode }</p>
                        <p class="birthdate"> Birthday : ${employeeDob}</p>
                    </div>
               
               ` 
                    overlay.appendChild(modal);
// Add click function to the Modal buttons
        const close = $('.close');
        const  rightArrow = $('.rightArrow');
        const  leftArrow  = $('.leftArrow');
         
            close.click(function(){
                overlay.className="OverlayHide";
                modal.style.display = "none";
            });
            
//Hide left button when employee profile is less than or = 0


           if(i>=11){
               rightArrow.remove();
           }

//Hide right button when employee profile is more than or equal to 11    
           if(i<=0){
              leftArrow.remove();
              }


// conditionally add and remove Modal when left/right button is clicked  
        if(i>=0 ){
            $( document ).ready(function() {
            rightArrow.click(function(){
                    modal.remove();
                    CarIndex=parseInt(modal.id);
                    cardIndex++;
                generateModalHTML(employeesRawData, cardIndex);
                console.log(cardIndex);
            }); 
            });
            }

       if(i<=11 ){
            $( document ).ready(function() {
            leftArrow.click(function(){
                    modal.remove();
                    CarIndex=parseInt(modal.id);
                    cardIndex--;
                generateModalHTML(employeesRawData, cardIndex);
//                console.log(cardIndex);
            }); 
            });
            }

}

