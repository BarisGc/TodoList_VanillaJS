// sayfanın yüklenmesi sırasında problem olmaması adına window.onload, document.onload, <script defer> vb. gibi kullanımlar yapılmalı mı? Araştır

//eventlistenerları en yukarda topla, ismek projesi örneği gibi ve getlocalstorage her seferinde yapma, liste fonksiyonuna yeni arrayi parametre olarak gönder

/*----- Section(Global Definitions) Start-----*/

let todolistUserIdInput = document.querySelector("#todolistUserIdInput");
let todolistUserIdInputValue = document.querySelector("#todolistUserIdInput").value;
let todolistUserIdInputFilterButton = document.querySelector("#todolistUserIdInputFilterButton");

let todolistListInput = document.querySelector("#todolistListInput");
let todolistListInputValue = document.querySelector("#todolistListInput").value;
let todolistListInputEkleButton = document.querySelector("#todolistListInputEkleButton");

let todolistSearchInput = document.querySelector("#todoSearchInput");
let todolistSearchInputValue = document.querySelector("#todoSearchInput").value;
let todolistSearchGetirButton = document.querySelector("#todoSearchGetButton");

let TodoListRows = document.querySelector("#TodoListRows")
let TodoListRowsDomUl = document.querySelector("#TodoListRowsDomUl");

let ItemsStorageArray = localStorage.getItem('TodoListKeys') ? JSON.parse(localStorage.getItem('TodoListKeys')) : [];

/* -----Section(Global Definitions) End-----*/

/* -----Section(Functions) Start-----*/

// Displays todoListContent
let TodoListRowsDomUlShowDefaultFUNC = () => {
    ItemsStorageArray = localStorage.getItem('TodoListKeys') ? JSON.parse(localStorage.getItem('TodoListKeys')) : [];

    // ItemsStorageArrayItem INCLUDES objects
    for (let ItemsStorageArrayItem of ItemsStorageArray) {
        let keysArr = Object.entries(ItemsStorageArrayItem)
        // keysArr INCLUDES (UserId & ListItem)

        let liDOM = document.createElement("li")

        TodoListRowsDomUl.append(liDOM);

        /*liDOM first child*/
        let aDOM = document.createElement("a");
        aDOM.setAttribute("href", "javascript:void(0)");
        aDOM.classList.add("w-100", "p-3");
        liDOM.append(aDOM);

        let spanDOM = document.createElement("span");
        aDOM.append(spanDOM);

        let iDOM = document.createElement("i");
        iDOM.classList.add("fa", "fa-check", "me-2");
        spanDOM.append(iDOM);

        let spanDOM2 = document.createElement("span");
        spanDOM2.innerHTML = `${keysArr[0][1]}`
        spanDOM.append(spanDOM2);

        let spanDOM2_5 = document.createElement("span");
        spanDOM2_5.innerHTML = ` : `
        spanDOM.append(spanDOM2_5);


        let spanDOM3 = document.createElement("span");
        spanDOM3.innerHTML = `${keysArr[1][1]}`
        spanDOM.append(spanDOM3);


        /*liDOM second child*/
        let spanDOM4 = document.createElement("span");
        liDOM.append(spanDOM4);

        let buttonDOM = document.createElement("button");
        buttonDOM.classList.add("btn-close", "btn", "p-3");
        spanDOM4.append(buttonDOM);


        //List Checked Control
        if (keysArr[2][1] == false) {
            liDOM.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "p-0", "pe-1", "border-0")
            liDOM.classList.remove("customChecked")
            liDOM.classList.add("customUnChecked")
            iDOM.classList.add("invisible");
        }
        if (keysArr[2][1] == true) {
            liDOM.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "p-0", "pe-1", "border-0")
            liDOM.classList.remove("customUnChecked")
            liDOM.classList.add("customChecked")
        }

    };
};
TodoListRowsDomUlShowDefaultFUNC(); // Fonksiyonu tanımdan sonra çağırınca yani şu an problem yok ama fonksiyon çağrısını, fonksiyon tanımlamasından önce yaparsam neden bu hatayı alıyorum?>>>> Uncaught ReferenceError: Cannot access 'TodoListRowsDomUlShowDefaultFUNC' before initialization. Hoisting, async konularını tekrar araştır? 

//Toast Trigger Functions

let ToastTriggerSpaceCharCheck = () => {
            let TodoToast = document.querySelector("#TodoToast");
            var toast = new bootstrap.Toast(TodoToast)
            let SpaceCharCheck = document.querySelector(".toast-body")
            SpaceCharCheck.innerHTML = "Liste veya Kullanıcı Adı Boş Karakter ile Başlayamaz"
            // TodoToast.parentElement.classList.remove("d-none")
            toast.show()
            // setInterval(function () {TodoToast.parentElement.classList.add("d-none")}, 1000);
    }

let ToastTriggerNonInputCheck = () => {
            let TodoToast = document.querySelector("#TodoToast");
            var toast = new bootstrap.Toast(TodoToast)
            let NonInputCheck = document.querySelector(".toast-body")
            NonInputCheck.innerHTML = "Liste Eklemesi Yaparken Kullanıcı Adı Veya List Girişi Boş Bırakılamaz"
            // TodoToast.parentElement.classList.remove("d-none")
            toast.show()
            // setInterval(function () {TodoToast.parentElement.classList.add("d-none")}, 1000);
    }




// The function below: Adds a item to todoList
todolistListInputEkleButton.addEventListener("click", () => {
    let todolistUserIdInput = document.querySelector("#todolistUserIdInput"); 
    let todolistUserIdInputValue = document.querySelector("#todolistUserIdInput").value;
    let todolistListInput = document.querySelector("#todolistListInput");
    let todolistListInputValue = document.querySelector("#todolistListInput").value;
    //bunu neden tekrar yazmak zorundayım? globalden neden çekmiyor? parametre olarak mı göndermem lazım? Araştır
    
    



    
    if (todolistUserIdInputValue == "" || todolistListInputValue == "" ) {
        ToastTriggerNonInputCheck();
    } else if (todolistListInputValue.slice(0,1) == " " || todolistUserIdInputValue.slice(0,1) == " " ) {
        ToastTriggerSpaceCharCheck();
    } else if (todolistUserIdInputValue && todolistListInputValue) {
        TodoListRowsDomUl.innerHTML = "";
        let objectPushed = {};
        objectPushed["UserId"] = todolistUserIdInputValue;
        objectPushed["ListItem"] = todolistListInputValue;
        objectPushed["ListItemChecked"] = false;
        ItemsStorageArray.push(objectPushed);

        localStorage.setItem("TodoListKeys", JSON.stringify(ItemsStorageArray))

        TodoListRowsDomUlShowDefaultFUNC()
    } 
});

// Makes a selected item "checked" && "deleted"
TodoListRows.addEventListener("click", ListCheckControlFunc)
function ListCheckControlFunc(event) {
    let triggeredNode = event.target;

    // Makes a selected item "checked"
    if ((triggeredNode.nodeName == "A") || (triggeredNode.nodeName == "SPAN")) {

        triggeredNode.closest("li").classList.toggle("customChecked");
        triggeredNode.closest("li").classList.toggle("customUnChecked");
        let findIDom = triggeredNode.closest("li").firstElementChild.firstElementChild.firstElementChild;
        findIDom.classList.toggle("invisible")
        //"this" neden target'ın bir üstündeki yerine target'ın en tepesindeki parenta gidiyor? Araştır


        let ItemsStorageArray = JSON.parse(localStorage.getItem('TodoListKeys'));


        for (let ObjectElement of ItemsStorageArray) {

            if (ObjectElement.UserId == findIDom.nextElementSibling.innerHTML && ObjectElement.ListItem == findIDom.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML) {
                if (ObjectElement.ListItemChecked == true) {
                    ObjectElement.ListItemChecked = false
                } else {
                    ObjectElement.ListItemChecked = true
                }
                break
            }

        }
        localStorage.setItem("TodoListKeys", JSON.stringify(ItemsStorageArray));



    }

    // Makes a selected item "deleted"
    if (triggeredNode.nodeName == "BUTTON") { //dublicate problemi, en baştan eklenmesini engellenerek çözülecek. Yapılmadı.

        let ItemsStorageArray = JSON.parse(localStorage.getItem('TodoListKeys'))
        let findIDom = triggeredNode.closest("li").firstElementChild.firstElementChild.firstElementChild;
        console.log(findIDom)
        ItemsStorageArray.forEach((element, index) => {

            if (element.UserId == findIDom.nextElementSibling.innerHTML && element.ListItem == findIDom.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML) {
                ItemsStorageArray.splice(index, 1)
            }

        });
        localStorage.setItem("TodoListKeys", JSON.stringify(ItemsStorageArray))
        TodoListRowsDomUl.innerHTML = "";
        TodoListRowsDomUlShowDefaultFUNC()
    }
}

// Searching and Listing respected to UserId (&& / ||) ItemList"
//? nested If Case yapısı caseler arttıkça yönetilmesi zorlaşıyor mesela burada 2 switch her bir switchte 4 case desek toplam 16 case var. Bu normalde nasıl yönetilmeli?
//? .toLowerCase() için büyük i , küçük i olursa problem oluyor. Bunu sor
let SearchFilterFunc = function () {
    TodoListRowsDomUl.innerHTML = "";
    TodoListRowsDomUlShowDefaultFUNC()
    let todolistUserIdInputValue = document.querySelector("#todolistUserIdInput").value.toLowerCase();
    let TodoListRowsDomUlChildren = document.querySelector("#TodoListRowsDomUl").children;
    let todolistSearchInputValue = document.querySelector("#todoSearchInput").value.toLowerCase();


    for (let item of TodoListRowsDomUlChildren) {
        let searchTamEslesmeSwitch = document.querySelector("#searchTamEslesmeSwitch");
        let searchTamamlananlarSwitch = document.querySelector("#searchTamamlananlarSwitch");
        let UserIdOfItemList = item.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.innerHTML.toLowerCase() //Baris, Halil vb. UserId değerleri
        let SearchInputOfItemList = item.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.toLowerCase(); // Su İçeceğim, Yemek Yapacağım vb.ListItem değerleri


        // "Tamamlananları Getirme" Switchi açık ise;
        if (searchTamamlananlarSwitch.classList.contains("searchTamamlananlarSwitch")) {

            // "Sadece Tam Eşleşmeler" Switchi kapalı ise:
            if (!searchTamEslesmeSwitch.classList.contains("CheckedSearchTamEslesmeSwitch")) {

                // Searching and Listing respected to UserId"
                if (todolistUserIdInputValue && !todolistSearchInputValue) {
                    if (!(UserIdOfItemList == todolistUserIdInputValue) || item.classList.contains("customChecked")) {
                        item.classList.add("d-none")

                    }
                }
                // Searching and Listing respected to ListItem"  
                else if (!todolistUserIdInputValue && todolistSearchInputValue) {
                    if (!(SearchInputOfItemList == todolistSearchInputValue) || item.classList.contains("customChecked")) {
                        item.classList.add("d-none")

                    }
                }
                else if (todolistUserIdInputValue && todolistSearchInputValue) {
                    if ((!(SearchInputOfItemList == todolistSearchInputValue) && !(UserIdOfItemList == todolistUserIdInputValue)) || item.classList.contains("customChecked")) {
                        item.classList.add("d-none")
                    }
                }
                else if (!todolistUserIdInputValue && !todolistSearchInputValue && item.classList.contains("customChecked")) {
                    item.classList.add("d-none")
                }


            }
            // "Sadece Tam Eşleşmeler" Switchi açık ise:
            else {

                // Searching and Listing respected to UserId"
                if (todolistUserIdInputValue && !todolistSearchInputValue) {
                    if (!(UserIdOfItemList == todolistUserIdInputValue) || item.classList.contains("customChecked")) {
                        item.classList.add("d-none")
                    }
                }
                // Searching and Listing respected to ListItem"  
                else if (!todolistUserIdInputValue && todolistSearchInputValue) {
                    if (!(SearchInputOfItemList == todolistSearchInputValue) || item.classList.contains("customChecked")) {
                        item.classList.add("d-none")
                    }
                }
                else if (todolistUserIdInputValue && todolistSearchInputValue) {
                    if (!(SearchInputOfItemList == todolistSearchInputValue) || !(UserIdOfItemList == todolistUserIdInputValue) || item.classList.contains("customChecked")) {
                        item.classList.add("d-none")
                    }
                }
                else {
                    item.classList.add("d-none")
                }
            }

        }
        // "Tamamlananları Getirme" Switchi kapalı ise;
        else {

            // "Sadece Tam Eşleşmeler" Switchi kapalı ise:
            if (!searchTamEslesmeSwitch.classList.contains("CheckedSearchTamEslesmeSwitch")) {

                // Searching and Listing respected to UserId"
                if (todolistUserIdInputValue && !todolistSearchInputValue) {
                    if (!(UserIdOfItemList == todolistUserIdInputValue)) {
                        item.classList.add("d-none")
                    }
                }
                // Searching and Listing respected to ListItem"  
                else if (!todolistUserIdInputValue && todolistSearchInputValue) {
                    if (!(SearchInputOfItemList == todolistSearchInputValue)) {
                        item.classList.add("d-none")
                    }
                }
                else if (todolistUserIdInputValue && todolistSearchInputValue) {
                    if (!(SearchInputOfItemList == todolistSearchInputValue) && !(UserIdOfItemList == todolistUserIdInputValue)) {
                        item.classList.add("d-none")
                    }
                }
                else {
                    item.classList.remove("d-none")
                }
            }
            // "Sadece Tam Eşleşmeler" Switchi açık ise:
            else {

                // Searching and Listing respected to UserId"
                if (todolistUserIdInputValue && !todolistSearchInputValue) {
                    if (!(UserIdOfItemList == todolistUserIdInputValue)) {
                        item.classList.add("d-none")
                    }
                }
                // Searching and Listing respected to ListItem"  
                else if (!todolistUserIdInputValue && todolistSearchInputValue) {
                    if (!(SearchInputOfItemList == todolistSearchInputValue)) {
                        item.classList.add("d-none")
                    }
                }
                else if (todolistUserIdInputValue && todolistSearchInputValue) {
                    if (!(SearchInputOfItemList == todolistSearchInputValue) || !(UserIdOfItemList == todolistUserIdInputValue)) {
                        item.classList.add("d-none")
                    }
                }
                else {
                    item.classList.remove("d-none")
                }
            }
        }
    }
}

// Search Filter and Option Functions
let searchTamEslesmeSwitch = document.querySelector("#searchTamEslesmeSwitch");
let searchTamamlananlarSwitch = document.querySelector("#searchTamamlananlarSwitch");

searchTamEslesmeSwitch.addEventListener("click", function () {
    //sayfa yüklenince switch default hale gelmediği için düzen bozuluyor, buna bakılacak
    searchTamEslesmeSwitch.classList.toggle("CheckedSearchTamEslesmeSwitch")
})
searchTamamlananlarSwitch.addEventListener("click", function () {
    searchTamamlananlarSwitch.classList.toggle("searchTamamlananlarSwitch")
})

todolistFilterButton.addEventListener("click", SearchFilterFunc)


/* Section(Functions) End*/


//-----------------Test Functions Start-----------------

LocalStorageDemoButton.addEventListener("click", function (event) {

    localStorage.setItem("TodoListKeys", JSON.stringify([
        {
            UserId: "Baris",
            ListItem: "Su İçeceğim",
            ListItemChecked: false
        },
        {
            UserId: "Riza",
            ListItem: "Yemek Yiyeceğim",
            ListItemChecked: false
        },
        {
            UserId: "Hasan",
            ListItem: "Tavuk Keseceğim",
            ListItemChecked: false
        },
        {
            UserId: "Engin",
            ListItem: "Su İçeceğim",
            ListItemChecked: false
        },
        {
            UserId: "Cemil",
            ListItem: "Su İçeceğim",
            ListItemChecked: true
        },
        {
            UserId: "Baris",
            ListItem: "Ekmek Alacağım",
            ListItemChecked: true
        },
        {
            UserId: "Baris",
            ListItem: "Yemek Yapacağım",
            ListItemChecked: false
        },
    ])
    )
    TodoListRowsDomUl.innerHTML = "";
    TodoListRowsDomUlShowDefaultFUNC()
})

todolistButtonTemizle.addEventListener("click", function (event) {

    TodoListRowsDomUl.innerHTML = "";
    localStorage.removeItem("TodoListKeys");

})

//-----------------Test Functions End-----------------