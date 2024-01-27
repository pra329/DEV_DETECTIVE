const url = "https://api.github.com/users/";
const root = document.documentElement.style;
const Wrapper = document.querySelector('.wrapper');
const btn_mode = document.getElementById('btn-mode');
const search_form = document.querySelector('.search_form');
const input = document.querySelector('#input');
const btn_search = document.querySelector('.btn-search');
const error_div = document.querySelector('.error');
const fetch_location = document.querySelector('#location');
const twitter_src = document.querySelector('#twitter');
const company_name = document.querySelector('#company');
const website = document.querySelector('#page');
const Bio = document.querySelector('#bio');
const avatar = document.querySelector('#avatar');
const Followers = document.querySelector('#followers');
const repos = document.querySelector('#repos');
const Following = document.querySelector('#following');
const githubname = document.querySelector('#name');
const user = document.querySelector('#user');
const date_of_joining = document.querySelector('#date');
const modeicon = document.querySelector('#moon');
const btn_light_dark = document.querySelector('#btn_light_dark');
let user_name = '';
fetch_data('lovebabbar');
btn_search.addEventListener('click',function(){
    if(input.value!=''){
        user_name = input.value;
        fetch_data(user_name);
    }
    else{
        error_div.classList.remove('error');
        error_div.classList.add('active');
        setTimeout(function () {
            error_div.classList.add('error');
            error_div.classList.remove('active');
        },3000);
    }
});

async function fetch_data(user_name){
    try{
        const response = await fetch(`https://api.github.com/users/${user_name}`);
        const data = await response.json();
        render_details(data);
    }
    catch(err){
        console.log('Error Found');
        error_div.classList.remove('error');
        error_div.classList.add('active');
        setTimeout(function () {
            error_div.classList.add('error');
        },3000);
    }
};

function render_details(data){
    if(data.location){
        fetch_location.innerHTML = data?.location;
    }

    if(!data.location){
        fetch_location.innerHTML = 'Not Available';
    }

    if(data?.twitter_username!=null){
        twitter_src.href = `https://twitter.com/${data.twitter_username}`;
        twitter_src.innerHTML = data?.twitter_username;
    }

    if(data?.twitter_username==null){
        twitter_src.innerHTML = 'Not Available';
    }

    if(data?.company!=null){
        company_name.innerHTML = data?.company;
    }

    if(data?.company==null){
        company_name.innerHTML = 'Not Available';
    }

    if(data?.blog != null && data?.blog !== ""){
        website.href = data.blog;
        website.innerHTML = data.blog;
    } 
    else {
        website.innerHTML = 'Not Available';
    }

    if(data.bio){
        Bio.innerHTML = data.bio;
    }
    
    if(!data.bio){
        Bio.innerHTML = 'This Profile Has No Bio';
    }

    if(data.avatar_url){
        avatar.src = data.avatar_url;
    }

    if(data.followers){
        Followers.innerHTML = data.followers;
    }

    if(data.public_repos){
        repos.innerHTML = data.public_repos;
    }

    if(data.following){
        Following.innerHTML = data.following;
    }

    if(data.name){
        githubname.innerHTML = data.name;
    }

    if(data.url){
        user.href = data.html_url;
        user.innerHTML = data.name;
    }

    if(data?.created_at){
        let str = data.created_at;
        let arr = Array.from(str);
        // Reversing the array using the two pointer approach
        let i = 0;
        let j = arr.length - 1;
        while(i<j){
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
        date_of_joining.innerHTML = 'Joined '
        for(let i=arr.length - 1; i>=10; i--){
            date_of_joining.innerHTML = date_of_joining.innerHTML + `${arr[i]}`;
        }
    }
}

let darkMode = false;

btn_mode.addEventListener('click',function(){
    if(darkMode==false){
        darkModeProperties();
    }
    else{
        lightModeProperties();
    }
});

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    root.setProperty("--btn","#0079ff");
    btn_light_dark.innerHTML = 'LIGHT'
    btn_search.style.color = 'black';
    darkMode = true;
  }

function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    btn_search.style.color = 'white';
    btn_light_dark.innerHTML = 'DARK'
    darkMode = false;
  }