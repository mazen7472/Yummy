

let mealsData= document.getElementById("mealsData");
let searchInputs= document.getElementById("searchInputs");
let navTabWidth= $(".nav-tab").innerWidth();
let submitBtn;
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

$(function(){
    getMealsByName("").then(()=>{
        $(".sk-circle").fadeOut(1000,function(){
            $("body").css('overflow','auto');
            $("#loading").fadeOut(1000,function(){
                $("#loading").remove();
            })
         })
    })
 
    $(".side-nav").css("left",`-${navTabWidth}px`);
   
})
$("#open-close-icon").click(function(){
   let offsetLeft=($(".side-nav").offset().left)
 
   if(offsetLeft==0){
    closeSideNav()
   }
   else{
    
    openSideNav()
  
   }
})
function openSideNav(){
    $(".side-nav").animate({"left":`0px`},500);
    $("#open-close-icon").removeClass("fa-align-justify");
    $("#open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".nav-links li").eq(i).animate({
            'top': '0'
        }, (i + 5) * 120)
    }
}
function closeSideNav(){
    $(".side-nav").animate({"left":`-${navTabWidth}px`},500);
    $("#open-close-icon").removeClass("fa-x");
    $("#open-close-icon").addClass("fa-align-justify");
    $(".nav-links li").animate({
        'top': '500px'
    }, 500)
}

async function getMealsByName(term){
    mealsData.innerHTML=""
    $(".inner-loading-overlay").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response= await response.json()
    response.meals? displayMeals(response.meals): displayMeals([]);
    $(".inner-loading-overlay").fadeOut(200)
}
async function getMealsByFirstLetter(term){
    mealsData.innerHTML=""
    $(".inner-loading-overlay").fadeIn(200)
    term==""?displayMeals([]):""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response= await response.json()
    response.meals? displayMeals(response.meals): displayMeals([]);
    $(".inner-loading-overlay").fadeOut(200)
}

async function getCategories(){
    mealsData.innerHTML=""
    $(".inner-loading-overlay").fadeIn(200)
    searchInputs.innerHTML=""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response= await response.json()
    displayCategories(response.categories)
    $(".inner-loading-overlay").fadeOut(200)
}

async function getArea(){
    mealsData.innerHTML=""
    $(".inner-loading-overlay").fadeIn(200)
    searchInputs.innerHTML=""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response= await response.json()
    displayArea(response.meals)
    $(".inner-loading-overlay").fadeOut(200)
}

async function getIngredients(){
    mealsData.innerHTML=""
    $(".inner-loading-overlay").fadeIn(200)
    searchInputs.innerHTML=""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response= await response.json()
    displayIngredients(response.meals.splice(0,20))
    $(".inner-loading-overlay").fadeOut(200)
}

async function getCategoryMeals(category){
    mealsData.innerHTML=""
    $(".inner-loading-overlay").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response= await response.json()
    displayMeals(response.meals.splice(0,20))
    $(".inner-loading-overlay").fadeOut(200)
}
async function getAreaMeals(area){
    mealsData.innerHTML=""
    $(".inner-loading-overlay").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response= await response.json()
    displayMeals(response.meals)
    $(".inner-loading-overlay").fadeOut(200)
}
async function getIngredientsMeals(ingredients){
    mealsData.innerHTML=""
    $(".inner-loading-overlay").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response= await response.json()
    displayMeals(response.meals)
    $(".inner-loading-overlay").fadeOut(200)


}
async function getMealDetails(mealId){
    closeSideNav()
    mealsData.innerHTML=""
    $(".inner-loading-overlay").fadeIn(200)
    searchInputs.innerHTML=""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    response= await response.json()
    displayMealDetails(response.meals[0])
    $(".inner-loading-overlay").fadeOut(200)
}

function displayMeals(list){
    let cartona=``;

    for (let i = 0; i < list.length; i++) {
        cartona+=` <div class="col-md-3">
        <div onclick="getMealDetails('${list[i].idMeal}')" class="meal-item position-relative overflow-hidden rounded-3 cursor-pointer">
            <img src="${list[i].strMealThumb}" class="img-fluid">
            <div class="meal-layer position-absolute d-flex align-items-center">
                <h3 class="px-2 text-black">${list[i].strMeal}</h3>
            </div>
        </div>
    </div>`
        
    }
    mealsData.innerHTML=cartona;
    
}

function displayCategories(list){
    let cartona=``;

    for (let i = 0; i < list.length; i++) {
        cartona+=` <div class="col-md-3">
        <div onclick="getCategoryMeals('${list[i].strCategory}')" class="meal-item position-relative overflow-hidden rounded-3 cursor-pointer">
            <img src="${list[i].strCategoryThumb}" class="img-fluid">
            <div class="meal-layer position-absolute text-center text-black">
                <h3 class="px-2">${list[i].strCategory}</h3>
                <p>${list[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}</p>
            </div>
        </div>
    </div>`
        
    }
    mealsData.innerHTML=cartona;
    
}

function displayArea(list){
    let cartona=``;

    for (let i = 0; i < list.length; i++) {
        cartona+=` <div class="col-md-3">
        <div onclick="getAreaMeals('${list[i].strArea}')" class="rounded-3  text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3 class="px-2">${list[i].strArea}</h3>
        </div>
    </div>`
        
    }
    mealsData.innerHTML=cartona;
    
}

function displayIngredients(list){
    let cartona=``;

    for (let i = 0; i < list.length; i++) {
        cartona+=` <div class="col-md-3">
        <div onclick="getIngredientsMeals('${list[i].strIngredient}')"  class="rounded-3 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 class="px-2">${list[i].strIngredient}</h3>
            <p>${list[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
    </div>`
        
    }
    mealsData.innerHTML=cartona;
    
}

function displayMealDetails(meal){
 searchInputs.innerHTML=""
let ingredients=``
for (let i = 0; i < 20; i++) {
    if(meal[`strIngredient${i}`]){
        ingredients+=`<li class="alert alert-info m-2 p-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
    
    
}

let tags= meal.strTags?.split(",")
if(!tags){
    tags=[]
}
let tagList=''

for (let i = 0; i < tags.length; i++) {
    tagList+=` <li class="alert alert-danger m-2 p-2">${tags[i]}</li>`
    
}

    let cartona=``;

   
        cartona+=`<div class="col-md-4">
        <img class="img-fluid rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
      </div>
      <div class="col-md-8">
        <h2>Instructions</h2>
        <p class="fs-6 fw-normal">${meal.strInstructions}</p>
        <h3 class="fs-5 fw-normal"><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
        <h3 class="fs-5 fw-normal"><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
        <h3 class="fs-6 fw-normal"><span class="fw-bolder">Recipes: </span></h3>
        <ul class="list-unstyled d-flex flex-wrap">
          ${ingredients}
        </ul>
        <h3><span class="fw-bolder">Tags:</span></h3>
        <ul class="list-unstyled d-flex flex-wrap">
           ${tagList}
        </ul>
        <a href="${meal.strSource}" target="_blank" class="btn text-white btn-success p-2 w-25"> <i class="fa-solid fa-link"></i> Source</a>
        <a href="${meal.strYoutube}" target="_blank" class="btn text-white btn-danger p-2 w-25"><i class="fa-brands fa-youtube"></i> Youtube</a>
      </div>`
        
    
    mealsData.innerHTML=cartona;
}

function displaySearch(){
   
    searchInputs.innerHTML=`<div class="row py-5">
    <div class="col-md-6">
        <input onkeyup="getMealsByName(this.value)" class="form-control bg-white" type="search" id="meal-search-name" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input onkeyup="getMealsByFirstLetter(this.value)" maxlength="1" class="form-control bg-white" type="search"  id="meal-search-fL" placeholder="Search By First Letter">
    </div>
</div>`
mealsData.innerHTML=""
}

function displayContact(){
    searchInputs.innerHTML=""
    mealsData.innerHTML=`<div class=" min-vh-100 d-flex justify-content-center align-items-center">
    <div  class="container w-75 text-center">
        <div class="row gy-4 mb-3 align-items-center ">
            <div class="col-md-6">
                <input onkeyup="inputsValidtaion()" class="form-control bg-white" type="text"  id="userName" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="inputsValidtaion()" class="form-control bg-white" type="email"  id="userEmail" placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@gmail.com
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="inputsValidtaion()" class="form-control bg-white" type="tel"  id="userPhone" placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="inputsValidtaion()" class="form-control bg-white" type="number"  id="userAge" placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="inputsValidtaion()" class="form-control bg-white" type="password"  id="userPassword" placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters,at least one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="inputsValidtaion()" class="form-control bg-white" type="password"  id="userRepassword" placeholder="Enter Your Repassord">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid repassword 
            </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn text-white btn-outline-danger p-2">Submit</button>
    </div>

</div>`
 submitBtn =document.getElementById("submitBtn");
 document.getElementById("userName").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("userEmail").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("userPhone").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("userAge").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("userPassword").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("userRepassword").addEventListener("focus", () => {
    repasswordInputTouched = true
})
}


function inputsValidtaion(){

    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
            document.getElementById("userName").classList.remove("is-invalid")
            document.getElementById("userName").classList.add("is-valid")


        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
            document.getElementById("userName").classList.remove("is-valid")
            document.getElementById("userName").classList.add("is-invalid")
        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
            document.getElementById("userEmail").classList.remove("is-invalid")
            document.getElementById("userEmail").classList.add("is-valid")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
            document.getElementById("userEmail").classList.remove("is-valid")
            document.getElementById("userEmail").classList.add("is-invalid")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
            document.getElementById("userPhone").classList.remove("is-invalid")
            document.getElementById("userPhone").classList.add("is-valid")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
            document.getElementById("userPhone").classList.remove("is-valid")
            document.getElementById("userPhone").classList.add("is-invalid")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
            document.getElementById("userAge").classList.remove("is-invalid")
            document.getElementById("userAge").classList.add("is-valid")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
            document.getElementById("userAge").classList.remove("is-valid")
            document.getElementById("userAge").classList.add("is-invalid")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
            document.getElementById("userPassword").classList.remove("is-invalid")
            document.getElementById("userPassword").classList.add("is-valid")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
            document.getElementById("userPassword").classList.remove("is-valid")
            document.getElementById("userPassword").classList.add("is-invalid")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
            document.getElementById("userRepassword").classList.remove("is-invalid")
            document.getElementById("userRepassword").classList.add("is-valid")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
            document.getElementById("userRepassword").classList.remove("is-valid")
            document.getElementById("userRepassword").classList.add("is-invalid")

        }
    }


    if(nameValidation()&&emailValidation()&&passwordValidation()&&repasswordValidation()&&phoneValidation()&&ageValidation()){
        submitBtn.removeAttribute("disabled")
    }
    else{
        submitBtn.setAttribute("disabled",true)
    }

}

function nameValidation(){
   return (/^[A-Za-z0-9]{3,}(?:[ _-][A-Za-z0-9]+)*$/.test(document.getElementById("userName").value))
}
function emailValidation(){
    return (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(document.getElementById("userEmail").value))
}
function passwordValidation(){
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("userPassword").value))
}
function repasswordValidation(){
    return (document.getElementById("userPassword").value== document.getElementById("userRepassword").value)
}
function phoneValidation(){
    return (/^01[0125][0-9]{8}$/.test(document.getElementById("userPhone").value))
}

function ageValidation(){
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("userAge").value))
}