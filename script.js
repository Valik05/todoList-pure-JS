'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelector('.items'),
        all = document.querySelector('.list-text-all'),
        doneCount = document.querySelector('.list-text-done'),
        importantCount = document.querySelector('.list-text-important'),
        date = document.querySelector('.date'),
        openModal = document.querySelector('.open'),
        modalWindow = document.querySelector('.blockSelect'),
        filterDone = document.querySelector('.favourite--done'),
        filterImportant = document.querySelector('.favourite--important'),
        doneText = document.querySelector('.done-text'),
        importantText = document.querySelector('.important-text'),
        exit = document.querySelector('.exit'),
        allText = document.querySelector('.all-text'),
        filterAll = document.querySelector('.favourite--all')

    const filteredStatus = {
        filteredAll:false,
        filteredDone: false,
        filteredImportant: false,
        onOpened:false
    }
    openModal.addEventListener('click', () => {
        console.log(1)
        filteredStatus.onOpened = !filteredStatus.onOpened
        if(filteredStatus.onOpened){
            modalWindow.style.display = 'flex';
        } else{
            modalWindow.style.display = 'none';
        }
        
    })
    exit.addEventListener('click', () => {
        modalWindow.style.display = 'none';
    })

    const today = new Date();
    const time = `${today.getHours()}:${today.getMinutes() < 10 ? 0 : ''}${today.getMinutes()}`;
    date.innerHTML = `${today.getDate()}.0${today.getMonth() + 1}.${today.getFullYear()}`
    class Obj {
        constructor(text, done, important, date, id, deleted) {
            this.text = text
            this.done = done
            this.important = important
            this.date = date
            this.id = id
            this.deleted = deleted
        }
    }
    JSON.stringify
    let itemId = 100;
    fetch('datas.json').then(() =>{
        console.log(numbers)
    })
    let objectes = [
        createItem('Drink Coffe'),
        createItem('Learn JS'),
        createItem('Have a lunch')
    ];
    function createItem(text) {
        return new Obj(text, false, false, time, itemId++, false)
    }

    function renderCounter() {
        const allCurrent = objectes.length;
        const importantCurrent = objectes.filter((el) => el.important).length;
        const doneCurrent = objectes.filter((el) => el.done).length;
        doneCount.innerHTML = `Done - ${doneCurrent},`;
        importantCount.innerHTML = `Important - ${importantCurrent},`;
        all.innerHTML = `All - ${allCurrent},`
    }

    function renderItems(arr) {
        if(arr.length === 0){
            items.innerHTML = "Nothing pass"
            return 
        }
        const allCurrent = objectes.length;
        const importantCurrent = objectes.filter((el) => el.done).length;
        const doneCurrent = objectes.filter((el) => el.important).length;
        doneCount.innerHTML = `Done - ${doneCurrent},`;
        importantCount.innerHTML = `Important - ${importantCurrent},`;
        all.innerHTML = `All - ${allCurrent},`

        items.innerHTML = '';
        arr.forEach((item) => {
            items.innerHTML += `<div class="item">
        <div class="item-left">
           <span class="item-text" id=${item.id}>
              ${item.text}
           </span>
        </div>
        <div class="item-right">
           <span class="item-date">${item.date}</span>
           <button class="item-delete" >
              <i class="fa-solid fa-trash"></i>
           </button>
           <button class="item-important">
              <i class="fa-solid fa-exclamation"></i>
           </button>
        </div>
     </div>`

        })
        const important = document.querySelectorAll('.item-important'),
            deleteItem = document.querySelectorAll('.item-delete'),
            itemText = document.querySelectorAll('.item-text')
        console.log(important)
        addEvents(important, deleteItem, itemText)
    }
    renderItems(objectes)
    function addEvents(important, deleteItem, itemText) {
        let i = 0;
        for (let key of objectes) {
            const id = document.getElementById(`${key.id}`)
            important[i].addEventListener('click', () => {
                key.important = !key.important
                if (key.important) {
                    id.classList += ' important'
                } else {
                    id.classList = 'item-text'
                }
                renderCounter()
            })
            itemText[i].addEventListener('click', () => {
                key.done = !key.done
                if (key.done) {
                    id.classList += ' done'
                } else {
                    id.classList = 'item-text'
                }
                renderCounter()
            })
            deleteItem[i].addEventListener('click', () => {
                key.deleted = true;
                objectes.forEach((obj) => {
                    if (obj.deleted) {
                        objectes.splice(objectes.indexOf(obj), 1);
                        renderItems(objectes)
                        renderCounter()
                    }
                })
            })
            console.log(i, id, important[i], deleteItem[i])
            i++

        }
    }
    filterAll.addEventListener('click', () =>{
        filteredStatus.filteredAll = !filteredStatus.filteredAll
        if (!filteredStatus.filteredAll) {
            allText.classList = 'all-text'
            filterItems()
        } else {
            allText.classList = 'all-text onFilter'
            filterItems('all')
        }
    })
    filterDone.addEventListener('click', () => {
        filteredStatus.filteredDone = !filteredStatus.filteredDone
        if (!filteredStatus.filteredDone) {
            doneText.classList = 'done-text'
            filterItems()
        } else {
            doneText.classList = 'done-text onFilter'
            filterItems('done')
        }
    })
    filterImportant.addEventListener('click', () => {
        filteredStatus.filteredImportant = !filteredStatus.filteredImportant
        if (!filteredStatus.filteredImportant) {
            importantText.classList = 'important-text'
            filterItems()
        } else {
            importantText.classList = 'important onFilter'
            filterItems('important')
        }
    })
    function filterItems(filter){
        switch(filter){
          case 'all':
          return renderItems(objectes)
          case 'important':
          return renderItems(objectes.filter(el => el.important))
          case 'done':
            return renderItems(objectes.filter(el => el.done))
          default:
            return renderItems(objectes)
        }
    }





    const search = document.querySelector('.search-input'),
    searchForm = document.querySelector('.search')
    searchForm.addEventListener('submit', (e) =>{
        e.preventDefault()
    })
    search.addEventListener('change', () => {
        console.log(search.value)
        const visibleItems = objectes.filter((el) => {
            return el.text.indexOf(search.value) > -1;
        })
        renderItems(visibleItems)
    })

    const form = document.querySelector('.addItem-form'),
        addInput = document.querySelector('.addItem-form-input'),
        addBtn = document.querySelector('.addItem-form-btn')
    console.log(addBtn, addInput)
    addBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if (addInput.value) {
            const newItem = createItem(addInput.value);
            const newArr = [
                ...objectes,
                newItem
            ]
            objectes = newArr;
            renderItems(newArr)
        }
        console.log(addInput.value)
        addInput.value = '';
    })



    // const todoCurrent = todoData.filter((el) => !el.done).length;
    // const doneCurrent = todoData.length - todoCurrent;
    // const visibleItems = this.filter( this.search(todoData,term), filter)
    // const search = (arr,term) =>{
    //     if(term.length === 0){
    //       return arr
    //     }
    //     return arr.filter((el) => {
    //       return el.label.toLowerCase().indexOf(term) > -1;
    //     })
    // }
    
    // addItem = (label) => {
    //     const newItem = this.createItem(label)
    //     this.setState(({ todoData }) => {
    //       const newArr = [
    //         ...todoData,
    //         newItem
    //       ]
    //       return {
    //         todoData: newArr
    //       }
    //     })
    //   }
})