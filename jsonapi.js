$(document).ready(function() {
    let posts = [];
    let table = document.getElementById('myTable');
    $.ajax({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts',
        async:true,
        success: function(response) {
            // console.log(response);
            posts = response;
            buildTable(posts)
        }
    });

    function buildTable(data) {
        // console.log(data);
        table.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            let row = `<tr>
                            <td>${data[i].userId}</td>
                            <td>${data[i].id}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].body}</td>
                        </tr>`;

            table.innerHTML += row;
        }
    }

    // sorting by title
    $('#title').on('click', function(){
        let column = $(this).data('column');
        let order = $(this).data('order');
        let text = $(this).html();
        text = text.substring(0, text.length - 1);
        // console.log("clicked header!!", column, order);

        if (order == 'desc') {
            $(this).data('order', "asc");
            posts = posts.sort((a,b) => a[column] > b[column] ? 1 : -1);
            text += '&#9660';
        } else {
            $(this).data('order', "desc");
            posts = posts.sort((a,b) => a[column] < b[column] ? 1 : -1);
            text += '&#9650';
        }
        $(this).html(text);
        buildTable(posts);
    });

    // buildTable(posts);

    // grouping by userID
    // NOTE: it works when the userID is sorted.
    $('#userid').on('click', function(){
        function groupTable($rows, startIndex, total) {
            if (total === 0) return;
            let i, currentIndex = startIndex, count = 1, myArray = [];
            let tds = $rows.find('td:eq(' + currentIndex + ')');
            let ctrl = $(tds[0]);
            myArray.push($rows[0]);
            for (i = 1; i <= tds.length; i++) {
                if(ctrl.text() == $(tds[i]).text()) {
                    count++;
                    $(tds[i]).addClass('deleted');
                    myArray.push($rows[i]);
                } else {
                    if (count > 1) {
                        ctrl.attr('rowspan', count);
                        groupTable($(myArray), startIndex + 1, total - 1);
                    }
                    count = 1;
                    myArray = [];
                    ctrl = $(tds[i]);
                    myArray.push($rows[i]);
                }
            } 
        }

        groupTable($('#myTable tr:has(td)'),0,3);
        $('#myTable .deleted').remove();
    });
});
    