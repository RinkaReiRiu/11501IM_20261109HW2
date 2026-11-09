const plants = [

{
id:1,
name:"榕樹",
meaning:"守護與長壽",
intro:"榕樹生命力旺盛，具有發達的氣根與寬廣樹冠，常被視為守護、庇蔭與長壽的象徵。"
},

{
id:2,
name:"南美朱槿",
meaning:"熱情與活力",
intro:"南美朱槿花色鮮豔，花期長，象徵熱情、自信與充滿活力的生命力。"
},

{
id:3,
name:"旅人蕉",
meaning:"歡迎與祝福",
intro:"旅人蕉又稱扇芭蕉，據說葉柄基部可儲存水分供旅人解渴，因此象徵歡迎、關懷與祝福。"
},

{
id:4,
name:"馬纓丹",
meaning:"協力合作",
intro:"馬纓丹花朵聚生成團、色彩豐富，因此經常象徵團結合作與共同成長。"
},

{
id:5,
name:"錫葉藤",
meaning:"永恆的愛",
intro:"錫葉藤開花時形成迷人的紫色花瀑，因此常象徵忠誠、浪漫與永恆的愛。"
},

{
id:6,
name:"千日紅",
meaning:"永不褪色的友情",
intro:"千日紅即使乾燥後仍能保持鮮豔色彩，因此象徵長久不變的友誼。"
},

{
id:7,
name:"龍柏",
meaning:"堅毅長青",
intro:"龍柏四季常綠且姿態挺拔，因此象徵堅持、毅力與永續發展。"
},

{
id:8,
name:"小葉厚殼樹",
meaning:"堅韌與守護",
intro:"小葉厚殼樹能適應海岸環境，因此象徵堅韌不拔與默默守護。"
}

];

const plantRow = document.getElementById("plantRow");
const meaningRow = document.getElementById("meaningRow");

let selectedPlant = null;
let selectedMeaning = null;
let lock = false;
let matched = 0;

function shuffle(array){
    return [...array].sort(() => Math.random() - 0.5);
}

function createCard(text,id,type){

    const card = document.createElement("div");

    card.className = "card";

    card.dataset.id = id;
    card.dataset.type = type;

    card.innerHTML = `
        <div class="card-inner">
            <div class="front">?</div>
            <div class="back">${text}</div>
        </div>
    `;

    card.addEventListener("click", flipCard);

    return card;
}

shuffle(plants).forEach(plant=>{
    plantRow.appendChild(
        createCard(
            plant.name,
            plant.id,
            "plant"
        )
    );
});

shuffle(plants).forEach(plant=>{
    meaningRow.appendChild(
        createCard(
            plant.meaning,
            plant.id,
            "meaning"
        )
    );
});

function flipCard(){

    if(lock) return;

    const type = this.dataset.type;

    if(type === "plant"){

        if(selectedPlant){
            selectedPlant.classList.remove("flipped");
        }

        selectedPlant = this;
        this.classList.add("flipped");

    }else{

        if(selectedMeaning){
            selectedMeaning.classList.remove("flipped");
        }

        selectedMeaning = this;
        this.classList.add("flipped");
    }

    if(selectedPlant && selectedMeaning){

        lock = true;

        setTimeout(checkMatch,500);
    }
}

function checkMatch(){

    const correct =
        selectedPlant.dataset.id ===
        selectedMeaning.dataset.id;

    if(correct){

        selectedPlant.classList.add("matched");
        selectedMeaning.classList.add("matched");

        matched++;

        showPlantInfo(
            selectedPlant.dataset.id
        );

    }else{

        selectedPlant.classList.remove("flipped");
        selectedMeaning.classList.remove("flipped");

    }

    selectedPlant = null;
    selectedMeaning = null;
    lock = false;

    if(matched === plants.length){

        setTimeout(()=>{

            document.getElementById("winMessage")
                .style.display = "block";

        },500);
    }
}

function showPlantInfo(id){

    const plant = plants.find(
        p => p.id == id
    );

    document.getElementById("plantName")
        .textContent = plant.name;

    document.getElementById("plantInfo")
        .innerHTML =
        `<strong>花語：</strong>${plant.meaning}<br><br>${plant.intro}`;

    document.getElementById("modal")
        .style.display = "flex";
}

function closeModal(){

    document.getElementById("modal")
        .style.display = "none";
}
