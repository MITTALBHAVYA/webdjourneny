console.log("This is my cs Index");
const data=[
    {
        name:'Rahul Bhatt',
        age: 18,
        city:'Delhi',
        language:'cpp',
        framework:'cpp framework',
        image:'https://randomuser.me/api/portraits/men/71.jpg'
    },
    {
        name:'Hansa kala',
        age: 32,
        city:'Lokhand',
        language:'Go',
        framework:'Go Framework',
        image:'https://randomuser.me/api/portraits/women/72.jpg'
    },
    {
        name:'Laso Phinak',
        age: 22,
        city:'ASSAM',
        language:'JAVASCRIPT',
        framework:'CSS',
        image:'https://randomuser.me/api/portraits/women/73.jpg'
    },
    {
        name:'Binak Larp',
        age: 45,
        city:'Bijnor',
        language:'Python',
        framework:'Flask',
        image:'https://randomuser.me/api/portraits/men/74.jpg'
    },
    {
        name:'Totomonto',
        age: 29,
        city:'Nagpur',
        language:'Python',
        framework:'Django',
        image:'https://randomuser.me/api/portraits/men/75.jpg'
    }
]

function cvIterator(profiles){
    let nextIndex=0;
    return{
        next:function(){
            return nextIndex<profiles.length ?
            {value:profiles[nextIndex++],done:false}:
            {
              done:true
            }
        }
    };
}

const candidates=cvIterator(data);
nextCV();
const nextbtn=document.getElementById("nextbtn");
nextbtn.addEventListener('click',nextCV);

function nextCV(){
    const currentCandidate=candidates.next().value;
    if(currentCandidate!=undefined){
    let image=document.getElementById("image");
    let profile=document.getElementById("profile");
    image.innerHTML=`<img src='${currentCandidate.image}'>`;
    profile.innerHTML=`<ul class="list-group">
    <li class="list-group-item">NAME:${currentCandidate.name}</li>
    <li class="list-group-item">AGE:${currentCandidate.age}</li>
    <li class="list-group-item">CITY:${currentCandidate.city}</li>
    <li class="list-group-item">LANGUAGE:${currentCandidate.language}</li>
    <li class="list-group-item">FRAMEWORK:${currentCandidate.framework}</li>
  </ul>`;}
  else
  {
    alert("End Of Candidate Application");
    window.location.reload();
  }
}