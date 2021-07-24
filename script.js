
let currentinput = ""
const tododiv = document.createElement('div')
tododiv.setAttribute('class','tododiv_style')
const donediv = document.createElement('div')
donediv.setAttribute('class','donediv_style')

document.body.append(tododiv)
document.body.append(donediv)

//set localStorage for first time
if (localStorage.length == 0) {
    localStorage.Alltask = JSON.stringify({
        todolist: [],
        donelist: []
    })
}
else {
    let Alltask_jav = JSON.parse(localStorage.Alltask)
    init_task(Alltask_jav)
}

//init after refreshed
function init_task(Alltask)
{
    for(let i= 0;i<Alltask.todolist.length;i++)
    {
        create_task(Alltask.todolist[i])
    }
    for(let i= 0;i<Alltask.donelist.length;i++)
    {
        create_done(Alltask.donelist[i])
    }
    
}



const inputbar = document.querySelector('input')
//read input
inputbar.addEventListener('input', (ev) => {
    currentinput = ev.target.value
})
//check Press enter
inputbar.addEventListener('keypress', (ev) => {
    if (ev.key == 'Enter') {
    Add_to_storage(currentinput) 
    }
})


//create add button
const addbtn = document.querySelector('button')
addbtn.addEventListener('click', () => {
  Add_to_storage(currentinput)
})

//assign value to storage
function Add_to_storage(input)
{
    currentinput = ''
    inputbar.value = ""

    if (input == "") {
        alert("Task cannot be empty")
    }
    else {
        //convert locolstorage to jav obj and viceversa
    let Alltask_jav = JSON.parse(localStorage.Alltask)
    Alltask_jav.todolist.push(input)
    localStorage.Alltask = JSON.stringify(Alltask_jav)
        //create task
    create_task(input)
    }
    
}

//function create task block
function create_task(input) {
    
     
    const taskdiv = document.createElement('span')
        taskdiv.setAttribute("class", "task_style")
        tododiv.append(taskdiv)
    //hover effect
    taskdiv.addEventListener('mouseover',()=>{
        donebtn.setAttribute('style','visibility:visible;background-color:rgb(62, 250, 15);')
        delbtn.setAttribute('style','visibility:visible;background-color:rgb(250, 15, 105);')
    })
    taskdiv.addEventListener('mouseout',()=>{
        donebtn.setAttribute('style','display:none;visibility:hidden;')
        delbtn.setAttribute('style','display:none;visibility:hidden;')
    })

        const task = document.createElement('p')
        task.setAttribute('style','margin:10px;')
        task.innerText = input
        taskdiv.append(task)

        const donebtn = document.createElement('button')
        donebtn.setAttribute('class','btn_style')
        donebtn.setAttribute('style','display:none;visibility:hidden;')
        donebtn.innerHTML = "done"
        donebtn.addEventListener('click',()=>{
           
            const ind_task = Array.prototype.indexOf.call(tododiv.children, taskdiv)
            let Alltask_jav = JSON.parse(localStorage.Alltask)
            Alltask_jav.donelist.push(Alltask_jav.todolist[ind_task])
            create_done(Alltask_jav.todolist[ind_task])
            Alltask_jav.todolist.splice(ind_task,1)
            localStorage.Alltask = JSON.stringify(Alltask_jav)

            tododiv.removeChild(taskdiv)
        })
        taskdiv.append(donebtn)

        const delbtn = document.createElement('button')
        delbtn.setAttribute('class','btn_style')
        delbtn.setAttribute('style','display:none;visibility:hidden;')
        delbtn.innerHTML = "delete"
        delbtn.addEventListener('click',()=>{
            const ind_task = Array.prototype.indexOf.call(tododiv.children, taskdiv)

            let Alltask_jav = JSON.parse(localStorage.Alltask)
            Alltask_jav.todolist.splice(ind_task,1)
            localStorage.Alltask = JSON.stringify(Alltask_jav)
            console.log(ind_task)

            tododiv.removeChild(taskdiv)
        })
        taskdiv.append(delbtn)

       
}
//create done block
function create_done(input)
{
    const done = document.createElement('span')
    done.setAttribute("class", "done_style")
    done.innerHTML = input
    donediv.append(done)
}
