function tableData() {
    try{
        const app = document.getElementById('app');

        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(posts => {
            return posts.json();
        })
        .then(data => {
            console.log("data: ", data);
            // app.innerHTML = listOfPosts(data);
            // Extract value from table header
            let col = [];
            for (let i = 0; i < data.length; i++){
                for (let key in data[i]){
                    if(col.indexOf(key) === -1){
                        col.push(key);
                    }
                }
            }

            // Creating table
            const table = document.createElement("table");

            // Create table header row using extracted headers above
            let tr = table.insertRow(-1); 
            let th;
            for (let i = 0; i < col.length; i++){
                th = document.createElement("th");
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // adding json data to table rows
            for (let i = 0; i < data.length; i++){
                tr = table.insertRow(-1);
                for (let j = 0; j < col.length; j++){
                    let tableCell = tr.insertCell(-1);
                    tableCell.innerHTML = data[i][col[j]];
                }
            }

            //Adding to div
            app.innerHTML = "";
            app.appendChild(table);
        })
    } catch (e){
        app.innerHTML = "title not found";
    }
}

tableData();

