const divCreateTable = document.getElementById("divCreateTable");
const divAttribute = document.getElementById("divAttribute");
const divAddRow = document.getElementById("divAddRow");
const divDeleteRow = document.getElementById("divDeleteRow");
const divDeleteTable = document.getElementById("divDeleteTable");
const divTable = document.getElementById("divTable");
const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");

let tables = Array();

select1.onchange = function () {
    let indexSelect1 = select1.selectedIndex;
    let text1 = select1.options[indexSelect1].text;

    switch (text1) {
        case "SELECT ONE":
            clearAll();
            break;
        case "CREATE TABLE":
            clearAll();
            showCreateTable();
            break;
        case "ADD ROW":
            clearAll();
            showAddRow();
            break;
        case "DELETE ROW":
            clearAll();
            showDeleteRow();
            break;
        case "DELETE TABLE":
            clearAll();
            showDeleteTable();
            break;
    }
};

select2.onchange = function () {
    let indexSelect2 = select2.selectedIndex;
    let text2 = select2.options[indexSelect2].text;

    switch (text2) {
        case "SELECT (default: last created)":
            divTable.innerText = "";
            break;
        default:
            drawTable();
            break;
    }
};


function clearAll() {
    divCreateTable.innerText = "";
    divAttribute.innerText = "";
    divAddRow.innerText = "";
    divDeleteRow.innerText = "";
    divDeleteTable.innerText = "";
}

function drawTable() {
    divTable.innerText = "";
    for (let table of tables) {
        if (table.getName() === select2.options[select2.selectedIndex].text) {
            drawTableTh(table);
            for (let i = 0; i < table.getTrs().length; i++) {
                drawTableTr(table,i);
            }
        }
    }
}

function showCreateTable() {
    let inputTableName = document.createElement("input");
    let inputColumnsNumbers = document.createElement("input");

    inputTableName.id = "inputTableName";
    inputTableName.type = "text";
    inputTableName.placeholder = "Table Name";
    inputColumnsNumbers.id = "inputColumnsNumbers";
    inputColumnsNumbers.type = "number";
    inputColumnsNumbers.placeholder = "Columns Numbers";

    divCreateTable.appendChild(inputTableName);
    divCreateTable.appendChild(inputColumnsNumbers);

    inputColumnsNumbers.onchange = function () {
        divAttribute.innerText = "";
        if (inputColumnsNumbers.value > 0) {
            showAttribute(inputColumnsNumbers.value);
            let commit = createCommit();
            commit.onclick = function () {
                let name = document.getElementById("inputTableName").value;
                let columnsNumbers = document.getElementById("inputColumnsNumbers").value;
                let ths = Array();
                for (let i = 1; i <= columnsNumbers; i++) {
                    ths.push(document.getElementById("inputAttribute" + i).value);
                }

                let table = new Table(name,columnsNumbers,ths);
                tables.push(table);

                createTable(table);
            };
            divAttribute.appendChild(commit);
        }
    }
}

function showAttribute(number) {
    for (let i = 1; i <= number; i++) {
        let inputAttribute = document.createElement("input");

        inputAttribute.id = "inputAttribute" + i;
        inputAttribute.type = "text";
        inputAttribute.placeholder = "Attribute";

        divAttribute.appendChild(inputAttribute);
    }
}

function createCommit() {
    let commit = document.createElement("input");

    commit.id = "commit";
    commit.className = "center";
    commit.type = "button";
    commit.value = "commit";

    return commit;
}

function createTable(table) {
    let optionTableName = document.createElement("option");

    // optionTableName.name = "select" + table.getName;
    optionTableName.innerText = table.getName();
    optionTableName.selected = true;

    select2.appendChild(optionTableName);

    divTable.innerText = "";
    drawTableTh(table);
}

function drawTableTh(table) {
    let newTable = document.createElement("table");
    let newRow = newTable.insertRow(0);
    for (let i = 0; i < table.getColumnsNumbers(); i++) {
        let th = document.createElement("th");

        th.innerText = table.getThs()[i];

        newRow.appendChild(th);
    }

    // newTable.id = "table" + table.getName;
    newTable.className = "center";

    divTable.appendChild(newTable);
}

function showAddRow() {
    for (let table of tables) {
        if (table.getName() === select2.options[select2.selectedIndex].text) {
            for (let i = 1; i <= table.getColumnsNumbers(); i++) {
                let inputRowAttribute = document.createElement("input");

                inputRowAttribute.id = "inputRowAttribute" + i;
                inputRowAttribute.type = "text";
                inputRowAttribute.placeholder = table.getThs()[i - 1];

                divAddRow.appendChild(inputRowAttribute);
            }
            let commit = createCommit();
            commit.onclick = function () {
                let row = Array();
                for (let i = 1; i <= table.getColumnsNumbers(); i++) {
                    row.push(document.getElementById("inputRowAttribute" + i).value);
                }
                table.getTrs().push(row);

                drawTableTr(table,table.getTrs().length - 1);
            };
            divAddRow.appendChild(commit);
        }
    }
}

function drawTableTr(table,rowNumber) {
    let selectedTable = document.getElementsByTagName("table")[0];
    let newRow = selectedTable.insertRow(rowNumber);
    for (let i = 0; i < table.getColumnsNumbers(); i++) {
        let td = document.createElement("td");

        td.innerText = table.getTrs()[rowNumber][i];

        newRow.appendChild(td);
    }
    selectedTable.appendChild(newRow);
}

function showDeleteRow() {
    for (let table of tables) {
        if (table.getName() === select2.options[select2.selectedIndex].text) {
            for (let i = 1; i <= table.getColumnsNumbers(); i++) {
                let inputDeleteRowAttribute = document.createElement("input");

                inputDeleteRowAttribute.id = "inputDeleteRowAttribute" + i;
                inputDeleteRowAttribute.type = "text";
                inputDeleteRowAttribute.placeholder = table.getThs()[i - 1];

                divDeleteRow.appendChild(inputDeleteRowAttribute);
            }
            let commit = createCommit();
            commit.onclick = function () {
                for (let i = 0; i < table.getTrs().length; i++) {
                    let row = table.getTrs()[i];
                    let isRow = true;
                    for (let j = 1; j <= row.length; j++) {
                        if (document.getElementById("inputDeleteRowAttribute" + j).value === "")
                            continue;
                        isRow = isRow && (row[j - 1] === document.getElementById("inputDeleteRowAttribute" + j).value);
                    }
                    if (isRow) {
                        table.getTrs().splice(i,1);
                        i--;
                        drawTable();
                    }
                }
            };
            divDeleteRow.appendChild(commit);
        }
    }
}

function showDeleteTable() {
    window.alert("WARNING: You cannot undo this action!");
    let commit = createCommit();
    commit.onclick = function () {
        for (let i = 0; i < tables.length; i++) {
            if (tables[i].getName() === select2.options[select2.selectedIndex].text) {
                tables.splice(i,1);
                select2.options.remove(i + 1);
                i--;
            }
        }
        if (select2.options.length > 1)
            select2.options[1].selected = true;
        else
            select2.options[0].selected = true;
        drawTable();
    };
    divDeleteTable.appendChild(commit);
}

class Table {
    constructor (name,columnsNumbers,ths) {
        this.name = name;
        this.columnsNumbers = columnsNumbers;
        this.ths = ths;
        this.trs = Array();
    }
    getName () {
        return this.name;
    }
    getColumnsNumbers () {
        return this.columnsNumbers;
    }
    getThs () {
        return this.ths;
    }
    getTrs () {
        return this.trs;
    }
}