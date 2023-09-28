
const txtName = document.getElementById("txtName");
const txtPoint = document.getElementById("txtPoint");
const btnAdd = document.getElementById("btnAdd");
const tblListBody = document.querySelector("#tblList tbody");
const tblListFooter = document.querySelector("#tblList tfoot");

const tblListFooterEmptyRow = document.querySelector("#tblList .empty-row");
const tblListFooterSummaryRow = document.querySelector("#tblList .summary-row");

btnAdd.addEventListener("click", ()=>{
    const name = txtName.value;
    const point  = txtPoint.value;

    if(!name || (!point && point ==0) || isNaN(point) || point<0 || point > 100) return;

    const row = getNewRows(name, point);
    tblListBody.prepend(row);

    updateTableRowIndex()
    updateAverage();
    setFooter();
    resetForm(); //clear the form


})

//function to create new row
const getNewRows =(name, point)=>{
    const row = document.createElement("tr");

    row.innerHTML = getRowHTML(name, point)

    attachDeleteEventListener(row);
    attachUpdateEventListener(row);
    attachApproveEventListener(row);
    attachCancelEventListener(row);

    return row;
}

//function to fill table data in created row
const getRowHTML = (name, point)=>{
    return `
    <td>#</td>
    <td >${name}</td>
    <td >${point}</td>
    <td>
        <span class="btn-group-primary">
            <button class="btn btn-link btn-del"> <i class="fa-solid fa-trash"></i></button>
            <button  class="btn btn-link btn-edit"> <i class="fa-solid fa-edit"></i></button>
        </span>

        <span class="btn-group-secondary d-none">
            <button class="btn btn-link btn-approve" ><i class="fa-solid fa-check"></i></button>
            <button  class="btn btn-link btn-cancel"> <i class="fa-solid fa-times"></i></button>
        </span>
        
    </td>
   
    `
}



//function to count rows and add index number

const updateTableRowIndex =()=>{
    const trList = tblListBody.querySelectorAll("tr td:first-child");
    trList.forEach((col, index)=>{
        col.innerHTML = index+1;
    })
}

//function to update average
const updateAverage =()=>{
    const pointEls = Array.from (tblListBody.querySelectorAll("tr td:nth-child(3)"));
    
    const total =  pointEls.map((item)=>item.innerHTML)
    .reduce((total, p)=>total+ Number(p), 0);
    const avg = (total/pointEls.length).toFixed(2)
    console.log(avg)
    document.getElementById("lblAverage").innerHTML = avg;

}

//function to hide "No records found" and display average

const setFooter = ()=>{

    const isTableBodyEmpty = tblListBody.querySelectorAll("tr").length>0 ? false:true;
    if(isTableBodyEmpty){
        tblListFooterEmptyRow.classList.remove("d-none")
        tblListFooterSummaryRow.classList.add("d-none")
    }else{
        tblListFooterEmptyRow.classList.add("d-none")
        tblListFooterSummaryRow.classList.remove("d-none")
    }
}

//function to seset table rows
const resetTableRows = ()=>{
    tblListBody.querySelectorAll("tr").forEach((row)=>{
        
        const elName = row.querySelector("td:nth-child(2)");
        const elPoint = row.querySelector("td:nth-child(3)");
        elName.contentEditable = false;
        elPoint.contentEditable=false ;

        //hide existing button-groups and display approve or cancel button groups
        row.querySelector(".btn-group-primary").classList.remove("d-none");
        row.querySelector(".btn-group-secondary").classList.add("d-none");
        row.closest("tr").classList.remove("table-info")
    })
}

//function to reset the form / inputs
const resetForm =()=>{
    txtName.value ="";
    txtPoint.value ="";
    txtName.focus();
}

//function to add eventListener on dele button
const attachDeleteEventListener = (row)=>{
    row.querySelector(".btn-del").addEventListener("click", ()=>{
        const name = row.querySelector("td:nth-child(2)").innerText;
        const result = confirm(`Are you sure to delete ${name}`);
        if(result){
            row.remove();
            updateAverage();
            setFooter();
        }
    })
}

const attachUpdateEventListener =(row)=>{
    row.querySelector(".btn-edit").addEventListener("click", ()=>{

        //before starting update/edit reset all rows to initial state
        resetTableRows();
        
        const elName = row.querySelector("td:nth-child(2)");
        const elPoint = row.querySelector("td:nth-child(3)");
        //console.log(elName, elPoint)

        //to create custom attributes "name" and "point" and assign existing innerText
        elName.dataset.name = elName.innerText;
        elPoint.dataset.point = elPoint.innerText;

        //make elements editable
        elName.contentEditable = true;
        elPoint.contentEditable=true ;
        elName.focus()

        //hide existing button-groups and display approve or cancel button groups
        row.querySelector(".btn-group-primary").classList.add("d-none");
        row.querySelector(".btn-group-secondary").classList.remove("d-none");
        row.closest("tr").classList.add("table-info")


    })
}

const attachCancelEventListener =(row)=>{
    row.querySelector(".btn-cancel").addEventListener("click", ()=>{

        const elName = row.querySelector("td:nth-child(2)");
        const elPoint = row.querySelector("td:nth-child(3)");
        

        

        //make elements not editable
        elName.contentEditable = false;
        elPoint.contentEditable=false ;
    

        //assign initial values back from data-name, data-point attribute
        elName.innerText = elName.dataset.name;
        elPoint.innerText = elPoint.dataset.point

        //bring the initial classes back
        row.querySelector(".btn-group-primary").classList.remove("d-none");
        row.querySelector(".btn-group-secondary").classList.add("d-none");
        row.closest("tr").classList.remove("table-info")

    })
}

const attachApproveEventListener =(row)=>{
    row.querySelector(".btn-approve").addEventListener("click", ()=>{

        
        const elName = row.querySelector("td:nth-child(2)");
        const elPoint = row.querySelector("td:nth-child(3)");

        const name = elName.innerText;
        const point = elPoint.innerText;

        if(!name || (!point && point ==0) || isNaN(point) || point<0 || point > 100) return;

        elName.contentEditable = false;
        elPoint.contentEditable=false ;

        elName.dataset.name = "";
        elPoint.dataset.point = "";


    //bring the initial classes back
        row.querySelector(".btn-group-primary").classList.remove("d-none");
        row.querySelector(".btn-group-secondary").classList.add("d-none");
        row.closest("tr").classList.remove("table-info")
        updateAverage();

    })
}